export default function EBSCO() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-gray-600">
          EBSCO мэдээллийн сангийн холбогдол, хандалт.
        </p>

        <a
          href="https://www.ufe.edu.mn/pdf/2019/gariin-avlaga-EBSCO-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline whitespace-nowrap hover:text-blue-800"
        >
          PDF татах
        </a>
      </div>

      
      <iframe
        src="https://www.ufe.edu.mn/pdf/2019/gariin-avlaga-EBSCO-1.pdf"
        className="w-full h-[700px] border rounded"
        title="EBSCO PDF"
      />
      
    </div>
  );
}
