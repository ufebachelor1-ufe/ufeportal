import { Routes, Route, NavLink } from "react-router-dom";

import WritingStandards from "./WritingStandards";
import EBSCO from "./EBSCO";
import ConferenceNotices from "./ConferenceNotices";
import Achievements from "./Achievements";
import ConferenceProceedings from "./ConferenceProceedings";
import LibraryLinks from "./LibraryLinks";
import CustomResearch from "./CustomResearch";

export default function Research() {
  const BASE = "/research";

  const menuItems = [
    { title: "Зөвлөмж", path: "recommendations" },
    { title: "Бичилтийн стандарт", path: "writing-standards" },
    { title: "EBSCO", path: "ebsco" },
    { title: "Хурлын зар", path: "conference-notices" },
    { title: "Гаргасан амжилт", path: "achievements" },
    { title: "Хурлын эмхэтгэл", path: "conference-proceedings" },
    { title: "СЭЗИС-ийн бүтээлийн сангийн холбоос", path: "library-links" },
    { title: "Захиалгат судалгааны булан", path: "custom-research" },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-6 max-w-[1920px] mx-auto">
        {/* Sidebar menu */}
        <aside className="md:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <NavLink to={BASE} className="block group mb-6">
              <h1 className="text-2xl font-black tracking-tight text-primary group-hover:text-third transition-colors uppercase">
                Эрдэм шинжилгээ
              </h1>
            </NavLink>
            
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`${BASE}/${item.path}`}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                     ${isActive 
                       ? "bg-primary text-white shadow-md" 
                       : "bg-white border border-gray-200 text-gray-700 hover:border-third hover:bg-third/5"
                     }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Routes>
            <Route index element={<ResearchIntro />} />
            <Route path="recommendations" element={<ResearchIntro />} />
            <Route path="writing-standards" element={<WritingStandards />} />
            <Route path="ebsco" element={<EBSCO />} />
            <Route path="conference-notices" element={<ConferenceNotices />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="conference-proceedings" element={<ConferenceProceedings />} />
            <Route path="library-links" element={<LibraryLinks />} />
            <Route path="custom-research" element={<CustomResearch />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// New intro component
function ResearchIntro() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Судалгаа гэж юу вэ?
          </h2>
          <p className="text-white/80 text-base leading-relaxed max-w-4xl">
            Судалгаа гэдэг нь үзэгдлийг таньж мэдэхийн тулд шинжлэх ухааны арга зүйгээр дэс дараалалтай үйлдэл хийж, 
            шинэ мэдлэг бүтээх ажил юм (Г.Жаргал). Аливаа судалгаа хийх сэдэл нь юмс үзэгдлийн учрыг таниж мэдэх гэсэн 
            сониучлалаас үүдэлтэй асуултууд, тэдгээрийн нэгдэл асуудлаас эхэлдэг.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            {["Юу?", "Хэн?", "Ямар?", "Яагаад?", "Яаж?", "Хэрхэн?"].map((q) => (
              <span key={q} className="px-4 py-2 rounded-full bg-third/20 border border-third/30 text-third font-bold text-sm">
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Research Types */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Шинжлэх ухааны судалгааны төрлүүд
        </h3>
        
        <p className="text-gray-700 mb-8 leading-relaxed">
          Шинжлэх ухааны судалгааг гурван зүйлд тулгуурлан төрлүүдэд ангилдаг:
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Type 1 */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <h4 className="font-bold text-primary mb-3">Үр дүнгийн хэрэглээгээр</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Онолын, академик, суурь судалгаа</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Хэрэглээний буюу хавсарга судалгаа</span>
              </li>
            </ul>
          </div>

          {/* Type 2 */}
          <div className="bg-gradient-to-br from-third/5 to-third/10 rounded-xl p-6 border border-third/20">
            <h4 className="font-bold text-primary mb-3">Зорилгоор нь</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Тандалтын, хайгуулын</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Тодорхойлох, дүрслэх</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Харилцан хамаарлын</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Шалтгаан, үр дагаврын</span>
              </li>
            </ul>
          </div>

          {/* Type 3 */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <h4 className="font-bold text-primary mb-3">Арга, мэдээллээр</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Тоон судалгаа (Quantitative)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Чанарын судалгаа (Qualitative)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-third mt-1">•</span>
                <span>Холимог (Mixed)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Steps */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Судалгаа хийх сонгодог алхмууд (Дедуктив)
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "01", text: "Судалгааны асуулт ба асуудал" },
            { num: "02", text: "Хүрээ болон аргаа тодорхойлох" },
            { num: "03", text: "Таамаглал дэвшүүлэх" },
            { num: "04", text: "Дизайн гаргах буюу боловсруулах" },
            { num: "05", text: "Таамаглалаа шалгах болон өгөгдөл цуглуулах" },
            { num: "06", text: "Шинжилгээний үр дүнг тайлбарлах, тайлагнах" },
            { num: "07", text: "Хэвлэж мэдээлэх" },
          ].map((step, i) => (
            <div 
              key={i} 
              className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-200 hover:border-third transition-all duration-300 group"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-third to-primary flex items-center justify-center text-white font-black text-sm shadow-lg">
                {step.num}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mt-3 group-hover:text-primary transition-colors">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Lecture */}
      <section className="bg-primary rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Профессор Ц.Батсүхийн цахим хичээл
            </h3>
            <p className="text-white/70 text-sm">
              "Судалгааны асуулт ба асуудал томъёолох" сэдэвт хичээл
            </p>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black/30 border border-white/20">
          <video
            controls
            className="w-full h-full"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          >
            <source src="https://kvsueqqvhjacxxkrepjl.supabase.co/storage/v1/object/public/images/videos/video.mp4" type="video/mp4" />
            Таны browser видео дэмжихгүй байна.
          </video>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg  border border-white/20">
          <p className="text-white/90 text-sm  leading-relaxed">
            Судалгааны асуудал болон асуулт томъёолох, Судлагдсан байдал тойм, 
            Судалгааны таамаглал дэвшүүлэх зэрэг арга, жишээ, зөвлөмжийг дурьдсан.
          </p>
        </div>
      </section>

      {/* Books */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Судалгааны арга зүйн сурах бичиг
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { authors: "Г.Жаргал, Н.Сэлэнгэ", title: "Судалгааны арга зүйд - Өөрөө сурах бичиг", year: "2018" },
            { authors: "Б.Жадамбаа, Ц.Чимэдлхам", title: "Судалгааны арга зүй", year: "2011" },
            { authors: "Ранжит Кумар", title: "Судалгааны арга зүй", year: "2019" },
            { authors: "Д.Нарантуяа", title: "Судалгааны арга зүй: чанарын арга", year: "2015" },
          ].map((book, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-third/5 border border-gray-200 hover:border-third transition-all">
              <div className="flex-1">
                <p className="font-semibold text-primary text-sm mb-1">{book.authors}</p>
                <p className="text-sm text-gray-600 mb-1">"{book.title}"</p>
                <p className="text-sm text-gray-500">{book.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}