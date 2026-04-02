import { Routes, Route, NavLink } from "react-router-dom";
import Roadmap from "./Roadmap";
import SocialPractice from "./SocialPractice";
import MentorStudent from "./MentorStudent";
import AmbassadorStudent from "./AmbassadorStudent";

export default function Volunteer() {
  const BASE = "/volunteer";

  const menuItems = [
    //{ title: "Roadmap", path: "roadmap" },
    { title: "Нийгмийн дадлага", path: "social-practice" },
    { title: "Ментор оюутан", path: "mentor-student" },
    { title: "Ambassador оюутан", path: "ambassador-student" },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-[1920px]">
      
      {/* Sidebar menu */}
      <aside className="md:w-64">
        <h1 className="mb-6 text-3xl font-bold tracking-wide text-gray-900 transition group-hover:text-blue-700">Оюутны хувь нэмэр</h1> 
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors 
                 ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 text-gray-800 bg-gray-100"}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Routes>
          <Route index element={<div className="text-gray-500">Оюутнууд хэрхэн бусдад хувь нэмэр оруулж болох талаар</div>} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="social-practice" element={<SocialPractice />} />
          <Route path="mentor-student" element={<MentorStudent />} />
          <Route path="ambassador-student" element={<AmbassadorStudent />} />
        </Routes>
      </main>
    </div>
  );
}
