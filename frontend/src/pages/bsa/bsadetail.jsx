import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase2 } from "../../supabase2";

export default function BSADetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("title, description, image_url, created_at")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading news...</p>;
  }

  if (!post) {
    return <p className="text-red-500">News not found.</p>;
  }

  return (
    <div className="max-w-3xl p-4 mx-auto space-y-4">
      {/* Back button */}
      <Link
        to="/bsa"
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        ← Буцах
      </Link>

      {/* Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="object-cover h-full rounded auto w-"
        />
      )}
    
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">
        {post.title}
      </h1>

      {/* Date */}
      {post.created_at && (
        <p className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      )}

      {/* Content */}
      <p className="leading-relaxed text-gray-700 whitespace-pre-line">
        {post.description}
      </p>
    </div>
  );
}
