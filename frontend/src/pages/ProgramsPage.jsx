import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import { FaMapMarkerAlt, FaGlobe, FaUniversity } from "react-icons/fa";

export default function ProgramsPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data, error } = await supabase
          .from("universities")
          .select(`
            id,
            university_name,
            university_logo,
            country,
            city,
            study_duration,
            majors,
            study_language
          `)
          .order("university_name");

        if (error) throw error;
        setUniversities(data || []);
      } catch (err) {
        console.error("Error fetching universities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Ачааллаж байна...</p>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-[1920px] mx-auto">
      {!universities.length ? (
        <p className="text-center text-gray-500">Сургуулиуд олдсонгүй.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {universities.map((u) => (
            <Link
              key={u.id}
              to={`/programs/id/${u.id}`}
              className="group flex flex-col overflow-hidden bg-white rounded-xl border-2 border-gray-200 hover:border-third hover:shadow-xl transition-all duration-300"
            >
              {u.university_logo && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={u.university_logo}
                    alt={u.university_name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 text-sm font-bold text-primary bg-third rounded-full">
                      Дэлгэрэнгүй →
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">
                  {u.university_name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <FaMapMarkerAlt className="text-third flex-shrink-0" />
                  <span>{u.country}, {u.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaGlobe className="text-third flex-shrink-0" />
                  <span>{u.study_language}</span>
                </div>
                {u.study_duration && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUniversity className="text-primary flex-shrink-0" />
                    <span>{u.study_duration}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}