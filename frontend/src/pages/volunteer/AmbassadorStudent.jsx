export default function AmbassadorStudent() {
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
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Амбассадор оюутан
            </h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            СЭЗИС-ийн Амбассадор оюутны хөтөлбөр нь идэвхтэй, хариуцлагатай, харилцааны ур чадвартай оюутнуудыг сургуулиа төлөөлөх, элсэлт сурталчилгаа болон оюутны оролцооны үйл ажиллагаанд оролцуулах зорилготой. Тус хөтөлбөрөөр дамжуулан оюутнууд сургуулийн үнэт зүйл, соёлыг түгээн дэлгэрүүлж, шинэ болон одоо суралцаж буй оюутнуудад мэдээлэл, чиглүүлэг өгөхийн зэрэгцээ нийгэм, олон нийтэд эерэг хувь нэмэр оруулах боломжтой.
          </p>
        </div>
      </section>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT COLUMN - Info Cards */}
        <div className="space-y-6">

          {/* Зорилго */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Зорилго</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Дотоод, гадаад орчинд сургуулиа төлөөлөх, шинэ элсэгчдийг чиглүүлэн ажиллах, сургуулийн үнэт зүйлсийг түгээн дэлгэрүүлэх, манлайлагч оюутнуудыг шалгаруулж, алдаршуулахад зорилготой.
            </p>
          </div>

          {/* Үндсэн чиг үүрэг */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Үндсэн чиг үүрэг</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Амбассадор оюутнууд өөрсдийн санаачилга, бүтээлч шинэ санаанд тулгуурлан оюутны оролцоог нэмэгдүүлэх үйл ажиллагаа зохион байгуулж, сургууль болон нийгэмд эерэг хувь нэмэр оруулах.
            </p>
          </div>

          {/* Хэнд зориулагдсан */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Хэнд зориулагдсан бэ?</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              СЭЗИС-ийн бакалаврын хөтөлбөрт суралцаж буй оюутнуудад зориулагдсан.
            </p>
          </div>

          {/* Хөтөлбөрийн үнэ цэн */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Хөтөлбөрийн үнэ цэн</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Оюутан өөрийн мэдлэг, туршлага, санаачилгаар бусдад нөлөөлөх, сургуулийн хамтын орчинд бодит хувь нэмэр оруулах, цаашдын суралцах болон ажил мэргэжлийн замналд хэрэг болохуйц үнэ цэнтэй туршлага хуримтлуулах боломжтой.
            </p>
          </div>

          {/* Хугацаа */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Хугацаа</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Намар болон хаврын улиралд хэрэгжинэ. Амбассадор оюутнууд тухайн улиралд хэрэгжүүлэх ажлын төлөвлөгөөг боловсруулж, холбогдох нэгжээр батлуулсны үндсэн дээр төлөвлөгөөний хүрээнд үйл ажиллагаанд оролцон ажиллана.
            </p>
          </div>

          {/* Хариуцсан нэгж */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Хариуцсан нэгж</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Бакалаврын сургалтын алба хариуцан зохион байгуулж, хэрэгжилтэд хяналт тавина.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* Requirements Panel */}
          <div className="bg-gradient-to-br from-primary/5 to-third/5 rounded-2xl border border-primary/10 p-8">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-third rounded-full" />
              Амбассадорт тавигдах шаардлага
            </h3>

            <ul className="space-y-4 mb-8">
              {[
                "Ректорын нэрэмжит тэтгэлэгт оюутан байх",
                "Дүрэм, журам зөрчөөгүй байх",
                "Хариуцлагатай, харилцааны соёлтой",
                "Цагаа зөв зохицуулж, үүргээ тогтмол гүйцэтгэх",
                "Манлайлал, бүтээлч сэтгэлгээтэй байх",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-6">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Сонгон шалгаруулалтын үйл явц
              </h4>
              <ol className="space-y-2 text-sm text-gray-700">
                {[
                  "Бүртгэлийн үе шат",
                  "Анхан шатны шалгаруулалт",
                  "Ярилцлагын шат",
                  "Эцсийн шалгаруулалт",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-6 border-t border-primary/10">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Сертификат, үнэлгээ, урамшуулал
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Амбассадор хөтөлбөрт идэвхтэй оролцсон оюутнууд албан ёсны сертификат авах бөгөөд хийсэн ажлын гүйцэтгэлд үндэслэн үнэлгээ, урамшуулал хүртэх боломжтой.
              </p>
            </div>
          </div>

          {/* Ач холбогдол */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Ач холбогдол</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Амбассадор оюутнаар ажилласнаар оюутан манлайлах, бусадтай үр дүнтэй харилцах, багаар хамтран ажиллах, асуудлыг шийдвэрлэх, олон нийтийн өмнө өөрийгөө зөв илэрхийлэх зэрэг ур чадвараа бодит орчинд хөгжүүлэх боломжтой. Түүнчлэн сургуулийг төлөөлөн оролцох үйл ажиллагааны явцад хариуцлагатай байх, цагийг зөв зохион байгуулах, байгууллагын соёл, үнэт зүйлд нийцүүлэн ажиллах дадал төлөвшинө.
            </p>
          </div>
        </div>
      </div>

      {/* SKILLS GRID - full width */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-7 bg-third rounded-full" />
          Хөгжүүлэх ур чадварууд
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              ),
              title: "Манлайлах ур чадвар",
              desc: "Амбассадор хөтөлбөрт оролцсоноор оюутан хариуцлага хүлээх, бусдыг зөв чиглүүлэх, идэвх санаачилгатай оролцох замаар манлайлах чадвараа бодит орчинд хөгжүүлэх боломжтой.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              ),
              title: "Харилцааны ур чадвар",
              desc: "Элсэгчид, эцэг эх, багш ажилтан болон бусад оюутнуудтай харилцах явцад өөрийгөө зөв илэрхийлэх, мэдээллийг ойлгомжтой хүргэх, харилцааны соёлоо сайжруулах боломж бүрдэнэ.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              ),
              title: "Багаар ажиллах чадвар",
              desc: "Амбассадор оюутнууд хамтран үйл ажиллагаа зохион байгуулах, үүрэг хуваарилах, нэг зорилгын төлөө ажиллах замаар багаар ажиллах бодит чадвар, туршлага хуримтлуулна.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              ),
              title: "Бодит туршлага",
              desc: "Сургуулийн өдөр тутмын болон тусгай үйл ажиллагаанд оролцсоноор оюутан зөвхөн онолын бус, практикт суурилсан ажлын бодит туршлага олж авна.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              ),
              title: "Шинэ хүмүүстэй танилцах",
              desc: "Хөтөлбөрт хамрагдсанаар шинэ найз нөхөдтэй болохоос гадна сургууль доторх болон гаднах олон хүмүүстэй танилцаж, ирээдүйд хэрэг болохуйц харилцааны сүлжээ бий болгоно.",
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              ),
              title: "Карьерын давуу тал",
              desc: "Амбассадороор ажилласан туршлага нь оюутны CV-д үнэ цэн нэмэгдүүлж, цаашдын ажил, дадлага, манлайллын боломжуудад давуу тал болж өгнө.",
            },
          ].map((skill, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {skill.icon}
                </svg>
              </div>
              <h4 className="font-bold text-primary text-sm">{skill.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}