import { Routes, Route, NavLink } from "react-router-dom";
import MeritProgram from "./MeritProgram";
import Jobs from "./Jobs";
import ConnectCenter from "./ConnectCenter";
import StudentUnion from "./StudentUnion";
import Clubs from "./Clubs";
import Achievements from "./Achievements";
import Handbook from "./Handbook";
import StudentLife from "./StudentLife";
import { FaUserGraduate, FaBriefcase, FaHandsHelping, FaBrain } from "react-icons/fa";


export default function StudentServices() {
  const BASE = "/services"; // absolute base path

  const menuItems = [
    { title: "Тэмдэгтийн хөтөлбөр", path: "merit-program" },
    { title: "Ажлын байр", path: "jobs" },
    { title: "UFE Connect Center", path: "connect-center" },
    { title: "Оюутны холбоо", path: "student-union" },
    { title: "Клубүүд", path: "clubs" },
    { title: "Амжилтын бүртгэл", path: "achievements" },
    { title: "Оюутны гарын авлага", path: "handbook" },
    { title: "Оюутны амьдрал", path: "student-life" },
  ];

  return (
    <div className="flex flex-col gap-8 px-4 py-10 mx-auto md:flex-row max-w-[1920px]">
      
      {/* Sidebar menu */}
      <aside className="md:w-64">
        <NavLink to={BASE} className="block group">
          <h1 className="mb-6 text-3xl font-bold tracking-wide text-gray-900 transition group-hover:text-blue-700">Оюутны хөгжлийн төв</h1>
        </NavLink>
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
          <Route index element={<div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
            {/* Title */}
            <h1 className="mb-2 text-2xl font-semibold text-gray-800">
              Оюутны хөгжилд чиглэсэн үйлчилгээ
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl mb-10 text-center text-gray-500">
              Оюутнуудын ур чадвар, сэтгэл зүй болон мэргэжлийн хөгжлийг дэмжих
              цогц үйлчилгээ
            </p>

            {/* Cards */}
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center p-6 text-center transition bg-white shadow-sm rounded-xl hover:shadow-md">
                <FaUserGraduate className="mb-3 text-3xl text-blue-500" />
                <h3 className="font-medium text-gray-800">Ур чадвар</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Суралцах, өөрийгөө хөгжүүлэх чадвар
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center transition bg-white shadow-sm rounded-xl hover:shadow-md">
                <FaBriefcase className="mb-3 text-3xl text-green-500" />
                <h3 className="font-medium text-gray-800">Карьер</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ажил мэргэжлийн чиг баримжаа
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center transition bg-white shadow-sm rounded-xl hover:shadow-md">
                <FaBrain className="mb-3 text-3xl text-purple-500" />
                <h3 className="font-medium text-gray-800">Сэтгэл зүй</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Сэтгэлзүйн зөвлөгөө, дэмжлэг
                </p>
              </div>

              <div className="flex flex-col items-center p-6 text-center transition bg-white shadow-sm rounded-xl hover:shadow-md">
                <FaHandsHelping className="mb-3 text-3xl text-orange-500" />
                <h3 className="font-medium text-gray-800">Дэмжлэг</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Оюутанд чиглэсэн үйлчилгээ
                </p>
              </div>
            </div>
          </div>} />
          <Route path="merit-program" element={<MeritProgram />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="connect-center" element={<ConnectCenter />} />
          <Route path="student-union" element={<StudentUnion />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="handbook" element={<Handbook />} />
          <Route path="student-life" element={<StudentLife />} />
        </Routes>
      </main>
    </div>
  );
}
