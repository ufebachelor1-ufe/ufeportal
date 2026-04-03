import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Dropdown from "./Dropdown";

const MainLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => { setMenuOpen(false); setOpenDropdowns({}); };
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Нүүр ", link: "/" },
    {
      label: "Хөтөлбөр",
      link: "/programs",
      items: [
        { name: "Үндсэн", link: "/programs/degree/Үндсэн" },
        { name: "Хамтарсан", link: "/programs/degree/Хамтарсан" },
        { name: "BTEC", link: "/programs/degree/BTEC" },
        { name: "Rotation", link: "/programs/degree/Rotation" },
        { name: "Интерактив", link: "/programs/degree/Интерактив" },
        { name: "АССА, CGMA", link: "/programs/degree/ACCA, CGMA" },
       { name: "Цагийн", link: "/programs/degree/Цагийн" },
        { name: "Globe view", link: "/globe" },
      ],
    },
    {
      label: "Сургалтын Алба",
      link: "/bsa",
      items: [
        { name: "Бүрэлдэхүүн", link: "/bsa/staff" },
        { name: "Бүтэц", link: "/bsa/org" },
        { name: "Журам", link: "/bsa/rules" },
        { name: "Хүсэлт гаргах", link: "/bsa/req" },
        { name: "Бусад албаны чиг үүрэг", link: "/bsa/others" },
        { name: "Чухал үйл явдал", link: "/bsa/calendar" },
      ],
    },
    {
      label: "Эрдэм Шинжилгээ",
      link: "/research",
      items: [
        { name: "Зөвлөмж", link: "/research/recommendations" },
        { name: "Бичилтийн стандарт", link: "/research/writing-standards" },
        { name: "EBSCO", link: "/research/ebsco" },
        { name: "Хурлын зар", link: "/research/conference-notices" },
        { name: "Гаргасан амжилт", link: "/research/achievements" },
        { name: "Хурлын эмхэтгэл", link: "/research/conference-proceedings" },
        { name: "СЭЗИС-ийн бүтээлийн сангийн холбоос", link: "/research/library-links" },
        { name: "Захиалгат судалгааны булан", link: "/research/custom-research" },
      ],
    },
    {
      label: "Оюутны хөгжил",
      link: "/services",
      items: [
        { name: "Тэмдэгтийн хөтөлбөр", link: "/services/merit-program" },
        { name: "Ажлын байр", link: "/services/jobs" },
        { name: "UFE Connect Center", link: "/services/connect-center" },
        { name: "Оюутны холбоо", link: "/services/student-union" },
        { name: "Клуб", link: "/services/clubs" },
        { name: "Амжилтын бүртгэл", link: "/services/achievements" },
        { name: "Оюутны гарын авлага", link: "/services/handbook" },
        { name: "Оюутны амьдрал", link: "/services/student-life" },
      ],
    },
    {
      label: "Volunteer",
      //link: "/volunteer",
      items: [
        //{ name: "Roadmap", link: "/volunteer/roadmap" },
        { name: "Нийгмийн дадлага", link: "/volunteer/social-practice" },
        { name: "Ментор оюутан", link: "/volunteer/mentor-student" },
        { name: "Ambassador оюутан", link: "/volunteer/ambassador-student" },
      ],
    },
  ];

  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 bg-primary"
        style={{
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
        }}
      >
        {/* thin accent stripe at very top */}
        <div className="h-0.5 bg-third" />

        <nav className="px-4 w-full sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 max-w-[1920px] mx-auto">

            {/* LOGO */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/Logo-h.png"
                alt="UFE Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* DESKTOP MENU */}
            <div className="items-center hidden gap-1 md:flex">
              {navItems.map((nav) =>
                nav.items ? (
                  <Dropdown key={nav.label} label={nav.label} items={nav.items} link={nav.link} />
                ) : (
                  <Link
                    key={nav.label}
                    to={nav.link}
                    className="relative px-3 py-1.5  text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group font-sans"
                  >
                    {nav.label}
                    <span className="absolute bottom-0 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left bg-third" />
                  </Link>
                )
              )}

              {/* Quick-access CTA */}
              <Link
                to="/bsa/req"
                className="ml-4 px-4 py-1.5  text-sm font-semibold rounded-full bg-third text-primary font-sans tracking-wider transition-all duration-200 hover:shadow-lg shadow-[0_2px_8px_rgba(255,240,0,0.25)]"
              >
                Хүсэлт →
              </Link>
            </div>

            {/* MOBILE BURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }}
              />
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }}
              />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className="md:hidden fixed inset-0 z-40 transition-all duration-300"
          style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute left-4 right-4 top-[72px] overflow-hidden rounded-2xl bg-primary border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
              transition: "transform 0.3s ease",
            }}
          >
            {/* Gold accent line */}
            <div className="h-0.5 bg-third" />

            <nav className="flex flex-col py-2">
              {navItems.map((nav) =>
                nav.items ? (
                  <div key={nav.label}>
                    <button
                      onClick={() => toggleDropdown(nav.label)}
                      className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/5 transition-colors font-sans"
                    >
                      {nav.label}
                      <span
                        className="text-sm text-third transition-transform duration-200"
                        style={{
                          transform: openDropdowns[nav.label] ? "rotate(45deg)" : "none",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {openDropdowns[nav.label] && (
                      <div className="bg-black/20">
                        {nav.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.link}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-8 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors font-sans"
                          >
                            <span className="w-1 h-1 rounded-full bg-third flex-shrink-0" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={nav.label}
                    to={nav.link}
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-white transition-colors font-sans"
                  >
                    {nav.label}
                  </Link>
                )
              )}

              {/* Mobile CTA */}
              <div className="px-5 py-4 mt-1 border-t border-white/[0.08]">
                <Link
                  to="/bsa/req"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-xl text-sm font-bold bg-third text-primary font-mono transition-all"
                >
                  Хүсэлт илгээх →
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-white">

        {/* Gold top border */}
        <div className="h-0.5 bg-third" />

        <div className="px-4 sm:px-6 lg:px-8 pt-14 pb-8 w-full">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

              {/* Brand column */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="/logo-w.png" alt="UFE Logo" className="max-w-40 object-contain" />
                </div>
                
                <div className="space-y-1.5 text-sm text-white/60">
                  <p>БЗД 3-р хороо, Энхтайваны өргөн чөлөө-5, 13381, Ш/H: Улаанбаатар-49</p>
                  <p className="text-third">77771100, 77737777</p>
                  <p>bachelor-program@ufe.edu.mn</p>
                </div>
              </div>

              {/* Quick links */}
              <div>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-third font-sans">
                  Чухал холбоос
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Голч тооцоолуур", to: "/gpa-calculator" },
                    { label: "Богино хугацааны сургалт", to: "https://training.ufe.edu.mn/" },
                    { label: "Infosys", to: "https://infosys.ufe.edu.mn/" },
                    { label: "online.ufe.edu.mn", to: "https://online.ufe.edu.mn/" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-white/65 hover:text-third hover:pl-1 transition-all duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requests */}
              <div>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-transparent font-sans">
                  Чухал холбоос
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Оюутны хүсэлтийн маягтууд", to: "/bsa/req" },
                    { label: "Холбоо барих", to: "/bsa/others" },
                    { label: "Календар", to: "/calendar" },
                    { label: "Журам", to: "/bsa/rules" },
                  ].map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-sm text-white/65 hover:text-third hover:pl-1 transition-all duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social + programs quick-nav */}
              <div>
                <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-third font-sans">
                  Хөтөлбөр
                </h3>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-8">
                  {[
                    "Үндсэн",
                    "Хамтарсан",
                    "BTEC",
                    "Rotation",
                    "Интерактив",
                    "ACCA, CGMA",
                    "Цагийн",
                  ].map((name) => (
                    <li key={name}>
                      <Link
                        to={`/programs/degree/${name}`}
                        className="text-sm text-white/65 hover:text-third hover:pl-1 transition-all duration-200"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Social icons */}
                <div className="flex gap-3">
                  {[
                    { Icon: FaFacebookF, href: "https://www.facebook.com/ufeundergraduateprogram" },
                    { Icon: FaInstagram, href: "https://www.instagram.com/ufe.edu.mn/" },
                    { Icon: FaTiktok, href: "https://www.tiktok.com/@ufe.edu.mn" },
                    { Icon: FaYoutube, href: "https://www.youtube.com/@ufemedia" },
                    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/school/ufemongolia/" },
                  ].map(({ Icon, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.08] text-white/60 hover:bg-third hover:text-primary transition-all duration-200"
                    >
                      <Icon size={13} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6 text-sm border-t border-white/[0.08] text-white/35 font-sans">
              <span>
                © 2026 Бакалаврын Сургалтын Алба — UFE
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;