import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../supabase2";

export default function EnhancedNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Мэдээ")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Auto-rotate featured news
  useEffect(() => {
    if (posts.length > 0) {
      const interval = setInterval(() => {
        setFeaturedIndex(prev => (prev + 1) % Math.min(posts.length, 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [posts.length]);

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-primary border-third/20 backdrop-blur-sm" style={{ minHeight: '550px' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 border-4 rounded-full border-third border-t-transparent animate-spin"></div>
            <p className="text-sm text-white/50">Мэдээ уншиж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredPosts = posts.slice(0, 3);
  const listPosts = posts.slice(3, 8);

  return (
    <div className="p-4 border rounded-lg bg-primary border-third/20 backdrop-blur-sm" style={{ minHeight: '550px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3"> 
        <div className="flex items-center flex-1 gap-2">
          <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-third">
            Шинэ мэдээ
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-third/40 to-transparent" />
        </div>
        
        <Link 
          to="/newsall"
          className="ml-2 px-3 py-1.5 text-xs font-bold text-primary bg-third rounded transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wider whitespace-nowrap"
        >
          Бүгдийг үзэх →
        </Link>
      </div>

      {/* Featured News Carousel */}
      {featuredPosts.length > 0 && (
        <div className="relative mb-3 overflow-hidden rounded-lg group" style={{ height: '200px' }}>
          {featuredPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/news/${post.id}`}
              className={`absolute inset-0 transition-all duration-700 ${
                index === featuredIndex
                  ? 'opacity-100 translate-x-0'
                  : index < featuredIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-bold rounded bg-third/90 backdrop-blur-sm animate-pulse">
                    ШИНЭ
                  </span>
                </div>
                <h3 className="mb-1 text-base font-bold line-clamp-2">{post.title}</h3>
                <p className="text-xs text-white/70 line-clamp-1">
                  {new Date(post.created_at).toLocaleDateString('mn-MN')}
                </p>
              </div>
            </Link>
          ))}

          {/* Carousel Dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setFeaturedIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === featuredIndex 
                    ? 'w-6 bg-third' 
                    : 'w-1.5 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setFeaturedIndex(prev => (prev - 1 + featuredPosts.length) % featuredPosts.length);
            }}
            className="absolute flex items-center justify-center w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 rounded-full opacity-0 left-2 top-1/2 bg-white/20 backdrop-blur-sm group-hover:opacity-100 hover:bg-white/30"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setFeaturedIndex(prev => (prev + 1) % featuredPosts.length);
            }}
            className="absolute flex items-center justify-center w-8 h-8 text-white transition-all duration-300 -translate-y-1/2 rounded-full opacity-0 right-2 top-1/2 bg-white/20 backdrop-blur-sm group-hover:opacity-100 hover:bg-white/30"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      
      {/* News Grid - 2 columns */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {listPosts.map((post, index) => (
          <Link
            key={post.id}
            to={`/news/${post.id}`}
            className="flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 rounded-lg shadow-md group bg-white/95 hover:shadow-xl hover:-translate-y-1"
            style={{
              animation: `slideInUp 0.4s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Image */}
            {post.image_url && (
              <div className="relative w-full h-24 overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-primary/80 group-hover:opacity-100">
                  <span className="px-3 py-1 text-sm font-bold tracking-wider uppercase rounded text-primary bg-third">
                    Унших
                  </span>
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            {/* Title */}
            <div className="flex-1 p-2.5">
              <p className="text-sm font-bold transition-colors text-primary line-clamp-2 group-hover:text-third">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}