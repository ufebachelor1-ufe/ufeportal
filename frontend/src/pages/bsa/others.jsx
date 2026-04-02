import { MapPin, Phone } from "lucide-react";

function Department({ title, children }) {
  return (
    <section className="p-6 space-y-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <header className="pb-3 border-b">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </header>
      {children}
    </section>
  );
}

export default function Others() {
  return (
    <div className="max-w-6xl px-4 mx-auto space-y-12">

      {/* Бүртгэл, чанарын алба */}
      <Department title="Бүртгэл, чанарын алба">
        {/* ... зорилго, чиг үүрэг sections ... */}
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> С байрны 301 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 70008085-2030</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
             Элсэлтийн бүртгэл, дүнгийн тодорхойлолт, шилжилт хөдөлгөөн, дипломын баталгаажуулалттай холбоотой асуудлаар холбогдоно.
          </p>
        </section>
      </Department>

      {/* Мэдээллийн технологийн алба */}
      <Department title="Мэдээллийн технологийн алба">
        {/* ... зорилго, чиг үүрэг sections ... */}
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> B байрны 401 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 70158820</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Сургалтын систем, дотоод платформ, цахим үйлчилгээний доголдол, мэдээллийн аюулгүй байдлын асуудлаар холбогдоно.
          </p>
        </section>
      </Department>

      {/* Эдийн засаг, санхүүгийн алба */}
      <Department title="Эдийн засаг, санхүүгийн алба">
        {/* ... зорилго, чиг үүрэг sections ... */}
        <section className="space-y-2">
          <h3 className="text-lg font-medium">Холбоо барих</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> C байр 302 тоот</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 77774400-2-1</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Сургалтын төлбөр, хураамжийн тооцоо, үлдэгдэл, тэтгэлэг, санхүүгийн тайлантай холбоотой асуудлаар холбогдоно.
          </p>
        </section>
      </Department>

    </div>
  );
}