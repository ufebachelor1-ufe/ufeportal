export default function StudentLife() {
  return (
    <div className="space-y-8">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Оюутны амьдрал
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            Дотуур байр, бүртгэл, суралцах зөвлөгөө – оюутанд хэрэгтэй бүх мэдээлэл.
          </p>
        </div>
      </section>

      {/* DORMITORY & REGISTRATION */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* ОЮУТНЫ БАЙР */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Оюутны байр</h3>
          </div>

          <div className="space-y-3">
            {[
              { label: "Нийт багтаамж", value: "280 оюутан", icon: "users" },
              { label: "Уншлагын танхим", value: "2", icon: "book" },
              { label: "Интернэт танхим", value: "20 компьютер", icon: "desktop" },
              { label: "Интернэт", value: "Үнэгүй", icon: "wifi", highlight: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className={`text-sm font-semibold ${item.highlight ? 'text-green-600' : 'text-primary'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-primary">8 сарын 15–30</span> хооронд өөрийн биеэр ирж гэрээ баталгаажуулна.
              </p>
            </div>
          </div>
        </div>

        {/* БҮРТГҮҮЛЭХ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Бүртгүүлэх бичиг баримт</h3>
          </div>

          <ul className="space-y-3">
            {[
              "Оюутны үнэмлэх",
              "Төлбөр төлсөн баримт",
              "Сургуулийн тодорхойлолт",
              "Сургалтын албаны байрны зөвшөөрөл",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Холбоо барих мэдээлэл</h3>
        </div>
        
        <p className="text-white/80 leading-relaxed mb-4">
          Монгол улс, Улаанбаатар хот, Баянзүрх дүүрэг, 6-р хороо,
          Арслантай гүүр, Оюутны А хотхон
        </p>
        
        <a href="tel:99023220" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          99023220
        </a>
      </div>

      {/* ADVICE SECTION HEADER */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Зөвлөгөө, зөвлөмж
        </h2>
      </div>

      {/* А ДҮН */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-third/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-primary">А дүн авах арга</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Хичээл эхлэхээс өмнө судлах",
            "Найзуудтайгаа зөвлөлдөх",
            "Идэвхтэй оролцох",
            "Багшийн зөвлөгөөг сонсох",
            "Хичээлээ давтах",
            "Анхаарлаа төвлөрүүлэх",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span className="text-sm text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ШАЛГАЛТ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-primary">Шалгалтаа сайн өгөх арга</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
            <h4 className="font-bold text-primary mb-4">Улирал дундын шалгалт</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>2–3 хоногийн өмнөөс бэлтгэх</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Агуулгыг тоймлон ойлгох</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Нэр томьёонд анхаарах</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-gradient-to-br from-third/5 to-transparent rounded-xl border border-third/10">
            <h4 className="font-bold text-primary mb-4">Улирал эцсийн шалгалт</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Тайван орчин бүрдүүлэх</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Эрүүл мэнддээ анхаарах</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Багшаас асуух</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* БИЕ ДААЛТ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-primary">Бие даалт бичих арга</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            "Нүүр хуудас хийх",
            "Сургалтын стандарт баримтлах",
            "Товч, тодорхой бичих",
            "Эх сурвалж зөв ашиглах",
            "Хугацаанд нь хураалгах",
            "Бүтэц, шаардлага хангах",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-sm text-gray-700 leading-relaxed">
              Бие даалт нь хариуцлага, төлөвлөлт, бүтээлч сэтгэлгээ, багаар ажиллах чадварыг хөгжүүлдэг.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}