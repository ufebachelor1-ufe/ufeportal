import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase2 } from "../../supabase2";
import "./calendar.css";

export default function Cal({ isHomePage = false }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const TYPE_COLORS = {
    "БСА-ны ажил": "#60A5FA",
    "Оюутны хөгжлийн төвийн ажил": "#ed7d31",
    "Оюутны холбоо, Оюутны клуб": "#70ad47",
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
          <p1 style={{ fontWeight: 'bold', fontSize: '14px', color: 'rgb(255, 255, 255)', fontFamily: "'Montserrat','DM Sans', sans-serif", margin: 0 }}>
            Тухайн өдрийн дэлгэрэнгүйг харахын тулд тухайн өдөр дээр дарна уу.
          </p1>
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
            Оюутны холбоо, Оюутны клуб
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
      <div className="calendar-wrapper">
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

      {selectedDate && (
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
      )}
    </div>
  );
}