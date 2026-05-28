import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../../supabase2";

export default function Scholarships() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

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

      {/* Section 2: Static scholarship images */}
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

      {/* Section 3: News + Video side by side */}
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
    </div>
  );
}