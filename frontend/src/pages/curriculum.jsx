// CurriculumPlanner.jsx
// Upload any curriculum Excel with the same format to parse & plan semesters.
// Uses ExcelJS for Excel parsing.
//
// Excel format expected:
//   Col A (1): row number OR section label OR group label
//   Col B (2): course code OR quota string (e.g. "16/11", "0/3", "31/31") OR date
//   Col C (3): course name
//   Col D (4): credits
//   Col E (5): grade
//   Col F (6): status ("G" = passed, "NA" = failed)
//   Col G (7): prerequisites (comma-separated codes)

import { useState, useMemo, useRef } from "react";
import ExcelJS from "exceljs";

// ─── Excel Parser ─────────────────────────────────────────────────────────────
function cellStr(cell) {
  if (!cell || cell.type !== 3) return null;
  const v = cell.value;
  if (typeof v === "string") return v.trim() || null;
  return null;
}

function cellNum(cell) {
  if (!cell) return null;
  if (cell.type === 2 && typeof cell.value === "number") return cell.value;
  if (cell.type === 6 && cell.value && typeof cell.value.result === "number") return cell.value.result;
  return null;
}

function parseQuota(cell) {
  if (!cell || cell.type === 0) return null;
  // Type 4 = date: Excel auto-converted "2/2" → Feb 2. Recover as month/day.
  if (cell.type === 4 && cell.value instanceof Date) {
    const done = cell.value.getMonth() + 1; // month is 1-based
    const required = cell.value.getDate();   // day of month
    return { done, required };
  }
  // Type 3: plain string "0/3", "16/11", etc.
  if (cell.type === 3 && typeof cell.value === "string") {
    const m = cell.value.trim().match(/^(\d+)\/(\d+)$/);
    if (m) return { done: parseInt(m[1]), required: parseInt(m[2]) };
  }
  // Type 6: formula result
  if (cell.type === 6 && cell.value) {
    const r = cell.value.result;
    if (typeof r === "string") {
      const m = r.trim().match(/^(\d+)\/(\d+)$/);
      if (m) return { done: parseInt(m[1]), required: parseInt(m[2]) };
    }
  }
  // Fallback: cell.text (rendered display value)
  const txt = (cell.text ?? "").trim();
  if (txt) {
    const m = txt.match(/^(\d+)\/(\d+)$/);
    if (m) return { done: parseInt(m[1]), required: parseInt(m[2]) };
  }
  return null;
}

export async function parseExcel(arrayBuffer) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(arrayBuffer);
  const ws = wb.worksheets[0];
  const sections = [];
  let currentSection = null;

  ws.eachRow((row) => {
    const c1 = row.getCell(1);
    const c2 = row.getCell(2);
    const c3 = row.getCell(3);
    const c4 = row.getCell(4); // credits for course rows; quota string/date for section header rows
    const c5 = row.getCell(5);
    const c6 = row.getCell(6);
    const c7 = row.getCell(7);

    // ── Course row: col A is a number ──────────────────────────────────────
    if (c1.type === 2) {
      if (!currentSection) return;
      const code = cellStr(c2);
      if (!code) return;
      const prereqRaw = cellStr(c7);
      const prereqs = prereqRaw ? prereqRaw.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const status = cellStr(c6);
      currentSection.courses.push({
        code,
        name: cellStr(c3) || code,
        credits: cellNum(c4) ?? 0,
        grade: cellNum(c5),
        status: status === "G" ? "G" : status === "NA" ? "NA" : null,
        prereqs,
      });
      return;
    }

    // ── Section header row: col A is a string label ────────────────────────
    if (c1.type !== 3) return;
    const label = cellStr(c1);
    if (!label) return;

    // First occurrence has no quota (col D empty) → skip, just wait for second row
    // Second occurrence has quota in col D (string "X/Y" or date when Excel
    // auto-converts small fractions like "2/2" → Feb 2, "3/3" → Mar 3, etc.)
    if (c4.type === 0) return; // col D empty → title-only first row, skip

    const sectionId = label.match(/^(\d+\.[А-ЯA-Za-z]+)/)?.[1] || label.substring(0, 14);

    // Parse quota from col D — handles string "X/Y" and date (month=done, day=required)
    const quota = parseQuota(c4);

    const existing = sections.find((s) => s.id === sectionId);
    if (existing) {
      // Second occurrence — fill in quota if first pass didn't have it
      if (quota && existing.required_cr === null) {
        existing.done_cr = quota.done;
        existing.required_cr = quota.required;
      }
      currentSection = existing;
      return;
    }

    currentSection = {
      id: sectionId,
      label,
      done_cr:     quota ? quota.done     : null,
      required_cr: quota ? quota.required : null,
      courses: [],
    };
    sections.push(currentSection);
  });

  return sections.filter((s) => s.courses.length > 0);
}

// ─── Scheduler ────────────────────────────────────────────────────────────────
const MAX_CREDITS = 24;
const MAX_SEMESTERS = 8;

function buildCourseMap(sections) {
  const map = {};
  sections.forEach((sec) => sec.courses.forEach((c) => { map[c.code] = c; }));
  return map;
}

function prereqsMet(course, doneSet, courseMap) {
  return course.prereqs.every((p) => {
    const pc = courseMap[p];
    return !pc || doneSet.has(p);
  });
}

// getRequiredCourses:
// - Mandatory sections (required_cr === null): all courses required.
// - Badge sections (required_cr === 0): nothing required (0-credit courses handled inline).
// - Quota sections (required_cr > 0): only add courses up to the credit quota.
//   If passed credits already >= required_cr, NO pending courses are added.
//   0-credit courses in a section are only added for mandatory/quota sections, not badge.
function getRequiredCourses(sections) {
  const required = new Set();

  sections.forEach((sec) => {
    const { required_cr, courses } = sec;


    // Effective required_cr: use explicit quota, or fall back to done_cr if
    // the section was parsed as mandatory but has a known completion amount.
    // This handles Excel files where the quota cell is a date (mandatory marker)
    // but the section is actually elective with a credit cap.
    const eff_req = required_cr !== null ? required_cr
      : (sec.done_cr != null && sec.done_cr > 0) ? sec.done_cr
      : null;

    if (eff_req === null) {
      // Fully mandatory — every course required (including 0-credit)
      courses.forEach((c) => required.add(c.code));

    } else if (eff_req === 0) {
      // Badge only — nothing to plan
    } else {
      // Quota section: fill up to eff_req credits.
      // Always include 0-credit courses from this section (seminars, exams, etc.)
      courses.forEach((c) => { if (c.credits === 0) required.add(c.code); });

      // Step 1: walk passed courses, add them until quota met
      // Use exact-fit packing: prefer courses that fit, skip those that overshoot.
      const passed = courses.filter((c) => c.status === "G" && c.credits > 0);
      let budget = eff_req;
      for (const c of passed) {
        if (budget <= 0) break;
        if (c.credits > budget) continue; // skip overshooting course, keep looking
        required.add(c.code);
        budget -= c.credits;
      }

      // Step 2: only if quota still not met, fill with pending courses
      if (budget > 0) {
        const pending = courses.filter(
          (c) => c.status !== "G" && c.status !== "NA" && c.credits > 0
        );
        for (const c of pending) {
          if (budget <= 0) break;
          if (c.credits > budget) continue; // skip overshooting course
          required.add(c.code);
          budget -= c.credits;
        }
      }
      // budget <= 0 after passed → no pending courses added at all
    }
  });

  return required;
}

export function generateSemesters(sections) {
  const courseMap = buildCourseMap(sections);
  const required = getRequiredCourses(sections);

  const done = new Set(
    Object.values(courseMap)
      .filter((c) => c.status === "G")
      .map((c) => c.code)
  );

  const todo = [...required].filter((code) => !done.has(code) && courseMap[code]);

  const semesters = [];
  const scheduled = new Set([...done]);
  let remaining = [...todo];

  for (let iter = 0; iter < MAX_SEMESTERS && remaining.length > 0; iter++) {
    const semCourses = [];
    let credits = 0;
    const stillRemaining = [];

    for (const code of remaining) {
      const c = courseMap[code];
      if (!c) continue;
      if (prereqsMet(c, scheduled, courseMap) && credits + c.credits <= MAX_CREDITS) {
        semCourses.push(code);
        credits += c.credits;
      } else {
        stillRemaining.push(code);
      }
    }

    if (semCourses.length === 0) break;

    semCourses.forEach((code) => scheduled.add(code));
    remaining = stillRemaining;

    semesters.push({
      number: iter + 1,
      courses: semCourses.map((code) => courseMap[code]),
      credits,
    });
  }

  return semesters;
}

// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS = {
  passed:    { label: "Судалсан",    bg: "#EAF3DE", border: "#97C459", text: "#27500A", badge: "#C0DD97", badgeText: "#27500A" },
  failed:    { label: "Амжилтгүй",    bg: "#FCEBEB", border: "#F09595", text: "#791F1F", badge: "#F7C1C1", badgeText: "#791F1F" },
  locked:    { label: "Холбоос үзээгүй",    bg: "#F1EFE8", border: "#D3D1C7", text: "#5F5E5A", badge: "#D3D1C7", badgeText: "#444441" },
  available: { label: "Сонгох боломжтой", bg: "#EEEDFE", border: "#AFA9EC", text: "#3C3489", badge: "#CECBF6", badgeText: "#3C3489" },
  planned:   { label: "Сонгогдсон",   bg: "#FAEEDA", border: "#EF9F27", text: "#633806", badge: "#FAC775", badgeText: "#633806" },
};

function getCourseStatus(course, courseMap) {
  if (course.status === "G") return "passed";
  if (course.status === "NA") return "failed";
  if (!course.prereqs.every((p) => !courseMap[p] || courseMap[p].status === "G")) return "locked";
  return "available";
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "12px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function CourseCard({ course, courseMap, onClick, selected, dimmed }) {
  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
  return (
    <button
      onClick={() => onClick(course.code)}
      style={{
        width: "100%",
        textAlign: "left",
        background: selected ? s.bg : "var(--color-background-primary)",
        border: `${selected ? "1.5px" : "0.5px"} solid ${selected ? s.border : "var(--color-border-tertiary)"}`,
        borderRadius: "var(--border-radius-md)",
        padding: "8px 10px",
        cursor: "pointer",
        opacity: dimmed ? 0.25 : 1,
        pointerEvents: dimmed ? "none" : "auto",
        transition: "background 0.1s, border 0.1s",
        marginBottom: 6,
        display: "block",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: selected ? s.text : "var(--color-text-primary)" }}>
          {course.code}
        </span>
        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: s.badge, color: s.badgeText, fontWeight: 500, whiteSpace: "nowrap" }}>
          {course.credits}cr
        </span>
      </div>
      <div style={{ fontSize: 11, color: selected ? s.text : "var(--color-text-secondary)", marginTop: 3, lineHeight: 1.35 }}>
        {course.name}
      </div>
      {course.grade != null && (
        <div style={{ fontSize: 10, color: "var(--color-text-tertiary)", marginTop: 2 }}>{course.grade}</div>
      )}
    </button>
  );
}

const SEM_COLORS = [
  { head: "#EEEDFE", htext: "#3C3489", badge: "#CECBF6", btext: "#3C3489" },
  { head: "#E1F5EE", htext: "#085041", badge: "#9FE1CB", btext: "#085041" },
  { head: "#FAECE7", htext: "#712B13", badge: "#F5C4B3", btext: "#712B13" },
  { head: "#E6F1FB", htext: "#0C447C", badge: "#B5D4F4", btext: "#0C447C" },
  { head: "#FAEEDA", htext: "#633806", badge: "#FAC775", btext: "#633806" },
  { head: "#FBEAF0", htext: "#72243E", badge: "#F4C0D1", btext: "#72243E" },
  { head: "#EAF3DE", htext: "#27500A", badge: "#C0DD97", btext: "#27500A" },
  { head: "#FCEBEB", htext: "#791F1F", badge: "#F7C1C1", btext: "#791F1F" },
];

function SemesterCard({ semester, courseMap, onCourseClick, selected, dimmedSet }) {
  const col = SEM_COLORS[(semester.number - 1) % SEM_COLORS.length];
  return (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
      <div style={{ background: col.head, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: col.htext }}>Semester {semester.number}</div>
          <div style={{ fontSize: 11, color: col.htext, opacity: 0.65, marginTop: 1 }}>{semester.courses.length} courses</div>
        </div>
        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: col.badge, color: col.btext, fontWeight: 500 }}>
          {semester.credits} cr
        </span>
      </div>
      <div style={{ padding: 8 }}>
        {semester.courses.map((c) => (
          <CourseCard
            key={c.code}
            course={c}
            courseMap={courseMap}
            onClick={onCourseClick}
            selected={selected === c.code}
            dimmed={selected && dimmedSet && !dimmedSet.has(c.code) && selected !== c.code}
          />
        ))}
      </div>
    </div>
  );
}

function CourseDetailPanel({ course, courseMap, onClose, onNavigate }) {
  if (!course) {
    return (
      <div style={{ border: "0.5px dashed var(--color-border-secondary)", borderRadius: "var(--border-radius-lg)", padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
          Click any course to inspect prerequisites and what it unlocks
        </div>
      </div>
    );
  }

  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
  const unlocks = Object.values(courseMap).filter((c) => c.prereqs.includes(course.code));

  return (
    <div style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: "var(--border-radius-lg)", padding: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, color: s.text }}>{course.code}</div>
          <div style={{ fontSize: 12, color: s.text, opacity: 0.75, marginTop: 2, lineHeight: 1.35 }}>{course.name}</div>
        </div>
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18, color: s.text, opacity: 0.6, padding: "0 4px", lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, fontSize: 12, color: s.text, opacity: 0.7 }}>
        <span>{course.credits} credits</span>
        {course.grade != null && <span>· {course.grade}</span>}
        <span>· {s.label}</span>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: s.text, opacity: 0.55, marginBottom: 6 }}>Requires</div>
        {course.prereqs.length === 0 ? (
          <span style={{ fontSize: 12, color: s.text, opacity: 0.5 }}>None</span>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {course.prereqs.map((p) => {
              const pc = courseMap[p];
              const met = pc?.status === "G";
              return (
                <button
                  key={p}
                  onClick={() => onNavigate(p)}
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    padding: "3px 9px",
                    borderRadius: 20,
                    cursor: "pointer",
                    border: `0.5px solid ${met ? "#97C459" : "#F09595"}`,
                    background: met ? "#EAF3DE" : "#FCEBEB",
                    color: met ? "#27500A" : "#791F1F",
                    fontWeight: 500,
                  }}
                >
                  {p} {met ? "✓" : "✗"}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: s.text, opacity: 0.55, marginBottom: 6 }}>Unlocks</div>
        {unlocks.length === 0 ? (
          <span style={{ fontSize: 12, color: s.text, opacity: 0.5 }}>None</span>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {unlocks.map((u) => (
              <button
                key={u.code}
                onClick={() => onNavigate(u.code)}
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  padding: "3px 9px",
                  borderRadius: 20,
                  cursor: "pointer",
                  border: "0.5px solid #AFA9EC",
                  background: "#EEEDFE",
                  color: "#3C3489",
                  fontWeight: 500,
                }}
              >
                {u.code}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionList({ sections, courseMap, selected, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {sections.map((sec) => {
        const { required_cr, done_cr } = sec;
        const isMandatory = required_cr === null;
        const isBadge = required_cr === 0;
        const passedCr = sec.courses.filter((c) => c.status === "G").reduce((s, c) => s + c.credits, 0);
        const satisfied = !isMandatory && !isBadge && passedCr >= required_cr;

        return (
          <div key={sec.id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, padding: "0 2px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", flex: 1, marginRight: 8, lineHeight: 1.3 }}>
                {sec.label}
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 500,
                whiteSpace: "nowrap",
                color: isMandatory ? "var(--color-text-tertiary)" : isBadge ? "#633806" : satisfied ? "#27500A" : "#633806",
              }}>
                {isMandatory ? "All required" : isBadge ? "Badge" : `${passedCr}/${required_cr} cr`}
              </span>
            </div>
            {!isMandatory && !isBadge && required_cr > 0 && (
              <div style={{ height: 3, background: "var(--color-background-secondary)", borderRadius: 2, overflow: "hidden", marginBottom: 8, marginLeft: 2, marginRight: 2 }}>
                <div style={{
                  height: "100%",
                  borderRadius: 2,
                  background: satisfied ? "#639922" : "#7F77DD",
                  width: `${Math.min(100, (passedCr / required_cr) * 100)}%`,
                  transition: "width 0.3s",
                }} />
              </div>
            )}
            {sec.courses.map((c) => (
              <CourseCard
                key={c.code}
                course={c}
                courseMap={courseMap}
                onClick={onSelect}
                selected={selected === c.code}
                dimmed={false}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Upload Screen ────────────────────────────────────────────────────────────
function UploadScreen({ onData }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handle = async (file) => {
    if (!file || !file.name.match(/\.xlsx?$/i)) {
      setError("Please upload an .xlsx file.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const ab = await file.arrayBuffer();
      const sections = await parseExcel(ab);
      if (sections.length === 0) throw new Error("No sections found. Check the file format.");
      onData(sections, file.name);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e10", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#EEEDFE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#534AB7" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.02em" }}>Сургалт төлөвлөгч</h1>
          <p style={{ color: "#888", marginTop: 8, fontSize: 14 }}>Excel файлыг оруулж, семестер бүрийн судалтын төлөвлөгөөг авна уу</p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `1.5px dashed ${dragging ? "#7F77DD" : "#333"}`,
            borderRadius: 16,
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#EEEDFE11" : "transparent",
            transition: "border-color 0.15s, background 0.15s",
          }}
        >
          <input ref={inputRef} type="file" accept=".xlsx,.xls" style={{ display: "none" }} onChange={(e) => handle(e.target.files[0])} />
          <div style={{ fontSize: 36, marginBottom: 12 }}>{loading ? "⏳" : "📂"}</div>
          <div style={{ color: "#ccc", fontWeight: 500, fontSize: 14 }}>{loading ? "Parsing Excel…" : "Drop your .xlsx file here"}</div>
          <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>{loading ? "Please wait…" : "or click to browse"}</div>
        </div>

        {error && (
          <div style={{ marginTop: 16, background: "#FCEBEB", border: "0.5px solid #F09595", borderRadius: 12, padding: "12px 16px", color: "#791F1F", fontSize: 13, textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 24, background: "#18181b", borderRadius: 12, padding: 16, border: "0.5px solid #2a2a2e" }}>
          <div style={{ color: "#666", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Expected Excel columns</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              ["Col A", "Row index / Section label"],
              ["Col B", "Course code / Quota (16/11)"],
              ["Col C", "Course name"],
              ["Col D", "Credits"],
              ["Col E", "Grade"],
              ["Col F", "Status (G / NA)"],
              ["Col G", "Prerequisites (comma-sep)"],
            ].map(([col, desc]) => (
              <div key={col} style={{ display: "flex", gap: 8, fontSize: 12 }}>
                <span style={{ color: "#7F77DD", fontFamily: "monospace" }}>{col}</span>
                <span style={{ color: "#555" }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sample Data ──────────────────────────────────────────────────────────────
const BUNDLED_SECTIONS = [
  { id: "1.А", label: "1.А. Заавал суралцах хичээл", done_cr: null, required_cr: null, courses: [
    { code: "ECN116", name: "Экономиксийн үндэс", credits: 3, grade: 86, status: "G", prereqs: [] },
    { code: "EMR111", name: "Иргэний хамгаалалт", credits: 0, grade: 95, status: "G", prereqs: [] },
    { code: "MLS111", name: "Монгол хэл бичиг, найруулгазүй", credits: 3, grade: 95, status: "G", prereqs: [] },
    { code: "MAT115", name: "Хэрэглээний математик", credits: 3, grade: 90, status: "G", prereqs: [] },
    { code: "HSS241", name: "Философи", credits: 3, grade: 90, status: "G", prereqs: [] },
  ]},
  { id: "1.Б", label: "1.Б. Биеийн тамир (сонголтот)", done_cr: 2, required_cr: 2, courses: [
    { code: "PHE143", name: "ИОГ", credits: 1, grade: null, status: null, prereqs: [] },
    { code: "PHE141", name: "Гар бөмбөг", credits: 1, grade: 100, status: "G", prereqs: [] },
    { code: "PHE142", name: "Сагсан бөмбөг", credits: 1, grade: 99, status: "G", prereqs: [] },
    { code: "PHE145", name: "Байт харваа", credits: 1, grade: null, status: null, prereqs: [] },
    { code: "PHE149", name: "Ширээний теннис", credits: 1, grade: null, status: null, prereqs: [] },
  ]},
  { id: "1.В", label: "1.В. Гадаад хэл (сонголтот)", done_cr: 16, required_cr: 11, courses: [
    { code: "AEN111A", name: "Академик англи хэл B1A", credits: 4, grade: null, status: null, prereqs: [] },
    { code: "AEN111B", name: "Академик англи хэл B1B", credits: 4, grade: null, status: null, prereqs: ["AEN111A"] },
    { code: "AEN112A", name: "Академик англи хэл B2A", credits: 4, grade: 94, status: "G", prereqs: ["AEN111B"] },
    { code: "AEN112B", name: "Академик англи хэл B2B", credits: 4, grade: 90, status: "G", prereqs: ["AEN112A"] },
    { code: "AEN113A", name: "Академик англи хэл C1A", credits: 4, grade: 81, status: "G", prereqs: ["AEN112B"] },
    { code: "AEN113B", name: "Академик англи хэл C1B", credits: 4, grade: 98, status: "G", prereqs: ["AEN113A"] },
    { code: "ENG321", name: "Менежментийн англи хэл", credits: 3, grade: null, status: null, prereqs: ["BCE221"] },
    { code: "CHS112B", name: "Хятад хэл 2В", credits: 6, grade: null, status: null, prereqs: ["AEN113B"] },
    { code: "CHS111A", name: "Хятад хэл 1A", credits: 6, grade: null, status: null, prereqs: [] },
  ]},
  { id: "1.Г", label: "1.Г. Түүхийн багц (сонголтот)", done_cr: 3, required_cr: 3, courses: [
    { code: "HSS111", name: "Нийгэм соёлын хүн судлал", credits: 3, grade: 95, status: "G", prereqs: ["MLS111"] },
    { code: "HSS114", name: "Монголын түүх", credits: 3, grade: null, status: null, prereqs: ["MLS111"] },
    { code: "HSS115", name: "Дэлхийн эдийн засгийн түүх", credits: 3, grade: null, status: null, prereqs: ["MLS111"] },
  ]},
  { id: "1.Д", label: "1.Д. Badge хөтөлбөр", done_cr: 0, required_cr: 0, courses: [
    { code: "BDG102", name: "Art Badge", credits: 0, grade: 100, status: "G", prereqs: [] },
    { code: "BDG101", name: "CE Badge", credits: 0, grade: 86, status: "G", prereqs: [] },
  ]},
  { id: "2.А", label: "2.А. Мэргэжлийн суурь (заавал)", done_cr: 31, required_cr: 31, courses: [
    { code: "ACC121", name: "НБ бүртгэлийн үндэс", credits: 3, grade: 90, status: "G", prereqs: [] },
    { code: "ISM221", name: "Мэдээллийн системийн үндэс", credits: 3, grade: 88, status: "G", prereqs: ["BUS126"] },
    { code: "ENT221", name: "Энтрепренершип ба инноваци", credits: 1, grade: 92, status: "G", prereqs: ["BUS126"] },
    { code: "ECN221", name: "Бизнесийн статистик", credits: 3, grade: 90, status: "G", prereqs: ["MAT115"] },
    { code: "SWE222", name: "Объект хандалтат програмчлал", credits: 3, grade: 90, status: "G", prereqs: ["APL121"] },
    { code: "ECN222", name: "Эконометрикийн үндэс", credits: 3, grade: 87, status: "G", prereqs: ["ECN221"] },
    { code: "APL121", name: "Алгоритм, програмчлалын хэл", credits: 3, grade: 99, status: "G", prereqs: [] },
    { code: "DBM121", name: "Өгөгдлийн сангийн үндэс", credits: 3, grade: 91, status: "G", prereqs: [] },
    { code: "BUS126", name: "Бизнесийн үндэс", credits: 3, grade: 92, status: "G", prereqs: [] },
    { code: "DSA221", name: "Өгөгдлийн бүтэц", credits: 3, grade: 76, status: "G", prereqs: ["APL121"] },
    { code: "FIN122", name: "Санхүүгийн системийн үндэс", credits: 3, grade: 89, status: "G", prereqs: [] },
  ]},
  { id: "2.Б", label: "2.Б. Заавал суралцах олон сонголтот", done_cr: 0, required_cr: 3, courses: [
    { code: "EIT441", name: "Шинэ технологи (блокчэйн)", credits: 3, grade: null, status: null, prereqs: ["SWE222"] },
    { code: "DBM222", name: "Бүтэцлэгдээгүй өгөгдөл", credits: 3, grade: null, status: null, prereqs: ["DBM221"] },
    { code: "CGR220", name: "UX дизайны үндэс", credits: 3, grade: null, status: null, prereqs: ["CGR321"] },
    { code: "CGR221", name: "График дизайн", credits: 3, grade: null, status: null, prereqs: ["CGR321"] },
    { code: "DBM432", name: "Өгөгдөл дүрслэл", credits: 3, grade: null, status: "NA", prereqs: ["DBM221"] },
  ]},
  { id: "3.А", label: "3.А. Мэргэжлийн хичээл (заавал)", done_cr: 45, required_cr: 60, courses: [
    { code: "WEB231", name: "Веб дизайн", credits: 3, grade: 98, status: "G", prereqs: ["APL121"] },
    { code: "SWE331", name: "Визуаль програмчлал", credits: 3, grade: null, status: "G", prereqs: ["DBM121"] },
    { code: "MGM332", name: "Үйл ажиллагааны менежмент", credits: 3, grade: 91, status: "G", prereqs: ["BUS126"] },
    { code: "DWM431", name: "Бизнес интелиженс", credits: 3, grade: 90, status: "G", prereqs: ["DBM221"] },
    { code: "DBM221", name: "Өгөгдлийн сангийн удирдлага", credits: 3, grade: 93, status: "G", prereqs: ["DBM121"] },
    { code: "ISA333", name: "Системийн объект хандалтат зохиомж", credits: 3, grade: null, status: "G", prereqs: ["ISA331"] },
    { code: "ISA334", name: "МС төслийн менежмент", credits: 3, grade: 82, status: "G", prereqs: ["ISA332"] },
    { code: "MGM331", name: "Хүний нөөцийн менежмент", credits: 3, grade: 96, status: "G", prereqs: ["BUS126"] },
    { code: "FIN226", name: "Санхүүгийн менежмент", credits: 3, grade: 97, status: "G", prereqs: ["FIN122"] },
    { code: "SWE334", name: "Интернэт програмчлал", credits: 3, grade: 33, status: "G", prereqs: ["DBM121"] },
    { code: "AIF321", name: "Хиймэл оюун ухааны үндэс", credits: 3, grade: 96, status: "G", prereqs: ["ECN221"] },
    { code: "ISA331", name: "Системийн шинжилгээ ба зохиомж", credits: 3, grade: 88, status: "G", prereqs: ["ISM221"] },
    { code: "ACC226", name: "Санхүүгийн бүртгэл", credits: 3, grade: 77, status: "G", prereqs: ["ACC121"] },
    { code: "ISP324", name: "Мэдээллийн системийн төсөл", credits: 3, grade: null, status: "NA", prereqs: ["ISA331"] },
    { code: "CGR321", name: "Хүн ба компьютерын харилцаа", credits: 3, grade: 97, status: "G", prereqs: ["APL121"] },
    { code: "BET322", name: "Бизнесийн ёс зүй", credits: 3, grade: 96, status: "G", prereqs: ["BUS126"] },
    { code: "LAW321", name: "Бизнесийн эрх зүй", credits: 3, grade: 94, status: "G", prereqs: ["ECN116"] },
    { code: "ISA332", name: "Бизнесийн шинжилгээ", credits: 3, grade: 96, status: "G", prereqs: ["ISM221"] },
    { code: "ISA231", name: "МТ дэд бүтэц", credits: 3, grade: null, status: "G", prereqs: ["ISA331"] },
    { code: "SWM231", name: "Мобайл програмчлал", credits: 3, grade: 99, status: "G", prereqs: ["SWE222"] },
    { code: "PDS431", name: "Хөгжлийн семинар", credits: 0, grade: 100, status: "G", prereqs: ["ISII221"] },
  ]},
  { id: "3.Б", label: "3.Б. Мэргэшүүлэх багц (сонголтот)", done_cr: 0, required_cr: 6, courses: [
    { code: "DBM222_b", name: "Бүтэцлэгдээгүй өгөгдөл", credits: 3, grade: null, status: null, prereqs: ["DBM221"] },
    { code: "CGR431", name: "UX ба UI загварчлал", credits: 3, grade: null, status: null, prereqs: ["CGR321"] },
    { code: "SWE431", name: "Фронт-энд програмчлал", credits: 3, grade: null, status: "NA", prereqs: ["SWE334"] },
    { code: "ISM431", name: "МС стратеги", credits: 3, grade: null, status: null, prereqs: ["ISA331"] },
    { code: "ISM435", name: "МС аудит", credits: 3, grade: null, status: null, prereqs: ["ISA331"] },
    { code: "SWE433", name: "Програм хангамжийн чанар", credits: 3, grade: null, status: null, prereqs: ["SWE334"] },
    { code: "CGR433", name: "UX/UI загварын хөгжүүлэлт", credits: 3, grade: null, status: null, prereqs: ["CGR321"] },
    { code: "DBM433", name: "Өгөгдөл олборлолт", credits: 3, grade: null, status: null, prereqs: ["DBM221"] },
    { code: "ISM432", name: "Agile/Scrum хөгжүүлэлт", credits: 3, grade: null, status: "NA", prereqs: ["ISA331"] },
  ]},
  { id: "3.Г", label: "3.Г. Дадлага", done_cr: null, required_cr: null, courses: [
    { code: "ISII221", name: "Танилцах дадлага", credits: 1, grade: 100, status: "G", prereqs: [] },
    { code: "ISPI332", name: "Мэргэжлийн дадлага", credits: 1, grade: null, status: "NA", prereqs: ["ISA331"] },
    { code: "SDI111", name: "Нийгмийн дадлага", credits: 0, grade: 83, status: "G", prereqs: [] },
  ]},
  { id: "3.Д", label: "3.Д. Төгсөлтийн ажил", done_cr: 0, required_cr: 3, courses: [
    { code: "BCE221", name: "Нэгдсэн шалгалт", credits: 0, grade: 83, status: "G", prereqs: ["ECN221","DBM221","SWE222","ISA331","MGM331"] },
    { code: "LCE221", name: "Англи хэлний шалгалт", credits: 0, grade: 100, status: "G", prereqs: ["ENG321"] },
    { code: "ISFP431", name: "Дипломын төсөл", credits: 3, grade: null, status: "NA", prereqs: ["ISP324"] },
    { code: "MAT126", name: "Дискрет математик", credits: 3, grade: 96, status: "G", prereqs: [] },
  ]},
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function CurriculumPlanner() {
  const [sections, setSections] = useState(BUNDLED_SECTIONS);
  const [fileName, setFileName] = useState("Sample Curriculum");
  const [showUpload, setShowUpload] = useState(false);
  const [view, setView] = useState("semesters");
  const [selected, setSelected] = useState(null);

  const courseMap = useMemo(() => buildCourseMap(sections), [sections]);
  const semesters = useMemo(() => generateSemesters(sections), [sections]);
  const selectedCourse = selected ? courseMap[selected] : null;

  const relatedSet = useMemo(() => {
    if (!selected) return null;
    const rel = new Set([selected]);
    (courseMap[selected]?.prereqs || []).forEach((p) => rel.add(p));
    Object.values(courseMap).forEach((c) => { if (c.prereqs.includes(selected)) rel.add(c.code); });
    return rel;
  }, [selected, courseMap]);

  const stats = useMemo(() => {
    const all = Object.values(courseMap);
    const passed = all.filter((c) => c.status === "G");
    const doneSet = new Set(passed.map((c) => c.code));
    const available = all.filter((c) => c.status !== "G" && c.status !== "NA" && prereqsMet(c, doneSet, courseMap)).length;

    // creditsTotal = sum of per-section quotas, not all available course credits.
    // For mandatory sections (required_cr=null): sum all course credits.
    // For badge sections (required_cr=0): contribute 0.
    // For quota sections: total=required_cr, done=min(passed credits, required_cr).
    let creditsTotal = 0;
    let creditsDone = 0;
    sections.forEach((sec) => {
      const eff_req = sec.required_cr !== null ? sec.required_cr
        : (sec.done_cr != null && sec.done_cr > 0) ? sec.done_cr
        : null;
      if (eff_req === null) {
        creditsTotal += sec.courses.reduce((s, c) => s + c.credits, 0);
        creditsDone  += sec.courses.filter((c) => c.status === "G").reduce((s, c) => s + c.credits, 0);
      } else if (eff_req > 0) {
        creditsTotal += eff_req;
        const passedCr = sec.courses.filter((c) => c.status === "G").reduce((s, c) => s + c.credits, 0);
        creditsDone  += Math.min(passedCr, eff_req);
      }
    });

    return { passed: passed.length, total: all.length, creditsDone, creditsTotal, available };
  }, [courseMap, sections]);

  const handleNavigate = (code) => {
    setSelected(code);
  };

  if (showUpload) {
    return (
      <UploadScreen
        onData={(s, name) => {
          setSections(s);
          setFileName(name);
          setShowUpload(false);
          setSelected(null);
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background-tertiary)", color: "var(--color-text-primary)", fontFamily: "var(--font-sans)" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-primary)", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#EEEDFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#534AB7" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Сургалт төлөвлөгч</div>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{fileName}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", background: "var(--color-background-secondary)", borderRadius: 10, padding: 3, gap: 2 }}>
              {[["semesters", "Plan"], ["list", "Sections"]].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    fontSize: 12,
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 500,
                    background: view === v ? "var(--color-background-primary)" : "transparent",
                    color: view === v ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    transition: "background 0.1s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUpload(true)}
              style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer" }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
          <StatCard label="Судалсан хичээлийн тоо" value={`${stats.passed}/${stats.total}`} />
          <StatCard label="Судалсан кредит" value={`${stats.creditsDone}`} sub={`of ${stats.creditsTotal} total`} />
          <StatCard label="Үлдсэн кредит" value={`${stats.creditsTotal - stats.creditsDone}`} />
          <StatCard label="Сонгох боломжтой" value={`${stats.available}`} sub="courses unlocked" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
          {/* Left: Detail panel */}
          <div style={{ position: "sticky", top: 64, alignSelf: "start", display: "flex", flexDirection: "column", gap: 12 }}>
            <CourseDetailPanel
              course={selectedCourse}
              courseMap={courseMap}
              onClose={() => setSelected(null)}
              onNavigate={handleNavigate}
            />

            {/* Legend */}
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 14 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-tertiary)", marginBottom: 10, fontWeight: 500 }}>Тэмдэглэл</div>
              {Object.entries(STATUS).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.badge, border: `0.5px solid ${v.border}` }} />
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{v.label}</span>
                </div>
              ))}
            </div>

            {/* Semester overview */}
            {view === "semesters" && semesters.length > 0 && (
              <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 14 }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-tertiary)", marginBottom: 10, fontWeight: 500 }}>Overview</div>
                {semesters.map((s, i) => {
                  const col = SEM_COLORS[i % SEM_COLORS.length];
                  return (
                    <div key={s.number} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: "var(--color-text-secondary)", width: 72 }}>Semester {s.number}</span>
                      <div style={{ flex: 1, height: 4, background: "var(--color-background-secondary)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 2, background: col.htext, width: `${Math.round((s.credits / MAX_CREDITS) * 100)}%` }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", width: 36, textAlign: "right" }}>{s.credits}cr</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: content */}
          <div>
            {view === "semesters" ? (
              semesters.length === 0 ? (
                <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "48px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>All required courses completed!</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 6 }}>No remaining semesters to plan.</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {semesters.map((sem, i) => (
                    <SemesterCard
                      key={sem.number}
                      semester={sem}
                      courseMap={courseMap}
                      onCourseClick={(code) => setSelected((prev) => prev === code ? null : code)}
                      selected={selected}
                      dimmedSet={relatedSet}
                    />
                  ))}
                </div>
              )
            ) : (
              <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 16 }}>
                <SectionList
                  sections={sections}
                  courseMap={courseMap}
                  selected={selected}
                  onSelect={(code) => setSelected((prev) => prev === code ? null : code)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}