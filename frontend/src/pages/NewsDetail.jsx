import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase2 } from "../supabase2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";

export default function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("title, description, image_url, images, created_at")
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

  if (loading) return <p className="mt-10 text-center text-gray-500">Loading news...</p>;
  if (!post) return <p className="mt-10 text-center text-red-500">News not found.</p>;

  const images = post.images || [];

  return (
    <div className="max-w-3xl p-6 mx-auto">
      {/* Magazine-style bordered container */}
      <div className="p-6 space-y-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
        
        {/* Top bar: Back button + date */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            ← Буцах
          </Link>
          {post.created_at && (
            <span className="flex items-center gap-1 font-medium tracking-wide text-blue-600 uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">
          {post.title}
        </h1>

        {post.image_url && (
          <div className="mt-4 overflow-hidden rounded-lg shadow-md bg-black flex items-center justify-center">
            <img
              src={post.image_url}
              alt={post.title}
              className="max-w-full max-h-[480px] object-contain"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-base leading-relaxed text-justify text-gray-700 whitespace-pre-line indent-6">
          {post.description}
        </p>

        {/* Swiper for extra images */}
        {images.length > 0 && (
          <div className="pt-6">
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={false}
              watchSlidesProgress={false}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full overflow-hidden shadow-lg rounded-xl"
              style={{ overflow: 'hidden' }}
            >
              {images.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full"
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="relative w-full h-[420px] sm:h-[520px] bg-white rounded-lg overflow-hidden"
                    style={{ overflow: 'hidden' }}
                  >
                    <img
                      src={img}
                      alt={`gallery-${index}`}
                      className="block object-contain w-full h-full"
                      style={{ display: 'block', overflow: 'hidden' }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom dash pagination */}
            <div className="flex justify-center mt-4">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-8 h-1 mx-1 rounded-full transition-all ${
                    idx === activeIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}