import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import NewsPage from './NewsPage';
import Announcements from './Announcements';
import PosterSwiper from './Poster';
import Vid from './vid';
import Calendar from './bsa/calendar';
import ProgramsGlobePage from './miniglobe';
import AdvancedSearch from './Advancedsearch';

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Stat item ──────────────────────────────────────────────────────────────
function StatItem({ value, suffix = '', label, inView }) {
  const count = useCountUp(value, 1600, inView);
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-2xl font-black text-primary tabular-nums">
        {count}{suffix}
      </span>
      <span className="text-xs tracking-wide text-gray-600 uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
const HomePage = () => {
  const [statsRef, statsInView] = useInView(0.3);
  const [headRef, headInView] = useInView(0.1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  const handleQuickSearch = (term) => {
    const query = term.toLowerCase();
    if (query === 'хөтөлбөр') {
      window.location.href = '/programs/degree/Үндсэн';
    } else if (query === 'журам') {
      window.location.href = '/bsa/rules';
    } else if (query === 'голч') {
      window.location.href = '/gpa-calculator';
    } else if (query === 'хүсэлт') {
      window.location.href = '/bsa/req';
    }
  };

  return (
    <div>
      {/* Advanced Search Modal */}
      <AdvancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Hero Section with Poster and Search */}
      <div className="relative bg-gradient-to-b from-primary/5 via-white to-gray-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-center">
            
            {/* Poster */}
            <div className="overflow-hidden rounded-2xl">
              <PosterSwiper />
            </div>

            {/* Search & Quick Access */}
            <div className="space-y-4">
              {/* Search Bar - Click to open modal */}
              <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-primary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Хайлт хийх
                </h3>
                <button
                  onClick={handleSearchClick}
                  className="w-full px-4 py-3 pr-12 text-sm text-left text-gray-500 transition-all border-2 border-gray-200 rounded-xl hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 hover:bg-white group"
                >
                  <div className="flex items-center justify-between">
                    <span>Хөтөлбөр, хичээл, журам хайх...</span>
                    <kbd className="items-center hidden gap-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded sm:inline-flex group-hover:border-primary/50">
                      <span>⌘</span>
                      <span>K</span>
                    </kbd>
                  </div>
                </button>
                
                {/* Popular Searches */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="mb-2 text-xs text-gray-500">Түгээмэл хайлт:</p>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleQuickSearch('Хөтөлбөр')}
                      className="px-3 py-1 text-xs transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Хөтөлбөр
                    </button>
                    <button 
                      onClick={() => handleQuickSearch('Журам')}
                      className="px-3 py-1 text-xs transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Журам
                    </button>
                    <button 
                      onClick={() => handleQuickSearch('Голч')}
                      className="px-3 py-1 text-xs transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Голч
                    </button>
                    <button 
                      onClick={() => handleQuickSearch('Хүсэлт')}
                      className="px-3 py-1 text-xs transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-primary hover:text-white"
                    >
                      Хүсэлт
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Section ─────────────────────────────────────── */}
      <section className="relative px-4 py-8 bg-white sm:py-10 sm:px-6">
        
        <div ref={headRef} className="relative max-w-[1920px] mx-auto">


          {/* Navigation Layout - 3x2 Cards around Large Center Globe */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">
              
              {/* LEFT COLUMN - Cards 1, 2, 3 */}
              <div className="flex flex-col gap-4">
                {[
                  { 
                    num: 1, 
                    title: "Сургалтын алба", 
                    desc: "Танхимын хуваарь, журам, хүсэлт",
                    link: "/bsa",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    ),
                    gradient: "from-blue-500 to-blue-600"
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
                    gradient: "from-indigo-500 to-indigo-600"
                  },
                  { 
                    num: 3, 
                    title: "Эрдэм шинжилгээ", 
                    desc: "Судалгаа, EBSCO, хурал",
                    link: "/research",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    ),
                    gradient: "from-purple-500 to-purple-600"
                  }
                ].map((card) => (
                  <Link
                    key={card.num}
                    to={card.link}
                    className="relative flex flex-col p-5 overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 group rounded-2xl hover:border-primary hover:shadow-xl"
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="absolute flex items-center justify-center w-8 h-8 shadow-lg top-3 right-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
                      <span className="text-xs font-black text-white">{card.num}</span>
                    </div>
                    
                    <div className="relative z-10 flex-grow mb-3">
                      <div className="flex items-center justify-center w-12 h-12 mb-3 transition-transform bg-gradient-to-br from-primary/10 to-third/10 rounded-xl group-hover:scale-110">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          {card.icon}
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-1.5 group-hover:text-primary transition-colors">{card.title}</h3>
                      <p className="text-xs leading-relaxed text-gray-600">
                        {card.desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-primary">
                      Дэлгэрэнгүй
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CENTER - Large Globe */}
              <Link
                to="/programs"
                className="row-span-2 group relative rounded-3xl overflow-hidden border-2 border-third/30 hover:border-third shadow-2xl bg-gradient-to-br from-[rgba(79,134,198,0.15)] to-[rgba(15,37,64,0.6)] transition-all duration-300 hover:shadow-3xl cursor-pointer min-h-[550px] lg:min-h-[550px]"
              >
                <div className="absolute z-10 px-4 py-2 rounded-full shadow-lg top-6 right-6 bg-gradient-to-r from-third to-third/90">
                  <span className="text-sm font-bold  uppercase text-primary">Олон улсын хөтөлбөр</span>
                </div>
                
                <div className="absolute left-0 right-0 z-10 px-6 text-center pointer-events-none bottom-6">
                  <div className="inline-block px-6 py-4 bg-black/30 backdrop-blur-md rounded-2xl">
                    <p className="flex items-center justify-center gap-2 text-sm text-third drop-shadow">
                      <span>Дэлгэрэнгүй үзэх</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <ProgramsGlobePage/> 
                </div>
              </Link>

              {/* RIGHT COLUMN - Cards 4, 5, 6 */}
              <div className="flex flex-col gap-4">
                {[
                  { 
                    num: 4, 
                    title: "Оюутны хөгжил", 
                    desc: "Клуб, холбоо, тэмдэгт, volunteer",
                    link: "/services",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    ),
                    gradient: "from-pink-500 to-pink-600"
                  },
                  { 
                    num: 5, 
                    title: "Голч тооцоолуур", 
                    desc: "GPA тооцоолох, үнэлгээ шалгах",
                    link: "/gpa-calculator",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    ),
                    gradient: "from-green-500 to-green-600"
                  },
                  { 
                    num: 6, 
                    title: "Холбоо барих", 
                    desc: "Утас, имэйл, байршил",
                    link: "/bsa/others",
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    ),
                    gradient: "from-orange-500 to-orange-600"
                  }
                ].map((card) => (
                  <Link
                    key={card.num}
                    to={card.link}
                    className="relative flex flex-col p-5 overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 group rounded-2xl hover:border-primary hover:shadow-xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="absolute flex items-center justify-center w-8 h-8 shadow-lg top-3 right-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
                      <span className="text-xs font-black text-white">{card.num}</span>
                    </div>
                    
                    <div className="relative z-10 flex-grow mb-3">
                      <div className="flex items-center justify-center w-12 h-12 mb-3 transition-transform bg-gradient-to-br from-primary/10 to-third/10 rounded-xl group-hover:scale-110">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          {card.icon}
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 mb-1.5 group-hover:text-primary transition-colors">{card.title}</h3>
                      <p className="text-xs leading-relaxed text-gray-600">
                        {card.desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-primary">
                      Дэлгэрэнгүй
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="p-8 border shadow-lg bg-gradient-to-r from-primary/5 via-third/5 to-primary/5 rounded-2xl border-primary/10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              
              {/* Quick Links Grid */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="text-base font-bold tracking-wider uppercase text-primary">Хурдан холбоосууд</h4>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    { label: "Хүсэлт илгээх", link: "/bsa/req" },
                    { label: "Холбоо барих", link: "/bsa/others" },
                    { label: "Голч тооцоолуур", link: "/gpa-calculator" },
                    { label: "Дүрэм, журмууд", link: "/bsa/rules" }
                  ].map((item, i) => (
                    <Link
                      key={i}
                      to={item.link}
                      className="flex items-center gap-2 px-4 py-3 transition-all duration-200 bg-white shadow-sm rounded-xl hover:bg-primary hover:text-white hover:shadow-md group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-white" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://www.youtube.com/watch?v=v5rakQBnPAg&t=3s"
                className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-primary/90 rounded-xl hover:shadow-xl group whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Веб танилцуулга
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* News, Calendar & Announcements Grid */}
      <section className="px-4 py-8 sm:px-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,5fr)_minmax(0,2.5fr)] gap-6 max-w-[1920px] mx-auto">
          <div className="min-w-0">
            <NewsPage />
          </div>
          <div className="min-w-0">
            <Calendar isHomePage={true}/>
          </div>
          <div className="flex flex-col min-w-0 gap-4">
            <Announcements />
            <Vid />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;