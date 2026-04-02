import { FaCalendarAlt } from "react-icons/fa";

export default function ConnectCenter() {
  return (
    <section className="max-w-5xl px-6 py-10 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaCalendarAlt className="text-2xl text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800">
          UFE Connect Center хуваарь
        </h2>
      </div>

      <p className="max-w-2xl mb-8 text-gray-600">
        Зөвлөгөө өгөх төвийн цагийн хуваарь болон уулзалтын дэлгэрэнгүй
        мэдээллийг доорх хүснэгтээс харна уу.
      </p>

      {/* Schedule Card */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="overflow-hidden rounded-lg">
          <img
            src="/images/connect_schedule.jpg"
            alt="UFE Connect Center хуваарь"
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
