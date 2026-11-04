import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../supabase2";

const NEW_WITHIN_DAYS = 7;

const formatPreview = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getMonth() + 1}-р сарын ${d.getDate()}`;
};

const isRecent = (iso) => Date.now() - new Date(iso).getTime() < NEW_WITHIN_DAYS * 24 * 60 * 60 * 1000;

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description, created_at")
        .eq("type", "Зар")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) console.error(error);
      else setAnnouncements(data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full p-5 bg-white border shadow-sm sm:p-7 rounded-3xl border-gray-200/80">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-5">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-primary/70">Бакалаврын сургалтын алба</p>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Сургалтын албаны зар</h2>
        </div>
        <Link
          to="/allan"
          className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary hover:text-primary/80 group"
        >
          Бүгдийг үзэх
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : announcements.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {announcements.map((a, i) => {
            const recent = isRecent(a.created_at);
            const featured = i === 0;
            return (
              <li key={a.id}>
                <Link
                  to={`/news/${a.id}`}
                  className={`group flex items-start gap-4 p-4 transition-colors rounded-2xl ${
                    featured ? "bg-primary/[0.05] hover:bg-primary/[0.08]" : "hover:bg-gray-50"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 w-1 self-stretch rounded-full shrink-0 ${featured ? "bg-primary" : "bg-gray-200 group-hover:bg-primary/40"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 tabular-nums">{formatDate(a.created_at)}</span>
                      {recent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-third text-primary">
                          Шинэ
                        </span>
                      )}
                    </div>
                    <h3 className={`font-semibold leading-snug text-gray-900 group-hover:text-primary line-clamp-2 ${featured ? "text-base" : "text-sm"}`}>
                      {a.title}
                    </h3>
                    {featured && a.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500 line-clamp-2">
                        {formatPreview(a.description)}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 mt-1 text-gray-300 transition-all shrink-0 group-hover:text-primary group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center flex-1 py-12">
          <p className="text-sm text-gray-500">Одоогоор зар байхгүй байна</p>
        </div>
      )}
    </div>
  );
}
