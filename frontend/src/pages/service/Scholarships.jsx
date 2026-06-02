import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../../supabase2";

// 2026 оны бүртгэлийн календарь — [нэр, курс, нээлттэй сарууд]
const CAL = [
  ["“АПУ” инновацлаг ур чадварын тэтгэлэгт хөтөлбөр", "1-4", [3, 4, 5]],
  ["Шударга Ёсыг Бадраах сангийн тэтгэлэг", "1-4", [4, 5, 6]],
  ["Бадраа сан", "1-4", [5]],
  ["Зориг сангийн нэрэмжит тэтгэлэг", "1-4", [5, 6]],
  ["Зориг сан + Швейцар", "1-4", [6]],
  ["Education Fund Scholarship", "1-4", [8, 9]],
  ["Шинэ оюутны тэтгэлэг (ХААН банк)", "1", [8, 9]],
  ["Монгол Улсын Засгийн газрын тэтгэлэг", "1-4", [8, 9, 10]],
  ["Khan Bank Scholarship", "2-4", [9, 10]],
  ["МУИС – Сургалтын тэтгэлэг", "1-4", [9]],
  ["ХААН Банк – Шилдэг оюутны тэтгэлэг", "2-4", [9, 10]],
  ["Худалдаа хөгжлийн банк – Дадлагын тэтгэлэг", "3-4", [9]],
  ["Ерөнхийлөгчийн нэрэмжит тэтгэлэг", "2-4", [9]],
  ["Ерөнхий сайдын нэрэмжит тэтгэлэг", "2-4", [9]],
  ["ХААН Банк – Шинэ оюутан", "1", [9]],
  ["ХасБанк – “NextGen” тэтгэлэг", "2-4", [9]],
  ["СЭЗИС-ийн Ректорын нэрэмжит тэтгэлэг", "1-4", [9]],
  ["“Дотоодын тэтгэлэгт хөтөлбөр” (Оюу толгой)", "1-4", [9, 10]],
  ["Оюутны тэтгэлэгт хөтөлбөр (ХасБанк)", "2-4", [9, 10]],
  ["Оюутны тэтгэлэгт хөтөлбөр (MCS)", "1-4", [9, 10]],
  ["МОННИС Группийн нэрэмжит тэтгэлэг", "1-4", [9, 10]],
  ["Петровис - “Ирээдүй” оюутны тэтгэлэгт хөтөлбөр", "1-4", [9, 10]],
  ["“Эрдэнэс-Тавантолгой”-н нэрэмжит тэтгэлэг", "1-4", [9, 10, 11]],
  ["Golomt Bank Scholarship", "2-4", [10]],
  ["Голомт Банк – Оюутны тэтгэлэг", "2-4", [10]],
  ["Төрийн банк – Оюутны дэмжлэг", "2-4", [10]],
  ["Оюу толгой – Дотоодын тэтгэлэг", "1-4", [10]],
  ["МОННИС – Ирээдүйн манлайлагч", "1-4", [10]],
  ["Голомт банк – “Ирээдүйн санхүүч”", "2-4", [10]],
  ["Таван Богд Групп – Оюутны тэтгэлэг", "1-4", [10]],
  ["MCS Групп – Оюутны хөгжлийн тэтгэлэг", "1-4", [10]],
  ["Голомт банкны нэрэмжит тэтгэлэг", "2-4", [10]],
  ["Нийслэлийн тэтгэлэг", "1-4", [10, 11]]
];
const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
// "Идэвхтэй тоо" мөрийг дата-аас бодож гаргана (гар оролт хэрэггүй)
const COUNTS = MONTHS.map((_, m) => CAL.filter(([, , ms]) => ms.includes(m + 1)).length);

export default function Scholarships() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [calQuery, setCalQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Тэтгэлгийн зар")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) console.error(error);
      else setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % Math.min(posts.length, 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [posts.length]);

  const featuredPosts = posts.slice(0, 3);
  const listPosts = posts.slice(3, 7);

  const q = calQuery.trim().toLowerCase();
  const calRows = CAL.filter(([name]) => !q || name.toLowerCase().includes(q));

  return (
    <div className="space-y-8">

      {/* Section 1: Registration Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third"></div>
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Амжилт тэтгэлгийн бүртгэл</h2>
          <p className="text-white/80 text-base leading-relaxed max-w-4xl mb-6">
            Оюутан та өөрийн гаргасан амжилт, тэтгэлгээ бүртгүүлснээр СЭЗИС-ийн Оны шилдэг оюутан, Онцлох төгсөгчид нэрээ дэвшүүлэх, гадаадын их дээд сургуульд дэвшин суралцах, болон сургуулийн захиргааны шагналд тодорхойлуулах, цаашлаад хөтөлбөр хэрэгжүүлэгч нэгжийн амжилтыг бататгах, улмаар СЭЗИС-ийн нэр хүнд, үнэ цэнийг нэмэгдүүлэх ач холбогдолтой.
          </p>
          <a
            href="https://forms.office.com/pages/responsepage.aspx?id=HZFS4HexkUaAnXnjPNM-eBaMVZK3QeRLlJFKXKxQgaNUOTg4T0xYTFlLODZFOUFHQUFHRFRaTTBJWS4u&route=shorturl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Бүртгэл
          </a>
        </div>
      </section>

      {/* Section 3 (moved up): News + Video side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Left: News */}
        <div className="p-4 border rounded-lg bg-primary border-third/20 backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center flex-1 gap-2">
              <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-third">
                Тэтгэлгийн мэдээ
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-third/40 to-transparent" />
            </div>
            <Link
              to="/newsall?type=Тэтгэлгийн зар"
              className="ml-2 px-3 py-2 text-xs font-bold text-primary bg-third rounded transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wider whitespace-nowrap"
            >
              Бүгдийг үзэх
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 border-4 rounded-full border-third border-t-transparent animate-spin"></div>
                <p className="text-sm text-white/50">Мэдээ уншиж байна...</p>
              </div>
            </div>
          ) : (
            <>
              {featuredPosts.length > 0 && (
                <div className="relative mb-4 overflow-hidden rounded-lg group" style={{ height: "200px" }}>
                  {featuredPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      to={`/news/${post.id}`}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === featuredIndex
                          ? "opacity-100 translate-x-0"
                          : index < featuredIndex
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                      }`}
                    >
                      {post.image_url && (
                        <img src={post.image_url} alt={post.title} className="object-cover w-full h-full" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-bold rounded bg-third/90 backdrop-blur-sm animate-pulse">
                            ШИНЭ
                          </span>
                        </div>
                        <h3 className="mb-1 text-base font-bold line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-white/70">
                          {new Date(post.created_at).toLocaleDateString("mn-MN")}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {featuredPosts.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.preventDefault(); setFeaturedIndex(index); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === featuredIndex ? "w-6 bg-third" : "w-1.5 bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.preventDefault(); setFeaturedIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length); }}
                    className="absolute flex items-center justify-center w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 rounded-full opacity-0 left-2 top-1/2 bg-white/20 backdrop-blur-sm group-hover:opacity-100 hover:bg-white/30"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setFeaturedIndex((prev) => (prev + 1) % featuredPosts.length); }}
                    className="absolute flex items-center justify-center w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 rounded-full opacity-0 right-2 top-1/2 bg-white/20 backdrop-blur-sm group-hover:opacity-100 hover:bg-white/30"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {listPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/news/${post.id}`}
                    className="flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 rounded-lg shadow-md group bg-white/95 hover:shadow-xl hover:-translate-y-1"
                    style={{ animation: `slideInUp 0.4s ease-out ${index * 0.1}s both` }}
                  >
                    {post.image_url && (
                      <div className="relative w-full h-20 overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-primary/80 group-hover:opacity-100">
                          <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded text-primary bg-third">
                            Унших
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    )}
                    <div className="flex-1 p-2">
                      <p className="text-xs font-bold transition-colors text-primary line-clamp-2 group-hover:text-third">
                        {post.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <style>{`
            @keyframes slideInUp {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>

        {/* Right: Video Guide */}
        <div className="bg-primary rounded-lg border border-third/20 p-4 flex flex-col lg:col-span-3">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-third">
              Бүртгүүлэх заавар
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-third/40 to-transparent" />
          </div>
          <p className="text-white/50 text-xs mb-3">СЭЗИС-ийн оюутнуудын амжилтын тухай</p>
          <div className="rounded-lg overflow-hidden bg-black/30 border border-white/20">
            <video
              controls
              className="w-full"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source
                src="https://ypjnsfqpyszcnzibfitt.supabase.co/storage/v1/object/public/images/videos/Scholarship.mp4"
                type="video/mp4"
              />
              Таны browser видео дэмжихгүй байна.
            </video>
          </div>
        </div>

      </div>

      {/* Section 2 (moved down): Static scholarship images */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Тэтгэлгийн мэдээлэл</h3>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="overflow-hidden rounded-lg">
              <img src="/Rector.png" alt="Зураг 1" className="object-contain w-full" />
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="overflow-hidden rounded-lg">
              <img src="/other.png" alt="Зураг 2" className="object-contain w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Бүртгэлийн календарь (responsive) */}
      <section className="p-5 bg-white border border-gray-200 rounded-2xl sm:p-8">
        <h3 className="mb-1 text-xl font-bold sm:text-2xl text-primary">2026 оны бүртгэлийн календарь</h3>
        <p className="mb-5 text-sm text-gray-500">Алтан цэг = бүртгэл нээлттэй сар</p>

        <div className="relative max-w-md mb-5">
          <svg className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={calQuery}
            onChange={(e) => setCalQuery(e.target.value)}
            placeholder="Тэтгэлгийн нэрээр хайх..."
            className="w-full py-2.5 pl-10 pr-4 text-sm transition-colors border border-gray-200 rounded-lg outline-none bg-gray-50 focus:border-primary focus:bg-white"
          />
        </div>

        {calRows.length === 0 ? (
          <p className="py-8 text-sm text-center text-gray-400">Хайлтанд тохирох тэтгэлэг олдсонгүй.</p>
        ) : (
          <>
            {/* ── Mobile: карт хэлбэр (нээлттэй саруудыг таблетаар) ── */}
            <div className="space-y-3 sm:hidden">
              {calRows.map(([name, course, months], i) => (
                <div key={i} className="p-3 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold leading-snug text-primary">{name}</p>
                    <span className="shrink-0 px-2 py-0.5 text-[11px] font-bold rounded-full bg-primary/10 text-primary whitespace-nowrap">
                      {course} курс
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {months.map((m) => (
                      <span key={m} className="px-2 py-1 text-[11px] font-bold rounded text-primary bg-third">
                        {m}-р сар
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop / tablet: бүтэн хүснэгт ── */}
            <div className="hidden overflow-x-auto border border-gray-200 sm:block rounded-xl">
              <table className="w-full text-xs border-collapse min-w-[860px]">
                <thead>
                  <tr className="text-white bg-primary">
                    <th className="sticky left-0 z-10 px-3 py-2.5 font-bold text-left bg-primary">Тэтгэлэг</th>
                    <th className="px-2 py-2.5 font-bold">Курс</th>
                    {MONTHS.map((m) => (
                      <th key={m} className="px-1.5 py-2.5 text-[10px] font-medium text-white/80">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calRows.map(([name, course, months], i) => (
                    <tr key={i} className={`${i % 2 ? "bg-gray-50" : "bg-white"} hover:bg-third/10 transition-colors`}>
                      <td className={`sticky left-0 z-10 px-3 py-2 font-medium text-gray-700 border-t border-r border-gray-100 ${i % 2 ? "bg-gray-50" : "bg-white"}`}>
                        {name}
                      </td>
                      <td className="px-2 py-2 text-center text-gray-500 border-t border-gray-100">{course}</td>
                      {MONTHS.map((_, mi) => (
                        <td key={mi} className="px-1.5 py-2 text-center border-t border-gray-100">
                          {months.includes(mi + 1) && <span className="inline-block w-2.5 h-2.5 rounded-full bg-third shadow-sm" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {!q && (
                    <tr className="font-bold bg-primary/5">
                      <td className="sticky left-0 z-10 px-3 py-2.5 text-primary bg-primary/5 border-t-2 border-third">Идэвхтэй тоо</td>
                      <td className="border-t-2 border-third"></td>
                      {COUNTS.map((n, i) => (
                        <td key={i} className="px-1.5 py-2.5 text-center text-primary border-t-2 border-third">{n}</td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Mobile: сар бүрийн идэвхтэй тоо (хүснэгт оронд) ── */}
            {!q && (
              <div className="mt-4 sm:hidden">
                <p className="mb-2 text-xs font-bold tracking-wider uppercase text-primary">Сар бүрийн идэвхтэй тоо</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {COUNTS.map((n, i) => (
                    <div
                      key={i}
                      className={`flex flex-col items-center py-1.5 rounded ${n ? "bg-primary/10 text-primary font-bold" : "bg-gray-100 text-gray-400"}`}
                    >
                      <span className="text-[10px]">{i + 1}-р</span>
                      <span className="text-sm">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <p className="mt-3 text-xs text-gray-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-third align-middle mr-1" />
          Бүртгэл нээлттэй сар
        </p>
        <p className="mt-4 text-xs italic text-gray-400">
          Тэмдэглэл: Бүртгэлийн хугацаа жил бүр өөрчлөгдөж болзошгүй тул албан ёсны эх сурвалжаас баталгаажуулна уу.
        </p>
      </section>

    </div>
  );
}