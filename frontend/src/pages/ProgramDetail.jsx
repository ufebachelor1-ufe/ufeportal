import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaFilePdf, FaVideo, FaGlobe } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

function getEmbedLink(url) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Noto+Sans+Mongolian&display=swap');

  .pd-root {
    font-family: 'Montserrat', 'Noto Sans Mongolian', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
    padding: 32px 16px 60px;
  }

  .pd-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 6px 40px rgba(0,0,0,0.10);
    max-width: 860px;
    margin: 0 auto;
    overflow: hidden;
    border: 2.5px solid #1a3a6b;
  }

  /* ── Header ── */
  .pd-header {
    background: linear-gradient(135deg, #1a3a6b 0%, #1e4fa0 100%);
    padding: 28px 32px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .pd-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .pd-logo {
    height: 72px;
    object-fit: contain;
    background: #fff;
    border-radius: 10px;
    padding: 6px 10px;
  }

  .pd-header-title {
    color: #fff;
  }

  .pd-univ-name-en {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #a8c4f0;
    margin-bottom: 4px;
  }

  .pd-univ-name-mn {
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    line-height: 1.1;
  }

  .pd-country-flag {
    height: 52px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    flex-shrink: 0;
  }

  /* ── Program Badge ── */
  .pd-program-badge {
    background: #f7c948;
    color: #1a3a6b;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    padding: 10px 24px;
    letter-spacing: 1px;
    border-bottom: 2.5px solid #1a3a6b;
  }

  /* ── Body ── */
  .pd-body {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* ── Two Column intro block ── */
  .pd-intro-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: start;
  }

  @media (max-width: 600px) {
    .pd-intro-row { grid-template-columns: 1fr; }
    .pd-header { flex-direction: column; align-items: flex-start; }
    .pd-univ-name-mn { font-size: 20px; }
  }

  .pd-intro-image {
    width: 100%;
    height: 170px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
  }

  /* ── Section Box ── */
  .pd-section {
    border: 2px solid #1a3a6b;
    border-radius: 14px;
    overflow: hidden;
  }

  .pd-section-header {
    background: #1a3a6b;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    padding: 7px 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .pd-section-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .pd-row {
    display: flex;
    gap: 6px;
    font-size: 13.5px;
    line-height: 1.5;
  }

  .pd-label {
    font-weight: 700;
    color: #1a3a6b;
    flex-shrink: 0;
    min-width: 120px;
  }

  .pd-value {
    color: #2d3748;
  }

  /* Requirements list */
  .pd-list {
    margin: 0;
    padding-left: 18px;
    font-size: 13.5px;
    color: #2d3748;
    line-height: 1.7;
  }

  /* ── Two-column section grid ── */
  .pd-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .pd-two-col { grid-template-columns: 1fr; }
  }

  /* ── Scholarship highlight ── */
  .pd-scholarship {
    background: #fff8e1;
    border: 2px solid #f7c948;
    border-radius: 12px;
    padding: 12px 16px;
    text-align: center;
    font-size: 13.5px;
    font-weight: 700;
    color: #7a5200;
  }

  .pd-scholarship span {
    color: #1a3a6b;
  }

  /* ── Media Buttons ── */
  .pd-media-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .pd-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s, transform 0.15s;
    text-decoration: none;
  }

  .pd-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  .pd-btn-blue  { background: #1a3a6b; color: #fff; }
  .pd-btn-red   { background: #c0392b; color: #fff; }
  .pd-btn-green { background: #27ae60; color: #fff; }

  /* ── Website Footer Banner ── */
  .pd-footer-banner {
    background: #1a3a6b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 28px;
    gap: 16px;
  }

  .pd-footer-label {
    color: #a8c4f0;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .pd-footer-link {
    color: #f7c948;
    font-size: 15px;
    font-weight: 700;
    word-break: break-all;
    text-decoration: underline;
  }

  .pd-footer-logo {
    height: 44px;
    object-fit: contain;
    flex-shrink: 0;
    background: #fff;
    border-radius: 6px;
    padding: 4px 8px;
  }

  /* ── Testimonial ── */
  .pd-testimonial {
    background: #f0f4f8;
    border-left: 4px solid #1a3a6b;
    border-radius: 0 10px 10px 0;
    padding: 12px 16px;
    font-size: 13.5px;
    font-style: italic;
    color: #444;
  }

  /* ── Carousel ── */
  .pd-carousel { border-radius: 12px; overflow: hidden; }
  .pd-carousel img { width: 100%; height: 300px; object-fit: cover; }

  /* ── Back button ── */
  .pd-back {
    max-width: 860px;
    margin: 0 auto 12px;
    display: block;
  }

  .pd-back button {
    background: none;
    border: none;
    color: #1a3a6b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
  }

  .pd-back button:hover { text-decoration: underline; }

  /* Video embed */
  .pd-video {
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16/9;
  }

  .pd-video iframe { width: 100%; height: 100%; border: none; }
`;

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data, error } = await supabase
          .from("universities")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setUniversity(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

  if (loading)
    return <p style={{ marginTop: 80, textAlign: "center", fontSize: 18 }}>Ачааллаж байна...</p>;
  if (!university)
    return <p style={{ marginTop: 80, textAlign: "center", color: "red" }}>Сургууль олдсонгүй.</p>;

  const images = university.city_images?.split(",").map((s) => s.trim()).filter(Boolean) || [];
  const openLink = (url) => url && window.open(url, "_blank");

  const InfoRow = ({ label, value }) =>
    value ? (
      <div className="pd-row">
        <span className="pd-label">{label}:</span>
        <span className="pd-value">{value}</span>
      </div>
    ) : null;

  const Section = ({ title, children }) => (
    <div className="pd-section">
      <div className="pd-section-header">{title}</div>
      <div className="pd-section-body">{children}</div>
    </div>
  );

  // Parse transfer requirements as a numbered list if it contains newlines or semicolons
  const requirementsList = university.transfer_requirements
    ? university.transfer_requirements.split(/\n|;/).map((s) => s.trim()).filter(Boolean)
    : [];

  const admissionList = university.admission_process
    ? university.admission_process.split(/\n|;/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <style>{styles}</style>
      <div className="pd-root">
        <div className="pd-back">
          <button onClick={() => navigate(-1)}>← Буцах</button>
        </div>

        <div className="pd-card">
          {/* ── Header ── */}
          <div className="pd-header">
            <div className="pd-header-left">
              {university.university_logo && (
                <img src={university.university_logo} alt="logo" className="pd-logo" />
              )}
              <div className="pd-header-title">
                <div className="pd-univ-name-en">{university.university_name}</div>
              </div>
            </div>
          </div>

          {/* ── Program Badge ── */}
          {university.program_type && (
            <div className="pd-program-badge">{university.program_type}</div>
          )}

          {/* ── Body ── */}
          <div className="pd-body">

            {/* Intro: text left, campus image right */}
            <div className="pd-intro-row">
              <div>
                {university.majors && (
                  <div style={{ marginBottom: 10 }}>
                    <span className="pd-label" style={{ display: "block", marginBottom: 2 }}>Мэргэжил:</span>
                    <span className="pd-value" style={{ fontWeight: 600 }}>{university.majors}</span>
                  </div>
                )}
                <InfoRow label="Суралцах хэл" value={university.study_language} />
                <InfoRow label="Улс" value={university.country} />
                <InfoRow label="Хот" value={university.city} />
                <InfoRow label="Үүссэн он" value={university.founded_year} />
                <InfoRow label="Хүн ам" value={university.population} />
                <InfoRow label="Дэлхийн зэрэглэл" value={university.world_ranking} />
                <InfoRow label="Нийт оюутан" value={university.staff_student_info} />
              </div>
              {images[0] && (
                <img src={images[0]} alt="campus" className="pd-intro-image" />
              )}
            </div>

            {/* Two-column: admission requirements & admission process */}
            <div className="pd-two-col">
              {requirementsList.length > 0 && (
                <Section title="Шилжих суралцах шаардлага">
                  <ol className="pd-list">
                    {requirementsList.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ol>
                </Section>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Section title="Сургалтын болон байрны мэдээлэл">
                  <InfoRow label="Сургалтын төлбөр" value={university.tuition_info} />
                  <InfoRow label="Оюутны байр" value={university.dorm_info} />
                  <InfoRow label="Даатгал" value={university.health_insurance} />
                </Section>

                {admissionList.length > 0 && (
                  <Section title="Элсэлтийн үйл явц">
                    <ol className="pd-list">
                      {admissionList.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </Section>
                )}
              </div>
            </div>

            {/* Academic */}
            <Section title="Академик мэдээлэл">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
                <InfoRow label="Сургалтын хугацаа" value={university.study_duration} />
                <InfoRow label="Байршил" value={university.location} />
                <InfoRow label="Цаг уур" value={university.climate} />
                <InfoRow label="Континент" value={university.continent} />
              </div>
            </Section>

            {/* Scholarship highlight */}
            {university.scholarship && (
              <div className="pd-scholarship">
                Тэтгэлэг: <span>{university.scholarship}</span>
              </div>
            )}

            {/* Media buttons */}
            {(university.brochure || university.reel || university.university_link) && (
              <div className="pd-media-row">
                {university.brochure && (
                  <button className="pd-btn pd-btn-red" onClick={() => openLink(university.brochure)}>
                    <FaFilePdf /> Брошюр үзэх
                  </button>
                )}
                {university.reel && (
                  <button className="pd-btn pd-btn-blue" onClick={() => openLink(university.reel)}>
                    <FaVideo /> Reel үзэх
                  </button>
                )}
                {university.university_link && (
                  <button className="pd-btn pd-btn-green" onClick={() => openLink(university.university_link)}>
                    <FaGlobe /> Сургуулийн вэб
                  </button>
                )}
              </div>
            )}

            {/* Embedded video */}
            {university.video_link && (
              <div className="pd-video">
                <iframe
                  src={getEmbedLink(university.video_link)}
                  allowFullScreen
                  title="University Video"
                />
              </div>
            )}

            {/* City image carousel (skip first image already used) */}
            {images.length > 1 && (
              <div className="pd-carousel">
                <Swiper modules={[Navigation]} navigation slidesPerView={1}>
                  {images.slice(1).map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} alt={`city-${idx}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Testimonials */}
            {university.testimonial && (
              <Section title="Оюутнуудын сэтгэгдэл">
                <div className="pd-testimonial">"{university.testimonial}"</div>
              </Section>
            )}
          </div>

          {/* ── Footer Website Banner ── */}
          {university.university_link && (
            <div className="pd-footer-banner">
              <span className="pd-footer-label">Сургуулийн вэбсайт:</span>
              <a
                href={university.university_link}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-footer-link"
              >
                {university.university_link}
              </a>
              {university.university_logo && (
                <img src={university.university_logo} alt="logo" className="pd-footer-logo" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}