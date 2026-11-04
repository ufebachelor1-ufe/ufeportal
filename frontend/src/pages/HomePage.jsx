import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { supabase2 } from '../supabase2';
import Announcements from './Announcements';
import Vid from './vid';
import ProgramsGlobePage from './miniglobe';
import AdvancedSearch from './Advancedsearch';
import Calendar from './bsa/calendar';

// Shared content width for every section below the header
const CONTAINER = 'max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8';

const POPULAR_SEARCHES = [
  { label: 'Хөтөлбөр', link: '/programs/degree/Үндсэн' },
  { label: 'Журам', link: '/bsa/rules' },
  { label: 'Голч', link: '/gpa-calculator' },
  { label: 'Хүсэлт', link: '/bsa/req' },
];

const NAV_LEFT = [
  {
    num: 1,
    title: "Сургалтын алба",
    desc: "Танхимын хуваарь, журам, хүсэлт",
    link: "/bsa",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
  },
  {
    num: 2,
    title: "Хөтөлбөрүүд",
    desc: "Үндсэн, Хамтарсан, BTEC, ACCA",
    link: "/programs/degree/Үндсэн",
    icon: (
      <>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </>
    ),
  },
  {
    num: 3,
    title: "Эрдэм шинжилгээ",
    desc: "Судалгаа, EBSCO, хурал",
    link: "/research",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
  },
];

const NAV_RIGHT = [
  {
    num: 4,
    title: "Оюутны хөгжил",
    desc: "Клуб, холбоо, тэмдэгт, volunteer",
    link: "/services",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
  {
    num: 5,
    title: "Голч тооцоолуур",
    desc: "GPA тооцоолох, үнэлгээ шалгах",
    link: "/gpa-calculator",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
  },
  {
    num: 6,
    title: "Холбоо барих",
    desc: "Утас, имэйл, байршил",
    link: "/bsa/others",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
];

const ArrowIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

function NavCard({ card }) {
  return (
    <Link
      to={card.link}
      className="relative flex flex-col justify-between flex-1 p-5 transition-all duration-300 bg-white border group rounded-2xl border-gray-200/80 shadow-sm hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_32px_-12px_rgba(1,50,166,0.3)] xl:p-6"
    >
      <span className="absolute text-xs font-semibold text-gray-300 top-5 right-5 tabular-nums xl:top-6 xl:right-6">
        {String(card.num).padStart(2, '0')}
      </span>

      <div>
        <div className="flex items-center justify-center w-11 h-11 mb-4 transition-colors rounded-xl bg-primary/[0.07] text-primary group-hover:bg-primary group-hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            {card.icon}
          </svg>
        </div>
        <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-primary">{card.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{card.desc}</p>
      </div>

      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary">
        Дэлгэрэнгүй
        <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

// ── Decorative circle pattern ─────────────────────────────────────────
// Decorative concentric circle lines used on the dark homepage surfaces
// (hero, globe card, newsletter stage). Purely visual.
const RADII = Array.from({ length: 18 }, (_, i) => 40 + i * 38);

function ConcentricRings({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1400 1400"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
    >
      {RADII.map((r) => (
        <circle
          key={r}
          cx="700"
          cy="700"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

// ── Blue gradient backdrop ────────────────────────────────────────────
// Shared backdrop for the search/news panel and the newsletter card:
// a clean gradient from bright UFE blue on the left into deep navy on the right.
function BlueGradient() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0a4dff] via-[#0136c4] to-[#0a1f6b]" />
  );
}

// ── Section heading ───────────────────────────────────────────────────
// Shared heading for homepage sections: small eyebrow, title and an optional "view all" link.
function SectionHeader({ eyebrow, title, linkTo, linkLabel = "Бүгдийг үзэх" }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-primary/70">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{title}</h2>
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary hover:text-primary/80 group"
        >
          {linkLabel}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      )}
    </div>
  );
}

// ── Latest news carousel ──────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};

const NEWS_LIMIT = 7;
// Cards visible at once from NEWS_DESKTOP_QUERY up (--per:5)
const NEWS_DESKTOP_CARDS = 5;
const NEWS_DESKTOP_QUERY = "(min-width: 1024px)";
// Copies of the first cards appended for the seamless loop; must cover the most cards visible at once
const NEWS_CLONES = NEWS_DESKTOP_CARDS;
const NEWS_INTERVAL = 4000;

function NewsCard({ post, active, hidden }) {
  return (
    <Link
      to={`/news/${post.id}`}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      className={`flex flex-col h-full overflow-hidden transition-colors border rounded-xl bg-white/10 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-third ${
        active ? "border-third" : "border-white/15"
      }`}
    >
      {/* Portrait frame to match the posters; anchored to the top so the poster title stays visible */}
      <span className="relative block aspect-[4/5]">
        {post.image_url && (
          <img src={post.image_url} alt="" loading="lazy" className="absolute inset-0 object-cover object-top w-full h-full" />
        )}
      </span>
      <span className="block px-2.5 pt-2 pb-2.5">
        <span className="block text-xs font-medium text-white/60 tabular-nums">{formatDate(post.created_at)}</span>
        {/* Always two lines tall (2 × leading-snug), so short titles keep the card height */}
        <span className="mt-0.5 min-h-[2.75em] text-sm font-semibold leading-snug text-white line-clamp-2">{post.title}</span>
      </span>
    </Link>
  );
}

function LatestNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Index of the leftmost card; it runs past the end onto the clones, then snaps back without animating
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [wide, setWide] = useState(() => window.matchMedia(NEWS_DESKTOP_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(NEWS_DESKTOP_QUERY);
    const onChange = (e) => setWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, created_at")
        .eq("type", "Мэдээ")
        .order("created_at", { ascending: false })
        .limit(NEWS_LIMIT);

      if (error) console.error(error);
      else setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const count = posts.length;
  const canSlide = count > 1;
  // All cards visible (only when few posts come back): the row stays put and only the active border steps
  const fitsAll = wide && count <= NEWS_DESKTOP_CARDS;
  // No sliding transition to wrap on (row fixed, or reduced motion), so wrap the index directly.
  // The "% count" also drops a clone offset left over from switching modes on resize.
  const wrapDirect = fitsAll || reducedMotion;

  // Turn the transition back on after an instant jump has been painted
  const reenableAnimation = () => requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));

  const next = () => {
    if (wrapDirect) return setIndex((i) => ((i % count) + 1) % count);
    setIndex((i) => (i >= count ? i : i + 1));
  };

  const prev = () => {
    if (wrapDirect) return setIndex((i) => ((i % count) - 1 + count) % count);
    if (index > 0) return setIndex(index - 1);
    // At the start: jump to the identical clone position, then slide back one card
    setAnimate(false);
    setIndex(count);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setAnimate(true);
      setIndex(count - 1);
    }));
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || index < count) return;
    setAnimate(false);
    setIndex(index - count);
    reenableAnimation();
  };

  useEffect(() => {
    if (!canSlide || paused || reducedMotion) return;
    // Same step as next(); autoplay never runs with reduced motion
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (fitsAll ? ((i % count) + 1) % count : i >= count ? i : i + 1));
    }, NEWS_INTERVAL);
    return () => clearInterval(id);
  }, [canSlide, paused, reducedMotion, count, fitsAll]);

  const arrowClass =
    "flex items-center justify-center w-8 h-8 transition-colors border rounded-full text-white border-white/25 hover:bg-white hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-third";

  const header = (
    <div className="flex items-center justify-between gap-4 mb-3">
      <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">Шинэ мэдээ</h2>
      <div className="flex items-center gap-1.5 shrink-0 sm:gap-2">
        {canSlide && (
          <>
            <button type="button" onClick={prev} aria-label="Өмнөх мэдээ" className={arrowClass}>
              <ArrowIcon className="w-4 h-4 rotate-180" />
            </button>
            <button type="button" onClick={next} aria-label="Дараагийн мэдээ" className={arrowClass}>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </>
        )}
        <Link
          to="/newsall"
          className="inline-flex items-center gap-1 ml-1 text-sm font-semibold sm:gap-1.5 sm:ml-2 text-white/80 transition-colors hover:text-third group"
        >
          Бүх мэдээ
          <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );

  // Cards per view: --per drives both the card width and the slide distance
  const perView = "[--per:1.5] sm:[--per:3] lg:[--per:5]";
  const cardWidth = "shrink-0 w-[calc(100%/var(--per))] pr-3";

  if (loading) {
    return (
      <div>
        {header}
        <div className={`flex -mr-3 overflow-hidden ${perView}`}>
          {Array.from({ length: NEWS_DESKTOP_CARDS }, (_, i) => (
            <div key={i} className={cardWidth}>
              <div className="overflow-hidden rounded-xl bg-white/10 animate-pulse">
                <div className="aspect-[4/5] bg-white/10" />
                <div className="h-[66px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!count) {
    return (
      <div>
        {header}
        <div className="flex items-center justify-center h-[120px] rounded-xl bg-white/10">
          <p className="text-sm text-white/70">Одоогоор мэдээ байхгүй байна</p>
        </div>
      </div>
    );
  }

  // The clones repeat the same posts, so the loop never shows anything beyond the fetched ones
  const sliding = canSlide && !fitsAll;
  const items = sliding
    ? [...posts, ...Array.from({ length: NEWS_CLONES }, (_, k) => posts[k % count])]
    : posts;
  const activeIndex = index % count;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {header}

      {/* A single post has nothing to loop through: fall back to a plain strip */}
      <div className={`-mr-3 ${perView} ${canSlide ? "overflow-hidden" : "overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]"}`}>
        <ul
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${animate && !reducedMotion ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={sliding ? { transform: `translateX(calc(${-index} * 100% / var(--per)))` } : undefined}
        >
          {items.map((post, i) => (
            <li key={`${post.id}-${i}`} className={`${cardWidth} ${canSlide ? "" : "snap-start"}`}>
              <NewsCard post={post} active={canSlide && i % count === activeIndex} hidden={i >= count} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Student newsletter (Canva MP4) videos ─────────────────────────────
// Canva-exported student newsletter issues served from public/videos.
// To add a new issue, drop the MP4 into public/videos and add its file name here (newest first).
const NEWSLETTER_FILES = ["Дугаар 3.mp4", "Дугаар 2.mp4", "Дугаар 1.mp4"];
const VIDEOS = NEWSLETTER_FILES.map((name) => `/videos/${encodeURIComponent(name)}`);
const issueName = (i) => NEWSLETTER_FILES[i].replace(/\.mp4$/i, "");

function NewsletterVideos() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const single = VIDEOS.length === 1;
  const next = () => setActive((i) => (i + 1) % VIDEOS.length);

  // Only play while the section is on screen
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active && inView) {
        // Muted autoplay is allowed by browsers; ignore rejections (e.g. power saving modes)
        video.play().catch(() => {});
      } else {
        video.pause();
        if (i !== active) video.currentTime = 0;
      }
    });
  }, [active, inView]);

  return (
    <section
      ref={containerRef}
      className="relative h-full overflow-hidden sm:min-h-[460px] lg:min-h-0 rounded-[28px] bg-primary"
      aria-labelledby="newsletter-title"
    >
      <BlueGradient />

      {/* Mobile order: title, video, issue dots, button. From sm up the source order applies (video left, text right). */}
      <div className="relative flex flex-col gap-4 p-5 sm:absolute sm:inset-0 sm:flex-row sm:items-center sm:gap-8 sm:p-7 xl:gap-10">
        {/* Video stage on the left: keeps the portrait ratio, contained so nothing is cropped or stretched */}
        <div className="relative order-2 shrink-0 self-center h-[400px] sm:order-none sm:h-full aspect-[1210/1712] sm:max-w-[55%]">
          {VIDEOS.map((src, i) => {
            const isActive = i === active;
            const isNext = i === (active + 1) % VIDEOS.length;
            return (
              <video
                key={src}
                ref={(el) => (videoRefs.current[i] = el)}
                src={src}
                muted
                playsInline
                loop={single}
                preload={isActive ? "auto" : isNext ? "metadata" : "none"}
                onEnded={single ? undefined : next}
                onError={single ? undefined : () => isActive && next()}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>

        {/* Right side: title, subtitle, issue indicators and CTA.
            Below sm it is display:contents so its children join the outer column and can be reordered around the video. */}
        <div className="contents text-white sm:flex sm:flex-col sm:items-start sm:flex-1 sm:min-w-0">
          <div className="order-1 text-center sm:order-none sm:text-left">
            <h2 id="newsletter-title" className="text-2xl font-bold leading-tight tracking-tight sm:mt-2 xl:text-3xl">
              Оюутны цахим сэтгүүл
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Оюутны амьдрал, түүх, үйл явдлууд
            </p>
          </div>

          {!single && (
            <div className="flex items-center self-center order-3 gap-3 sm:order-none sm:self-auto sm:mt-6">
              <div className="flex gap-2">
                {VIDEOS.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={issueName(i)}
                    aria-current={i === active}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-white/70">{issueName(active)}</span>
            </div>
          )}

          <Link
            to="/services/student-life"
            className="inline-flex items-center self-center order-4 gap-2 px-5 py-2.5 text-sm font-semibold transition-colors bg-white rounded-full sm:order-none sm:self-auto sm:mt-6 text-primary hover:bg-third"
          >
            Бүх дугаарыг харах
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shortcutLabel] = useState(() =>
    /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? '⌘ K' : 'Ctrl K'
  );

  // Open search modal on keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ─── 1. Search & Latest news ──────────────────────────────────────── */}
      {/* Rounded gradient panel inside the content width */}
      <section className={`${CONTAINER} pt-6 sm:pt-8`}>
        <div className="relative overflow-hidden rounded-[28px] bg-primary">
          <BlueGradient />

          <div className="relative px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
            <h1 className="sr-only">Оюутны портал</h1>

            {/* Search bar opens the existing advanced search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center w-full gap-3 px-5 text-left transition-shadow bg-white shadow-lg h-14 rounded-2xl hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-third/50"
            >
              <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="flex-1 text-sm text-gray-400 truncate sm:text-base">Хөтөлбөр, хичээл, журам хайх...</span>
              <kbd className="hidden px-2 py-1 font-sans text-xs text-gray-500 border border-gray-200 rounded-md sm:inline-block">
                {shortcutLabel}
              </kbd>
            </button>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 mt-5">
              <span className="mr-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/70">Түгээмэл хайлт</span>
              {POPULAR_SEARCHES.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.link)}
                  className="px-4 py-1.5 text-sm font-semibold text-white transition-colors border rounded-full border-white/25 hover:bg-white hover:text-navy"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Ask BSA strip: working hours and response times, Teams link on the right (below on mobile) */}
            <div className="w-full px-5 py-4 mt-5 text-sm leading-snug text-white border lg:flex lg:items-center lg:gap-6 bg-white/10 border-white/20 rounded-2xl">
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="font-semibold">Та бакалаврын сургалттай холбоотой санал хүсэлтээ энэхүү хэсгээр дамжуулан бидэнд илгээнэ үү.</p>
                {/* First column sized to its (short) text so the longer second item fits on one line */}
                <div className="grid gap-y-1 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-x-6">
                  <p>📌 Ажиллах цаг: Даваа–Баасан гарагт 09:00–18:00 цагийн хооронд.</p>
                  <p>📌 Хариу өгөх хугацаа: Ажлын өдрүүдэд ирсэн санал хүсэлтэд ажлын цагийн хүрээнд хариу өгнө.</p>
                </div>
                <p className="text-white/80">Баасан гарагийн 18:00 цагаас хойш болон амралтын өдрүүдэд ирүүлсэн санал хүсэлтийг дараагийн долоо хоногийн Даваа гарагаас эхлэн шийдвэрлэж, хариу өгнө.</p>
              </div>
              <a
                href="https://teams.cloud.microsoft/l/team/19%3Ao71pLzmipLoWBEIO740akv8rSPLWXP9y8JJ-f0Y-Nu81%40thread.tacv2/conversations?groupId=f4d2ba2f-3026-4d88-92f7-e99dd24ec5c6&tenantId=e052911d-b177-4691-809d-79e33cd33e78"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 mt-3 text-sm font-semibold transition-colors border border-transparent rounded-full shrink-0 lg:mt-0 text-navy bg-third hover:bg-third/90"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.6 1.29 4.94 3.33 6.55L4.5 21.5l3.9-1.9c1.13.33 2.34.5 3.6.5 5.52 0 10-3.94 10-8.8S17.52 3 12 3z" />
                </svg>
                Ask BSA
              </a>
            </div>

            <div className="mt-6 sm:mt-8">
              <LatestNews />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Today's schedule ──────────────────────────────────────────── */}
      <section className={`${CONTAINER} pt-6 sm:pt-8`}>
        <Calendar isHomePage={true} />
      </section>

      {/* ─── 3. Announcements + Student newsletter ────────────────────────── */}
      <section className={`${CONTAINER} py-12 sm:py-16`}>
        <div className="grid grid-cols-1 gap-6 items-stretch lg:grid-cols-2 lg:auto-rows-[minmax(460px,auto)]">
          <Announcements />
          <NewsletterVideos />
        </div>
      </section>

      {/* ─── 4. Main navigation: 3x2 cards around the globe ───────────────── */}
      <section className={`${CONTAINER} pb-12 sm:pb-16`}>
        <SectionHeader eyebrow="Үндсэн цэс"/>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.35fr_1fr] xl:gap-5">
          <div className="flex flex-col gap-4 xl:gap-5">
            {NAV_LEFT.map((card) => <NavCard key={card.num} card={card} />)}
          </div>

          {/* Center globe (first on tablet, middle on desktop) */}
          <Link
            to="/programs/degree/Олон улсын хамтарсан хөтөлбөр"
            className="group relative w-full max-w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:min-h-[550px] rounded-[20px] overflow-hidden border-2 border-third/30 hover:border-third shadow-2xl bg-gradient-to-br from-[rgba(79,134,198,0.15)] to-[rgba(15,37,64,0.6)] transition-all duration-300 hover:shadow-3xl cursor-pointer md:col-span-2 md:order-first lg:col-span-1 lg:order-none"
          >
            <div className="absolute z-10 px-[clamp(0.6rem,3vw,1rem)] py-[clamp(0.3rem,1.5vw,0.5rem)] rounded-full shadow-lg top-[4%] right-[4%] max-w-[70%] bg-gradient-to-r from-third to-third/90">
              <span className="block text-[clamp(0.625rem,2.8vw,0.875rem)] font-bold uppercase text-primary whitespace-nowrap overflow-hidden text-ellipsis">Олон улсын хөтөлбөр</span>
            </div>

            <div className="absolute left-0 right-0 z-10 px-[4%] text-center pointer-events-none bottom-[4%]">
              <div className="inline-block px-[clamp(0.9rem,4vw,1.5rem)] py-[clamp(0.5rem,2.2vw,1rem)] bg-black/30 backdrop-blur-md rounded-2xl">
                <p className="flex items-center justify-center gap-2 text-[clamp(0.75rem,3vw,0.875rem)] text-third drop-shadow">
                  <span>Дэлгэрэнгүй үзэх</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </p>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <ProgramsGlobePage />
            </div>
          </Link>

          <div className="flex flex-col gap-4 xl:gap-5">
            {NAV_RIGHT.map((card) => <NavCard key={card.num} card={card} />)}
          </div>
        </div>
      </section>

      {/* ─── 5. Video content ─────────────────────────────────────────────── */}
      <section className={`${CONTAINER} pb-12 sm:pb-16`}>
        <Vid />
      </section>
    </div>
  );
};

export default HomePage;
