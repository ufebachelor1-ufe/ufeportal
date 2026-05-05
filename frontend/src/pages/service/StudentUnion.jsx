import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const leaders = [
  { years: "2007–2010", name: "С. Өнөр", note: "Хяналтын зөвлөл байгуулж, дүрмийг шинэчлэн баталсан" },
  { years: "2010–2012", name: "Ц. Мөнх-оргил" },
  { years: "2012–2013", name: "Д. Жавхлан" },
  { years: "2013–2014", name: "Б. Сосорбурам" },
  { years: "2014–2015", name: "М. Содбилэг" },
  { years: "2015–2016", name: "Э. Пүрэвжаргал" },
  { years: "2016–2017", name: "Б. Мөнхжаргал" },
  { years: "2017–2018", name: "М. Тамир" },
  { years: "2018–2019", name: "Ц. Номин-Эрдэнэ" },
  { years: "2019–2021", name: "Б. Батзориг", note: "ТББ-ийн улсын бүртгэлтэй биеэ даасан байгууллага болгон өргөжүүлсэн" },
  { years: "2021–2022", name: "Т. Янжинлхам" },
  { years: "2022–2023", name: "Т. Содмандах" },
  { years: "2023–2024", name: "А. Ананд" },
  { years: "2024–2026", name: "Г. Мөнхнаран", note: "Клубуудын Удирдах зөвлөлийг байгуулж, бүтэц зохион байгуулалтад шинэчлэл хийсэн", current: true },
];

const values = [
  "Хууль, эрх зүйт ёсыг дээдлэх",
  "Байнга суралцаж, хөгжин дэвших",
  "Харилцан хүндэтгэх",
  "Эрх тэгш хандах, шударга ёсыг дээдлэх",
  "Үүрэг хариуцлагаа ухамсарлах",
  "Хамт олонч, бүтээлч байх",
];

const activities = [
  "Оюутнуудын эрх ашгийг хамгаалах бодлого боловсруулах",
  "Оюутантай холбоотой судалгаа шинжилгээ хийх",
  "Салбар байгууллагаараа дамжуулан нийт оюутны дунд соёл, спорт, урлаг, нийгмийн компанит ажил өрнүүлэх",
  "Оюутнуудыг эрх ашиг, хөгжилтэй холбогдох хууль тогтоомж, шийдвэр, мэдээллээр хангах",
  "Байгууллагын чадамжийг тасралтгүй сайжруулах",
];

const structure = [
  "Оюутны Чуулган",
  "Оюутны холбооны Удирдах зөвлөл",
  "Оюутны холбооны Гүйцэтгэх хороо",
  "Оюутны холбооны Хяналтын зөвлөл",
  "СЭЗИС-ийн Клубуудын Удирдах зөвлөл",
];

const principles = [
  "Үндсэн дүрэм болон бусад эрх зүйн актыг чандлан сахиж эрх зүйт ёсыг удиртгал болгоно",
  "Оюутныг эн тэргүүнд тавьж, тэднийг үл ялгаварлан эрх тэгш хандана",
  "Үйл ажиллагаа олон нийтийг хамарсан ил тод нээлттэй явагдана",
  "Шийдвэр оюутнуудын эрх ашигт нийцсэн байна",
  "Хүний эрх, оюутны эрхийг эрхэмлэн дээдэлнэ",
  "Шударга ёсыг эрхэмлэж, ёс суртахуунлаг байна",
  "Оюутнуудыг ардчилсан, сайн дурын үндсэн дээр зохион байгуулна",
];

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-100">
      {children}
    </h3>
  );
}

export default function StudentUnion() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-2">

      {/* Hero */}
      <header className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 border-l border-b border-gray-200 rounded-bl-full opacity-40" />
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-lg px-3 py-1 mb-4">
          Төрийн бус байгууллага · 1997 оноос
        </span>
        <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
          СЭЗИС-ийн Оюутны холбоо ТББ
        </h1>
        <p className="text-gray-500 leading-relaxed max-w-xl">
          Санхүү Эдийн Засгийн Их Сургуулийн оюутны нийтлэг хүсэл эрмэлзлэлийг
          илэрхийлсэн, аливаа улс төрийн нам, эвсэлээс бие даасан, ашгийн бус,
          гишүүддээ үйлчилдэг байгууллага.
        </p>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { num: "1997", label: "Үүссэн он" },
            { num: "28+", label: "Жилийн түүх" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <span className="block text-2xl font-bold text-gray-800">{num}</span>
              <span className="text-xs text-gray-500 mt-1">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Social Buttons */}
          <a
            href="https://www.facebook.com/studentunionofUFE/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition whitespace-nowrap"
          >
            <FaFacebook className="text-base" />
            Facebook
          </a>
          
          <a
            href="https://www.instagram.com/student.union_ufe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 font-medium text-sm text-white rounded-xl hover:opacity-90 transition whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #f9a825, #e91e8c, #9c27b0)" }}
          >
            <FaInstagram className="text-base" />
            Instagram
          </a>

          {/* Contact Info - Now part of the same flex row */}
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <FaEnvelope className="text-blue-400 flex-shrink-0" />
              <a href="mailto:Student_union@ufe.edu.mn" className="text-blue-600 hover:underline">
                Student_union@ufe.edu.mn
              </a>
            </div>

            {/* Vertical Divider (Optional but looks better) */}
            <span className="h-4 w-px bg-gray-200"></span>

            <div className="flex items-center gap-1.5">
              <FaPhone className="text-green-500 flex-shrink-0" />
              <span className="font-medium text-gray-700">80798099</span>
            </div>
          </div>
        </div>
      </header>

      {/* Vision & Mission */}
      <section>
        <SectionTitle>Алсын хараа ба эрхэм зорилго</SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">Алсын хараа</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Бүс нутагтаа хүлээн зөвшөөрөгдсөн, хөгжилд манлайлан
              чиглүүлэгч оюутны байгууллага болон хөгжих.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">Эрхэм зорилго</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Өөрийгөө сэрээж чадсан, нийгмийг соён гэгээрүүлэх үйлсэд
              хувь нэмрээ оруулахуйц иргэн болон төлөвшихөд оюутнуудаа
              дэмжин ажиллах.
            </p>
          </div>
        </div>
      </section>

      {/* Motto */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-content-center flex-shrink-0 text-blue-600 font-bold text-lg leading-none" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          ★
        </div>
        <p className="text-blue-700 font-semibold text-base leading-snug">
          "Нэгдэж аваад хөгжье, Хөгжиж аваад тэлье"
        </p>
      </div>

      {/* Values */}
      <section>
        <SectionTitle>Эрхэмлэх үнэт зүйлс</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {values.map((v) => (
            <div key={v} className="flex items-start gap-2 bg-white border border-gray-100 rounded-xl p-3">
              <span className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 leading-snug">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section>
        <SectionTitle>Үйл ажиллагааны үндсэн чиглэл</SectionTitle>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded-md px-2 py-1 flex-shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-gray-600 leading-relaxed">{a}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section>
        <SectionTitle>Байгууллагын бүтэц</SectionTitle>
        <div className="space-y-2">
          {structure.map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
              <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section>
        <SectionTitle>Үйл ажиллагааны зарчим</SectionTitle>
        <div className="space-y-2">
          {principles.map((p, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-3 leading-relaxed">
              <span className="text-gray-300 flex-shrink-0">—</span>
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Timeline */}
      <section>
        <SectionTitle>Тэргүүний түүхэн хөгжил</SectionTitle>
        <div className="relative pl-4">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-200" />
          <div className="space-y-4">
            {leaders.map(({ years, name, note, current }) => (
              <div key={years} className="relative pl-4">
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                    current
                      ? "bg-blue-400 border-blue-400"
                      : "bg-white border-gray-300"
                  }`}
                />
                <p className="text-xs text-gray-400 font-medium mb-0.5">{years}</p>
                <p className={`text-sm font-semibold ${current ? "text-blue-700" : "text-gray-800"}`}>
                  {name}
                  {current && (
                    <span className="ml-2 text-xs font-normal bg-blue-50 text-blue-600 border border-blue-100 rounded-md px-2 py-0.5">
                      Одоогийн тэргүүн
                    </span>
                  )}
                </p>
                {note && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}