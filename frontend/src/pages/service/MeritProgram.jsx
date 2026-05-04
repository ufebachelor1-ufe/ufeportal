import { useState } from "react";

const badges = [
  {
    id: "ce",
    name: "CE Badge",
    fullName: "Campus Engagement Badge",
    subtitle: "Culture · Ethics",
    tag: "Заавал",
    tagColor: "bg-primary/10 text-primary",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    iconBg: "bg-primary/10",
    accentColor: "bg-primary/5 border-primary/10",
    desc: "Оюутны ёс зүйн дүрэм, суралцах орчин, хувь хүний соёл, ур чадвараа хөгжүүлэхэд нь дэмжлэг үзүүлэх зорилгоор бэлтгэсэн, заавал хамрагдах цахим талбарын сургалтын хөтөлбөр.",
    items: [
      "Оюутны ёс зүйн дүрэм, суралцах орчин",
      "Хувь хүний соёл, ур чадвараа хөгжүүлэх",
    ],
    notice: (
      <>
        <span className="font-bold text-primary">CE Badge</span> — Culture (соёл) болон Ethics (ёс зүй) чиглэлээр бэлтгэгдсэн, бүх бакалаврын оюутанд заавал хамрагдах цахим хөтөлбөр.
      </>
    ),
  },
  {
    id: "art",
    name: "ART Badge",
    fullName: "Artistic & Creative Skills Badge",
    subtitle: "Awake · Realize · Train",
    tag: "Сонгон",
    tagColor: "bg-third/10 text-third",
    icon: (
      <svg className="w-6 h-6 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    iconBg: "bg-third/10",
    accentColor: "bg-third/5 border-third/10",
    desc: "Өөрийгөө ойлгох, хувь хүний мэдрэмж, ур чадвараа хөгжүүлэхэд дэмжлэг үзүүлэх зорилгоор бэлтгэсэн хөтөлбөр. Оюутан урлагийн төрлүүдээс сонгож заавал хамрагдах, цахим/танхим хосолсон сургалт.",
    details: [
      { label: "Үргэлжлэх хугацаа", value: "4 долоо хоног" },
      { label: "Хичээлийн давтамж", value: "7 хоногт 1 удаа · 3 цаг" },
      { label: "Нийт сургалт", value: "12 цаг" },
      { label: "Сургалтын төлбөр", value: "120,000₮" },
      { label: "Хэлбэр", value: "Цахим / Танхим хосолсон" },
      { label: "Эрх", value: "Хүссэн бүх сургалтдаа суралцах" },
    ],
    benefits: [
      "Зөөлөн ур чадвар хөгжүүлнэ",
      "CV баяжуулна",
      "Сэтгэл зүйн эрүүл мэндэд эерэг",
    ],
    levels: [
      { label: "1-р түвшин – Хүрэл", dotColor: "bg-gray-400" },
      { label: "2-р түвшин – Мөнгөн", dotColor: "bg-gray-500" },
      { label: "3-р түвшин – Алтан", dotColor: "bg-yellow-500" },
    ],
    mentor: "ART Badge авсан оюутан дадлагатай, цалинтай ажиллах боломжтой.",
  },
  {
    id: "academic",
    name: "Academic Badge",
    fullName: "Эрдмийн ажлын стандарт соёл",
    subtitle: "Мэдлэг · Шүүмжлэл · Ёс зүй",
    tag: "Цахим",
    tagColor: "bg-green-100 text-green-700",
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBg: "bg-green-50",
    accentColor: "bg-green-50 border-green-100",
    desc: "Эрдмийн ажлын стандарт соёлыг таниулах, мэдээллийн хэрэгцээгээ тодорхойлох, мэдээллийн эх сурвалжаас хайх, олж авсан мэдээллээ шүүн тунгаан шүүмжлэлтэйгээр үнэлэн дүгнэж, бусдад түгээх, ёс зүйтэйгээр ашиглах тухай мэдлэг олгох цахим талбарын сургалтын хөтөлбөр.",
    items: [
      "Мэдээллийн хэрэгцээгээ тодорхойлох",
      "Мэдээллийн эх сурвалжаас хайх, олж авах",
      "Олж авсан мэдээллийг шүүн тунгаан шүүмжлэлтэйгээр үнэлэн дүгнэх",
      "Мэдээллийг бусдад түгээх, ёс зүйтэйгээр ашиглах",
    ],
    notice: (
      <>
        <span className="font-bold text-green-700">Academic Badge</span> — эрдмийн ажлын стандарт соёл, мэдээллийн боловсрол олгох цахим талбарын хөтөлбөр.
      </>
    ),
    noticeColor: "bg-green-50 border-green-100",
    noticeIconColor: "text-green-600",
  },
  {
    id: "career",
    name: "Career Badge",
    fullName: "Карьер хөгжлийн хөтөлбөр",
    subtitle: "Төлөвлөлт · Бэлтгэл · Хөдөлмөр эрхлэлт",
    tag: "Цахим",
    tagColor: "bg-orange-100 text-orange-700",
    icon: (
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-orange-50",
    accentColor: "bg-orange-50 border-orange-100",
    desc: "Оюутны карьер төлөвлөлт, хөдөлмөр эрхлэлтийг дэмжих, хувь хүний хөгжил, ажлын байранд бэлдэх зорилгоор бэлтгэсэн цахим талбарын сургалтын хөтөлбөр.",
    items: [
      "Карьер төлөвлөлт, хөдөлмөр эрхлэлтийг дэмжих",
      "CV бичих, хувийн хөгжил",
      "Ажлын байрны сэтгэл зүй",
      "Анхан шатны ярилцлагад бэлтгэх",
    ],
    notice: (
      <>
        <span className="font-bold text-orange-700">Career Badge</span> — карьер хөгжил чиглэлийн цахим хөтөлбөр. Оюутны хөдөлмөр эрхлэлт, ажлын байранд бэлтгэлийг дэмжинэ.
      </>
    ),
    noticeColor: "bg-orange-50 border-orange-100",
    noticeIconColor: "text-orange-600",
  },
  {
    id: "digital",
    name: "Digital Badge",
    fullName: "Дижитал чадварын хөтөлбөр",
    subtitle: "Програм хангамж · Өгөгдөл · Ажлын орчин",
    tag: "Цахим",
    tagColor: "bg-purple-100 text-purple-700",
    icon: (
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: "bg-purple-50",
    accentColor: "bg-purple-50 border-purple-100",
    desc: "Хэрэглээний програм хангамжуудыг үр дүнтэй ашиглан текстэн мэдээлэл боловсруулах, хүснэгтэн өгөгдлийг тооцоолох функцүүд, их хэмжээний өгөгдөлтэй ажиллах хэрэгслүүдийг бие даан судалж ажлын орчинд шаардлагатай ур чадваруудыг эзэмшихэд дэмжлэг үзүүлэх цахим сургалтын хөтөлбөр.",
    items: [
      "Текстэн мэдээлэл боловсруулах програм хангамж үр дүнтэй ашиглах",
      "Хүснэгтэн өгөгдлийг тооцоолох функцүүд эзэмших",
      "Их хэмжээний өгөгдөлтэй ажиллах хэрэгслүүд судлах",
      "Ажлын орчинд шаардлагатай дижитал ур чадварууд",
    ],
    notice: (
      <>
        <span className="font-bold text-purple-700">Digital Badge</span> — дижитал чадвар олгох цахим хөтөлбөр. Бие даан судалж, ажлын орчинд шаардагдах ур чадварыг эзэмшинэ.
      </>
    ),
    noticeColor: "bg-purple-50 border-purple-100",
    noticeIconColor: "text-purple-600",
  },
];

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

function CEBadgeContent({ badge }) {
  return (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{badge.desc}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Сургалтын чиглэл</p>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {badge.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
      <div className="p-5 bg-primary/5 border border-primary/10 rounded-xl">
        <div className="flex items-start gap-3">
          <InfoIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">{badge.notice}</p>
        </div>
      </div>
    </>
  );
}

function ARTBadgeContent({ badge }) {
  return (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{badge.desc}</p>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {badge.details.map((item, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
          <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            Давуу тал
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {badge.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 bg-gradient-to-br from-third/5 to-transparent rounded-xl border border-third/10">
          <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Сертификат түвшин
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {badge.levels.map((lvl, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${lvl.dotColor} flex-shrink-0`} />
                <span>{lvl.label}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 pt-1">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Blockchain verified сертификат</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-5 bg-gradient-to-r from-primary/5 to-third/5 border border-primary/10 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-third/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-1">ART Mentor оюутан</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{badge.mentor}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function GenericBadgeContent({ badge }) {
  return (
    <>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{badge.desc}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Суралцах зорилт</p>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {badge.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
      <div className={`p-5 border rounded-xl ${badge.noticeColor}`}>
        <div className="flex items-start gap-3">
          <InfoIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${badge.noticeIconColor}`} />
          <p className="text-sm text-gray-700 leading-relaxed">{badge.notice}</p>
        </div>
      </div>
    </>
  );
}

export default function MeritProgram() {
  const [activeId, setActiveId] = useState("ce");
  const active = badges.find((b) => b.id === activeId);

  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Цахим тэмдэгтийн хөтөлбөр
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            СЭЗИС-ийн бакалаврын хөтөлбөрийн оюутанд соёл, дүрэм журмыг таниулах, сургуулиа төлөөлөн ёс суртахуун, эерэг харилцааг нийгэмдээ түгээх иргэн болж төлөвшихөд дэмжлэг үзүүлэх — хувь хүний соёл, төлөвшил, мэдрэмж, ур чадвар болон карьер хөгжил, нийгмийн оролцоо, хөдөлмөр эрхлэлтийг дэмжих сургалтын болон сургалтын бус үйл ажиллагаа.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10">
            {[
              { num: "5", label: "Тэмдэгт" },
              { num: "Blockchain", label: "Баталгаажуулалт" },
              { num: "Цахим + Танхим", label: "Хосолсон хэлбэр" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-third font-black text-xl">{s.num}</p>
                <p className="text-white/55 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BADGE TABS */}
      <div className="grid grid-cols-5 gap-2">
        {badges.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveId(b.id)}
            className={`rounded-xl p-3 text-center border transition-all duration-150 ${
              activeId === b.id
                ? "border-primary bg-primary/5"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className={`w-10 h-10 ${b.iconBg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              {b.icon}
            </div>
            <p className={`text-xs font-bold leading-tight ${activeId === b.id ? "text-primary" : "text-gray-700"}`}>
              {b.name}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 hidden sm:block">{b.subtitle.split(" · ")[0]}</p>
          </button>
        ))}
      </div>

      {/* ACTIVE BADGE CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {/* Card Header */}
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className={`w-12 h-12 ${active.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {active.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-primary">{active.name}</h2>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${active.tagColor}`}>
                {active.tag}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{active.fullName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{active.subtitle}</p>
          </div>
        </div>

        {/* Card Body */}
        {active.id === "ce" && <CEBadgeContent badge={active} />}
        {active.id === "art" && <ARTBadgeContent badge={active} />}
        {active.id !== "ce" && active.id !== "art" && <GenericBadgeContent badge={active} />}
      </div>
    </div>
  );
}