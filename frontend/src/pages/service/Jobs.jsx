import { useEffect, useState } from "react";
import { supabase2 } from "../../supabase2";
import { MdWork } from "react-icons/md";
import { FaThumbtack } from "react-icons/fa";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description, image_url, created_at")
        .eq("type", "Ажлын байрны зар")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setJobs(data);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Уншиж байна...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header>
        <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
          <MdWork className="text-3xl text-green-600" />
          Ажлын байрны зар
        </h2>
        <p className="mt-2 text-gray-600">
          Оюутан, төгсөгчдөд зориулсан ажлын байр, дадлага, ажилд зуучлах зарууд.
        </p>
      </header>

      {/* Empty state */}
      {jobs.length === 0 && (
        <p className="text-gray-500">
          Одоогоор ажлын байрны зар байхгүй байна.
        </p>
      )}

      {/* Job posts */}
      {jobs.map((post, index) => (
        <article
          key={post.id}
          className={`p-6 bg-white border rounded-2xl shadow-sm transition
            hover:shadow-md ${
              index === 0 ? "ring-2 ring-green-500" : ""
            }`}
        >
          {/* Latest badge */}
          {index === 0 && (
            <div className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              <FaThumbtack className="text-green-500" />
              Шинэ ажлын зар
            </div>
          )}

          {/* Image */}
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="object-cover w-full mb-4 rounded-xl max-h-72"
            />
          )}

          {/* Title */}
          <h3 className="mb-2 text-2xl font-bold text-gray-800">
            {post.title}
          </h3>

          {/* Date */}
          {post.created_at && (
            <p className="mb-4 text-sm text-gray-500">
              Нийтэлсэн:{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          )}

          {/* Description */}
          <p className="leading-relaxed text-gray-700 whitespace-pre-line">
            {post.description}
          </p>
        </article>
      ))}
    </div>
  );
}
