import { Routes, Route, NavLink } from "react-router-dom";

import MeritProgram from "./MeritProgram";
import Jobs from "./Jobs";
import ConnectCenter from "./ConnectCenter";
import StudentUnion from "./StudentUnion";
import Clubs from "./Clubs";
import Achievements from "./Achievements";
import Handbook from "./Handbook";
import StudentLife from "./StudentLife";
import Scholarships from "./Scholarships";

import {
  FaUserGraduate,
  FaBriefcase,
  FaHandsHelping,
  FaBrain,
  FaFlask,
  FaTrophy,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";


export default function StudentServices() {
  const BASE = "/services";

  // =========================================================
  // KEEP YOUR ORIGINAL SIDEBAR MENU
  // =========================================================

  const menuItems = [
    { title: "UFE Connect Zone", path: "connect-center" },
    { title: "Амжилтын бүртгэл, мэдээлэл", path: "achievements" },
    { title: "Тэтгэлгийн бүртгэл, мэдээлэл", path: "scholarships" },
    { title: "Оюутны гарын авлага", path: "handbook" },
    { title: "Оюутны холбоо", path: "student-union" },
    { title: "Клубүүд", path: "clubs" },
    { title: "Тэмдэгтийн хөтөлбөр", path: "merit-program" },
    // { title: "Оюутны амьдрал", path: "student-life" },
    // { title: "Ажлын байр", path: "jobs" },
  ];


  // =========================================================
  // БИД ЮУ ХИЙДЭГ ВЭ?
  // =========================================================

  const whatWeDo = [
    {
      number: "01",
      icon: <FaUserGraduate />,
      title: "Хувь хүний хөгжлийг дэмжих",
    },

    {
      number: "02",
      icon: <FaHandsHelping />,
      title:
        "Нийгэмд тустай сайн дурын ажилд оролцох боломжийг нэмэгдүүлэх",
    },

    {
      number: "03",
      icon: <FaFlask />,
      title:
        "Оюутны эрдэм шинжилгээ, судалгааны ур чадварыг нэмэгдүүлэх",
    },

    {
      number: "04",
      icon: <FaTrophy />,
      title: "Ахиц дэвшлийг дэмжих, урамшуулах",
    },

    {
      number: "05",
      icon: <FaBriefcase />,
      title:
        "Хөдөлмөр эрхлэлтийг дэмжих чиглэлээр оюутнуудад зориулсан үйл ажиллагааг зохион байгуулах",
    },
  ];


  // =========================================================
  // ОЮУТНЫ ХӨГЖЛИЙН ҮЙЛ АЖИЛЛАГАА
  // =========================================================

  const activities = [
    {
      icon: <FaUserGraduate />,
      title: "ХУВЬ ХҮНИЙ ХӨГЖЛИЙГ ДЭМЖИХ",
      color: "lime",

      items: [
        "Шинэ элсэгчийн чиглүүлэх сургалт",
        "CE Badge хөтөлбөрт оюутнуудыг хамруулах",
        "Тангараг өргөх ёслол",
        "ART Badge хөтөлбөрт оюутнуудыг хамруулах",
        "1-р курсын оюутнуудын урлагийн наадам",
        "Оюутны спортын наадам",
        "Оюутны клубүүдийн нэгдсэн өдөрлөг",
        "Портал сайтын танилцуулга",
        "Сэтгэл зүйн өдөрлөг",
        "Төгсөх курсын урлагийн наадам",
      ],
    },

    {
      icon: <FaHandsHelping />,
      title: "САЙН ДУРЫН АЖИЛ",
      color: "blue",

      items: [
        "Нийгмийн дадлагын зохион байгуулалт",
        "Volunteer fair",
        "Амбассадор оюутан",
        "Сайн дурын цаг бүртгэх",
        "ОХТ-ийн 103 танилцуулга",
      ],
    },

    {
      icon: <FaFlask />,
      title: "ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГАА",
      color: "purple",

      items: [
        "Судлаач ментор оюутан",
        "Academic Badge",
      ],
    },

    {
      icon: <FaTrophy />,
      title: "АХИЦ ДЭВШЛИЙГ ДЭМЖИХ, УРАМШУУЛАХ",
      color: "yellow",

      items: [
        "Ректорын нэрэмжит тэтгэлэг",
        "Онцлох төгсөгч шалгаруулах",
        "Оны шилдэг",
        "Амжилт зөрчил бүртгэх ",
      ],
    },

    {
      icon: <FaBriefcase />,
      title: "ХӨДӨЛМӨР ЭРХЛЭЛТИЙГ ДЭМЖИХ",
      color: "cyan",

      items: [
        "Career Badge",
        "Job Fair",
        "Career Counseling",
        "Career Planning",
        "Career Workshop",
      ],
    },
  ];


  // =========================================================
  // ОЮУТНЫ ХӨГЖЛИЙН ЗАМНАЛ
  // =========================================================

  const studentJourney = [
    {
      title: "1 КУРС",
      color: "lime",

      items: [
        "Шинэ элсэгчийн чиглүүлэх сургалт",
        "CE Badge хөтөлбөр",
        "Тангарагийн баяр",
        "Спортын наадам",
        "ART Badge хөтөлбөр",
        "Урлагийн наадам",
        "Нийгмийн дадлага",
      ],
    },

    {
      title: "2 КУРС",
      color: "green",

      items: [
        "Амбассадор оюутан",
        "Career Badge хөтөлбөр",
        "Academic Badge хөтөлбөр",
      ],
    },

    {
      title: "3–4 КУРС",
      color: "cyan",

      items: [
        "Амбассадор оюутан",
        "Career Badge хөтөлбөр",
        "Academic Badge хөтөлбөр",
        "Digital Badge хөтөлбөр",
        "Төгсөх курсын урлагийн наадам",
      ],
    },

    {
      title: "БҮХ КУРС",
      color: "blue",

      items: [
        "Оюутны клубүүдийн өдөрлөг",
        "ОХТ-ийн 103 танилцуулга",
        "Портал сайтын танилцуулга",
        "Спортын наадам",
        "Сэтгэл зүйн өдөрлөг",
        "Амжилт зэргэл бүртгэх",
        "Нийгмийн дадлага",
        "Сайн дурын цаг бүртгэх",
        "Volunteer Fair",
      ],
    },
  ];


  // =========================================================
  // STAFF
  // =========================================================

  const staff = [
    {
      name: "Э.Золбоо",
      position: "МЭРГЭЖИЛТЭН",
      email: "ZOLBOO@UFE.EDU.MN",
      room: "C-303A тоот",
      image: "/zolboo.jpg",
    },

    {
      name: "Б.Ганчимэг",
      position: "ЗОХИЦУУЛАГЧ",
      email: "GANCHIMEG.BA@UFE.EDU.MN",
      room: "C-303A тоот",
      image: "/ganchimeg.jpg",
    },

    {
      name: "Т.Отгонцэцэг",
      position: "ЗОХИЦУУЛАГЧ",
      email: "OTGONTSETSEG@UFE.EDU.MN",
      room: "C-303A тоот",
      image: "/otgontsetseg.jpg",
    },
  ];


  return (
    <div className="flex flex-col gap-8 px-4 py-6 mx-auto font-sans max-w-[1920px] sm:px-6 sm:py-8 md:flex-row md:px-8 md:py-10">

      {/* ===================================================== */}
      {/* SIDEBAR - YOUR ORIGINAL DESIGN */}
      {/* ===================================================== */}

      <aside className="w-full md:w-64 md:flex-shrink-0">

        <NavLink to={BASE} className="block group">

          <h1 className="mb-6 text-2xl sm:text-3xl font-bold tracking-wide text-gray-900 transition group-hover:text-primary">
            Оюутны хөгжлийн төв
          </h1>

        </NavLink>


        <nav className="flex flex-col space-y-2">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={`${BASE}/${item.path}`}
              className={({ isActive }) =>
                `px-4 py-3 sm:py-2 rounded-md transition-colors 
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-primary/10 hover:text-primary text-gray-800 bg-gray-100"
                }`
              }
            >
              {item.title}
            </NavLink>

          ))}

        </nav>

      </aside>


      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="flex-1 min-w-0">

        <Routes>

          {/* ================================================= */}
          {/* HOME */}
          {/* ================================================= */}

          <Route
            index
            element={

              <div className="space-y-12">


                {/* ================================================= */}
                {/* INTRODUCTION */}
                {/* ================================================= */}

                <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">

                  <div className="absolute w-64 h-64 rounded-full bg-blue-400/10 -right-20 -top-20" />

                  <div className="absolute w-48 h-48 rounded-full bg-cyan-400/10 -bottom-20 -left-20" />


                  <div className="relative max-w-5xl">

                    <h1 className="mb-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                      Оюутны хөгжлийн төв
                    </h1>


                    <p className="max-w-5xl text-sm leading-6 sm:leading-7 text-blue-50 md:text-base">
                      Бид СЭЗИС-ийн Эрхэм зорилго, алсын хараа, стратеги,
                      21-р зууны боловсролын чиг хандлага, Бакалаврын
                      сургалтын бодлогын баримт бичиг, холбогдох хууль,
                      дүрэм, журамд нийцүүлэн сургалтын бусад үйл
                      ажиллагаагаар оюутныг тасралтгүй хөгжүүлэх
                      боломжийг дэмжихэд оршино.
                    </p>

                  </div>

                </section>



                {/* ================================================= */}
                {/* WHAT WE DO */}
                {/* ================================================= */}

                <section>

                  <div className="mb-7">

                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                      Бид юу хийдэг вэ?
                    </h2>

                  </div>


                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

                    {whatWeDo.map((item) => (

                      <div
                        key={item.number}
                        className="relative p-6 overflow-hidden transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-lg"
                      >

                        <span className="absolute top-2 right-4 text-5xl font-black text-gray-50">
                          {item.number}
                        </span>


                        <div className="relative">

                          <div className="flex items-center justify-center w-12 h-12 mb-4 text-xl text-white bg-primary rounded-xl">
                            {item.icon}
                          </div>


                          <h3 className="font-bold leading-6 text-gray-800">
                            {item.title}
                          </h3>

                        </div>

                      </div>

                    ))}

                  </div>

                </section>



                {/* ================================================= */}
                {/* STAFF */}
                {/* ================================================= */}

                <section>

                  <div className="mb-7">

                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                      Оюутны хөгжлийн төв
                    </h2>


                    <p className="mt-2 text-gray-500">
                      Танд хэрэгтэй мэдээлэл, хөгжлийн боломжуудыг
                      оюутны хөгжлийн төвөөс авна уу.
                    </p>

                  </div>


                  <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">

                    {staff.map((person) => (

                      <div
                        key={person.email}
                        className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg transition-shadow"
                      >

                        {/* Staff Image */}
                        <div className="w-full h-72 sm:h-80 bg-gray-100">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="object-contain w-full h-full"
                          />
                        </div>


                        {/* Staff Information */}
                        <div className="p-6 text-center">

                          <h3 className="text-lg font-bold text-gray-800">
                            {person.name}
                          </h3>


                          <p className="mt-1 text-sm font-medium text-gray-500">
                            {person.position}
                          </p>


                          <a
                            href={`mailto:${person.email}`}
                            className="block mt-3 text-xs font-medium text-blue-600 hover:underline"
                          >
                            {person.email}
                          </a>


                          <p className="mt-1 text-xs text-gray-500">
                            {person.room}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>


                  <div className="p-5 mt-5 text-center border border-blue-100 bg-blue-50 rounded-2xl">

                    <p className="font-semibold text-primary">
                      📍 Байршил
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      С байрны 1 давхар, 103 тоот
                    </p>

                  </div>

                </section>



                {/* ================================================= */}
                {/* ACTIVITIES */}
                {/* ================================================= */}

                <section>

                  <div className="mb-7">

                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                      Оюутан хөгжлийн төвийн хөтөлбөр
                    </h2>

                  </div>


                  <div className="space-y-6">

                    {activities.map((category) => (

                      <div
                        key={category.title}
                        className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl"
                      >

                        {/* Header */}

                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 bg-gray-50">

                          <div
                            className={`
                              flex items-center justify-center
                              flex-shrink-0 w-12 h-12
                              text-xl text-white rounded-xl

                              ${
                                category.color === "lime"
                                  ? "bg-lime-500"
                                  : category.color === "blue"
                                  ? "bg-blue-500"
                                  : category.color === "purple"
                                  ? "bg-purple-500"
                                  : category.color === "yellow"
                                  ? "bg-yellow-500"
                                  : "bg-cyan-500"
                              }
                            `}
                          >
                            {category.icon}
                          </div>


                          <h3 className="text-lg font-bold text-primary">
                            {category.title}
                          </h3>

                        </div>


                        {/* Items */}

                        <div className="grid gap-3 px-4 sm:px-6 py-5 sm:py-6 md:grid-cols-2">

                          {category.items.map((item, index) => (

                            <div
                              key={index}
                              className="flex items-start gap-3 text-sm text-gray-700"
                            >

                              <span className="flex-shrink-0 text-primary leading-none">
                                •
                              </span>


                              <span className="leading-4">
                                {item}
                              </span>

                            </div>

                          ))}

                        </div>

                      </div>

                    ))}

                  </div>

                </section>



                {/* ================================================= */}
                {/* STUDENT JOURNEY */}
                {/* ================================================= */}

                <section>

                  <div className="mb-8 text-center">

                    <p className="mb-2 text-sm font-semibold tracking-widest text-primary">
                      STUDENT JOURNEY
                    </p>


                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                      Оюутны хөгжлийн замнал
                    </h2>


                    <p className="max-w-2xl mx-auto mt-2 text-gray-500">
                      Оюутан СЭЗИС-д суралцах хугацаандаа хөгжих,
                      оролцох, амжилтаа нэмэгдүүлэх боломжууд
                    </p>

                  </div>


                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {studentJourney.map((year) => (

                      <div
                        key={year.title}
                        className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-2xl"
                      >

                        {/* Year */}

                        <div
                          className={`
                            px-6 py-5 text-white

                            ${
                              year.color === "lime"
                                ? "bg-lime-500"
                                : year.color === "green"
                                ? "bg-emerald-500"
                                : year.color === "cyan"
                                ? "bg-cyan-500"
                                : "bg-blue-600"
                            }
                          `}
                        >

                          <div className="flex items-center justify-between">

                            <h3 className="text-2xl font-black">
                              {year.title}
                            </h3>


                            <FaGraduationCap className="text-3xl opacity-80" />

                          </div>

                        </div>


                        {/* Items */}

                        <div className="p-6">

                          <ul className="space-y-3">

                            {year.items.map((item, index) => (

                              <li
                                key={index}
                                className="flex items-start gap-2 text-sm leading-5 text-gray-700"
                              >

                                <span className="flex-shrink-0 text-primary leading-none">
                                  •
                                </span>


                                <span className="leading-4">
                                  {item}
                                </span>

                              </li>

                            ))}

                          </ul>

                        </div>

                      </div>

                    ))}

                  </div>

                </section>



                {/* ================================================= */}
                {/* FOUR DEVELOPMENT AREAS */}
                {/* ================================================= */}

                <section className="pb-8">

                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">


                    <div className="p-6 rounded-2xl bg-green-50">

                      <FaUserGraduate className="mb-4 text-3xl text-green-500" />

                      <h3 className="font-bold text-green-700">
                        ХУВЬ ХҮНИЙ ХӨГЖИЛ
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Өөрийгөө нээн хөгжүүлэх, манлайлах,
                        сонирхлоо хөгжүүлэх
                      </p>

                    </div>


                    <div className="p-6 rounded-2xl bg-emerald-50">

                      <FaGraduationCap className="mb-4 text-3xl text-emerald-500" />

                      <h3 className="font-bold text-emerald-700">
                        АКАДЕМИК ХӨГЖИЛ
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Суралцах чадвараа дээшлүүлэх, мэдлэгээ
                        гүнзгийрүүлэх
                      </p>

                    </div>


                    <div className="p-6 rounded-2xl bg-cyan-50">

                      <FaBriefcase className="mb-4 text-3xl text-cyan-500" />

                      <h3 className="font-bold text-cyan-700">
                        КАРЬЕР ХӨГЖИЛ
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Ур чадвар, туршлагаа нэмэгдүүлэх,
                        ирээдүйн карьераа бэлтгэх
                      </p>

                    </div>


                    <div className="p-6 rounded-2xl bg-blue-50">

                      <FaUsers className="mb-4 text-3xl text-blue-500" />

                      <h3 className="font-bold text-blue-700">
                        НИЙГМИЙН ОРОЛЦОО
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Нийгэмд эерэг нөлөө үзүүлж, идэвхтэй
                        оюутан болох
                      </p>

                    </div>

                  </div>

                </section>

              </div>
            }
          />


          {/* ================================================= */}
          {/* OTHER PAGES */}
          {/* ================================================= */}

          <Route
            path="merit-program"
            element={<MeritProgram />}
          />

          <Route
            path="jobs"
            element={<Jobs />}
          />

          <Route
            path="connect-center"
            element={<ConnectCenter />}
          />

          <Route
            path="student-union"
            element={<StudentUnion />}
          />

          <Route
            path="clubs"
            element={<Clubs />}
          />

          <Route
            path="achievements"
            element={<Achievements />}
          />

          <Route
            path="scholarships"
            element={<Scholarships />}
          />

          <Route
            path="handbook"
            element={<Handbook />}
          />

          <Route
            path="student-life"
            element={<StudentLife />}
          />

        </Routes>

      </main>

    </div>
  );
}