import { useEffect, useState } from "react"; 
import { supabase2 } from "../supabase2"; 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay, Pagination, Navigation } from "swiper/modules"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
 
import "swiper/css"; 
import "swiper/css/pagination"; 
import "swiper/css/navigation"; 
import "./swiper-fix.css"; 

 
export default function Announcements() { 
  const [announcements, setAnnouncements] = useState([]); 
  const [current, setCurrent] = useState(1); 
  const navigate = useNavigate(); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      const { data, error } = await supabase2 
        .from("news") 
        .select("id, title, description") 
        .eq("type", "Зар") 
        .order("created_at", { ascending: false }); 
 
      if (!error) { 
        setAnnouncements(data || []); 
      } 
    }; 
 
    fetchData(); 
  }, []); 
 
  return ( 
    <div className="relative bg-primary border border-third/20 rounded-lg p-6 backdrop-blur-sm" style={{ minHeight: '280px' }}> 
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-base font-bold tracking-[0.1em] uppercase text-third ">
          Сургалтын албаны зар
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-third/40 to-transparent" />
        <Link 
          to="/allan"
          className="ml-2 px-3 py-1.5 text-xs font-bold text-primary bg-third rounded transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wider whitespace-nowrap"
        >
          Бүгдийг үзэх →
        </Link>
      </div>
 
      {announcements.length > 0 ? ( 
        <>
          <Swiper 
            modules={[Autoplay, Pagination, Navigation]} 
            slidesPerView={1} 
            loop={announcements.length > 1} 
            autoplay={ 
              announcements.length > 1 
                ? { delay: 4000, disableOnInteraction: false } 
                : false 
            } 
            pagination={announcements.length > 1 ? { clickable: true } : false} 
            navigation={announcements.length > 1} 
            className="pb-12"
            style={{ height: '200px' }}
            onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)} 
          > 
            {announcements.map((a) => ( 
              <SwiperSlide key={a.id}> 
                <div className="flex flex-col justify-between h-full p-6 bg-white/95 rounded-lg shadow-md border border-gray-200"> 
                   
                  {/* Text */} 
                  <div className="flex-1 overflow-hidden"> 
                    <h3 className="text-base font-bold text-primary mb-2 line-clamp-2"> 
                      {a.title} 
                    </h3> 
   
                    {a.description && ( 
                      <p className="text-sm text-gray-600 line-clamp-3"> 
                        {a.description} 
                      </p> 
                    )} 
                  </div> 
   
                  {/* Read more - fixed at bottom */} 
                  <div className="pt-2 mt-2"> 
                    <button 
                      onClick={() => navigate(`/news/${a.id}`)} 
                      className="w-full px-4 py-2 text-sm font-bold text-primary bg-third rounded transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wider"
                    > 
                      Дэлгэрэнгүй → 
                    </button> 
                  </div> 
   
                </div> 
              </SwiperSlide> 
            ))} 
          </Swiper> 

          {/* Counter */} 
          {announcements.length > 1 && ( 
            <div className="text-sm text-center text-white/60 mt-3"> 
              {current} / {announcements.length} 
            </div> 
          )} 
        </>
      ) : ( 
        <div className="flex items-center justify-center h-48">
          <p className="text-center text-white/50 text-sm"> 
            Одоогоор зар байхгүй байна 
          </p> 
        </div>
      )} 
    </div> 
  ); 
}