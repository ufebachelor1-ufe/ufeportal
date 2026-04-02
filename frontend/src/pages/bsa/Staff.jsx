import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabase";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ===== SWIPE STATE ===== */
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);
  const isDragging = useRef(false);

  const SWIPE_THRESHOLD = 60;

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("staff")
        .select("id, full_name, position, department, bio, image_url, email")
        .eq("is_active", true);

      if (!error && data) {
        const positionOrder = [
          "Бакалаврын сургалтын албаны дарга",
          "Бакалаврын сургалтын албаны орлогч дарга",
          "Сургалтын менежер",
          "Ахлах мэргэжилтэн",
          "Мэргэжилтэн",
          "Зохицуулагч",
          "Дадлагажигч",
        ];

        setStaff(
          data.sort(
            (a, b) =>
              positionOrder.indexOf(a.position) -
              positionOrder.indexOf(b.position)
          )
        );
      }
    };

    fetchStaff();
  }, []);

  const prev = () =>
    setActiveIndex((i) => Math.max(i - 1, 0));

  const next = () =>
    setActiveIndex((i) =>
      Math.min(i + 1, staff.length - 1)
    );

  /* ===== POINTER / SWIPE LOGIC ===== */
  const onPointerDown = (e) => {
    if (e.target.closest("button")) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    deltaX.current = 0;
    isDragging.current = true;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;

    // Ignore vertical scrolling
    if (Math.abs(dy) > Math.abs(dx)) {
      isDragging.current = false;
      return;
    }

    deltaX.current = dx;
  };

  const onPointerUp = (e) => {
    if (!isDragging.current) return;

    if (deltaX.current < -SWIPE_THRESHOLD) next();
    if (deltaX.current > SWIPE_THRESHOLD) prev();

    isDragging.current = false;
    deltaX.current = 0;

    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  if (!staff.length) return null;

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <h1 className="mb-10 text-3xl font-bold text-center">
        Албаны бүрэлдэхүүн
      </h1>

      {/* HERO CARD */}
      <div
        className="relative overflow-hidden rounded-3xl bg-primary shadow-[0_30px_80px_rgba(0,0,0,0.35)] min-h-[480px] select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {staff.map((s, index) => (
          <div
            key={s.id}
            className={`
              absolute inset-0 transition-all duration-500 ease-out
              ${
                index === activeIndex
                  ? "opacity-100 translate-x-0 z-20"
                  : index < activeIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }
            `}
          >
            <div className="grid items-center gap-6 p-4 sm:p-6 md:h-full md:gap-10 md:p-10 md:grid-cols-2">
              {/* IMAGE */}
              <div className="relative flex justify-center">
                <div className="relative p-3 border shadow-2xl md:p-4 rounded-2xl bg-white/10 backdrop-blur border-white/20">
                  <img
                    src={s.image_url}
                    alt={s.full_name}
                    className="max-h-[180px] sm:max-h-[240px] md:max-h-[360px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              {/* INFO */}
              <div className="text-center text-white md:text-left">
                <p className="text-sm tracking-widest uppercase sm:text-sm opacity-80">
                  {s.department}
                </p>

                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
                  {s.full_name}
                </h2>

                <p className="mt-1 text-lg font-semibold text-white/80">
                  {s.position}
                </p>

                <p className="mt-4 text-sm leading-relaxed sm:text-base text-white/90">
                  {s.bio}
                </p>

                {s.email && (
                  <a
                    href={`mailto:${s.email}`}
                    className="inline-block mt-4 text-sm font-medium underline text-white/90 hover:text-white sm:text-base"
                  >
                    {s.email}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ARROWS */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          disabled={activeIndex === 0}
          className="absolute z-30 text-white transition -translate-y-1/2 rounded-full left-4 top-1/2 w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur disabled:opacity-30"
        >
          ‹
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          disabled={activeIndex === staff.length - 1}
          className="absolute z-30 text-white transition -translate-y-1/2 rounded-full right-4 top-1/2 w-11 h-11 bg-white/20 hover:bg-white/30 backdrop-blur disabled:opacity-30"
        >
          ›
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="flex justify-center gap-4 mt-8">
        {staff.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setActiveIndex(index)}
            className={`
              w-14 h-14 rounded-full transition-all
              ${
                index === activeIndex
                  ? "ring-4 ring-primary scale-110"
                  : "opacity-50 hover:opacity-100"
              }
            `}
          >
            <img
              src={s.image_url}
              alt={s.full_name}
              className="object-cover w-full h-full rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
