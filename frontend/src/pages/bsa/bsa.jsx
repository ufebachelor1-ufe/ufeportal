import { Routes, Route, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Staff from "./Staff";
import Org from "./org";    
import Rules from "./rules";  
import Req from "./req";
import Others from "./others";
import Cal from "./calendar";
import { supabase2 } from "../../supabase2";

// React icons
import { 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaRocket, 
  FaChalkboardTeacher 
} from "react-icons/fa";

export default function Bsa() {
  const BASE = "/bsa";

  const menuItems = [
    { title: "Бүрэлдэхүүн", path: "staff" },
    { title: "Бүтэц", path: "org" },
    { title: "Журам", path: "rules" },
    { title: "Хүсэлт гаргах", path: "req" },
    { title: "Бусад албаны чиг үүрэг", path: "others"},
    { title: "Чухал үйл явдал", path: "calendar"},
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-[1920px]">
      
      {/* Sidebar */}
      <aside className="md:w-64">
        <NavLink to={BASE} className="block group">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 transition group-hover:text-blue-700">
            БАКАЛАВРЫН СУРГАЛТЫН АЛБА
          </h1>
        </NavLink>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition
                 ${isActive
                   ? "bg-primary text-white"
                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <Routes>
          {/* INTRO PAGE — WITH NEWS */}
          <Route index element={<BsaIntro />} />

          {/* OTHER PAGES — NO NEWS */}
          <Route path="staff" element={<Staff />} />  
          <Route path="org" element={<Org />} />
          <Route path="rules" element={<Rules />} />
          <Route path="req" element={<Req />} />
          <Route path="others" element={<Others />} />
          <Route path="calendar" element={<Cal />} />
        </Routes>
      </main>
    </div>
  );
}

/* ================= INTRO PAGE ================= */

function BsaIntro() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase2
        .from("news")
        .select("id, title, description, image_url, created_at")
        .eq("type", "БСА Зар")
        .order("created_at", { ascending: false })
        .limit(4);
      
      if (!error) setPosts(data || []);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-6xl px-4 py-0 mx-auto space-y-10">

        {/* LEFT — TEXT */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Бакалаврын сургалт, судалгааны алба
          </h1>

          <p className="leading-relaxed text-justify text-gray-600">
            Бакалаврын сургалт, судалгааны алба нь бакалаврын түвшний сургалтын
            бодлого, хэрэгжилт, оюутанд чиглэсэн дэмжлэг, академик үйлчилгээ,
            карьер хөгжил, элсэлт болон төгсөлтийн үйл ажиллагааг зохион байгуулж,
            чанартай боловсролын орчныг бүрдүүлэх үндсэн нэгж юм.
          </p>

          <InfoSection
            //icon={<FaGraduationCap className="text-black-600" />}
            title="Сургалтын үйл ажиллагаа"
            items={[
              "Модуль хичээлийн сургалтын зохион байгуулалт",
              "Цагийн хөтөлбөрийн сургалтын хэрэгжилт",
              "Ажлын байранд суурилсан сургалтын хөтөлбөр",
              "Сургалтын төлөвлөгөө, хэрэгжилтийн хяналт",
            ]}
          />

          <InfoSection
            //icon={<FaMoneyBillWave className="text-black-600" />}
            title="Тэтгэлэг, санхүүгийн дэмжлэг"
            items={[
              "Ректорын нэрэмжит тэтгэлэг",
              "Буцалтгүй тусламж",
              "ОХЗээл, санхүүгийн дэмжлэг",
            ]}
          />

          <InfoSection
            //icon={<FaRocket className="text-black-500" />}
            title="Карьер хөгжил, хөдөлмөр эрхлэлт"
            items={[
              "Оюутны карьер хөгжлийн зөвлөгөө",
              "Хөдөлмөр эрхлэлтийн дэмжлэг",
              "Сайн дурын ажил, нийгмийн дадлага",
            ]}
          />

          <InfoSection
            //icon={<FaChalkboardTeacher className="text-black-500" />}
            title="Оюутанд чиглэсэн үйлчилгээ"
            items={[
              "Оюутны зөвлөх үйлчилгээ",
              "Санал, гомдол хүлээн авах",
              "Богино хугацааны сургалт",
            ]}
          />
        </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function InfoSection({ icon, title, items }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold text-gray-800">
        {icon} {title}
      </h2>
      <ul className="space-y-1 text-gray-600 list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
