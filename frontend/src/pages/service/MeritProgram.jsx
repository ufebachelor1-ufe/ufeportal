export default function MeritProgram() {
  return (
    <div className="space-y-8">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Тэмдэгтийн хөтөлбөр
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            Суралцах, ур чадвар хөгжүүлэх, манлайллыг дэмжих тэмдэгт хөтөлбөрүүд
          </p>
        </div>
      </section>

      {/* CE BADGE PROGRAM */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">CE Badge хөтөлбөр</h2>
            <p className="text-sm text-gray-500">Campus Engagement Badge</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {[
            "СЭЗИС-ийн ёс зүйн дүрэм, кодекстэй танилцах",
            "СЭЗИС-ийн дүрэм, журамтай танилцах",
            "ЭКО СЭЗИС – хаягдал ангилан ялгах, ач холбогдол",
            "Ёс суртахуунлаг СЭЗИС – эерэг, хүндэтгэлтэй орчин бүрдүүлэх",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="p-5 bg-primary/5 border border-primary/10 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-gray-700 leading-relaxed">
              Дээрх 4 чиглэлээр шалгалт өгч, болзол ханговол <span className="font-bold text-primary">"CE BADGE" цахим тэмдэг</span> олгоно.
            </p>
          </div>
        </div>
      </div>

      {/* ART BADGE PROGRAM */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-third/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary">ART Badge хөтөлбөр</h2>
            <p className="text-sm text-gray-500">Artistic & Creative Skills Badge</p>
          </div>
        </div>

        {/* Program Details Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Үргэлжлэх хугацаа", value: "4 долоо хоног" },
            { label: "Хичээлийн хэлбэр", value: "7 хоногт 1 удаа, 3 цаг" },
            { label: "Нийт сургалт", value: "12 цаг" },
            { label: "Сургалтын төлбөр", value: "120,000₮" },
            { label: "Хэлбэр", value: "Цахим / Танхим хосолсон" },
            { label: "Боломж", value: "Хүссэн бүх сургалтдаа суралцах" },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Benefits & Certificates */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Давуу тал
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Зөөлөн ур чадвар хөгжүүлнэ</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>CV баяжуулна</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Сэтгэл зүйн эрүүл мэндэд эерэг</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-gradient-to-br from-third/5 to-transparent rounded-xl border border-third/10">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Сертификат
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Blockchain verified сертификат</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>1-р түвшин – Хүрэл</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>2-р түвшин – Мөнгөн</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>3-р түвшин – Алтан</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mentor Opportunity */}
        <div className="p-5 bg-gradient-to-r from-primary/5 to-third/5 border border-primary/10 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-third/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">ART Mentor оюутан</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Дадлагатай, цалинтай ажиллах боломжтой (ART Badge авсан байх шаардлагатай).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}