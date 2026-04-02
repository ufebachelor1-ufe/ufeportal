import { useState } from "react";

export default function Org() {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const openZoom = () => {
    setScale(1);
    setOpen(true);
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const resetZoom = () => setScale(1);

  return (
    <div className="px-4  mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center">Бүтэц</h1>

      {/* Preview image */}
      <div className="flex flex-col items-center gap-3">
        <img
          src="/org_chart.jpg"
          alt="Бакалаврын сургалт судалгааны албаны бүтэц"
          onClick={openZoom}
          className="w-full max-w-6xl rounded-lg shadow-sm cursor-zoom-in"
        />

        {/* Zoom button (same as clicking image) */}
        <button
          onClick={openZoom}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600"
        >
          Томруулах
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow -top-4 -right-4 hover:bg-gray-100"
            >
              ✕
            </button>

            {/* Zoom controls */}
            <div className="absolute z-10 flex gap-2 top-2 left-2">
              <button onClick={zoomIn} className="px-3 py-1 bg-white rounded shadow">
                +
              </button>
              <button onClick={zoomOut} className="px-3 py-1 bg-white rounded shadow">
                -
              </button>
              <button onClick={resetZoom} className="px-3 py-1 bg-white rounded shadow">
                Reset
              </button>
            </div>

            {/* Zoomed image */}
            <img
              src="/org_chart.jpg"
              alt="Бакалаврын сургалт судалгааны албаны бүтэц"
              style={{ transform: `scale(${scale})` }}
              className="max-w-full max-h-[90vh] rounded-lg transition-transform duration-200"
            />
          </div>
        </div>
      )}
    </div>
  );
}
