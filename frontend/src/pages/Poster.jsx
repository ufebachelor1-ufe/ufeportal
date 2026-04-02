import { useEffect, useState } from "react";
import { supabase2 } from "../supabase2";

export default function PosterSwiper() {
  const [posters, setPosters] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Fetch posters
  useEffect(() => {
    const fetchPosters = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, image_url")
        .eq("type", "Пин постер");

      if (error) return console.error(error);

      setPosters(data.map((item) => item.image_url));
    };
    fetchPosters();
  }, []);

  // Auto-cycle
  useEffect(() => {
    if (!posters.length) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posters.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [posters]);

  // Manual navigation
  const changeSlide = (direction) => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) =>
        direction === "prev"
          ? (prev - 1 + posters.length) % posters.length
          : (prev + 1) % posters.length
      );
      setFade(true);
    }, 500);
  };

  if (!posters.length) return null;

  return (
    <div className="relative flex justify-center w-full max-w-7xl py-8 bg-gray-100 mx-auto">
      {/* Poster container with landscape aspect ratio */}
      <div className="relative  w-full  aspect-[18/9] rounded-xl overflow-hidden shadow-2xl ">
        <img
          src={posters[current]}
          alt={`Poster ${current + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out
            ${fade ? "opacity-100" : "opacity-0"}`}
        />

        {/* Left Arrow */}
        <button
          onClick={() => changeSlide("prev")}
          className="absolute p-3 text-3xl text-white transition transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/30 hover:bg-black/50"
        >
          &#10094;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => changeSlide("next")}
          className="absolute p-3 text-3xl text-white transition transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/30 hover:bg-black/50"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
