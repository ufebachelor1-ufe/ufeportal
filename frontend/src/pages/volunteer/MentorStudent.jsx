export default function MentorStudent() {
  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-third/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ментор оюутны хөтөлбөр
            </h1>
          </div>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            Шинээр элсэгчдийг чиглүүлэх, сургуулийн орчинд дасан зохицоход нь туслах, хувь хүний болон мэргэжлийн хөгжилд чиглэсэн манлайлагч оюутнуудыг бэлтгэх хөтөлбөр.
          </p>
        </div>
      </section>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT COLUMN - Benefits & Scope */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-primary">Давуу талууд</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-700">Тэтгэлэгт цаг дүйцүүлэх</span>
                  <p className="text-sm text-gray-500 mt-0.5">Ректорын нэрэмжит тэтгэлэг авахад нэмэр болно</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-700">Албан ёсны сертификат</span>
                  <p className="text-sm text-gray-500 mt-0.5">Чиглүүлэгч оюутныг баталгаажуулсан баримт бичиг</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-700">Сургалт, уулзалт</span>
                  <p className="text-sm text-gray-500 mt-0.5">Манлайлах ур чадвар, хувь хүний хөгжилд чиглэсэн сургалтад хамрагдах боломж</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-700">Хувь хүний хөгжил</span>
                  <p className="text-sm text-gray-500 mt-0.5">Бусдыг удирдах арга барилд суралцах, харилцааны чадвараа сайжруулах</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-700">Дэмжлэгийн орчин</span>
                  <p className="text-sm text-gray-500 mt-0.5">Оюутны холбоо болон сургалтын албанаас бүх талаар дэмжлэг авах</p>
                </div>
              </li>
            </ul>
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
              СЭЗИС-ийн 2 болон түүнээс дээш дамжааны бакалаврын өдрийн хөтөлбөрийн оюутнууд
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - Selection & Rewards Panel */}
        <div>
          <div className="bg-gradient-to-br from-primary/5 to-third/5 rounded-2xl border border-primary/10 p-8">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-third rounded-full" />
              Шалгаруулалтын үе шат
            </h3>

            <ol className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Анхан шатны шалгаруулалт</h4>
                  <p className="text-sm text-gray-500">Анкет бөглөх, үндсэн шаардлага хангах</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Ярилцлага</h4>
                  <p className="text-sm text-gray-500">Анкетаа илгээж тэнцсэн оюутнууд хуваарийн дагуу ярилцлагад орно</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Эцсийн шалгаруулалт</h4>
                  <p className="text-sm text-gray-500">Эцсийн үнэлгээ, сонгон шалгаруулалтын үр дүн</p>
                </div>
              </li>
            </ol>

            <div className="pt-6 border-t border-primary/10">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Урамшуулал
              </h4>
              <div className="space-y-3">
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-third/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Сертификат гардуулах</p>
                      <p className="text-sm text-gray-500 mt-0.5">Амжилттай ажилласан ментор оюутанд</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-third/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Тэтгэлэгт цаг дүйцүүлэх</p>
                      <p className="text-sm text-gray-500 mt-0.5">Ректорын нэрэмжит тэтгэлэгт тооцогдоно</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-third/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Шилдэг оюутанд нэр дэвшихэд давуу тал</p>
                      <p className="text-sm text-gray-500 mt-0.5">Амжилтын бүртгэлд тооцогдоно</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}