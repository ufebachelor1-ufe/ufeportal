import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase2 } from "../../supabase2";
import "./calendar.css";

// ── Homepage card helpers ────────────────────────────────────────────────
const WEEKDAYS = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

// Local YYYY-MM-DD (toISOString would shift the day because of UTC+8)
const toDateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const formatMonthDay = (d) => `${d.getMonth() + 1}-р сарын ${d.getDate()}`;

// "2026-11-03" -> Date at local midnight
const parseDateKey = (key) => {
  const [y, m, d] = key.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Legend labels for the homepage card
const LEGEND = [
  ["БСА-ны ажил", "Бакалаврын сургалтын алба"],
  ["Оюутны хөгжлийн төвийн ажил", "Оюутны хөгжлийн төв"],
  ["Оюутны клуб", "Оюутны клуб"],
  ["Оюутны холбоо", "Оюутны холбоо"],
  ["Олон улсын хамтарсан хөтөлбөр", "Олон улсын хөтөлбөр"],
  ["Тэмдэглэлт өдөр", "Тэмдэглэлт өдөр"],
  ["Хөтөлбөр хэрэгжүүлэгч нэгж", "Хөтөлбөр хэрэгжүүлэгч нэгж"],
];

export default function Cal({ isHomePage = false }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  // Homepage card state: "today" | "all"; the body animates to the height of the visible view
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("today");
  const [calendarMounted, setCalendarMounted] = useState(false);
  const [today] = useState(() => new Date());
  const [bodyHeight, setBodyHeight] = useState(null);
  const todayPanelRef = useRef(null);
  const allPanelRef = useRef(null);

  // Track the visible view's content height (also catches FullCalendar rendering or changing month)
  useEffect(() => {
    if (!isHomePage) return;
    const panel = (view === "all" ? allPanelRef : todayPanelRef).current;
    if (!panel) return;
    const ro = new ResizeObserver(() => setBodyHeight(panel.offsetHeight));
    ro.observe(panel);
    return () => ro.disconnect();
  }, [isHomePage, view, calendarMounted]);

  const TYPE_COLORS = {
    "БСА-ны ажил": "#60A5FA",
    "Оюутны хөгжлийн төвийн ажил": "#ed7d31",
    "Оюутны клуб": "#70ad47",
    "Оюутны холбоо": "#050c6b",
    "Олон улсын хамтарсан хөтөлбөр": "#7030a0",
    "Хөтөлбөр хэрэгжүүлэгч нэгж" : "#7F1D1D",
    "Тэмдэглэлт өдөр": "#c00000",
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedDate]);

  const fetchEvents = async () => {
    const { data, error } = await supabase2.from("calendar").select("*");
    setLoading(false);
    if (error) return console.error(error);

    const formattedEvents = data.map((e) => ({
      title: e.title,
      date: e.date,
      backgroundColor: TYPE_COLORS[e.type] || "#9ca3af",
      extendedProps: { type: e.type },
    }));

    setEvents(formattedEvents);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const closeModal = () => setSelectedDate(null);

  const eventsForSelectedDate = events.filter(
    (e) => e.date === selectedDate
  );

  const calendarGrid = (wrapperClass) => (
    <div className={wrapperClass}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height={isHomePage ? "auto" : "auto"}
        fixedWeekCount={false}
        //dayMaxEventRows={2}
        dateClick={(info) => {
          handleDateClick(info);
        }}

        eventClick={(info) => {
          info.jsEvent.preventDefault(); // prevent navigation
          handleDateClick({
            dateStr: info.event.startStr
          });
        }}
      />
    </div>
  );

  const dayModal = selectedDate && (
    <div className="calendar-overlay" onClick={closeModal}>
      <div
        className="fc-popover calendar-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fc-popover-header">
          {selectedDate}
          <span
            className="fc-popover-close"
            onClick={closeModal}
            style={{ cursor: "pointer", float: "right" }}
          >
            ×
          </span>
        </div>

        <div className="fc-popover-body">
          {eventsForSelectedDate.length > 0 ? (
            eventsForSelectedDate.map((e, idx) => (
              <div key={idx} className="modal-event">
                <span
                  className="event-dot"
                  style={{ background: e.backgroundColor }}
                />
                <div>
                  <div className="event-title">{e.title}</div>
                  <div className="event-type">
                    {e.extendedProps.type}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">No events</div>
          )}
        </div>
      </div>
    </div>
  );

  // ── Homepage: today's events card that switches in place to the full calendar ──
  if (isHomePage) {
    const todayKey = toDateKey(today);
    const todayEvents = events.filter((e) => e.date?.slice(0, 10) === todayKey);
    const nextEvent = events
      .filter((e) => e.date?.slice(0, 10) > todayKey)
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    const showAll = view === "all";

    const toggle = () => {
      // Mount FullCalendar on first use, then keep it mounted so switching back is instant
      setCalendarMounted(true);
      setView(showAll ? "today" : "all");
    };

    // The visible view stays in normal flow; the hidden one is overlaid and faded out.
    // Active panel has no transform on purpose: a transformed ancestor would trap the fixed-position day modal
    const panelClass = (active, offset) =>
      `transition-[opacity,transform] duration-500 ease-out ${
        active ? "relative opacity-100 transform-none" : `absolute inset-x-0 top-0 opacity-0 pointer-events-none ${offset}`
      }`;

    return (
      <div className="bg-white rounded-3xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]">
        <div className="p-5 sm:p-7">
          {/* Section heading: same typography as the /bsa/calendar header, in primary for the white card */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-lg font-bold uppercase tracking-[0.1em] text-primary">Чухал үйл явдал</p>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-baseline min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-500">Өнөөдөр</p>
              <span aria-hidden="true" className="mx-2 text-gray-400">·</span>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{formatMonthDay(today)}</h2>
            </div>
            <Link
              to="/bsa/calendar"
              aria-label="Календарь нээх"
              className="flex items-center justify-center text-gray-700 transition-colors border border-gray-200 w-10 h-10 rounded-xl hover:border-primary/40 hover:text-primary"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                <path strokeLinecap="round" d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
            </Link>
          </div>

          {/* Fixed-height body: today's list and the full calendar swap in place */}
          <div
            className="relative mt-4 overflow-hidden transition-[height] duration-500 ease-out motion-reduce:transition-none"
            style={bodyHeight != null ? { height: bodyHeight } : undefined}
          >
            <div id="home-today-schedule" ref={todayPanelRef} className={panelClass(!showAll, "-translate-x-8")} inert={showAll}>
              {loading ? (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <div key={i} className="h-14 rounded-xl bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : todayEvents.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {todayEvents.map((e, idx) => (
                    <li key={idx} className="flex items-start gap-4 py-4 first:pt-2">
                      <div className="w-12 text-center shrink-0">
                        <p className="text-2xl font-extrabold leading-none text-gray-900 tabular-nums">{today.getDate()}</p>
                        <p className="mt-1 text-[11px] font-medium uppercase text-gray-500">
                          {WEEKDAYS[today.getDay()].slice(0, 3)}
                        </p>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-sm font-semibold leading-snug text-gray-900 sm:text-[15px]">{e.title?.trim()}</p>
                        {e.extendedProps.type && (
                          <p className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: e.backgroundColor }} />
                            {e.extendedProps.type}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-5 rounded-2xl bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">Өнөөдөр товлогдсон үйл явдал алга.</p>
                  {nextEvent && (
                    <p className="mt-1 text-sm text-gray-500">
                      Дараагийн:{" "}
                      <span className="font-medium text-gray-800">{nextEvent.title?.trim()}</span>
                      {" · "}
                      {formatMonthDay(parseDateKey(nextEvent.date))}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div id="home-full-calendar" ref={allPanelRef} className={panelClass(showAll, "translate-x-8")} inert={!showAll}>
              {calendarMounted && (
                <>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-gray-600">
                    {LEGEND.map(([type, label]) => (
                      <span key={type} className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[type] }} />
                        {label}
                      </span>
                    ))}
                    <span className="text-gray-400">· Өдөр дээр дарж дэлгэрэнгүйг харна уу</span>
                  </div>
                  {calendarGrid("calendar-wrapper calendar-wrapper--embedded")}
                </>
              )}
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={toggle}
              aria-controls={showAll ? "home-today-schedule" : "home-full-calendar"}
              className="inline-flex items-center gap-2 px-4 py-2 -ml-1 text-sm font-semibold transition-colors rounded-full text-gray-900 hover:bg-gray-100"
            >
              {showAll ? "Өнөөдрийн хуваарь" : "Бүх хуваарь"}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            {!loading && (
              <span className="text-xs text-gray-400">
                {todayEvents.length > 0 ? `${todayEvents.length} үйл явдал` : ""}
              </span>
            )}
          </div>
        </div>

        {dayModal}
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0132a6",
        borderRadius: "8px",
        padding: "1.5rem",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#fff000',
              fontFamily: "'Montserrat','DM Mono', monospace",
              margin: 0,
            }}
          >
            Чухал үйл явдал
          </h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,240,0,0.4), transparent)' }} />
          <p style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(255, 255, 255)', fontFamily: "'Montserrat','DM Sans', sans-serif", margin: 0 }}>
            Тухайн өдрийн дэлгэрэнгүйг харахын тулд тухайн өдөр дээр дарна уу.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Montserrat','DM Sans', sans-serif" }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 8px #60A5FA' }} />
            Бакалаврын сургалтын алба
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ed7d31', boxShadow: '0 0 8px #ed7d31' }} />
            Оюутны хөгжлийн төв
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#70ad47', boxShadow: '0 0 8px #70ad47' }} />
            Оюутны клуб
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#050c6b', boxShadow: '0 0 8px #050c6b' }} />
            Оюутны холбоо
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#7030a0', boxShadow: '0 0 8px #7030a0' }} />
            Олон улсын хөтөлбөр
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#c00000', boxShadow: '0 0 8px #c00000' }} />
            Тэмдэглэлт өдөр
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#7F1D1D', boxShadow: '0 0 8px #7F1D1D' }} />
            Хөтөлбөр хэрэгжүүлэгч нэгж
          </span>
        </div>
      </div>
      {calendarGrid("calendar-wrapper")}

      {dayModal}
    </div>
  );
}
