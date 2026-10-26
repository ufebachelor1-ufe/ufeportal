import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { supabase2 } from "../../supabase2";

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

// Teacher names are public on the original timetable, but you can hide them here.
const SHOW_TEACHER = false;

const DAYS = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
const SAT = "Бямба";

const WEEKDAY_SLOTS = [
  { start: "07:40", end: "08:30" },
  { start: "08:40", end: "09:30" },
  { start: "09:40", end: "10:30" },
  { start: "10:40", end: "11:30" },
  { start: "11:40", end: "12:30" },
  { start: "12:40", end: "13:30" },
  { start: "14:20", end: "15:10" },
  { start: "15:20", end: "16:10" },
  { start: "16:20", end: "17:10" },
  { start: "17:20", end: "18:10" },
  { start: "18:20", end: "19:10" },
  { start: "19:20", end: "20:10" },
];

// Saturday has its own 3 long blocks
const SATURDAY_SLOTS = [
  { start: "08:00", end: "11:10" },
  { start: "12:00", end: "15:10" },
  { start: "15:30", end: "18:40" },
];

// Yellow top + bottom edge used to mark the current time row
const NOW_EDGE =
  "shadow-[inset_0_2px_0_0_#eab308,inset_0_-2px_0_0_#eab308]";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function toMin(t) {
  const [h, m] = t.split(":");
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}


const withMin = (list) => list.map((s) => ({ ...s, sMin: toMin(s.start), eMin: toMin(s.end) }));
const WEEK = withMin(WEEKDAY_SLOTS);
const SATURDAY = withMin(SATURDAY_SLOTS);
const slotsFor = (day) => (day === SAT ? SATURDAY : WEEK);

// "8:40", "08:40", "08:40:00" -> "08:40" (or "" if it is not a time)
function normTime(t) {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(t ?? "").trim());
  if (!m) return "";
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}

function roomNumber(room) {
  return parseInt(room.match(/\d+/)?.[0] ?? "0", 10);
}

// C1302 -> 13, B402A -> 4
function floorFromRoom(room) {
  const match = room.match(/\d+/);
  if (!match) return 0;
  return Math.floor(parseInt(match[0], 10) / 100);
}

function floorGroupName(floor) {
  if (floor >= 10) return "10–14";
  if (floor >= 6) return "6–9";
  return "1–5";
}

// Current day + minutes in Ulaanbaatar time (so it is right on any device/time zone)
function getUBClock(date) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ulaanbaatar",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(date);
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const dayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
    let h = parseInt(get("hour"), 10);
    if (h === 24) h = 0;
    const minutes = h * 60 + parseInt(get("minute"), 10);
    if (dayIdx >= 0 && Number.isFinite(minutes)) return { dayIdx, minutes };
  } catch (e) {
    /* fall through to the device clock */
  }
  return { dayIdx: (date.getDay() + 6) % 7, minutes: date.getHours() * 60 + date.getMinutes() };
}

// Monday = 0 ... Saturday = 5, Sunday = null
function getTodayIdx(date) {
  const { dayIdx } = getUBClock(date);
  return dayIdx === 6 ? null : dayIdx;
}

// Current (or next) time slot for today. null when there is no class time left today.
function getNowInfo(date) {
  const { dayIdx, minutes } = getUBClock(date);
  if (dayIdx === 6) return null;
  const slots = slotsFor(DAYS[dayIdx]);
  const idx = slots.findIndex((s) => minutes < s.eMin);
  if (idx === -1) return null;
  return { idx, inside: minutes >= slots[idx].sMin };
}

function normalizeRows(data) {
  const out = [];
  for (const r of data) {
    const room = String(r.room ?? "").trim();
    const day = String(r.day ?? "").trim();
    const start = normTime(r.start_time);
    const end = normTime(r.end_time);
    if (!room || !day || !start || !end) continue;

    const hasFloor = r.floor !== null && r.floor !== undefined && r.floor !== "";
    out.push({
      room,
      building: String(r.building ?? "").trim() || room.charAt(0).toUpperCase(),
      floor: hasFloor && Number.isFinite(Number(r.floor)) ? Number(r.floor) : floorFromRoom(room),
      day,
      start,
      end,
      startMin: toMin(start),
      endMin: toMin(end),
      course: String(r.course ?? "").trim(),
      group: String(r.class_group ?? r.group ?? "").trim(),
      teacher: String(r.teacher ?? "").trim(),
    });
  }
  return out;
}

function describe(b) {
  if (!b) return "Сул";
  const parts = [b.course, b.group].filter(Boolean);
  if (SHOW_TEACHER && b.teacher) parts.push(b.teacher);
  return parts.join(" · ") || "Хичээлтэй";
}

/* ------------------------------------------------------------------ */
/* Measures the available width so the table never needs scrolling     */
/* ------------------------------------------------------------------ */

function useBoxWidth(ref) {
  const [box, setBox] = useState({ width: 0, vw: 1024 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const width = el.clientWidth || 0;
      const vw = window.innerWidth || 1024;
      setBox((p) => (p.width === width && p.vw === vw ? p : { width, vw }));
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);
  return box;
}

const MIN_COL = 30; // narrowest a room column is allowed to get (px)

// split a list into `parts` nearly equal chunks
function chunkEvenly(list, maxPerPart) {
  if (list.length <= maxPerPart) return [list];
  const parts = Math.ceil(list.length / maxPerPart);
  const per = Math.ceil(list.length / parts);
  const out = [];
  for (let i = 0; i < list.length; i += per) out.push(list.slice(i, i + per));
  return out;
}

/* ------------------------------------------------------------------ */
/* Room details (bottom sheet on phones, dialog on larger screens)    */
/* ------------------------------------------------------------------ */

function RoomModal({ room, day, slots, bookings, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const sorted = [...bookings].sort((a, b) => a.startMin - b.startMin);
  const freeSlots = slots.filter(
    (s) => !sorted.some((b) => b.startMin < s.eMin && b.endMin > s.sMin)
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${room}, ${day}`}
        className="w-full max-h-[85vh] overflow-auto bg-white shadow-xl rounded-t-2xl sm:max-w-md sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 bg-white border-b">
          <h3 className="text-lg font-bold text-gray-900">
            {room} <span className="font-normal text-gray-500">· {day}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="flex items-center justify-center w-10 h-10 text-2xl leading-none text-gray-600 rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-3 space-y-4">
          {sorted.length === 0 ? (
            <p className="px-3 py-2 text-sm text-green-800 bg-green-100 rounded-md">
              Энэ өдөр бүтэн сул байна.
            </p>
          ) : (
            <ul className="space-y-2">
              {sorted.map((b, i) => (
                <li key={i} className="px-3 py-2 text-sm bg-red-50 border border-red-200 rounded-md">
                  <div className="font-semibold text-gray-900">
                    {b.start}–{b.end}
                  </div>
                  <div className="text-gray-700">{describe(b)}</div>
                </li>
              ))}
            </ul>
          )}

          {sorted.length > 0 && freeSlots.length > 0 && (
            <div>
              <div className="mb-2 text-sm font-semibold text-gray-700">Сул цагууд</div>
              <div className="flex flex-wrap gap-1.5">
                {freeSlots.map((s) => (
                  <span
                    key={s.start}
                    className="px-2 py-1 text-xs text-green-900 bg-green-100 border border-green-200 rounded"
                  >
                    {s.start}–{s.end}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function RoomAvailability() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [now, setNow] = useState(() => new Date());
  const [day, setDay] = useState(() => DAYS[getTodayIdx(new Date()) ?? 0]);
  const [building, setBuilding] = useState("all");
  const [modalRoom, setModalRoom] = useState(null);
  const closeModal = useCallback(() => setModalRoom(null), []);

  // keep "now" fresh
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  // load the whole timetable once (about 700 rows)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase2.from("rooms").select("*").range(0, 4999);
        if (cancelled) return;
        if (err) {
          console.error(err);
          setError(err);
          setRows([]);
        } else {
          setRows(normalizeRows(data || []));
        }
      } catch (e) {
        if (cancelled) return;
        console.error(e);
        setError(e);
        setRows([]);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const todayIdx = getTodayIdx(now);
  const today = todayIdx === null ? null : DAYS[todayIdx];
  const nowInfo = useMemo(() => getNowInfo(now), [now]);
  const slots = slotsFor(day);

  // all rooms that appear anywhere in the timetable
  const roomList = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      if (!map.has(r.room)) map.set(r.room, { room: r.room, building: r.building, floor: r.floor });
    }
    return [...map.values()].sort(
      (a, b) =>
        a.building.localeCompare(b.building) ||
        a.floor - b.floor ||
        roomNumber(a.room) - roomNumber(b.room) ||
        a.room.localeCompare(b.room)
    );
  }, [rows]);

  const buildings = useMemo(() => [...new Set(roomList.map((r) => r.building))].sort(), [roomList]);

  // rooms that are only used on Saturday are hidden Monday to Friday
  const satOnly = useMemo(() => {
    const used = new Map(); // room -> has a non-Saturday class
    for (const r of rows) used.set(r.room, used.get(r.room) || r.day !== SAT);
    return new Set([...used.entries()].filter(([, weekday]) => !weekday).map(([room]) => room));
  }, [rows]);

  const visibleRooms = useMemo(
    () =>
      roomList.filter(
        (r) => (building === "all" || r.building === building) && (day === SAT || !satOnly.has(r.room))
      ),
    [roomList, building, day, satOnly]
  );

  // bookings of the selected day, by room
  const byRoom = useMemo(() => {
    const m = new Map();
    for (const r of rows) {
      if (r.day !== day) continue;
      if (!m.has(r.room)) m.set(r.room, []);
      m.get(r.room).push(r);
    }
    return m;
  }, [rows, day]);

  const getBooking = (room, slotIdx) => {
    const list = byRoom.get(room);
    if (!list) return null;
    const s = slots[slotIdx];
    return list.find((b) => b.startMin < s.eMin && b.endMin > s.sMin) || null;
  };

  const isTodaySelected = today === day;
  const nowRowIdx = isTodaySelected && nowInfo ? nowInfo.idx : -1;

  /* ---------- grid data ---------- */
  const floorGroups = useMemo(() => {
    const groups = { "1–5": [], "6–9": [], "10–14": [] };
    for (const r of visibleRooms) groups[floorGroupName(r.floor)].push(r);
    return Object.entries(groups).filter(([, list]) => list.length > 0);
  }, [visibleRooms]);

  /* ---------- small UI pieces ---------- */
  const pill = (active) =>
    `px-3 min-h-[40px] text-sm rounded-md border transition touch-manipulation ${
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
    }`;

  const modalBookings = modalRoom ? byRoom.get(modalRoom) || [] : [];

  // how many room columns fit without scrolling
  const rootRef = useRef(null);
  const box = useBoxWidth(rootRef);
  const compact = box.vw < 640;
  const timeCol = compact ? 48 : 96;
  const avail = box.width > 0 ? box.width - (compact ? 24 : 32) - 2 : 0; // minus padding + border
  const maxCols = avail > 0 ? Math.max(6, Math.floor((avail - timeCol) / MIN_COL)) : Infinity;

  return (
    <div ref={rootRef} className="w-0 min-w-full p-3 rounded-lg shadow sm:p-4 bg-gray-50">
      {/* Day pills */}
      <div className="flex flex-wrap gap-1.5 mb-2" role="group" aria-label="Өдөр">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(d)}
            aria-pressed={day === d}
            className={pill(day === d)}
          >
            {d}
            {d === today && (
              <span
                className={`inline-block w-1.5 h-1.5 ml-1.5 align-middle rounded-full ${
                  day === d ? "bg-yellow-300" : "bg-yellow-500"
                }`}
                title="Өнөөдөр"
              />
            )}
          </button>
        ))}
      </div>

      {/* Building filter */}
      {buildings.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-3" role="group" aria-label="Байр">
          <button type="button" onClick={() => setBuilding("all")} aria-pressed={building === "all"} className={pill(building === "all")}>
            Бүгд
          </button>
          {buildings.map((b) => (
            <button key={b} type="button" onClick={() => setBuilding(b)} aria-pressed={building === b} className={pill(building === b)}>
              {b} байр
            </button>
          ))}
        </div>
      )}

      {loading && <div className="py-10 text-center text-gray-500">Ачааллаж байна…</div>}

      {!loading && error && (
        <div className="p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
          <p className="mb-2 font-semibold">Мэдээлэл ачаалж чадсангүй.</p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="px-3 py-2 text-white rounded-md min-h-[40px] bg-primary"
          >
            Дахин оролдох
          </button>
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="py-10 text-center text-gray-500">Хуваарийн мэдээлэл олдсонгүй.</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <>
          {/* legend + now */}
          <div className="flex flex-wrap items-center mb-3 text-sm gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 bg-red-400 rounded-sm" />
              <span>Хичээлтэй</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 bg-green-200 rounded-sm" />
              <span>Хичээлгүй</span>
            </div>
            {isTodaySelected && nowInfo && (
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded-sm" />
                <span>
                  {nowInfo.inside ? "Одоо" : "Дараагийн цаг"}: {slots[nowInfo.idx].start}–{slots[nowInfo.idx].end}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {floorGroups.flatMap(([groupName, groupRooms]) => {
              const chunks = chunkEvenly(groupRooms, maxCols);
              return chunks.map((chunkRooms, part) => {
                const colW = avail > 0 ? (avail - timeCol) / chunkRooms.length : Infinity;
                const vertical = colW < 46; // too narrow for a sideways room name
                const title = `${groupName} давхар${chunks.length > 1 ? ` · ${part + 1}/${chunks.length}` : ""}`;
                return (
                  <section key={`${groupName}-${part}`} className="overflow-hidden bg-white border rounded-lg">
                    <h2 className="px-3 py-1 text-sm font-bold bg-gray-200 border-b">{title}</h2>

                    {/* room header */}
                    <div className="flex bg-gray-100 border-b">
                      <div
                        style={{ width: timeCol }}
                        className="flex items-center justify-center py-1 text-xs font-semibold bg-gray-100 border-r sm:text-sm shrink-0"
                      >
                        Цаг
                      </div>
                      {chunkRooms.map((r) => (
                        <div
                          key={r.room}
                          className={`flex-1 min-w-0 overflow-hidden font-semibold text-center border-r bg-gray-50 ${
                            vertical ? "flex items-center justify-center h-14 text-[11px]" : "py-1 text-sm"
                          }`}
                        >
                          {vertical ? <span className="[writing-mode:vertical-rl] rotate-180">{r.room}</span> : r.room}
                        </div>
                      ))}
                    </div>

                    {/* time rows */}
                    {slots.map((slot, idx) => {
                      const isNow = idx === nowRowIdx;
                      return (
                        <div key={slot.start} className="flex border-b last:border-b-0">
                          <div
                            style={{ width: timeCol }}
                            className={`flex items-center justify-center h-9 font-medium border-r shrink-0 ${
                              compact ? "flex-col text-[10px] leading-tight" : "text-sm whitespace-nowrap"
                            } ${isNow ? "bg-yellow-300 font-bold" : "bg-gray-100"}`}
                          >
                            {compact ? (
                              <>
                                <span>{slot.start}</span>
                                <span>{slot.end}</span>
                              </>
                            ) : (
                              `${slot.start}-${slot.end}`
                            )}
                          </div>

                          {chunkRooms.map((r) => {
                            const booking = getBooking(r.room, idx);
                            return (
                              <button
                                key={r.room}
                                type="button"
                                onClick={() => setModalRoom(r.room)}
                                title={`${r.room} · ${slot.start}-${slot.end}: ${describe(booking)}`}
                                aria-label={`${r.room}, ${slot.start}-${slot.end}: ${booking ? describe(booking) : "сул"}`}
                                className={`flex-1 min-w-0 h-9 border-r touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                                  booking ? "bg-red-400 hover:bg-red-500" : "bg-green-200 hover:bg-green-300"
                                } ${isNow ? NOW_EDGE : ""}`}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </section>
                );
              });
            })}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Нүд дээр дарвал тухайн танхимын өдрийн хуваарь гарна.
          </p>
        </>
      )}

      {modalRoom && (
        <RoomModal room={modalRoom} day={day} slots={slots} bookings={modalBookings} onClose={closeModal} />
      )}
    </div>
  );
}