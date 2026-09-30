import { Link } from "react-router-dom";
import {useState} from "react";
import { FaRegFileAlt } from "react-icons/fa";

const sections = [
  {
    title: "Бакалаврын сургалт зохион байгуулах журам",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQAzHv71bp-lTapszEpKHnQkAf4ljqIe0NlzMVmecUlPx90?e=aOCmgT",
    badge: "Журам",
  },
  {
    title: "Олон улсын хамтарсан, солилцооны хөтөлбөрийн сургалт зохион байгуулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCx_TL4mi0ZQ5UVpNO6CRZkAQ7aLA3UOsxDQyTkVwBDDi8?e=tk7531",
    badge: "Журам",
  },
  {
    title: "Цахим тэмдэгтийн удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCHHY6T-3rUQKNIZLyAINo-AaaqAztNdfSMri_t-2DPpP8?e=18IS3n",
    badge: "Журам",
  },
  {
    title: "Нийгмийн дадлагын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQAZpoFFBU7MR4zctiN0hJVjAWIi0HCskv2BDXcVIdt6hx0?e=m0lGwV",
    badge: "Журам",
  },
  {
    title: "Нэгдсэн шалгалтын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQDud5G30sdnRqAmHvkmNNgnARk0fVQz1_LKyVPQbEbRaek?e=LM13qZ",
    badge: "Журам",
  },
  {
    title: "Хөгжлийн семинарын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQA4Pw6eqrv2RaJ0CbF9QNroATU_egNc1-vwZKOtS9KJPuM?e=oKbZjw",
    badge: "Журам",
  },
  {
    title: "Улирлын эцсийн шалгатын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQDaWqn1vQz3SJpb89TIj4TZAV3SOkbXeiaOuxFSj4N_JIM?e=OdBc3w",
    badge: "Журам",
  },
  {
    title: "Захиалгат судалгааны ажлын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQATpE6qhewdQIufeiMnR7hlAfOBGJ1DnKk3UN_ZHGeWUNI?e=b6H0Vf",
    badge: "Журам",
  },
  {
    title: "Оюутны сайн дурын ажил гүйцэтгэх журам",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQDA3OZCDUN9TqpKL-ZnGovYAcPWf69wS2MVMIbCIABXOiQ?e=Pcah19",
    badge: "Журам",
  },
  {
    title: "Ментор оюутаны ажиллах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQABm9TLSQ5YT4w07r3HyBXHAfpX3rxGz7Ho3g3gn0cbx8k?e=rHFyZf",
    badge: "Журам",
  },
  {
    title: "Амбассадор оюутныг ажиллуулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQBrjHNng8nbT4x3esW4O3ttASiPjLyxy-eNQaiETqrHyfM?e=ykc3XA",
    badge: "Журам",
  },
  {
    title: "АБСДХ зохион байгуулах журам",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQBgvOZkB_YVS5ilft2-L8aYAaDWxhmSbPh8YF5zUNyCZLY?e=nSWiIS",
    badge: "Журам",
  },
  {
    title: "Олон улсын мэргэшсэн хөтөлбөрийн сургалт зохион байгуулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQBGYJ_joFOHS7hSi0U0edbyAXb5R13XtvonJTaCOlVH0Vo?e=5viNg1",
    badge: "Журам",
  },
  {
    title: "Клиникч оюутан хөтөлбөрийн удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCeOmIF0SHLRYjusKYxKKLgAVXFGeKK1jk57Xa7TvQDZjk?e=b8yPL1",
    badge: "Журам",
  },
  {
    title: "Дүн дүйцүүлэх удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQDSPdG8uMibRoV-Gd6xDyLsAfYFJSM-hg_rtEqRwLH7WYk?e=j6QWEh",
    badge: "Журам",
  },
  {
    title: "Мэргэжлийн уралдаан, эрдэм шинжилгээний хурлын жагсаалт",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQBrCxp3XAJTRbjLM5RXBF3iASxZk2naIffTetFbApZ4AtA?e=uo5tAF",
    badge: "Журам",
  },
  {
    title: "Оны онцлох оюутан болон шилдэг төгсөгч шалгаруулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQBijSoof65DT48gna8MteMCASyYu_Me9lzEi93i_bAW44k?e=4ZFwF3",
    badge: "Журам",
  },
  {
    title: "Ректорын нэрэмжит тэтгэлэг олгох удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCW7YVsyueZSpS1i3D4uTSjAY4lG5BHSGp68li_Ne9ILy4?e=GDmx34",
    badge: "Журам",
  },
  {
    title: "Оюутны амжилт, зөрчлийн удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQB7AC470hyJQbbEEA6gOPvLAbJARVSB-wFdNfg3DrLcCZI?e=J76OXr",
    badge: "Журам",
  },
  {
    title: "Төгсөх оюутны дүнгийн тулгалтын хуудас",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQAK4_1NMGPhR423qTLpSBvFAeHcKTi-lfzRM7lAznH7HVg?e=qRRBxM",
    badge: "Журам",
  },
  {
    title: "Бакалаврын интерактив хөтөлбөрийн сургалт зохион байгуулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQC0Fi4KwDj4TYMg-jp4yenIAX6PfggevYxwc6_x7pmsp8Y?e=H4C0WA",
    badge: "Журам",
  },
  {
    title: "Олон улсын дипломын BTEC хөтөлбөрийн сургалт зохион байгуулах журам",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCssQCZETxiRI0-TChhbuKAARd6jihAWPQcJ1GjjQxtdfY?e=fMFtxy",
    badge: "Журам",
  },
  {
    title: "Олон улсад дамжин суралцах хөтөлбөрийн сургалт зохион байгуулах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQB23fRZPpTlQZ_yvyc-Jl3LAQHaDA3PN1gOj-5P117XyA4?e=Bgh9DL",
    badge: "Журам",
  },
  {
    title: "Хос мэргэжлээр суралцах удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCjQVbtKYoIR5HZ1POPf_MFAcbDZtw-XiGvzHYiLwa44Po?e=3AQ1U5",
    badge: "Журам",
  },
  {
    title: "Хичээл сонголтын удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCQ6DHkqaLkSZtd4Rg-gHA7AR2xFD5nIRzAqJVpq74OFRM?e=y8lKYy",
    badge: "Журам",
  },
  {
    title: "Шинэ элсэгч болон төгсөгчийн англи хэлний суралцахуйн үр дүнг тодорхойлох удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQCB26s7H5vzSrgjI5sg6KSLAStZXD8dylujZ2x-xdAJ--k?e=Rl2FmZ",
    badge: "Журам",
  },
  {
    title: "Иргэний хамгаалалт удирдамж",
    desc: "Сургалтын бүтэц, зохион байгуулалттай холбоотой журам",
    to: "https://ufenu.sharepoint.com/:b:/s/database/IQAVlWEJ5-McTZ6XEznWTTqCAVxVNxXU5BOlbsuak4gi3Tk?e=WIhvYB",
    badge: "Журам",
  },
];

export default function Rules() {
  const [search, setSearch] = useState("");

  // Ensure sections is always an array
  const filteredSections = (sections || []).filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-0 mx-auto space-y-6 max-w-7xl">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Хайх…"
          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        />
      </div>

      {/* Grid of sections */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSections.length === 0 && (
          <p className="text-gray-500 col-span-full">Хайсан зүйл олдсонгүй.</p>
        )}

        {filteredSections.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="p-4 transition bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {/* Badge with optional icon */}
            <span className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-sm font-medium text-blue-700 rounded-full bg-blue-50">
              <FaRegFileAlt className="text-sm text-blue-500" /> {s.badge}
            </span>

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-700">
              {s.title}
            </h3>


            {/* Action hint */}
            <div className="flex items-center mt-4 text-sm font-medium text-blue-600">
              Дэлгэрэнгүй
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}