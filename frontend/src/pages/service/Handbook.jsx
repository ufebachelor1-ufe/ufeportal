export default function Handbook() {
  return (
    <section className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Оюутны гарын авлага
            </h1>
            <p className="mt-1 text-gray-500">
              Сургалтын үйл ажиллагаатай холбоотой мэдээлэл
            </p>
          </div>

          {/* Download Button */}
          <a
            href="/Handbook.pdf"
            download="Оюутны_гарын_авлага.pdf"
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
          >
            PDF татах
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="p-4 bg-white shadow-lg rounded-3xl">
          <iframe
            src="/Handbook.pdf"
            className="w-full h-[750px] md:h-[900px] rounded-2xl border"
            title="Оюутны гарын авлага"
          />
        </div>
      </div>
    </section>
  );
}
