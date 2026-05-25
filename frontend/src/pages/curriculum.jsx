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
//
// Section header rows appear twice: first row = label only, second row = label + quota.
// Course rows have a numeric index in col A.
 
import { useState, useMemo, useRef } from "react";
// npm install exceljs
import ExcelJS from "exceljs";
 
// ─── Excel Parser (ExcelJS) ───────────────────────────────────────────────────
// Confirmed cell types from the actual file:
//   type 0 = null/empty
//   type 2 = number  (course row indices come as plain JS numbers: 1, 2, 3…)
//   type 3 = string  (labels, course codes, quota strings like "16/11")
//   type 4 = date    (mandatory sections store a date in col B, not a quota)
 
function cellStr(cell) {
  // Returns trimmed string only for type-3 string cells, null otherwise
  if (!cell || cell.type !== 3) return null;
  const v = cell.value;
  if (typeof v === "string") return v.trim() || null;
  return null;
}
 
function cellNum(cell) {
  if (!cell) return null;
  if (cell.type === 2 && typeof cell.value === "number") return cell.value;
  // formula with numeric result
  if (cell.type === 6 && cell.value && typeof cell.value.result === "number") return cell.value.result;
  return null;
}
 
function parseQuota(cell) {
  // Quota is only ever a string like "16/11" or "0/3" — type 3
  const s = cellStr(cell);
  if (!s) return null;
  const m = s.match(/^(\d+)\/(\d+)$/);
  return m ? { done: parseInt(m[1]), required: parseInt(m[2]) } : null;
}
 
export async function parseExcel(arrayBuffer) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(arrayBuffer);
 
  const ws = wb.worksheets[0];
  const sections = [];
  let currentSection = null;
 
  ws.eachRow((row) => {
    const c1 = row.getCell(1); // col A: number index OR text label
    const c2 = row.getCell(2); // col B: course code OR quota "X/Y" OR date OR null
    const c3 = row.getCell(3); // col C: course name
    const c4 = row.getCell(4); // col D: credits
    const c5 = row.getCell(5); // col E: grade
    const c6 = row.getCell(6); // col F: status ("G" / "NA")
    const c7 = row.getCell(7); // col G: prerequisites (comma-separated)
 
    // ── Course row: col A is type 2 (number) ──────────────────────────────
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
 
    // ── Section trigger row: col A is text, col B is non-empty ────────────
    // Col B empty (type 0) → title/label-only row (e.g. "Ерөнхий суурь",
    //   or the first of the two repeated label rows) → skip entirely.
    // Col B type 3 string matching "X/Y" → optional section with credit quota.
    // Col B type 4 date → mandatory section (all courses required).
    if (c1.type !== 3) return;       // not a text label row
    if (c2.type === 0) return;        // col B empty → skip title-only row
 
    const label = cellStr(c1);
    if (!label) return;
 
    const sectionId = label.match(/^(\d+\.[А-ЯA-Za-z]+)/)?.[1] || label.substring(0, 14);
    const quota = parseQuota(c2);    // non-null only for "X/Y" strings
 
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
 
// ─── Semester Scheduler ───────────────────────────────────────────────────────
const MAX_CREDITS = 24;
 
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
 
// Determine which courses are "required" to graduate based on section quotas
function getRequiredCourses(sections, courseMap) {
  const required = new Set();
 
  sections.forEach((sec) => {
    const { required_cr, courses } = sec;
 
    // 0-credit courses are always mandatory
    courses.forEach((c) => {
      if (c.credits === 0) required.add(c.code);
    });
 
    if (required_cr === null) {
      // Fully mandatory section — all courses required
      courses.forEach((c) => required.add(c.code));
    } else if (required_cr === 0) {
      // Badge section — only 0-credit courses (already added above)
    } else {
      // Need exactly required_cr credits from this section.
      // Count passed credits, but only up to the quota.
      const passed = courses.filter((c) => c.status === "G" && c.credits > 0);
      let passedBudget = required_cr;
 
      for (const c of passed) {
        if (passedBudget <= 0) break; // quota already satisfied by prior passed courses
        required.add(c.code);
        passedBudget -= c.credits;
      }
 
      // If quota still not met, pick pending courses to fill the gap
      if (passedBudget > 0) {
        const candidates = courses.filter(
          (c) => c.status !== "G" && c.status !== "NA" && c.credits > 0
        );
        for (const c of candidates) {
          if (passedBudget <= 0) break;
          required.add(c.code);
          passedBudget -= c.credits;
        }
      }
    }
  });
 
  return required;
}
 
export function generateSemesters(sections) {
  const courseMap = buildCourseMap(sections);
  const required = getRequiredCourses(sections, courseMap);
 
  // Separate already-passed
  const done = new Set(
    Object.values(courseMap)
      .filter((c) => c.status === "G")
      .map((c) => c.code)
  );
 
  // Courses still needed
  const todo = [...required].filter((code) => !done.has(code) && courseMap[code]);
 
  const semesters = [];
  const scheduled = new Set([...done]);
  let remaining = [...todo];
 
  const MAX_SEMS = 12;
  let iter = 0;
 
  while (remaining.length > 0 && iter < MAX_SEMS) {
    iter++;
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
 
    if (semCourses.length === 0) break; // deadlock — unresolvable prereqs
 
    semCourses.forEach((code) => scheduled.add(code));
    remaining = stillRemaining;
 
    semesters.push({
      number: iter,
      courses: semCourses.map((code) => courseMap[code]),
      credits,
    });
  }
 
  return semesters;
}
 
// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS = {
  passed:    { label: "Passed",    bg: "bg-emerald-50",  border: "border-emerald-300", text: "text-emerald-700",  dot: "bg-emerald-400",  badge: "bg-emerald-100 text-emerald-700" },
  failed:    { label: "Failed",    bg: "bg-rose-50",     border: "border-rose-300",    text: "text-rose-700",     dot: "bg-rose-400",     badge: "bg-rose-100 text-rose-700" },
  locked:    { label: "Locked",    bg: "bg-zinc-50",     border: "border-zinc-200",    text: "text-zinc-400",     dot: "bg-zinc-300",     badge: "bg-zinc-100 text-zinc-500" },
  available: { label: "Available", bg: "bg-violet-50",   border: "border-violet-200",  text: "text-violet-800",   dot: "bg-violet-400",   badge: "bg-violet-100 text-violet-700" },
  planned:   { label: "Planned",   bg: "bg-amber-50",    border: "border-amber-200",   text: "text-amber-800",    dot: "bg-amber-400",    badge: "bg-amber-100 text-amber-700" },
};
 
function getCourseStatus(course, courseMap) {
  if (course.status === "G") return "passed";
  if (course.status === "NA") return "failed";
  if (!course.prereqs.every((p) => !courseMap[p] || courseMap[p].status === "G")) return "locked";
  return "available";
}
 
// ─── Components ───────────────────────────────────────────────────────────────
 
function StatCard({ label, value, color, sub }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 bg-white border shadow-sm rounded-2xl border-zinc-100">
      <span className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">{label}</span>
      <span className={`text-2xl font-black ${color}`}>{value}</span>
      {sub && <span className="text-xs text-zinc-400">{sub}</span>}
    </div>
  );
}
 
function CourseChip({ course, courseMap, semesterNum, onClick, selected, dimmed }) {
  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
  return (
    <button
      onClick={() => onClick(course.code)}
      className={[
        "group relative text-left rounded-xl border-2 px-3 py-2 transition-all duration-150 select-none w-full",
        s.bg, s.border,
        selected ? "ring-2 ring-offset-1 ring-violet-400 shadow-lg" : "hover:shadow-md hover:-translate-y-0.5",
        dimmed ? "opacity-25 pointer-events-none" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`font-mono text-[11px] font-bold tracking-wide ${s.text}`}>{course.code}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${s.badge}`}>
          {course.credits}cr
        </span>
      </div>
      <p className={`text-[11px] leading-snug mt-0.5 ${s.text} opacity-75 line-clamp-2`}>{course.name}</p>
      {course.grade != null && (
        <span className="text-[10px] text-zinc-400 mt-1 block">{course.grade}</span>
      )}
    </button>
  );
}
 
function SemesterCard({ semester, courseMap, onCourseClick, selected, dimmedSet }) {
  const semColors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-rose-500 to-pink-600",
    "from-indigo-500 to-blue-600",
    "from-teal-500 to-emerald-600",
    "from-fuchsia-500 to-violet-600",
  ];
  const grad = semColors[(semester.number - 1) % semColors.length];
 
  return (
    <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-zinc-100">
      <div className={`bg-gradient-to-r ${grad} px-4 py-3 flex items-center justify-between`}>
        <div>
          <span className="text-sm font-black tracking-tight text-white">Semester {semester.number}</span>
          <p className="text-white/70 text-[11px] mt-0.5">{semester.courses.length} courses</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-white">{semester.credits}</span>
          <span className="ml-1 text-xs text-white/70">cr</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {semester.courses.map((c) => (
          <CourseChip
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
 
function CourseDetailPanel({ course, courseMap, onClose }) {
  if (!course) {
    return (
      <div className="p-6 text-center border-2 border-dashed rounded-2xl border-zinc-200 bg-zinc-50">
        <div className="mb-2 text-3xl">🎯</div>
        <p className="text-sm text-zinc-400">Click any course to inspect prerequisites and what it unlocks.</p>
      </div>
    );
  }
 
  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
 
  const allSuccessors = Object.values(courseMap).filter((c) =>
    c.prereqs.includes(course.code)
  );
 
  return (
    <div className={`rounded-2xl border-2 ${s.border} ${s.bg} p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <span className={`font-mono font-black text-sm ${s.text}`}>{course.code}</span>
          <p className={`text-sm mt-0.5 ${s.text} opacity-80 leading-snug`}>{course.name}</p>
        </div>
        <div className="flex items-center gap-2 ml-2 shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${s.badge}`}>{s.label}</span>
          <button onClick={onClose} className="flex items-center justify-center w-6 h-6 text-xl leading-none text-zinc-400 hover:text-zinc-600">×</button>
        </div>
      </div>
 
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          ["Credits", course.credits],
          ["Grade", course.grade ?? "—"],
          ["Status", course.status ?? "Pending"],
        ].map(([l, v]) => (
          <div key={l} className="py-2 text-center bg-white/60 rounded-xl">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wide">{l}</div>
            <div className={`text-sm font-bold ${s.text}`}>{v}</div>
          </div>
        ))}
      </div>
 
      {course.prereqs.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">Requires</p>
          <div className="flex flex-wrap gap-1">
            {course.prereqs.map((p) => {
              const pc = courseMap[p];
              const met = pc?.status === "G";
              return (
                <span key={p} className={`text-xs font-mono px-2 py-0.5 rounded-full border ${met ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                  {p} {met ? "✓" : "✗"}
                </span>
              );
            })}
          </div>
        </div>
      )}
 
      {allSuccessors.length > 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5">Unlocks</p>
          <div className="flex flex-wrap gap-1">
            {allSuccessors.map((c) => (
              <span key={c.code} className="text-xs font-mono px-2 py-0.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700">
                {c.code}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 
function SectionList({ sections, courseMap, selected, onSelect }) {
  return (
    <div className="space-y-6">
      {sections.map((sec) => {
        const { required_cr, done_cr } = sec;
        const isMandatory = required_cr === null;
        const isBadge = required_cr === 0;
        const passedCr = sec.courses.filter((c) => c.status === "G").reduce((s, c) => s + c.credits, 0);
 
        return (
          <div key={sec.id}>
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="flex-1 mr-2 text-xs font-bold leading-tight tracking-wider uppercase text-zinc-600">{sec.label}</h3>
              <span className={`text-xs shrink-0 font-semibold ${isMandatory ? "text-zinc-400" : isBadge ? "text-amber-600" : passedCr >= required_cr ? "text-emerald-600" : "text-amber-600"}`}>
                {isMandatory ? "All required" : isBadge ? "Badge" : `${passedCr}/${required_cr} cr`}
              </span>
            </div>
            {!isMandatory && !isBadge && required_cr > 0 && (
              <div className="h-1 mx-1 mb-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className={`h-full rounded-full transition-all ${passedCr >= required_cr ? "bg-emerald-400" : "bg-violet-400"}`}
                  style={{ width: `${Math.min(100, (passedCr / required_cr) * 100)}%` }}
                />
              </div>
            )}
            <div className="space-y-1.5">
              {sec.courses.map((c) => (
                <CourseChip
                  key={c.code}
                  course={c}
                  courseMap={courseMap}
                  onClick={onSelect}
                  selected={selected === c.code}
                  dimmed={false}
                />
              ))}
            </div>
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
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950">
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border rounded-2xl bg-violet-500/20 border-violet-500/30">
            <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Curriculum Planner</h1>
          <p className="mt-2 text-sm text-zinc-400">Upload your curriculum Excel → get a semester-by-semester study plan</p>
        </div>
 
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          className={[
            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200",
            dragging ? "border-violet-400 bg-violet-500/10" : "border-zinc-700 hover:border-violet-500 hover:bg-violet-500/5",
          ].join(" ")}
        >
          <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => handle(e.target.files[0])} />
          <div className="mb-3 text-4xl">{loading ? "⏳" : "📂"}</div>
          <p className="font-semibold text-zinc-300">{loading ? "Parsing Excel…" : "Drop your .xlsx file here"}</p>
          <p className="mt-1 text-sm text-zinc-500">{loading ? "Please wait…" : "or click to browse"}</p>
        </div>
 
        {error && (
          <div className="p-3 mt-4 text-sm text-center border bg-rose-500/10 border-rose-500/30 rounded-xl text-rose-400">
            {error}
          </div>
        )}
 
        <div className="p-4 mt-6 border bg-zinc-800/50 rounded-xl border-zinc-700">
          <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-zinc-400">Expected Excel columns</p>
          <div className="grid grid-cols-2 gap-1 text-xs text-zinc-500">
            {[["Col A", "Row number / Section label"], ["Col B", "Course code / Quota (e.g. 16/11)"], ["Col C", "Course name"], ["Col D", "Credits"], ["Col E", "Grade"], ["Col F", "Status (G / NA)"], ["Col G", "Prerequisites (comma-separated codes)"]].map(([col, desc]) => (
              <div key={col} className="flex gap-2">
                <span className="font-mono text-violet-400">{col}</span>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ─── Main App ─────────────────────────────────────────────────────────────────
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
 
export default function CurriculumPlanner() {
  const [sections, setSections] = useState(BUNDLED_SECTIONS);
  const [fileName, setFileName] = useState("Sample Curriculum");
  const [showUpload, setShowUpload] = useState(false);
  const [view, setView] = useState("semesters"); // "semesters" | "list"
  const [selected, setSelected] = useState(null);
 
  const courseMap = useMemo(() => buildCourseMap(sections), [sections]);
  const semesters = useMemo(() => generateSemesters(sections), [sections]);
 
  const selectedCourse = selected ? courseMap[selected] : null;
 
  // Related codes for dimming
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
    const creditsDone = passed.reduce((s, c) => s + c.credits, 0);
    const creditsTotal = all.reduce((s, c) => s + c.credits, 0);
    const available = all.filter((c) => c.status !== "G" && c.status !== "NA" && c.prereqs.every((p) => !courseMap[p] || courseMap[p].status === "G")).length;
    return { passed: passed.length, total: all.length, creditsDone, creditsTotal, available };
  }, [courseMap]);
 
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
    <div className="min-h-screen font-sans bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-3 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white">Curriculum Planner</h1>
              <p className="text-[10px] text-zinc-500">{fileName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 p-1 bg-zinc-800 rounded-xl">
              {[["semesters", "📅 Plan"], ["list", "📋 Sections"]].map(([v, l]) => (
                <button key={v} onClick={() => setView(v)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${view === v ? "bg-violet-600 text-white shadow" : "text-zinc-400 hover:text-zinc-200"}`}>
                  {l}
                </button>
              ))}
            </div>
            <button onClick={() => setShowUpload(true)}
              className="px-3 py-2 text-xs font-medium transition-all border rounded-xl bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-violet-500 hover:text-violet-300">
              ↑ Upload
            </button>
          </div>
        </div>
      </div>
 
      <div className="px-4 py-6 mx-auto max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-4">
          <StatCard label="Courses passed" value={`${stats.passed}/${stats.total}`} color="text-emerald-400" />
          <StatCard label="Credits earned" value={`${stats.creditsDone}`} color="text-emerald-400" sub={`of ~${stats.creditsTotal} total`} />
          <StatCard label="Credits remaining" value={`${stats.creditsTotal - stats.creditsDone}`} color="text-amber-400" />
          <StatCard label="Now available" value={`${stats.available}`} color="text-violet-400" sub="courses unlocked" />
        </div>
 
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left: Detail */}
          <div className="order-2 lg:col-span-1 lg:order-1">
            <div className="sticky space-y-4 top-20">
              <CourseDetailPanel
                course={selectedCourse}
                courseMap={courseMap}
                onClose={() => setSelected(null)}
              />
 
              {/* Legend */}
              <div className="p-4 border bg-zinc-900 rounded-2xl border-zinc-800">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 font-semibold">Legend</p>
                <div className="space-y-2">
                  {Object.entries(STATUS).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${v.dot}`} />
                      <span className="text-xs text-zinc-400">{v.label}</span>
                    </div>
                  ))}
                </div>
              </div>
 
              {/* Semester summary */}
              {view === "semesters" && semesters.length > 0 && (
                <div className="p-4 border bg-zinc-900 rounded-2xl border-zinc-800">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 font-semibold">Semester Overview</p>
                  <div className="space-y-2">
                    {semesters.map((s) => (
                      <div key={s.number} className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400">Semester {s.number}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: `${(s.credits / MAX_CREDITS) * 100}%` }} />
                          </div>
                          <span className="w-10 font-mono text-xs text-right text-zinc-300">{s.credits} cr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
 
          {/* Right: content */}
          <div className="order-1 lg:col-span-2 lg:order-2">
            {view === "semesters" ? (
              <div>
                {semesters.length === 0 ? (
                  <div className="p-10 text-center border bg-zinc-900 rounded-2xl border-zinc-800 text-zinc-500">
                    <div className="mb-3 text-4xl">🎉</div>
                    <p className="font-semibold text-zinc-300">All required courses completed!</p>
                    <p className="mt-1 text-sm">No remaining semesters to plan.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {semesters.map((sem) => (
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
                )}
              </div>
            ) : (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 max-h-[80vh] overflow-y-auto">
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