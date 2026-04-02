export default function Clubs() {
  const clubs = [
    { name: "Агшин", activity: "Гэрэл зураг, видео", year: "2014 он" },
    { name: "Радокс", activity: "", year: "" },
    { name: "Старт-ап", activity: "Оюутнуудын бизнес санааг дэмжих, хөгжүүлэх", year: "2017 он" },
    { name: "Бета", activity: "Судалгаа шинжилгээ хийх, оюутнуудад судалгааны тухай мэдээлэл өгөх", year: "2019 он" },
    { name: "White hats", activity: "Технологийн салбар дахь боломжуудыг таньж мэдэх, судлах", year: "2022 он" },
    { name: "ХАЙВ", activity: "Нягтлан бодох бүртгэлийн оюутнуудад практикын мэдлэг олгох", year: "2016 он" },
    { name: "GRC", activity: "", year: "" },
    { name: "Талкологи", activity: "Англи хэлний ярианы чадвар, үзэл бодлоо илэрхийлэх", year: "" },
    { name: "CS", activity: "Хятад хэлтэй боловсон хүчинг бэлдэх", year: "" },
    { name: "You HYPE", activity: "Медиа контент бүтээх", year: "2023 он" },
    { name: "Сэтгэшгүй", activity: "Санхүү, хөрөнгийн зах зээлийн мэдлэг солилцох", year: "2007 он" },
    { name: "Хөрөнгө оруулалтын сан", activity: "Хөрөнгө оруулалт, техник ба суурь шинжилгээ", year: "2014 он" },
    { name: "PIA", activity: "Даатгал", year: "2021 он" },
    { name: "Banker", activity: "Банк", year: "" },
    { name: "Фанат", activity: "Спортын тэмцээн уралдаан, арга хэмжээ", year: "2007 он" },
    { name: "Цэцэн бэрс", activity: "Шатрын спортын мэдлэг түгээх", year: "" },
    { name: "Оргил", activity: "Математикийн уралдаан, олимпиад", year: "" },
    { name: "Этика", activity: "Ёс зүй, соёлын стандарт сурталчлах", year: "" },
    { name: "Максимум", activity: "Уран илтгэл, мэтгэлцээн, хувь хүний хөгжил", year: "" },
    { name: "АЙСЕК", activity: "Сайн дурын ажил, хувь хүний хөгжил", year: "2014 он" },
    { name: "Хэмнэл", activity: "Урлаг", year: "2015 он" },
    { name: "Кобалт", activity: "Дүрслэх урлаг, уран зураг", year: "2016 он" },
    { name: "Ротаракт", activity: "", year: "" },
    { name: "КАПС", activity: "Хувь хүний хөгжил", year: "2017 он" },
    { name: "Улаан загалмай", activity: "Сайн дурын үйл ажиллагаа", year: "2019 он" },
    { name: "Оюуны хээ", activity: "Сэтгэл зүйн клуб", year: "2019 он" },
    { name: "Акси", activity: "Эрх зүй, Mock Trial, илтгэл, мэтгэлцээн", year: "2016 он" },
    { name: "Эдийн засагчдын клуб", activity: "Судалгаа шинжилгээ, илтгэл хэлэлцүүлэг", year: "2019 он" },
  ];

  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="mb-4 text-2xl font-semibold text-[#1a3a5c]">Клубүүд</h2>
      <p className="text-gray-600 mb-8">
        Спорт, урлаг, шинжлэх ухаан болон сонирхлын клубүүдийн танилцуулга.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-[#1a3a5c] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Клуб</th>
              <th className="px-4 py-2 text-left">Үйл ажиллагааны чиглэл</th>
              <th className="px-4 py-2 text-left">Байгуулагдсан он</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2">{club.name}</td>
                <td className="px-4 py-2">{club.activity || "-"}</td>
                <td className="px-4 py-2">{club.year || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}