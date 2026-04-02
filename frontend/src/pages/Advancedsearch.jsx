import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase2 } from '../supabase2';

// Mongolian -> English country mapping (from your globe component)
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

// Create reverse map for searching
const createSearchMap = () => {
  const map = {};
  Object.entries(COUNTRY_NAME_MAP).forEach(([mongolian, english]) => {
    const mongoLower = mongolian.toLowerCase();
    const engLower = english.toLowerCase();
    
    if (!map[mongoLower]) map[mongoLower] = [];
    if (!map[engLower]) map[engLower] = [];
    
    map[mongoLower].push(mongolian);
    map[engLower].push(mongolian);
  });
  return map;
};

const SEARCH_MAP = createSearchMap();

const AdvancedSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Calculate relevance score
  const calculateScore = (title, description, searchTerm) => {
    let score = 0;
    const titleLower = (title || '').toLowerCase();
    const descLower = (description || '').toLowerCase();
    const term = searchTerm.toLowerCase();

    if (titleLower === term) score += 100;
    else if (titleLower.startsWith(term)) score += 80;
    else if (titleLower.includes(term)) score += 60;
    
    if (descLower.includes(term)) score += 20;

    return score;
  };

  // Check if search term matches any country name
  const matchesCountry = (item, searchTerm) => {
    const term = searchTerm.toLowerCase();
    const country = (item.country || '').toLowerCase();
    const city = (item.city || '').toLowerCase();
    
    // Direct match
    if (country.includes(term) || city.includes(term)) return true;
    
    // Check against mapped countries
    for (const [key, mongolianNames] of Object.entries(SEARCH_MAP)) {
      if (key.includes(term)) {
        return mongolianNames.some(name => 
          item.country === name || item.country?.toLowerCase().includes(name.toLowerCase())
        );
      }
    }
    
    return false;
  };

  // Comprehensive search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchContent = async () => {
      setLoading(true);
      const searchTerm = query.toLowerCase();
      const allResults = [];

      try {
        // 1. Search News
        const { data: newsData } = await supabase2
          .from('news')
          .select('id, title, description, type, created_at, image_url')
          .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
          .order('created_at', { ascending: false })
          .limit(8);
        
        if (newsData) {
          newsData.forEach(item => {
            allResults.push({
              title: item.title,
              description: item.description?.substring(0, 100) || 'Дэлгэрэнгүй мэдээлэл',
              category: item.type || 'Мэдээ',
              url: `/news/${item.id}`,
              date: item.created_at,
              image: item.image_url,
              type: 'news',
              score: calculateScore(item.title, item.description, searchTerm)
            });
          });
        }

        // 2. Search Calendar
        const { data: calendarData } = await supabase2
          .from('calendar')
          .select('title, date, type')
          .or(`title.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`)
          .order('date', { ascending: true })
          .limit(8);
        
        if (calendarData) {
          calendarData.forEach(item => {
            allResults.push({
              title: item.title,
              description: `${item.type} • ${new Date(item.date).toLocaleDateString('mn-MN', { month: 'long', day: 'numeric' })}`,
              category: 'Үйл явдал',
              url: '/bsa/calendar',
              date: item.date,
              type: 'calendar',
              score: calculateScore(item.title, item.type, searchTerm)
            });
          });
        }

        // 3. Search Programs - FETCH ALL then filter in JS for country matching
        const { data: programsData } = await supabase2
          .from('programs')
          .select('id,major,university,degree,country,city,tuition,lang,description,duration,credits,format,img_url')
          .or(`major.ilike.%${searchTerm}%,university.ilike.%${searchTerm}%,degree.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,lang.ilike.%${searchTerm}%,format.ilike.%${searchTerm}%`)
          .limit(20);
        
        console.log('🔍 Searching for:', searchTerm);
        console.log('📊 Initial programs found:', programsData?.length || 0);
        
        if (programsData && programsData.length > 0) {
          programsData.forEach(item => {
            // Check if it matches based on country names
            const isCountryMatch = matchesCountry(item, searchTerm);
            
            if (isCountryMatch || 
                item.major?.toLowerCase().includes(searchTerm) ||
                item.university?.toLowerCase().includes(searchTerm) ||
                item.description?.toLowerCase().includes(searchTerm)) {
              
              const highlights = [];
              if (item.city) highlights.push(item.city);
              if (item.country) highlights.push(item.country);
              if (item.duration) highlights.push(item.duration);
              
              console.log('✅ Found:', item.major, '-', item.country, item.city);
              
              allResults.push({
                title: item.major || 'Хөтөлбөр',
                description: `${item.university || ''} ${highlights.length > 0 ? '• ' + highlights.join(', ') : ''}`.trim(),
                category: item.degree || 'Хөтөлбөр',
                url: `/programs/id/${item.id}`,
                image: item.img_url,
                type: 'program',
                score: calculateScore(
                  `${item.major} ${item.university} ${item.country} ${item.city}`, 
                  item.description, 
                  searchTerm
                )
              });
            }
          });
        }

        // 4. Static pages
        const staticPages = [
          // BSA
          { title: 'Бакалаврын сургалтын алба', description: 'БСА-ны үйлчилгээ, мэдээлэл', category: 'БСА', url: '/bsa', keywords: ['бса', 'bsa', 'сургалт'] },
          { title: 'БСА Мэдээ', description: 'Сургалтын албаны мэдээ, зарлал', category: 'БСА', url: '/bsa/newsbsa', keywords: ['бса мэдээ', 'зарлал'] },
          { title: 'Календарь', description: 'Үйл явдал, арга хэмжээ', category: 'БСА', url: '/bsa/calendar', keywords: ['календарь', 'calendar', 'үйл явдал'] },
          { title: 'Танхимын хуваарь', description: 'Хичээлийн хуваарь, өрөө', category: 'БСА', url: '/bsa/schedule', keywords: ['хуваарь', 'schedule', 'танхим'] },
          { title: 'Хүсэлт илгээх', description: 'Хүсэлт, өргөдөл гаргах', category: 'БСА', url: '/bsa/req', keywords: ['хүсэлт', 'өргөдөл', 'request'] },
          { title: 'Дүрэм журам', description: 'Сургалтын журам, дүрэм', category: 'БСА', url: '/bsa/rules', keywords: ['журам', 'дүрэм', 'rules'] },
          { title: 'Холбоо барих', description: 'Утас, имэйл, байршил', category: 'БСА', url: '/bsa/others', keywords: ['холбоо', 'утас', 'contact'] },
          
          // Programs
          { title: 'Үндсэн хөтөлбөр', description: 'СЭЗИС-ийн үндсэн бакалавр', category: 'Хөтөлбөр', url: '/programs/degree/Үндсэн', keywords: ['үндсэн', 'хөтөлбөр', 'бакалавр'] },
          { title: 'Хамтарсан хөтөлбөр', description: 'Гадаадын их сургуулиудтай', category: 'Хөтөлбөр', url: '/programs/degree/Хамтарсан', keywords: ['хамтарсан', 'partnership'] },
          { title: 'BTEC хөтөлбөр', description: 'Их Британийн BTEC', category: 'Хөтөлбөр', url: '/programs/degree/BTEC', keywords: ['btec', 'британи'] },
          { title: 'ACCA, CGMA', description: 'Олон улсын нягтлан бодогч', category: 'Хөтөлбөр', url: '/programs/degree/ACCA, CGMA', keywords: ['acca', 'cgma', 'нягтлан'] },
          { title: 'Rotation', description: 'Ротацийн хөтөлбөр', category: 'Хөтөлбөр', url: '/programs/degree/Rotation', keywords: ['rotation', 'ротаци'] },
          { title: 'Интерактив', description: 'Интерактив технологи', category: 'Хөтөлбөр', url: '/programs/degree/Интерактив', keywords: ['интерактив', 'interactive'] },
          { title: 'Цагийн хөтөлбөр', description: 'Ажилтайгаа хослуулан', category: 'Хөтөлбөр', url: '/programs/degree/Цагийн', keywords: ['цагийн', 'орой'] },
          
          // Other
          { title: 'Оюутны хөгжил', description: 'Клуб, холбоо, volunteer', category: 'Оюутан', url: '/services', keywords: ['клуб', 'club', 'оюутан'] },
          { title: 'Сайн дурын ажил', description: 'Волонтер үйл ажиллагаа', category: 'Оюутан', url: '/volunteer', keywords: ['volunteer', 'сайн дурын'] },
          { title: 'Голч тооцоолуур', description: 'GPA тооцоолох', category: 'Үйлчилгээ', url: '/gpa-calculator', keywords: ['голч', 'gpa', 'тооцоолуур'] },
          { title: 'Эрдэм шинжилгээ', description: 'Судалгаа, EBSCO', category: 'Судалгаа', url: '/research', keywords: ['судалгаа', 'research', 'ebsco'] },
          { title: 'Бүх мэдээ', description: 'Сургуулийн мэдээ', category: 'Мэдээ', url: '/newsall', keywords: ['мэдээ', 'news'] },
          { title: 'Дэлхийн зураг', description: 'Хамтрагч улсууд', category: 'Мэдээлэл', url: '/globe', keywords: ['глобус', 'globe', 'дэлхий'] },
        ];

        staticPages.forEach(page => {
          const titleMatch = page.title.toLowerCase().includes(searchTerm);
          const descMatch = page.description.toLowerCase().includes(searchTerm);
          const keywordMatch = page.keywords.some(k => k.includes(searchTerm));
          
          if (titleMatch || descMatch || keywordMatch) {
            allResults.push({
              ...page,
              type: 'page',
              score: titleMatch ? 100 : (keywordMatch ? 50 : 25)
            });
          }
        });

        // Sort and deduplicate
        allResults.sort((a, b) => b.score - a.score);

        const uniqueResults = [];
        const seen = new Set();
        
        for (const result of allResults) {
          const key = `${result.title}-${result.url}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueResults.push(result);
            if (uniqueResults.length >= 15) break;
          }
        }

        console.log('📝 Final results:', uniqueResults.length);
        setResults(uniqueResults);
        setSelectedIndex(0);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      }
      
      setLoading(false);
    };

    const timer = setTimeout(() => {
      searchContent();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Focus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div 
        ref={searchRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideDown"
      >
        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Мэдээ, хөтөлбөр, улс хайх... (Япон, Japan, АНУ...)"
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {loading && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">↑↓</kbd>
            <span>Сонгох</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Enter</kbd>
            <span>Нээх</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Esc</kbd>
            <span>Хаах</span>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {query.length < 2 && (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-medium mb-1">Хайлт эхлүүлэх</p>
              <p className="text-sm">Мэдээ, хөтөлбөр, улс хайна уу</p>
              <p className="text-xs mt-2 text-gray-400">Жишээ: "Япон", "ACCA", "хуваарь"</p>
            </div>
          )}

          {query.length >= 2 && results.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium mb-1">Үр дүн олдсонгүй</p>
              <p className="text-sm">"{query}" -д тохирох агуулга олдсонгүй</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((result, index) => (
                <Link
                  key={index}
                  to={result.url}
                  className={`block p-4 rounded-xl transition-all duration-200 mb-1 ${
                    index === selectedIndex
                      ? 'bg-primary text-white shadow-md scale-[1.02]'
                      : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-4">
                    {result.image && (
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                          index === selectedIndex
                            ? 'bg-white/20 text-white'
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {result.category}
                        </span>
                        {result.type === 'news' && result.date && (
                          <span className={`text-xs ${index === selectedIndex ? 'text-white/60' : 'text-gray-400'}`}>
                            {new Date(result.date).toLocaleDateString('mn-MN')}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-bold mb-1 line-clamp-1 ${
                        index === selectedIndex ? 'text-white' : 'text-gray-800'
                      }`}>
                        {result.title}
                      </h3>
                      <p className={`text-sm line-clamp-1 ${
                        index === selectedIndex ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {result.description}
                      </p>
                    </div>
                    
                    <svg 
                      className={`w-5 h-5 flex-shrink-0 ${
                        index === selectedIndex ? 'text-white' : 'text-gray-400'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
            <span>
              <span className="font-medium text-primary">{results.length}</span> үр дүн
            </span>
            <span className="text-gray-400">
              Мэдээ • Хөтөлбөр • Үйл явдал
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdvancedSearch;