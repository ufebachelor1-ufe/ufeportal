import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../../supabase2";

export default function NewsAll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "БСА Зар")
        .order("created_at", { ascending: false })


      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading news...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Сүүлийн мэдээ</h2>
      {/* Back button */}
      <Link
        to="/bsa"
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        ← Буцах
      </Link>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/${post.id}`}   // ✅ navigate to page
            className="flex flex-col h-full p-3 transition bg-white rounded shadow hover:shadow-md"
          >
            {post.image_url && (
              <div className="relative w-full h-32 mb-2 group">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-32 rounded"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded opacity-0 bg-opacity-40 group-hover:opacity-100">
                  <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                    Унших
                  </button>
                </div>
              </div>
            )}

            <p className="flex-1 text-base font-semibold line-clamp-3">
              {post.title}
            </p>
            {post.description && (
            <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-5">
              {post.description}
            </p>   
          )}
          <div className="mt-2 text-sm font-medium text-primary">
                Дэлгэрэнгүй →
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
