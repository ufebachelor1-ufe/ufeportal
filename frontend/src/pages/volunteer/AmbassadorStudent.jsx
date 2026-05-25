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
            Амбассадор оюутны хөтөлбөр нь сургуулиа дотоод, гадаад орчинд төлөөлөх, шинэ элсэгчдэд мэдээлэл, зөвлөгөө, чиглүүлэг өгөх, сургуулийн үнэт зүйлсийг түгээн дэлгэрүүлэх, оюутны манлайлал, оролцоо, хамтын ажиллагааг дэмжих зорилготой.
          </p>
        </div>
      </section>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        {/* LEFT COLUMN */}
        <div className="space-y-6 h-full">

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
              Оюутны манлайлал, харилцаа, багаар ажиллах чадвар, бүтээлч сэтгэлгээг хөгжүүлэхийн зэрэгцээ сургуулийн үйл ажиллагаанд оюутны оролцоог нэмэгдүүлэх, шинэ элсэгчид болон бусад оролцогч талуудад сургуулийн талаар эерэг, зөв ойлголт түгээхэд оршино.
            </p>
          </div>

          {/* Хамрах хүрээ */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Хамрах хүрээ</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              СЭЗИС-ийн бакалаврын хөтөлбөрийн оюутнууд амбассадор оюутнаар ажиллах боломжтой.
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
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <div className="flex items-start gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <p>Хичээлийн жилийн намар болон хаврын улирал. Зун болон өвлийн улиралд үргэлжлүүлэн ажиллаж, илүү цаг хуримтлуулах боломжтой.</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <p>Нэг улиралд амбассадор оюутан нийт <span className="font-bold text-primary">30 цагаас багагүй</span> хугацаанд ажилласан байна. Үүнээс өөрийн болон багийн санаачилгаар хэрэгжүүлэх үйл ажиллагаа, мөн Бакалаврын сургалтын албанаас даалгасан ажил багтана.</p>
              </div>
            </div>
          </div>

          {/* Дэмжлэг, урамшуулал */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Дэмжлэг, урамшуулал</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3 italic">Амжилттай ажилласан амбассадор оюутан:</p>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
              {[
                "Батламж гардан авна.",
                "Батламж нь \"Ректорын нэрэмжит тэтгэлэг\", \"Шилдэг оюутан\", \"Онцлох оюутан\"-д нэр дэвшихэд давуу тал болно.",
                "Хийсэн ажлын үр дүнг сургуулийн вебсайтад байршуулж, олон нийтэд таниулна.",
                "Сайн дурын ажил гүйцэтгэсэн цагийг дипломын хавсралтад тусгуулах боломжтой.",
                "Тодорхойлох захидал авах боломжтой.",
                "Манлайлах, харилцах, багаар ажиллах, зохион байгуулах, асуудал шийдвэрлэх, бүтээлчээр сэтгэх зэрэг ур чадвараа хөгжүүлэх боломжтой.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Зохион байгуулалт */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Зохион байгуулалт</h3>
            </div>
            <ol className="space-y-2 text-sm text-gray-600">
              {[
                "Сонгон шалгаруулалт",
                "Чиглүүлэх сургалт",
                "Амбассадоруудын тэргүүн сонгох",
                "Оюутнууд багт хуваагдах",
                "Төлөвлөгөө гаргах",
                "Төлөвлөгөө батлуулах",
                "Хэрэгжүүлэлт",
                "Явцын хэлэлцүүлэг",
                "Тайлан хамгаалах",
                "Амбассадор оюутны БАТЛАМЖ",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 h-full">

          {/* Requirements Panel */}
          <div className="bg-gradient-to-br from-primary/5 to-third/5 rounded-2xl border border-primary/10 p-8">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-third rounded-full" />
              Амбассадорт тавигдах шаардлага
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                "Өмнө нь Ректорын тэтгэлэг авсан байх;",
                "Сургуулийн дотоод дүрэм, хөтөлбөрийн журам зөрчөөгүй байх;",
                "Хариуцлагатай, харилцааны соёлтой, бусадтай хамтран ажиллах чадвартай байх;",
                "Хичээлийн цагийн зохицуулалт сайтай, амбассадорын үүргийг тогтмол гүйцэтгэх боломжтой байх;",
                "Бүтээлч, шинэ санаа дэвшүүлэх, манлайлах ур чадвар хөгжүүлэх хүсэл эрмэлзэлтэй байх.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Сонгон шалгаруулалт */}
            <div className="mb-6">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Сонгон шалгаруулалт
              </h4>
              <ol className="space-y-4 text-sm text-gray-700">
                {[
                  { step: "Бүртгэлийн үе шат", desc: "Оюутан хүсэлтийн маягт бөглөж, амбассадор оюутнаар ажиллах хүсэлтээ өгнө." },
                  { step: "Анхан шатны шалгаруулалт", desc: "Ирүүлсэн материалыг үнэлж, шаардлага хангасан оюутнуудыг дараагийн шатанд шалгаруулна." },
                  { step: "Ярилцлагын шат", desc: "Оюутны хувь хүний төлөвшил, харилцаа, манлайлал, багийн ажиллагааны чадвар, зорилгыг тодруулна." },
                  { step: "Шалгаруулалт ба зарлал", desc: "Ярилцлагын үр дүнд үндэслэн тухайн улирлын амбассадор оюутнуудыг сонгон шалгаруулж, зарлана." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                    <span><span className="font-semibold">{item.step}.</span> {item.desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Үйл ажиллагааны чиглэл */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Үйл ажиллагааны чиглэл</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Амбассадор оюутнууд нь сургуулийн болон нийгмийн орчинд эерэг нөлөө үзүүлэх үйл ажиллагааг санаачлан, төлөвлөж, хэрэгжүүлнэ. Үйл ажиллагаа дараах үндсэн чиглэлтэй байна.
            </p>
            <div className="space-y-4">
              {[
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
                  desc: "Амбассадор оюутнууд нь элсэлт, сурталчилгаа, оюутны чиглүүлэг, арга хэмжээний зохион байгуулалт болон мэдээлэл түгээх зэрэг сургуулийн үйл ажиллагааг дэмжих ажилд оролцоно.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}