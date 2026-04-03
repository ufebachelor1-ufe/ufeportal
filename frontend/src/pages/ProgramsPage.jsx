import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase3 } from "../supabase3";
import { supabase2 } from "../supabase2";
import { FaUniversity, FaMapMarkerAlt, FaClock, FaGlobe } from "react-icons/fa";

const IS_INTERNATIONAL = "Хамтарсан";

export default function ProgramsPage() {
  const { degree } = useParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInternational = degree === IS_INTERNATIONAL;

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        let data, error;

        if (isInternational) {
          // program_international table — different columns
          ({ data, error } = await supabase3
            .from("program_international")
            .select(`
              id,
              majors,
              university_name,
              degree,
              country,
              city,
              tuition_info,
              study_language,
              city_images,
              study_duration
            `)
            .eq("degree", degree)
            .order("majors"));
        } else {
          // programs table — original columns
          ({ data, error } = await supabase2
            .from("programs")
            .select(`
              id,
              major,
              university,
              degree,
              country,
              city,
              tuition,
              lang,
              description,
              video_url,
              img_url,
              duration
            `)
            .eq("degree", degree)
            .order("major"));
        }

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [degree]);

  // Degree information
  const degreeInfo = {
    "Үндсэн": {
      title: "Үндсэн хөтөлбөр",
      description: "СЭЗИС-ийн үндсэн бакалаврын хөтөлбөр нь өндөр чанартай боловсрол олгох зорилготой. Дэлхийн жишигт нийцсэн сургалтын хөтөлбөр, мэргэжлийн багш нар таныг ирээдүйн мэргэжилтэн болоход бэлтгэнэ.",
      duration: "4 жил",
      credits: "120-140 кредит",
      language: "Монгол, Англи",
      features: [
        "Олон улсын стандартад нийцсэн хөтөлбөр",
        "Практик суралцах боломж",
        "Мэргэжлийн багш нар",
        "Орчин үеийн техник тоног төхөөрөмж"
      ]
    },
    "Хамтарсан": {
      title: "Хамтарсан хөтөлбөр",
      description: "Гадаадын шилдэг их сургуулиудтай хамтран зохион байгуулж буй хөтөлбөр. Суралцагчид хоёр улсын зэрэг хамгаалах, олон улсын туршлага хуримтлуулах боломжтой.",
      duration: "4 жил",
      credits: "120-140 кредит",
      language: "Англи болон Тухайн улсын хэл",
      features: [
        "Хоёр улсын зэрэг олгох",
        "Гадаадад суралцах боломж",
        "Олон улсын сертификат",
        "Өргөн хүрээний карьерын боломж"
      ]
    },
    "BTEC": {
      title: "BTEC хөтөлбөр",
      description: "Их Британийн Pearson байгууллагын баталгаажуулсан мэргэжлийн боловсролын хөтөлбөр. Практик ур чадвар эзэмшүүлэхэд онцгой анхаардаг.",
      duration: "2-3 жил",
      credits: "Түвшингээс хамаарна",
      language: "Англи",
      features: [
        "Олон улсын хүлээн зөвшөөрөгдсөн",
        "Практик чиглэлтэй",
        "Ажлын байранд шууд ороход бэлтгэнэ",
        "Их сургуульд шилжих боломжтой"
      ]
    },
    "Rotation": {
      title: "Rotation хөтөлбөр",
      description: "Суралцагчид янз бүрийн салбарт ажиллах туршлага хуримтлуулах боломжтой ротацийн хөтөлбөр. Бодит ажлын байрны туршлагатай төгсөх.",
      duration: "4 жил + Дадлага",
      credits: "120-140 кредит",
      language: "Монгол, Англи",
      features: [
        "Компанид ажиллах туршлага",
        "Цалин авах боломжтой",
        "Бодит төсөл дээр суралцах",
        "Ажлын байр баталгаатай"
      ]
    },
    "Интерактив": {
      title: "Интерактив хөтөлбөр",
      description: "Орчин үеийн технологи, интерактив сургалтын аргууд ашиглан явагдах инновацийн хөтөлбөр.",
      duration: "4 жил",
      credits: "120-140 кредит",
      language: "Монгол, Англи",
      features: [
        "Дижитал сургалтын орчин",
        "Онлайн болон оффлайн хослуулсан",
        "Интерактив агуулга",
        "Уян хатан цагийн хуваарь"
      ]
    },
    "ACCA, CGMA": {
      title: "ACCA, CGMA хөтөлбөр",
      description: "СЭЗИС-ийн ACCA (Олон Улсын Мэргэшсэн Нягтлан Бодогч) болон CGMA (Олон Улсын Удирдлагын Мэргэшсэн Нягтлан Бодогч) зэргийн мэргэжлийн сургалтыг бакалаврын хөтөлбөртэй хослуулан зохион байгуулдаг. Олон улсын түвшинд хүлээн зөвшөөрөгдсөн мэргэжлийн сертификаттай төгсөх боломжтой.",
      duration: "3.5-4 жил",
      credits: "126 кредит",
      language: "Англи, Монгол",
      features: [
        "ACCA II-р түвшний чөлөөлөлт авах магадлан итгэмжлэгдсэн хөтөлбөр",
        "CGMA 14 шалгалтын чөлөөлөлттэй албан ёсны FLP хөтөлбөр",
        "Англи улсын BPP University-д шилжин суралцах боломж",
        "ACCA, CGMA болон СЭЗИС-ийн бакалаврын зэрэг хамтад авах",
        "100% ажлын байраар хангагддаг (PWC, Deloitte, KPMG, EY, BDO)",
        "ЭЕШ-ын математик + англи хэлний дундаж 580+ оноотой элсэнэ"
      ]
    },
    "Цагийн": {
      title: "Цагийн хөтөлбөр",
      description: "Ажил хийж байгаа болон бусад шалтгаанаар өдрийн цагаар суралцах боломжгүй иргэдэд зориулсан орой, амралтын өдрийн цагаар зохион байгуулагдах бакалаврын хөтөлбөр. Ажил, амьдралтай уялдуулан боловсрол эзэмших боломжийг олгоно.",
      duration: "1.5жил",
      credits: "60 орчим",
      language: "Монгол",
      features: [
        "Бямба гарагт 08:00-18:40 цагийн хооронд хичээллэнэ",
        "Ажилтайгаа хослуулан суралцах",
        "Үндсэн хөтөлбөртэй ижил зэрэг олгоно",
        "Сургалтын уян хатан хэлбэр(Танхим + Цахим хосолсон)",
      ]
    }
  };

  const currentDegreeInfo = degreeInfo[degree] || {
    title: degree,
    description: "Тус хөтөлбөрийн дэлгэрэнгүй мэдээлэл удахгүй нэмэгдэнэ.",
    duration: "-",
    credits: "-",
    language: "-",
    features: []
  };

  // Normalise rows so the card template works for both tables
  const normalised = programs.map((p) =>
    isInternational
      ? {
          id: p.id,
          major: p.majors,
          university: p.university_name,
          country: p.country,
          city: p.city,
          duration: p.study_duration,
          // city_images is text[] — use first element as card image
          img_url: Array.isArray(p.city_images) ? p.city_images[0] : null,
        }
      : p
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-third rounded-full animate-spin" />
          <p className="text-gray-500">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-[1920px] mx-auto">

        {/* Left Sidebar - Degree Info */}
        <aside className="lg:w-96 flex-shrink-0">
          <div className="sticky top-24 space-y-6">

            {/* Main Info Card */}
            <div className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 rounded-2xl p-6 sm:p-8 overflow-hidden relative">
              <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />

              <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">
                {currentDegreeInfo.title}
              </h1>

              <p className="text-white/80 text-sm leading-relaxed mb-6 text-justify">
                {currentDegreeInfo.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-third" />
                    <span className="text-xs text-white/60">Үргэлжлэх хугацаа</span>
                  </div>
                  <p className="text-white font-bold text-sm">{currentDegreeInfo.duration}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-white/60">Кредит</span>
                  </div>
                  <p className="text-white font-bold text-sm">{currentDegreeInfo.credits}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <FaGlobe className="text-third" />
                    <span className="text-xs text-white/60">Хэл</span>
                  </div>
                  <p className="text-white font-bold text-sm">{currentDegreeInfo.language}</p>
                </div>
              </div>
            </div>

            {/* Features Card */}
            {currentDegreeInfo.features.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-third rounded-full" />
                  Онцлог шинж чанарууд
                </h3>
                <ul className="space-y-3">
                  {currentDegreeInfo.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Programs Count */}
            <div className="bg-third/10 border border-third/20 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Нийт хөтөлбөр</p>
              <p className="text-3xl font-black text-primary">{programs.length}</p>
            </div>

          </div>
        </aside>

        {/* Right Content - Programs Grid */}
        <main className="flex-1 min-w-0">
          {!normalised.length ? (
            <div className="flex items-center justify-center h-96 bg-white rounded-2xl border border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500">Энэ түвшний хөтөлбөр одоогоор алга байна.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {normalised.map((p) => (
                <Link
                  key={p.id}
                  to={`/programs/id/${p.id}`}
                  state={{ degree, isInternational }}
                  className="group relative flex flex-col overflow-hidden bg-white rounded-xl border-2 border-gray-200 hover:border-third hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  {p.img_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={p.img_url}
                        alt={p.major}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-6 py-2 text-sm font-bold text-primary bg-third rounded-full">
                          Дэлгэрэнгүй →
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-primary mb-3 line-clamp-2 leading-snug">
                      {p.major}
                    </h3>

                    <div className="space-y-2 mt-auto">
                      {p.university && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaUniversity className="text-primary flex-shrink-0" />
                          <span className="line-clamp-1">{p.university}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <FaMapMarkerAlt className="text-third flex-shrink-0" />
                        <span>{p.country}, {p.city}</span>
                      </div>

                      {p.duration && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaClock className="text-primary flex-shrink-0" />
                          <span>{p.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}