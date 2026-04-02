import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../supabase2";

export default function VidAll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Видео контент")
        .order("created_at", { ascending: false })
        .limit(2);

      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;
    if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(new URL(url).search);
      videoId = params.get("v");
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 bg-primary border border-third/20 rounded-lg backdrop-blur-sm">
        <p className="text-white/50 text-sm">Loading videos...</p>
      </div>
    );
  }

  if (loading) return <p className="text-gray-500">Loading videos...</p>;

  return (
    <div className=" bg-primary border border-third/20 rounded-lg p-4 backdrop-blur-sm" style={{ minHeight: '250px' }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/"
          className="inline-block text-sm text-white hover:underline"
        >
          ← Буцах
        </Link>
        <h2 className="mx-12 text-sm font-bold tracking-[0.1em] uppercase text-third ">
          Видео контент
        </h2>
      </div>

      

      {/* Video Grid - 2 items stacked */}
      <div className="grid grid-cols-3 2xl:grid-cols-4 sm:grid-cols-3 gap-6">
        {posts.map((post) => {
          const embedUrl = getEmbedUrl(post.description);

          return (
            <div
              key={post.id}
              className="group bg-white/95 rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Video/Image */}
              {embedUrl && (
                <div className="relative w-full h-48 overflow-hidden bg-black">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-0"
                    />
                  )}
                  
                  <iframe
                    src={embedUrl}
                    title={post.title}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${post.image_url ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Play icon overlay when not hovered */}
                  {post.image_url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-third/90 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Title */}
              <div className="p-2.5">
                <p className="text-[0.7rem] font-bold text-primary line-clamp-2 leading-snug">
                  {post.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
