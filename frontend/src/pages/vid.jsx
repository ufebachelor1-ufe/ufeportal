import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../supabase2";

// Accepts youtube.com/watch?v=, youtu.be/, youtube.com/shorts/ and /embed/ links
const getVideoId = (url) => {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const match = u.pathname.match(/\/(shorts|embed)\/([^/?]+)/);
    return match ? match[2] : null;
  } catch {
    return null;
  }
};

export default function Vid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Видео контент")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const videos = posts
    .map((post) => ({ ...post, videoId: getVideoId(post.description) }))
    .filter((post) => post.videoId);

  return (
    <div className="flex flex-col h-full p-4 bg-white border shadow-sm sm:p-5 lg:p-6 rounded-3xl border-gray-200/80">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-4">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-primary/70">Медиа</p>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Видео контент</h2>
        </div>
        <Link
          to="/vidall"
          className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary hover:text-primary/80 group"
        >
          Бүгдийг үзэх
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-video rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((post) => {
            const thumb = post.image_url || `https://img.youtube.com/vi/${post.videoId}/hqdefault.jpg`;
            const playing = playingId === post.id;
            return (
              <div key={post.id} className="min-w-0">
                <div className="relative overflow-hidden bg-black aspect-video rounded-xl">
                  {playing ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${post.videoId}?autoplay=1&rel=0`}
                      title={post.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayingId(post.id)}
                      aria-label={`${post.title} — тоглуулах`}
                      className="absolute inset-0 group"
                    >
                      <img
                        src={thumb}
                        alt=""
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute inset-0 transition-colors bg-black/20 group-hover:bg-black/35" />
                      <span className="absolute flex items-center justify-center transition-transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg left-1/2 top-1/2 w-14 h-14 bg-white/95 group-hover:scale-105">
                        <svg className="w-5 h-5 ml-0.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug text-gray-900 line-clamp-2">{post.title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 py-12">
          <p className="text-sm text-gray-500">Одоогоор видео байхгүй байна</p>
        </div>
      )}
    </div>
  );
}
