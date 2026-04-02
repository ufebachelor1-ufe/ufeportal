import { FaBook, FaSearch } from "react-icons/fa";

export default function LibraryLinks() {
  return (
    <div className="max-w-xl p-6 mx-auto bg-white border shadow-sm rounded-2xl">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        СЭЗИС-ийн бүтээлийн сан
      </h2>
      <p className="mb-6 text-gray-600">
        СЭЗИС-ийн номын сан, бүтээлийн сангийн албан ёсны холбоосууд.
      </p>

      <div className="space-y-4">
        <a
          href="https://repository.ufe.edu.mn/xmlui/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-5 py-3 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          <FaBook className="text-xl" /> СЭЗИС-ийн бүтээлийн сан
        </a>

        <a
          href="https://lib4u.online/?lib=ufe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-5 py-3 text-blue-600 transition border border-blue-600 rounded-xl hover:bg-blue-50"
        >
          <FaSearch className="text-xl" /> Номын сангийн электрон каталог
        </a>
      </div>
    </div>
  );
}
