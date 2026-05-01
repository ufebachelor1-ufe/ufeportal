import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";

export default function Dropdown({ label, items, link }) {
  return (
    <div className="relative group">

      {/* Trigger */}
      {link ? (
        <Link
          to={link}
          className="relative flex items-center gap-1.5 px-3 py-1.5  text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
        >
          {label}

          {/* Chevron */}
          <svg
            className="w-3 h-3 text-yellow-300 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>

          {/* Underline */}
          <span className="absolute bottom-0 left-3 right-3 h-px bg-yellow-300 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"/>
        </Link>
      ) : (
        <button className="relative flex items-center gap-1.5 px-3 py-1.5  text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white bg-transparent border-none">
          {label}

          <svg
            className="w-3 h-3 text-yellow-300 transition-transform duration-300 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>

          <span className="absolute bottom-0 left-3 right-3 h-px bg-yellow-300 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"/>
        </button>
      )}

      {/* Panel */}
      <div className="absolute left-0 top-full z-50 w-56 pt-2 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">

        {/* Arrow notch */}
        <div className="ml-4 w-3 h-3 rotate-45 bg-primary border border-yellow-400/30 border-b-0 border-r-0 -mb-1 relative z-10"/>

        {/* Menu */}
        <div className="bg-primary border border-yellow-400/20 rounded-xl shadow-2xl overflow-hidden">

          {/* Gold top accent */}
          <div className="h-[2px] bg-gradient-to-r from-yellow-300 via-yellow-400 to-transparent"/>

          <ul className="py-2">

            {items.map((item, i) => {
              const isGlobe = item.link === "/globe";

              return (
                <li key={item.name}>

                  {isGlobe && (
                    <div className="my-1 mx-4 h-px bg-white/10"/>
                  )}

                  <Link
                    to={item.link}
                    className={`group/item flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150
                    ${isGlobe
                      ? "text-yellow-300 hover:text-yellow-300"
                      : "text-white/70 hover:text-white"}
                    hover:bg-white/5 hover:pl-5`}
                  >

                    {/* Icon / number */}
                    {isGlobe ? (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-300">
                        <FaGlobe size={10}/>
                      </span>
                    ) : (
                      <span className="text-[10px] font-black tabular-nums text-white/20 min-w-[16px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}

                    <span className={isGlobe ? "font-bold" : "font-medium"}>
                      {item.name}
                    </span>

                    {/* Arrow */}
                    <svg
                      className="ml-auto w-3 h-3 opacity-0 -translate-x-1 transition-all duration-150 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>

                  </Link>
                </li>
              );
            })}

          </ul>
        </div>
      </div>

    </div>
  );
}