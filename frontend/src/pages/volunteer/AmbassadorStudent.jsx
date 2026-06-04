import { useState } from "react";

const tabs = [
  {
    id: "intro",
    name: "Танилцуулга",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    goal:
      "Оюутны манлайлал, харилцаа, багаар ажиллах чадвар, бүтээлч сэтгэлгээг хөгжүүлэхийн зэрэгцээ сургуулийн үйл ажиллагаанд оюутны оролцоог нэмэгдүүлэх, шинэ элсэгчид болон бусад оролцогч талуудад сургуулийн талаар эерэг, зөв ойлголт түгээхэд оршино.",
    scope: "СЭЗИС-ийн бакалаврын хөтөлбөрийн оюутан.",
    requirements: [
      "Өмнө нь Ректорын тэтгэлэг авсан байх;",
      "Сургуулийн дотоод дүрэм, хөтөлбөрийн журам зөрчөөгүй байх;",
      "Хариуцлагатай, харилцааны соёлтой, бусадтай хамтран ажиллах чадвартай байх;",
      "Хичээлийн цагийн зохицуулалт сайтай, амбассадорын үүргийг тогтмол гүйцэтгэх боломжтой байх;",
      "Бүтээлч, шинэ санаа дэвшүүлэх, манлайлах ур чадвар хөгжүүлэх хүсэл эрмэлзэлтэй байх.",
    ],
    duration: [
      "Хичээлийн жилийн намар болон хаврын улирал. Зун болон өвлийн улиралд үргэлжлүүлэн ажиллах боломжтой.",
      "Нэг улиралд нийт 30 цагаас багагүй хугацаанд ажилласан байна.",
    ],
    benefits: [
      "Батламж гардан авна.",
      "Батламж нь Ректорын нэрэмжит тэтгэлэг, Шилдэг оюутан, Онцлох оюутан-д нэр дэвшихэд давуу тал болно.",
      "Хийсэн ажлын үр дүнг сургуулийн вебсайтад байршуулж, олон нийтэд таниулна.",
      "Сайн дурын ажил гүйцэтгэсэн цагийг дипломын хавсралтад тусгуулах боломжтой.",
      "Тодорхойлох захидал авах боломжтой.",
      "Манлайлах, харилцах, багаар ажиллах, зохион байгуулах, асуудал шийдвэрлэх, бүтээлчээр сэтгэх зэрэг ур чадвараа хөгжүүлэх боломжтой.",
    ],
    organization: [
      "Сонгон шалгаруулалт",
      "Чиглүүлэх сургалт",
      "Амбассадоруудын тэргүүн сонгох",
      "Багт хуваагдах",
      "Төлөвлөгөө гаргах",
      "Төлөвлөгөө батлуулах",
      "Хэрэгжүүлэлт",
      "Явцын хэлэлцүүлэг",
      "Тайлан хамгаалах",
      "БАТЛАМЖ",
    ],
  },
  {
    id: "activity",
    name: "Үйл ажиллагааны чиглэл",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    intro:
      "Амбассадор оюутнууд нь сургуулийн болон нийгмийн орчинд эерэг нөлөө үзүүлэх үйл ажиллагааг санаачлан, төлөвлөж, хэрэгжүүлнэ. Үйл ажиллагаа дараах үндсэн чиглэлтэй байна.",
    directions: [
      {
        title: "Оюутны хөгжил, ёс суртахуун, манлайлал",
        desc: "Оюутнуудын хувь хүний хөгжил, идэвх оролцоо, хамтын ажиллагаа, эерэг хандлагыг дэмжихэд чиглэсэн үйл ажиллагааг санаачлан хэрэгжүүлнэ.",
      },
      {
        title: "Тогтвортой хөгжил, нийгмийн хариуцлага",
        desc: "Тогтвортой хөгжлийн зорилго, нийгмийн хариуцлага, сайн дурын оролцоо, олон нийтэд эерэг нөлөө үзүүлэх үйл ажиллагааг санаачлан хэрэгжүүлнэ.",
      },
      {
        title: "Бүтээлч санал, санаачилга",
        desc: "Сургуулийн үйл ажиллагаа, оюутны орчин, тулгамдсан хэрэгцээ, асуудлыг шийдвэрлэхэд чиглэсэн шинэ санал, шинэлэг арга хэлбэр, бүтээлч санаачилгыг боловсруулж, туршин хэрэгжүүлнэ.",
      },
      {
        title: "Нэмэлт ажил",
        desc: "Бакалаврын сургалтын албаны төлөвлөгөөнд тусгагдсан үйл ажиллагааг дэмжиж, бусад шаардлагатай ажлыг хийж гүйцэтгэнэ.",
      },
    ],
  },
  {
    id: "selection",
    name: "Сонгон шалгаруулалт",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    steps: [
      { title: "Бүртгэлийн үе шат", desc: "Оюутан хүсэлтийн маягт бөглөж, амбассадор оюутнаар ажиллах хүсэлтээ өгнө." },
      { title: "Анхан шатны шалгаруулалт", desc: "Ирүүлсэн материалыг үнэлж, шаардлага хангасан оюутнуудыг дараагийн шатанд шалгаруулна." },
      { title: "Ярилцлагын шат", desc: "Оюутны хувь хүний төлөвшил, харилцаа, манлайлал, багийн ажиллагааны чадвар, зорилгыг тодруулна." },
      { title: "Шалгаруулалт ба зарлал", desc: "Ярилцлагын үр дүнд үндэслэн тухайн улирлын амбассадор оюутнуудыг сонгон шалгаруулж, зарлана." },
    ],
  },
  {
    id: "students",
    name: "Амбассадор оюутнууд",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
      </svg>
    ),
    placeholder:
      "Тухайн улирлын сонгон шалгаруулалтаар тодорсон амбассадор оюутнуудын мэдээлэл энд байршина. Удахгүй...",
  },
];

/* --------- small shared icons used inside the cards --------- */
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

function CardHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">{icon}</div>
      <h3 className="font-bold text-primary">{title}</h3>
    </div>
  );
}

/* ----------------------- TAB RENDERERS ----------------------- */
function IntroContent({ tab }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <CardHeader title="Зорилго" icon={tab.icon} />
          <p className="text-sm text-gray-600 leading-relaxed">{tab.goal}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <CardHeader
            title="Хамрах хүрээ"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-sm text-gray-700">{tab.scope}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-third/5 rounded-2xl border border-primary/10 p-8">
        <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-third rounded-full" />
          Амбассадор оюутанд тавигдах үндсэн шаардлага
        </h3>
        <ul className="space-y-4">
          {tab.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CardHeader
          title="Хугацаа"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
          {tab.duration.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CardHeader
          title="Дэмжлэг, урамшуулал"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          }
        />
        <p className="text-sm text-gray-500 mb-4 italic">Амжилттай ажилласан амбассадор оюутан:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {tab.benefits.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <CardHeader
          title="Зохион байгуулалт"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tab.organization.map((step, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <div key={i} className={`rounded-xl border p-4 ${isLast ? "bg-primary border-primary" : "bg-gray-50 border-gray-100"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${isLast ? "bg-white text-primary" : "bg-primary text-white"}`}>
                  {i + 1}
                </div>
                <p className={`text-xs font-semibold leading-tight ${isLast ? "text-white" : "text-gray-700"}`}>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActivityContent({ tab }) {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            {tab.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-1">Амбассадор оюутнууд юу хийдэг вэ?</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{tab.intro}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tab.directions.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-third/10 text-third flex items-center justify-center font-bold mb-4">{i + 1}</div>
            <h4 className="font-bold text-primary mb-3 leading-snug">{d.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectionContent({ tab }) {
  return (
    <div className="space-y-4">
      {tab.steps.map((s, i) => (
        <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center text-lg font-black">{i + 1}</div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-1">{s.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StudentsContent({ tab }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
        {tab.icon}
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{tab.name}</h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">{tab.placeholder}</p>
    </div>
  );
}

export default function AmbassadorProgram() {
  const [activeId, setActiveId] = useState("intro");
  const active = tabs.find((t) => t.id === activeId);

  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-third/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Амбассадор оюутан</h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            Оюутны манлайлал, харилцаа, багаар ажиллах чадвар, бүтээлч сэтгэлгээг хөгжүүлэхийн зэрэгцээ
            сургуулийн үйл ажиллагаанд оюутны оролцоог нэмэгдүүлэх, шинэ элсэгчид болон бусад оролцогч
            талуудад сургуулийн талаар эерэг, зөв ойлголт түгээхэд чиглэсэн хөтөлбөр.
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center border transition-all duration-150 ${
              activeId === t.id
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className={activeId === t.id ? "text-white" : "text-primary"}>{t.icon}</span>
            <span className="text-sm font-bold leading-tight">{t.name}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE TAB CONTENT */}
      {active.id === "intro" && <IntroContent tab={active} />}
      {active.id === "activity" && <ActivityContent tab={active} />}
      {active.id === "selection" && <SelectionContent tab={active} />}
      {active.id === "students" && <StudentsContent tab={active} />}
    </div>
  );
}