export default function Achievements() {
  return (
    <div className="space-y-8">

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/80 p-8 sm:p-12">
        <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-third via-third/80 to-third"></div>
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Амжилт тэтгэлгийн бүртгэл</h2>
          <p className="text-white/80 text-base leading-relaxed max-w-4xl mb-6">
            Оюутан та өөрийн гаргасан амжилт, тэтгэлгээ бүртгүүлснээр СЭЗИС-ийн Оны шилдэг оюутан, Онцлох төгсөгчид нэрээ дэвшүүлэх, гадаадын их дээд сургуульд дэвшин суралцах, болон сургуулийн захиргааны шагналд тодорхойлуулах, цаашлаад хөтөлбөр хэрэгжүүлэгч нэгжийн амжилтыг бататгах, улмаар СЭЗИС-ийн нэр хүнд, үнэ цэнийг нэмэгдүүлэх ач холбогдолтой.
          </p>
          <a href="https://forms.office.com/pages/responsepage.aspx?id=HZFS4HexkUaAnXnjPNM-eBaMVZK3QeRLlJFKXKxQgaNUOTg4T0xYTFlLODZFOUFHQUFHRFRaTTBJWS4u&route=shorturl" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">Бүртгэл</a>
        </div>
      </section>

      <section className="bg-primary rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-2">Амжилт тэтгэлэгт бүртгүүлэх заавар</h3>
        <p className="text-white/70 text-sm mb-4">СЭЗИС-ийн оюутнуудын амжилтын тухай</p>
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black/30 border border-white/20">
          <video controls className="w-full h-full" controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
            <source src="https://ypjnsfqpyszcnzibfitt.supabase.co/storage/v1/object/public/images/videos/Scholarship.mp4" type="video/mp4" />
            Таны browser видео дэмжихгүй байна.
          </video>
        </div>
      </section>
    </div>
  );
}