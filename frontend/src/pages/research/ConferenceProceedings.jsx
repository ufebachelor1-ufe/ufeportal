import { useState } from "react";

export default function ConferenceProceedings() {
  const [open, setOpen] = useState(null);

  const pdfs = [ 
    { title: "ОЮУТНЫ ЭРДЭМ ШИНЖИЛГЭЭНИЙ XIII БАГА ХУРАЛ", file: "../pdfs/2021.pdf" }, 
    { title: "ОЮУТНЫ ЭРДЭМ ШИНЖИЛГЭЭНИЙ XIV БАГА ХУРАЛ", file: "../pdfs/2022.pdf" }, 
    { title: "ОЮУТНЫ ЭРДЭМ ШИНЖИЛГЭЭНИЙ XV БАГА ХУРАЛ", file: "../pdfs/2023.pdf" }, 
    { title: "ОЮУТНЫ ЭРДЭМ ШИНЖИЛГЭЭНИЙ XVI БАГА ХУРАЛ", file: "../pdfs/2024.pdf" }, 
    { title: "ОЮУТНЫ ЭРДЭМ ШИНЖИЛГЭЭНИЙ XVII БАГА ХУРАЛ", file: "../pdfs/2025.pdf" }, 
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Хурлын эмхэтгэл</h2>

      {pdfs.map((pdf, i) => (
        <div key={i} className="mb-4 overflow-hidden border rounded-lg">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex items-center justify-between w-full px-5 py-4 font-medium text-left bg-gray-50 hover:bg-gray-100"
          >
            {pdf.title}
            <span>{open === i ? "−" : "+"}</span>
          </button>

          {open === i && (
            <>
              <iframe
                src={pdf.file}
                className="h-[90vh] w-full border-t"
              />
              <a
                href={pdf.file}
                target="_blank"
                className="block py-2 text-center text-blue-600 bg-gray-50 hover:underline"
              >
                Томоор нээх
              </a>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
