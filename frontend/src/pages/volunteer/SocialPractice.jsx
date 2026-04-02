export default function SocialPractice() {
  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-third/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Нийгмийн дадлага
            </h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl mb-6">
            Нийгмийн харилцаанд идэвхтэй оролцож, ёс суртахуунтай, хариуцлагатай иргэн болон төлөвшихөд чиглэсэн сайн дурын ажил.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-medium">24+ цаг</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-sm font-medium">1–13 долоо хоног</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-white text-sm font-medium">Кредитгүй</span>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE & SKILLS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="font-bold text-primary">Зорилго</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Хувийн хариуцлага, соёл төлөвшүүлэх</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Харилцааны чадвар хөгжүүлэх</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Бүтээлч сэтгэлгээ нэмэгдүүлэх</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Иргэншил, нийгмийн оролцоог дэмжих</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-primary">Оюутанд олгох чадвар</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Иргэний үүргээ ухамсарлах</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Хүний эрх, ёс суртахууныг дээдлэх</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Багаар ажиллах чадвар</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
              <span>Цаг төлөвлөлтийн ур чадвар</span>
            </li>
          </ul>
        </div>
      </div>

      {/* TYPES SECTION */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Дадлагын төрөл
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-primary">Захиалгат</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Сургуулиас санал болгосон байгууллагад бүртгүүлж, тухайн улиралд гүйцэтгэнэ.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-third/5 to-transparent rounded-xl border border-third/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-third rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <h3 className="font-semibold text-primary">Өөрөө санаачилсан</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Оюутан өөрөө байгууллага сонгон төлөвлөгөө гаргаж, дадлагаа гүйцэтгэнэ.
            </p>
          </div>
        </div>
      </div>

      {/* PROCESS TIMELINE */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Ерөнхий процесс
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Эхлэхээс өмнө",
              items: [
                "Хичээл сонгох",
                "Удирдамжтай танилцах",
                "Classroom / Teams-д нэгдэх",
              ],
            },
            {
              title: "Гүйцэтгэх",
              items: [
                "Чиглүүлэг сургалт",
                "24+ цаг сайн дурын ажил",
                "Байгууллагатай хамтран ажиллах",
              ],
            },
            {
              title: "Дуусгах",
              items: [
                "Тодорхойлолт авах / Тайлан бичих",
                "Имэйлээр илгээх",
                "Тайлан хамгаалах",
              ],
            },
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-primary">{step.title}</h3>
              </div>
              <ul className="space-y-2">
                {step.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* VOLUNTEER BADGE */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-10 text-center">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
            <span className="text-third text-sm font-bold tracking-wider uppercase">Volunteer Badge / BDG301</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            100+ цаг сайн дурын ажил
          </h2>

          <p className="text-white/80 text-sm max-w-2xl mx-auto leading-relaxed">
            Нийгмийн дадлагаас гадна 100 ба түүнээс дээш цагийн сайн дурын ажил гүйцэтгэсэн оюутанд 
            Volunteer Badge олгоно. I–IV курс хамрагдах боломжтой.
          </p>
        </div>
      </section>
    </div>
  );
}