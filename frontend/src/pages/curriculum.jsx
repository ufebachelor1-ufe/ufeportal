// CurriculumPlanner.jsx
// Оруулах any curriculum Excel with the same format to parse & plan semesters.
// Uses ExcelJS for Excel parsing.
//
// Excel format expected:
//   Col A (1): row number OR section label OR group label
//   Col B (2): course code OR quota string (e.g. "16/11", "0/3", "31/31") OR date
//   Col C (3): course name
//   Col D (4): кр
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
  if (cell.type === 4 && cell.value instanceof Date) {
    const done = cell.value.getMonth() + 1;
    const required = cell.value.getDate();
    return { done, required };
  }
  if (cell.type === 3 && typeof cell.value === "string") {
    const m = cell.value.trim().match(/^(\d+)\/(\d+)$/);
    if (m) return { done: parseInt(m[1]), required: parseInt(m[2]) };
  }
  if (cell.type === 6 && cell.value) {
    const r = cell.value.result;
    if (typeof r === "string") {
      const m = r.trim().match(/^(\d+)\/(\d+)$/);
      if (m) return { done: parseInt(m[1]), required: parseInt(m[2]) };
    }
  }
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
    const c4 = row.getCell(4);
    const c5 = row.getCell(5);
    const c6 = row.getCell(6);
    const c7 = row.getCell(7);

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
        кр: cellNum(c4) ?? 0,
        grade: cellNum(c5),
        status: status === "G" ? "G" : status === "NA" ? "NA" : null,
        prereqs,
      });
      return;
    }

    if (c1.type !== 3) return;
    const label = cellStr(c1);
    if (!label) return;
    if (c4.type === 0) return;

    const sectionId = label.match(/^(\d+\.[А-ЯA-Za-z]+)/)?.[1] || label.substring(0, 14);
    const quota = parseQuota(c4);
    const existing = sections.find((s) => s.id === sectionId);
    if (existing) {
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
      done_cr: quota ? quota.done : null,
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

function getRequiredCourses(sections) {
  const required = new Set();
  sections.forEach((sec) => {
    const { required_cr, courses } = sec;
    const eff_req = required_cr !== null ? required_cr
      : (sec.done_cr != null && sec.done_cr > 0) ? sec.done_cr
      : null;

    if (eff_req === null) {
      courses.forEach((c) => required.add(c.code));
    } else if (eff_req === 0) {
      // Badge logic
    } else {
      courses.forEach((c) => { if (c.кр === 0) required.add(c.code); });
      const passed = courses.filter((c) => c.status === "G" && c.кр > 0);
      let budget = eff_req;
      for (const c of passed) {
        if (budget <= 0) break;
        if (c.кр > budget) continue;
        required.add(c.code);
        budget -= c.кр;
      }
      if (budget > 0) {
        const pending = courses.filter((c) => c.status !== "G" && c.status !== "NA" && c.кр > 0);
        for (const c of pending) {
          if (budget <= 0) break;
          if (c.кр > budget) continue;
          required.add(c.code);
          budget -= c.кр;
        }
      }
    }
  });
  return required;
}

export function generateSemesters(sections) {
  const courseMap = buildCourseMap(sections);
  const required = getRequiredCourses(sections);
  const done = new Set(Object.values(courseMap).filter((c) => c.status === "G").map((c) => c.code));
  const todo = [...required].filter((code) => !done.has(code) && courseMap[code]);

  const semesters = [];
  const scheduled = new Set([...done]);
  let remaining = [...todo];

  for (let iter = 0; iter < MAX_SEMESTERS && remaining.length > 0; iter++) {
    const semCourses = [];
    let кр = 0;
    const stillRemaining = [];

    for (const code of remaining) {
      const c = courseMap[code];
      if (!c) continue;
      if (prereqsMet(c, scheduled, courseMap) && кр + c.кр <= MAX_CREDITS) {
        semCourses.push(code);
        кр += c.кр;
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
      кр,
    });
  }
  return semesters;
}

// ─── Component Configurations (Tailwind Dynamic Styles) ───────────────────────
const STATUS = {
  passed: {
    label: "Судалсан",
    cardBg: "bg-green-50 border-green-400 text-green-900",
    badgeBg: "bg-green-200 text-green-900",
  },
  failed: {
    label: "Амжилтгүй",
    cardBg: "bg-red-50 border-red-400 text-red-900",
    badgeBg: "bg-red-200 text-red-900",
  },
  locked: {
    label: "Холбоос үзээгүй",
    cardBg: "bg-gray-100 border-gray-300 text-gray-600",
    badgeBg: "bg-gray-300 text-gray-700",
  },
  available: {
    label: "Сонгох боломжтой",
    cardBg: "bg-blue-50 border-blue-400 text-blue-900",
    badgeBg: "bg-blue-200 text-blue-900",
  },
  planned: {
    label: "Сонгогдсон",
    cardBg: "bg-amber-50 border-amber-500 text-amber-900",
    badgeBg: "bg-amber-300 text-amber-900",
  },
};

const SEM_COLORS = [
  { head: "bg-blue-50 border-blue-200 text-blue-900", badge: "bg-blue-200 text-blue-900" },
  { head: "bg-emerald-50 border-emerald-200 text-emerald-900", badge: "bg-emerald-200 text-emerald-900" },
  { head: "bg-orange-50 border-orange-200 text-orange-900", badge: "bg-orange-200 text-orange-900" },
  { head: "bg-indigo-50 border-indigo-200 text-indigo-900", badge: "bg-indigo-200 text-indigo-900" },
  { head: "bg-amber-50 border-amber-200 text-amber-900", badge: "bg-amber-200 text-amber-900" },
  { head: "bg-rose-50 border-rose-200 text-rose-900", badge: "bg-rose-200 text-rose-900" },
  { head: "bg-lime-50 border-lime-200 text-lime-900", badge: "bg-lime-200 text-lime-900" },
  { head: "bg-red-50 border-red-200 text-red-900", badge: "bg-red-200 text-red-900" },
];

function getCourseStatus(course, courseMap) {
  if (course.status === "G") return "passed";
  if (course.status === "NA") return "failed";
  if (!course.prereqs.every((p) => !courseMap[p] || courseMap[p].status === "G")) return "locked";
  return "available";
}

// ─── Components ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex-1">
      <div className="text-xs text-gray-500 font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

function CourseCard({ course, courseMap, onClick, selected, dimmed }) {
  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
  
  return (
    <button
      onClick={() => onClick(course.code)}
      className={`w-full text-left rounded-md p-3 mb-2 transition-all block duration-150
        ${selected ? `${s.cardBg} border-2 shadow-sm` : "bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800"} 
        ${dimmed ? "opacity-25 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="font-mono text-xs font-semibold tracking-wide">
          {course.code}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${selected ? s.badgeBg : "bg-gray-200 text-gray-700"}`}>
          {course.кр}cr
        </span>
      </div>
      <div className="text-xs mt-1.5 font-medium leading-normal line-clamp-2">
        {course.name}
      </div>
      {course.grade != null && (
        <div className="text-[10px] text-gray-400 mt-1 font-semibold">Үнэлгээ: {course.grade}</div>
      )}
    </button>
  );
}

function SemesterCard({ semester, courseMap, onCourseClick, selected, dimmedSet }) {
  const col = SEM_COLORS[(semester.number - 1) % SEM_COLORS.length];
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className={`${col.head} p-4 flex justify-between items-center border-b`}>
        <div>
          <div className="text-sm font-bold">{semester.number}-р семестер</div>
          <div className="text-xs opacity-75 mt-0.5">{semester.courses.length} хичээл</div>
        </div>
        <span className={`${col.badge} text-xs px-2.5 py-1 rounded-full font-bold shadow-sm`}>
          {semester.кр} cr
        </span>
      </div>
      <div className="p-3 bg-white">
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

function buildTree(rootCode, courseMap) {
  const visited = new Set();

  function ancestors(code, depth) {
    if (visited.has(code + "_up") || depth > 8) return [];
    visited.add(code + "_up");
    const c = courseMap[code];
    if (!c || c.prereqs.length === 0) return [];
    return c.prereqs.flatMap((p) => {
      const rows = ancestors(p, depth + 1);
      return [...rows, { code: p, depth: -(depth + 1) }];
    });
  }

  function descendants(code, depth) {
    if (visited.has(code + "_dn") || depth > 8) return [];
    visited.add(code + "_dn");
    const children = Object.values(courseMap).filter((c) => c.prereqs.includes(code));
    return children.flatMap((c) => {
      const rows = descendants(c.code, depth + 1);
      return [{ code: c.code, depth: depth + 1 }, ...rows];
    });
  }

  const anc = ancestors(rootCode, 0);
  const desc = descendants(rootCode, 0);

  const byDepth = {};
  [...anc, { code: rootCode, depth: 0 }, ...desc].forEach(({ code, depth }) => {
    if (!byDepth[depth]) byDepth[depth] = [];
    if (!byDepth[depth].includes(code)) byDepth[depth].push(code);
  });

  return byDepth;
}

function ChainTree({ course, courseMap, onNavigate }) {
  const tree = useMemo(() => buildTree(course.code, courseMap), [course.code, courseMap]);
  const depths = Object.keys(tree).map(Number).sort((a, b) => a - b);

  const NODE_W = 130;
  const NODE_H = 50;
  const COL_GAP = 52;
  const ROW_GAP = 14;

  const cols = depths.map((d) => tree[d]);
  const maxRows = Math.max(...cols.map((c) => c.length));
  const svgW = cols.length * (NODE_W + COL_GAP);
  const svgH = Math.max(maxRows * (NODE_H + ROW_GAP), NODE_H + ROW_GAP);

  const pos = {};
  cols.forEach((codes, ci) => {
    const totalH = codes.length * (NODE_H + ROW_GAP) - ROW_GAP;
    const startY = (svgH - totalH) / 2;
    codes.forEach((code, ri) => {
      pos[code] = {
        x: ci * (NODE_W + COL_GAP),
        y: startY + ri * (NODE_H + ROW_GAP),
      };
    });
  });

  const edges = [];
  Object.values(courseMap).forEach((c) => {
    if (pos[c.code]) {
      c.prereqs.forEach((p) => {
        if (pos[p]) {
          edges.push({ from: p, to: c.code });
        }
      });
    }
  });

  return (
    <div className="overflow-auto max-h-[460px] pb-1">
      <svg width={svgW + 8} height={svgH + 8} className="block overflow-visible">
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-gray-400" />
          </marker>
        </defs>
        {edges.map(({ from, to }) => {
          const f = pos[from], t = pos[to];
          const x1 = f.x + NODE_W, y1 = f.y + NODE_H / 2;
          const x2 = t.x, y2 = t.y + NODE_H / 2;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={from + to}
              d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              fill="none"
              className="stroke-gray-300"
              strokeWidth={1.5}
              markerEnd="url(#arr)"
            />
          );
        })}
        {Object.entries(pos).map(([code, { x, y }]) => {
          const c = courseMap[code];
          if (!c) return null;
          const isRoot = code === course.code;
          const st = isRoot ? "available" : getCourseStatus(c, courseMap);
          const s = STATUS[st];
          return (
            <g key={code} className="cursor-pointer" onClick={() => onNavigate(code)}>
              <rect
                x={x} y={y} width={NODE_W} height={NODE_H} rx={8}
                className={isRoot ? "fill-blue-50 stroke-blue-500" : "fill-gray-50 stroke-gray-200"}
                strokeWidth={isRoot ? 2 : 1}
              />
              <text
                x={x + NODE_W / 2} y={y + 18}
                textAnchor="middle"
                className="text-[11px] font-mono font-semibold fill-gray-900"
              >{code.length > 10 ? code.slice(0, 10) + "…" : code}</text>
              <text
                x={x + NODE_W / 2} y={y + 35}
                textAnchor="middle"
                className="text-[10px] fill-gray-500"
              >{c.кр}кр · {s.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CourseDetailPanel({ course, courseMap, onClose, onNavigate }) {
  if (!course) {
    return (
      <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
        <div className="text-sm text-gray-400 font-medium">
          Хичээл дээр дарж холбооны гинжийг харна уу
        </div>
      </div>
    );
  }

  const st = getCourseStatus(course, courseMap);
  const s = STATUS[st];
  const unlocks = Object.values(courseMap).filter((c) => c.prereqs.includes(course.code));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-mono text-base font-bold text-gray-900">{course.code}</div>
          <div className="text-sm font-medium text-gray-700 mt-1 leading-snug">{course.name}</div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2 transition-colors">×</button>
      </div>

      <div className="flex gap-3 mb-4 text-xs font-semibold text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded">{course.кр} кр</span>
        {course.grade != null && <span className="bg-gray-100 px-2 py-1 rounded">Дүн: {course.grade}</span>}
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{s.label}</span>
      </div>

      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Холбооны гинж</div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
          <ChainTree course={course} courseMap={courseMap} onNavigate={onNavigate} />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Урьдчилсан нөхцөл</div>
        {course.prereqs.length === 0 ? (
          <span className="text-xs text-gray-400">Байхгүй</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {course.prereqs.map((p) => {
              const pc = courseMap[p];
              const met = pc?.status === "G";
              return (
                <button 
                  key={p} 
                  onClick={() => onNavigate(p)} 
                  className={`text-xs font-mono px-2.5 py-1 rounded-full font-medium transition-colors border
                    ${met ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" : "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"}`}
                >
                  {p} {met ? "✓" : "✗"}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">Нээдэг хичээл</div>
        {unlocks.length === 0 ? (
          <span className="text-xs text-gray-400">Байхгүй</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {unlocks.map((u) => (
              <button 
                key={u.code} 
                onClick={() => onNavigate(u.code)} 
                className="text-xs font-mono px-2.5 py-1 rounded-full font-medium border bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
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
    <div className="flex flex-col gap-6">
      {sections.map((sec) => {
        const { required_cr } = sec;
        const isMandatory = required_cr === null;
        const isBadge = required_cr === 0;
        const passedCr = sec.courses.filter((c) => c.status === "G").reduce((s, c) => s + c.кр, 0);
        const satisfied = !isMandatory && !isBadge && passedCr >= required_cr;

        return (
          <div key={sec.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wide max-w-[75%]">
                {sec.label}
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                isMandatory ? "bg-gray-100 text-gray-600" : isBadge ? "bg-amber-100 text-amber-800" : satisfied ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}>
                {isMandatory ? "Бүгд заавал" : isBadge ? "Тэмдэг" : `${passedCr}/${required_cr} cr`}
              </span>
            </div>
            {!isMandatory && !isBadge && required_cr > 0 && (
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full transition-all duration-300 ${satisfied ? "bg-green-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.min(100, (passedCr / required_cr) * 100)}%` }} 
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
          </div>
        );
      })}
    </div>
  );
}

// ─── Оруулах Screen ────────────────────────────────────────────────────────────
function ОруулахScreen({ onData }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handle = async (file) => {
    if (!file || !file.name.match(/\.xlsx?$/i)) {
      setError("Зөвхөн .xlsx өргөтгөлтэй файл оруулна уу.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const ab = await file.arrayBuffer();
      const sections = await parseExcel(ab);
      if (sections.length === 0) throw new Error("Файлын бүтэц буруу эсвэл хоосон байна.");
      onData(sections, file.name);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Сургалт төлөвлөгч</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Төлөвлөгөөгөө харахын тулд сургалтын хөтөлбөрийн Excel файлаа оруулна уу</p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
            ${dragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
        >
          <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => handle(e.target.files[0])} />
          <div className="text-4xl mb-3 animate-bounce">{loading ? "⏳" : "📂"}</div>
          <div className="text-gray-800 font-bold text-sm">{loading ? "Excel уншиж байна…" : "Excel файлыг энд чирнэ үү"}</div>
          <div className="text-gray-400 text-xs mt-1">{loading ? "Түр хүлээнэ үү…" : "эсвэл энд дарж файлаа сонгоно уу"}</div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2.5">Шаардлагатай Excel-ийн баганууд</div>
          <div className="grid grid-cols-1 gap-2">
            {[
              ["Col A", "Row index / Section label"],
              ["Col B", "Course code / Quota (16/11)"],
              ["Col C", "Course name"],
              ["Col D", "Credits (кр)"],
              ["Col E", "Grade (Дүн)"],
              ["Col F", "Status (G / NA)"],
              ["Col G", "Prerequisites (таслалаар тусгаарласан)"],
            ].map(([col, desc]) => (
              <div key={col} className="flex gap-3 text-xs">
                <span className="text-blue-600 font-mono font-bold w-12 shrink-0">{col}</span>
                <span className="text-gray-600 font-medium">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Application Layout ───────────────────────────────────────────────
export default function CurriculumPlanner() {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState(null);

  const courseMap = useMemo(() => (data ? buildCourseMap(data) : {}), [data]);
  const semesters = useMemo(() => (data ? generateSemesters(data) : []), [data]);
  const selectedCourse = selectedCourseCode ? courseMap[selectedCourseCode] : null;

  // Highlights dependencies on the layout mapping
  const highlightedSet = useMemo(() => {
    if (!selectedCourseCode) return null;
    const tree = buildTree(selectedCourseCode, courseMap);
    return new Set(Object.values(tree).flat());
  }, [selectedCourseCode, courseMap]);

  if (!data) {
    return <ОруулахScreen onData={(sections, name) => { setData(sections); setFileName(name); }} />;
  }

  // Calculated Stats
  const totalPassedCr = Object.values(courseMap).filter(c => c.status === "G").reduce((acc, c) => acc + c.кр, 0);
  const gpaCourses = Object.values(courseMap).filter(c => c.status === "G" && c.grade !== null);
  const avgGrade = gpaCourses.length ? (gpaCourses.reduce((acc, c) => acc + c.grade, 0) / gpaCourses.length).toFixed(1) : "0.0";

  return (
    <div className="flex flex-col gap-8 px-6 py-10 mx-auto lg:flex-row max-w-[1920px] bg-white min-h-screen">
      
      {/* Dynamic Sidebar Control Panel */}
      <aside className="lg:w-[380px] shrink-0 flex flex-col gap-6">
        <div>
          <button 
            onClick={() => { setData(null); setSelectedCourseCode(null); }}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold mb-3 flex items-center gap-1 group transition-colors"
          >
            ← Буцах (Файл солих)
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Сургалт төлөвлөгч</h1> 
          <p className="text-xs text-gray-400 font-semibold mt-1 truncate">Файл: {fileName}</p>
        </div>

        {/* Analytical Statistics Layout */}
        <div className="flex gap-3">
          <StatCard label="Нийт цуглуулсан кр" value={`${totalPassedCr} cr`} sub="Амжилттай судалсан" />
          <StatCard label="Дундаж дүн" value={avgGrade} sub={`${gpaCourses.length} хичээлээр`} />
        </div>

        {/* Selected item Detail panel component context wrapper */}
        <CourseDetailPanel 
          course={selectedCourse} 
          courseMap={courseMap} 
          onClose={() => setSelectedCourseCode(null)} 
          onNavigate={(code) => setSelectedCourseCode(code)}
        />

        {/* Comprehensive Curriculums view list container */}
        <div className="border-t border-gray-100 pt-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Хөтөлбөрийн бүтэц</h2>
          <SectionList 
            sections={data} 
            courseMap={courseMap} 
            selected={selectedCourseCode} 
            onSelect={(code) => setSelectedCourseCode(code === selectedCourseCode ? null : code)} 
          />
        </div>
      </aside>

      {/* Main Semester Grid Pipeline Grid Content dashboard */}
      <main className="flex-1 bg-gray-50/50 rounded-2xl border border-gray-100 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Автомат семестерийн хуваарилалт</h2>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Дээд хязгаар: {MAX_CREDITS}кр / семестер</span>
        </div>

        {semesters.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-20 bg-white border border-dashed rounded-xl">
            Төлөвлөх шаардлагатай хичээл олдсонгүй эсвэл урьдчилсан нөхцөл гацсан байна.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {semesters.map((sem) => (
              <SemesterCard
                key={sem.number}
                semester={sem}
                courseMap={courseMap}
                onCourseClick={(code) => setSelectedCourseCode(code === selectedCourseCode ? null : code)}
                selected={selectedCourseCode}
                dimmedSet={highlightedSet}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}