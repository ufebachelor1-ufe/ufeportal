import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function StudentUnion() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">
          СЭЗИС-ийн дэргэдэх “Оюутны холбоо” ТББ
        </h2>
        <p className="leading-relaxed text-gray-600">
          “Оюутны Холбоо” ТББ нь 1998–2006 онуудад “Оюутны Зөвлөл” нэртэйгээр,
          2006 оноос эхлэн төрийн бус байгууллагын статустайгаар
          тасралтгүй үйл ажиллагаа явуулж байна.
        </p>
      </header>

      {/* Vision & Mission */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white border shadow-sm rounded-2xl">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            Алсын хараа
          </h3>
          <p className="text-gray-600">
            “Бүс нутагтаа хүлээн зөвшөөрөгдсөн, хөгжилд манлайлан
            чиглүүлэгч оюутны байгууллага болон хөгжих”
          </p>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-2xl">
          <h3 className="mb-2 text-xl font-semibold text-gray-800">
            Эрхэм зорилго
          </h3>
          <p className="text-gray-600">
            “Өөрийгөө сэрээж чадсан, нийгмийг соён гэгээрүүлэх үйлсэд
            хувь нэмрээ оруулахуйц иргэн болон төлөвшихөд
            оюутнуудаа дэмжин ажиллах”
          </p>
        </div>
      </section>

      {/* Values */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
          Бидний эрхэмлэх үнэт зүйлс
        </h3>
        <ul className="grid gap-3 text-gray-600 list-disc list-inside md:grid-cols-2">
          <li>Хууль, эрх зүйт ёсыг дээдлэх</li>
          <li>Байнга суралцаж, хөгжин дэвших</li>
          <li>Харилцан хүндэтгэх</li>
          <li>Эрх тэгш хандах, шударга ёсыг дээдлэх</li>
          <li>Үүрэг хариуцлагаа ухамсарлах</li>
          <li>Хамт олонч, бүтээлч байх</li>
        </ul>
      </section>

      {/* Activities */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
          Үйл ажиллагааны үндсэн чиглэл
        </h3>
        <ul className="space-y-2 text-gray-600 list-disc list-inside">
          <li>Оюутнуудын эрх ашгийг хамгаалах бодлого боловсруулах</li>
          <li>Оюутантай холбоотой судалгаа шинжилгээ хийх</li>
          <li>
            Соёл, спорт, урлаг, нийгмийн компанит ажлыг салбар
            байгууллагуудаар дамжуулан хэрэгжүүлэх
          </li>
          <li>
            Оюутнуудад холбогдох хууль, тогтоомж, мэдээллээр хангах
          </li>
          <li>Байгууллагын чадамжийг тасралтгүй сайжруулах</li>
        </ul>
      </section>

      {/* Motto */}
      <section className="p-6 text-center bg-blue-50 rounded-2xl">
        <p className="text-xl font-semibold text-blue-700">
          “Нэгдэж аваад хөгжье, хөгжиж аваад тэлье”
        </p>
      </section>

      {/* Contact */}
      <section className="p-6 bg-white border shadow-sm rounded-2xl">
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
          Холбоо барих
        </h3>

        <div className="space-y-4 text-gray-600">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600" />
            <span>student_union@ufe.edu.mn</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-red-500" />
            <span>
              Улаанбаатар хот, БЗД 1-р хороо,
              СЭЗИС-ийн C байр, 301 тоот
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://facebook.com/ufestudentunion/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
            >
              <FaFacebook className="text-xl" />
              Facebook
            </a>

            <a
              href="https://www.instagram.com/student.union_ufe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 font-medium text-white transition bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-xl hover:opacity-90"
            >
              <FaInstagram className="text-xl" />
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
