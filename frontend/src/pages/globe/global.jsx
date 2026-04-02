import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Globe from "react-globe.gl";
import { supabase2 } from "../../supabase2";
import { FaUniversity, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import * as THREE from "three";

// Mongolian -> English
const COUNTRY_NAME_MAP = {
  "Монгол": "Mongolia",
  "Монгол улс": "Mongolia",
  "ОХУ": "Russia",
  "Япон": "Japan",
  "БНСУ": "South Korea",
  "БНХАУ": "China",
  "АНУ": "United States",
  "Герман": "Germany",
  "Австрали": "Australia",
  "Канад улс": "Canada",
  "Япон улс": "Japan",
  "Финланд улс": "Finland",
  "Швейцар улс": "Switzerland",
  "Тайвань улс": "Taiwan",
};

const COUNTRY_COORDS = {
  Mongolia: { lat: 46.86, lng: 103.85 },
  Russia: { lat: 61.52, lng: 105.31 },
  Japan: { lat: 36.2, lng: 138.25 },
  "South Korea": { lat: 36.5, lng: 127.9 },
  China: { lat: 35.9, lng: 104.2 },
  "United States": { lat: 39.8, lng: -98.6 },
  Germany: { lat: 51.1, lng: 10.4 },
  Australia: { lat: -25.3, lng: 133.8 },
  Canada: { lat: 56.13, lng: -106.34 },
  Finland: { lat: 61.92, lng: 25.75 },
  Switzerland: { lat: 46.82, lng: 8.23 },
  Taiwan: { lat: 23.7, lng: 121.0 },
};

const FLAG_CODES = {
  Mongolia: "mn",
  Russia: "ru",
  Japan: "jp",
  "South Korea": "kr",
  China: "cn",
  "United States": "us",
  Germany: "de",
  Australia: "au",
  Canada: "ca",
  Finland: "fi",
  Switzerland: "ch",
  Taiwan: "tw",
};

const getFlagCode = (country) => FLAG_CODES[country] || "un";

// --- Elegant Ring Builder ---
function buildElegantRings(scene) {
  const ringConfigs = [
    {
      innerRadius: 115,
      outerRadius: 116.5,
      color: 0xf0a500,
      opacity: 0.4,
      rotX: Math.PI / 2,
      rotY: 0,
      rotZ: 0.15,
    },
    {
      innerRadius: 122,
      outerRadius: 123,
      color: 0x4f86c6,
      opacity: 0.3,
      rotX: Math.PI / 2,
      rotY: 0.4,
      rotZ: -0.18,
    },
    {
      innerRadius: 130,
      outerRadius: 130.6,
      color: 0xe8c96a,
      opacity: 0.2,
      rotX: 1.15,
      rotY: 0.25,
      rotZ: 0.35,
    },
  ];

  const rings = [];

  ringConfigs.forEach((cfg) => {
    const geo = new THREE.RingGeometry(cfg.innerRadius, cfg.outerRadius, 256);
    const mat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: cfg.opacity,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = cfg.rotX;
    mesh.rotation.y = cfg.rotY;
    mesh.rotation.z = cfg.rotZ;
    scene.add(mesh);
    rings.push(mesh);
  });

  // Subtle tick marks
  const tickCount = 48;
  const tickRadius = 130;
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2;
    const isLarge = i % 8 === 0;
    const tickGeo = new THREE.BoxGeometry(
      isLarge ? 1.2 : 0.5,
      isLarge ? 4 : 1.8,
      0.15
    );
    const tickMat = new THREE.MeshBasicMaterial({
      color: isLarge ? 0xf0a500 : 0x4f86c6,
      transparent: true,
      opacity: isLarge ? 0.6 : 0.3,
    });
    const tick = new THREE.Mesh(tickGeo, tickMat);
    tick.position.set(
      Math.cos(angle) * tickRadius,
      Math.sin(angle) * tickRadius,
      0
    );
    tick.rotation.z = angle;
    tick.rotation.x = 1.15;
    tick.rotation.y = 0.25;
    scene.add(tick);
    rings.push(tick);
  }

  return rings;
}

export default function ProgramsGlobePage() {
  const globeRef = useRef();
  const ringsRef = useRef([]);
  const containerRef = useRef();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("Mongolia");
  const [globeSize, setGlobeSize] = useState(550);

  // Update globe size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setGlobeSize(Math.min(width, 550));
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase2.from("programs").select("*");
        if (error) throw error;
        setPrograms(data || []);
        const initialFiltered = (data || []).filter(
          (p) => COUNTRY_NAME_MAP[p.country] === "Mongolia"
        );
        setFilteredPrograms(initialFiltered);
        const countryCountMap = {};
        data.forEach((p) => {
          const country = COUNTRY_NAME_MAP[p.country];
          if (!country || !COUNTRY_COORDS[country]) return;
          countryCountMap[country] = (countryCountMap[country] || 0) + 1;
        });
        const points = Object.entries(countryCountMap).map(([country, count]) => ({
          country,
          lat: COUNTRY_COORDS[country].lat,
          lng: COUNTRY_COORDS[country].lng,
          count,
        }));
        setCountries(points);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = selectedCountry === "БҮГД" || selectedCountry === "Mongolia";
  }, [selectedCountry]);

  // Animate rings slowly
  useEffect(() => {
    let frameId;
    const animate = () => {
      ringsRef.current.forEach((mesh, i) => {
        if (mesh) {
          mesh.rotation.z += i % 2 === 0 ? 0.0005 : -0.0003;
        }
      });
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const filterPrograms = (country) => {
    let filtered = [...programs];
    if (country && country !== "БҮГД") {
      filtered = filtered.filter((p) => COUNTRY_NAME_MAP[p.country] === country);
    }
    setFilteredPrograms(filtered);
  };

  const handleCountryClick = (p) => {
    setSelectedCountry(p.country);
    filterPrograms(p.country);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: p.lat, lng: p.lng, altitude: 1.6 },
        700
      );
    }
  };

  const handleReset = () => {
    setSelectedCountry("БҮГД");
    filterPrograms("БҮГД");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <p className="text-third font-bold tracking-[0.15em]">
          АЧААЛЛАЖ БАЙНА...
        </p>
      </div>
    );

  if (!countries.length)
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <p className="text-third font-bold tracking-[0.15em]">
          ОДООГООР ЯМАР Ч УЛС АЛГА
        </p>
      </div>
    );

  return (
    <div className="bg-primary min-h-screen relative">
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap');

        .elegant-select {
          background: rgba(240,165,0,0.08);
          border: 1px solid rgba(240,165,0,0.3);
          color: #e8c96a;
          padding: 8px 16px;
          border-radius: 4px;
          font-family: 'Montserrat','DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.05em;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          transition: all 0.2s;
        }
        .elegant-select:focus {
          border-color: #f0a500;
          box-shadow: 0 0 0 2px rgba(240,165,0,0.15);
        }
        .elegant-select option {
          background: #0a1929;
          color: #e8c96a;
        }

        .reset-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          padding: 8px 18px;
          border-radius: 4px;
          font-family: 'Montserrat','DM Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }
        .reset-btn:hover {
          border-color: rgba(255,255,255,0.4);
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .program-card {
          position: relative;
          background: rgba(15,37,64,0.6);
          border: 1px solid rgba(240,165,0,0.15);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          min-height: 240px;
          backdrop-filter: blur(8px);
        }
        .program-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(240,165,0,0.05) 0%, rgba(79,134,198,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .program-card:hover {
          border-color: #f0a500;
          box-shadow: 0 8px 32px rgba(240,165,0,0.2);
          transform: translateY(-4px);
        }
        .program-card:hover::before {
          opacity: 1;
        }

        .program-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15,37,64,0.85);
          backdrop-filter: blur(4px);
          border-radius: 6px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .program-card:hover .program-overlay {
          opacity: 1;
        }

        .detail-btn {
          padding: 10px 24px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Montserrat','DM Mono', monospace;
          letter-spacing: 0.15em;
          background: #f0a500;
          color: #0f2540;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(240,165,0,0.3);
          transition: all 0.2s;
          text-decoration: none;
          text-transform: uppercase;
        }
        .detail-btn:hover {
          background: #fdb62c;
          box-shadow: 0 6px 24px rgba(240,165,0,0.5);
          transform: translateY(-1px);
        }

        .grid-texture {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.03);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(240,165,0,0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(240,165,0,0.5);
        }
      `}</style>

      {/* Grid texture overlay */}
      <div className="grid-texture" />

      {/* Top gold accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-third to-transparent" />

      <div className="px-4 py-6 mx-auto max-w-[1920px] sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <FaGlobe className="text-third text-2xl" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.1em] uppercase text-white">
                Хөтөлбөр
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-third text-[11px] font-bold tracking-[0.12em] font-sans uppercase">
                Улс:
              </label>
              <select
                className="elegant-select"
                value={selectedCountry}
                onChange={(e) => {
                  const country = e.target.value;
                  setSelectedCountry(country);
                  filterPrograms(country);
                  if (country !== "БҮГД" && COUNTRY_COORDS[country] && globeRef.current) {
                    const coords = COUNTRY_COORDS[country];
                    globeRef.current.pointOfView(
                      { lat: coords.lat, lng: coords.lng, altitude: 1.6 },
                      700
                    );
                  }
                }}
              >
                <option value="БҮГД">Бүгд</option>
                {countries.map((c) => (
                  <option key={c.country} value={c.country}>
                    {c.country} ({c.count})
                  </option>
                ))}
              </select>

              {selectedCountry !== "БҮГД" && (
                <button className="reset-btn" onClick={handleReset}>
                  Цэвэрлэх
                </button>
              )}
            </div>
          </div>

          <p className="text-white/50 text-sm">
            Дэлхийн газрын зураг дээрх тэмдэглэгээг товшоод тухайн улсын хөтөлбөрүүдийг үзнэ
          </p>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-third/30 to-transparent mb-6" />

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Globe container */}
          <div 
            ref={containerRef}
            className="flex-shrink-0 w-full lg:w-[550px]"
          >
            <div className="relative rounded-lg overflow-hidden border border-third/20 shadow-2xl bg-gradient-radial from-[rgba(79,134,198,0.15)] to-[rgba(15,37,64,0.6)]">
              <Globe
                ref={globeRef}
                width={globeSize}
                height={globeSize}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                htmlElementsData={countries}
                htmlLat={(d) => d.lat}
                htmlLng={(d) => d.lng}
                htmlAltitude={() => 0.12}
                htmlElement={(d) => {
                  const el = document.createElement("div");
                  el.style.pointerEvents = "auto";
                  el.style.transform = "translate(-50%, -50%)";
                  el.style.zIndex = "5";
                  el.style.padding = "4px";
                  el.style.borderRadius = "4px";
                  el.style.boxShadow =
                    d.country === selectedCountry
                      ? "0 0 12px #f0a500, 0 0 24px rgba(240,165,0,0.4)"
                      : "0 0 8px rgba(240,165,0,0.3)";
                  el.style.border =
                    d.country === selectedCountry
                      ? "2px solid #f0a500"
                      : "1px solid rgba(240,165,0,0.3)";
                  el.style.background = "rgba(15,37,64,0.7)";
                  el.style.backdropFilter = "blur(4px)";

                  const img = document.createElement("img");
                  img.src = `https://flagcdn.com/w40/${getFlagCode(d.country)}.png`;
                  img.style.width = "32px";
                  img.style.height = "22px";
                  img.style.borderRadius = "2px";
                  img.style.cursor = "pointer";
                  img.style.display = "block";

                  img.addEventListener("pointerdown", (e) => e.stopPropagation());
                  img.addEventListener("click", () => handleCountryClick(d));
                  el.appendChild(img);
                  return el;
                }}
                cameraPosition={{ lat: 20, lng: 0, altitude: 2.0 }}
                onGlobeReady={() => {
                  if (!globeRef.current) return;

                  const controls = globeRef.current.controls();
                  controls.enableZoom = true;
                  controls.enableRotate = true;
                  controls.autoRotate = true;
                  controls.autoRotateSpeed = 0.6;

                  const scene = globeRef.current.scene();
                  const rings = buildElegantRings(scene);
                  ringsRef.current = rings;
                }}
              />
            </div>
          </div>

          {/* Programs grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold tracking-[0.1em] uppercase text-third font-sans">
                {selectedCountry === "БҮГД" ? "Бүх хөтөлбөр" : `${selectedCountry}`}a
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-third/30 to-transparent" />
              <span className="text-white/30 text-sm font-sans">
                {filteredPrograms.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto pr-2">
              {filteredPrograms.map((p) => (
                <Link
                  key={p.id}
                  to={`/programs/id/${p.id}`}
                  className="program-card"
                  style={{ textDecoration: 'none' }}
                >
                  {p.img_url && (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={p.img_url}
                        alt={p.major}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgba(15,37,64,0.9)] to-transparent" />
                    </div>
                  )}
                  
                  <div className="program-overlay">
                    <span className="detail-btn">Дэлгэрэнгүй</span>
                  </div>

                  <div className="flex-1 p-4 flex flex-col gap-2">
                    <h3 className="text-third text-sm font-bold leading-tight">
                      {p.major}
                    </h3>
                    
                    {p.university && (
                      <p className="text-white/60 text-sm flex items-start gap-2">
                        <FaUniversity className="text-[#6eaee7] flex-shrink-0 mt-0.5 text-[10px]" />
                        <span>{p.university}</span>
                      </p>
                    )}
                    
                    <p className="text-white/50 text-sm flex items-center gap-2 font-sans">
                      <FaMapMarkerAlt className="text-[#e8c96a] flex-shrink-0 text-[10px]" />
                      {p.country}, {p.city}
                    </p>
                  </div>
                </Link>
              ))}

              {filteredPrograms.length === 0 && (
                <div className="col-span-full p-12 text-center text-white/40 text-sm">
                  Сонгосон улсад хөтөлбөр алга байна
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-third to-transparent mt-12" />
    </div>
  );
}