import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase2 } from "../supabase2";

export default function Allan() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, image_url, description, created_at")
        .eq("type", "Зар")
        .order("created_at", { ascending: false })


      if (error) console.error(error);
      else setPosts(data);

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading news...</p>;

  return (
    <div className="space-x-10">
      <h2 className="text-lg font-bold text-gray-800 mx-10 mt-6">Зар</h2>
      {/* Back button */}
      <Link
        to="/"
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        ← Буцах
      </Link>
      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/news/${post.id}`}
            /* Added 'group' and 'relative' here to anchor the overlay to the whole card */
            className="relative group flex flex-col h-full p-3 transition bg-white rounded shadow hover:shadow-md overflow-hidden"
          >
            {/* Image Section */}
            {post.image_url && (
              <div className="w-full h-32 mb-2">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-32 rounded"
                />
              </div>
            )}

            {/* Title Section */}
            <p className="flex-1 text-base font-semibold line-clamp-3">
              {post.title}
            </p>

            {/* Hover overlay - Now outside the image conditional */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-40 rounded opacity-0 group-hover:opacity-100">
              <button className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                Унших
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
