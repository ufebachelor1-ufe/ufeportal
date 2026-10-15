export default function StudentLife() {
  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third" />

        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Оюутны цахим сэтгүүл
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-3xl">
            Сургуулийн орчинд өрнөж буй оюутан бүрийн хөдөлмөр, хичээл зүтгэлийн ард олон сонирхолтой түүхүүд, сэтгэл хөдөлгөм мөчүүд оршиж байдаг.
          </p>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <div className="pt-2">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Видео контент
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-third/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-third"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-primary">{video.title}</h3>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-black aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-third rounded-full" />
          Оюутны цахим сэтгүүл
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {newsletters.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Canva viewer (page-flip card like the reference) */}
              <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm aspect-[566/775]">
                <iframe
                  src={item.url}
                  title={item.title}
                  loading="lazy"
                  allowFullScreen
                  allow="fullscreen"
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Edit the titles / links here – the page updates automatically.
const newsletters = [
  {
    title: "Дугаар 1",
    url: "https://www.canva.com/design/DAHVUSed0M4/HgMlVgyQiThgXwgMBO1ROg/view?embed",
    link: "https://www.canva.com/design/DAHVUSed0M4/HgMlVgyQiThgXwgMBO1ROg/view",
  },
  {
    title: "Дугаар 2",
    url: "https://www.canva.com/design/DAHWpNJXSSM/JtjXDqh8EvKERbnhhYkiWg/view?embed",
    link: "https://www.canva.com/design/DAHWpNJXSSM/JtjXDqh8EvKERbnhhYkiWg/view",
  },
];

const videos = [
  { title: "Ufe NewsLetter", id: "juFi64nIRvc" },
  { title: "Ufe NewsLetter", id: "Mv_XhuHiuao" },
];