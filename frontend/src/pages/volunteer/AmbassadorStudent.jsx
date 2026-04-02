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
              Амбассадор оюутны хөтөлбөр
            </h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            СЭЗИС-ийг төлөөлөх, шинэ элсэгчдийг чиглүүлэх, сургуулийн үнэт зүйлсийг түгээх манлайлагч оюутнуудыг бэлтгэх хөтөлбөр.
          </p>
        </div>
      </section>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT COLUMN - Info Cards */}
        <div className="space-y-6">
          
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
              СЭЗИС-ийг дотоод, гадаад орчинд төлөөлөх, шинэ элсэгчдийг чиглүүлэх, сургуулийн үнэт зүйлсийг түгээх, нийгэмд эерэг өөрчлөлт авчрах.
            </p>
          </div>

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
              СЭЗИС-ийн бакалаврын өдрийн хөтөлбөрийн оюутнууд
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Үргэлжлэх хугацаа</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Хичээлийн жилийн улирал бүр
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Үйл ажиллагаа</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Сургуулийн үйл ажиллагаанд оролцох, дэмжих</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Оюутны хөгжлийн клуб, сургалт, уралдаан зохион байгуулах</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Сайн дурын ажил, нийгмийн хариуцлагын хөтөлбөрт оролцох</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <span>Хамт олны эв нэгдэл, багийн сэтгэлгээг хөгжүүлэх уулзалт, аялал</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN - Requirements Panel */}
        <div>
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
                Сонгон шалгаруулалт
              </h4>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary">1.</span>
                  <span>Бүртгэлийн үе шат</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary">2.</span>
                  <span>Анхан шатны шалгаруулалт</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary">3.</span>
                  <span>Ярилцлагын шат</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary">4.</span>
                  <span>Эцсийн шалгаруулалт</span>
                </li>
              </ol>
            </div>

            <div className="pt-6 border-t border-primary/10">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Тайлан ба урамшуулал
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Амжилттай ажилласан амбассадор оюутанд батламж гардуулж, олон нийтэд алдаршуулна. Батламж нь тэтгэлэг болон "Шилдэг оюутан"-д нэр дэвшихэд давуу тал болно. Сайн дурын ажлын цагийг диплом дээр тэмдэглэнэ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}