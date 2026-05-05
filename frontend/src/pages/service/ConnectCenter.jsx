import { FaCalendarAlt } from "react-icons/fa";

export default function ConnectCenter() {
  return (
    <section className="max-w-5xl px-6 py-10 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaCalendarAlt className="text-2xl text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800">
          UFE Connect Zone хуваарь
        </h2>
      </div>

      <div className="max-w-2xl mb-8 space-y-3 text-gray-600">
        <div className="flex items-center gap-3">
          <span className="text-blue-600"></span>
          <p><strong>Байршил:</strong> СЭЗИС, С байр, 103 тоот</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-blue-600"></span>
          <p><strong>Хуваарь:</strong> 2026.04.22 – 2026.07.03</p>
          <p>Пүрэв, Баасан | 14:00 – 17:30</p>
        </div>
      </div>

      {/* Schedule Card */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-hidden rounded-lg">
          <img
            src="/images/connect_schedule.jpg"
            alt="UFE Connect Zone хуваарь"
            className="object-contain w-full"
          />
        </div>

        {/* Optional caption */}
        <p className="mt-3 text-sm text-center text-gray-500">
          📌 Хуваарь нь улирал сар шинэчлэгдэнэ
        </p>
      </div>
    </section>
  );
}
