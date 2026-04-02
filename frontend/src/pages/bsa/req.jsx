import { Link } from "react-router-dom";
import {
  FiFileText,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";

export default function Req() {
  const forms = [
    {
      title: "Сургуулиас чөлөөлөгдөх хүсэлт",
      code: "Маягт Б004д",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAApVoLE_wrRRL_o59hYd2L6AZDtCNFvO0fNC0D79bRtEWw?nav=Nzc0MWFkODctZTExZi00MmMwLThlOGEtYjNiMGQ2MjZkMjlm",
    },
    {
      title: "Хичээл нэмүүлэх хүсэлт",
      code: "Маягт Б001",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAA76glLW132Sr5htNaJW_lUAcTU7If2PA9Ch_2xTufpcXc?nav=ZmQ5MzQ2M2YtZTEwNi00YmNmLTk1ZWMtODllNDgxY2M4Y2M2",
    },
    {
      title: "Урт хугацааны чөлөө авах хүсэлт",
      code: "Маягт Б004а",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAB91bBvno3VTaYbobACpv1HAToSv1_KyXAfyTin4YYeyiA?nav=ZmJlYmZlMDEtOTA4OS00Njk0LWFjMDktZDM2YmJjYjU2OWNh",
    },
    {
      title: "Чөлөө дуусгавар болгох хүсэлт",
      code: "Маягт Б004б",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JADKgaIhBcvDTZOSI8j0G7NfAUWpp6Rq9B7snJ-bNhqdQbc?nav=ODZkMzQ3MTUtN2ZkOS00MGVjLWFjYjAtZjYzODJiNjZhMTVm",
    },
    {
      title: "Хөтөлбөр хооронд шилжих, мэргэжил солих хүсэлт",
      code: "Маягт Б003",
      url: "https://forms.office.com/r/9JUNy2Hhru",
    },
    {
      title: "Урт хугацааны чөлөөг сунгах хүсэлт",
      code: "Маягт Б004в",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAC4OESnKtzlSp9hx-gE64XvAecaEmtplZ7yQEa8ptPsgjA?nav=MzU5NDJmMTYtNTZlOC00YzI1LWI0ZjUtYWViNmQ3ZThkMGQ0",
    },
    {
      title: "Хичээл цуцлах хүсэлт",
      code: "Маягт Б001",
      url: "https://ufenu.sharepoint.com/:l:/s/BSA/JAASxZMoL9IDS4I9VFdibvpIAXCLiFNwq47Gz6SRMzOG9ZI?nav=MDAxMDVjZTMtMzgxOS00ZDk5LWFjOGMtOTZiZmM4ZTM4Y2Qy",
    },
  ];

  return (
    <div className="max-w-[1920px] px-4 mx-auto space-y-8">
      
      {/* Main Layout - Side by Side */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        
        {/* LEFT SIDE - Forms */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="w-1 h-6 bg-third rounded-full" />
            Хүсэлтийн маягтууд
          </h2>
          
          <div className=" top-24 space-y-0 grid sm:grid-cols-2 gap-6 ">
            
            {/* How to Use Section */}
            <div className="bg-gradient-to-r from-primary/5 to-third/5 border border-primary/10 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-primary mb-2">Хэрхэн ашиглах вэ?</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Хүсэлт нь Microsoft Forms-ээр илгээгдэж, автомат батлах процессоор дамжина.
                  </p>
                </div>
              </div>

              {/* Compact Steps */}
              <div className="space-y-6">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">Маягт бөглөх</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Хүсэлтээ сонгож, маягт бөглөнө</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">Автомат батлах</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Систем холбогдох албад руу илгээнэ (2-5 хоног)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">Явцыг хянах</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Teams → Approvals апп → Received</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teams Instructions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 ">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-third/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-third" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-primary">Teams дээр явцыг хянах</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm">Microsoft Teams нээх</h5>
                    <p className="text-sm text-gray-600">teams.microsoft.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm">Approvals апп хайх</h5>
                    <p className="text-sm text-gray-600">Apps → Search "Approvals"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm">"Received" хэсэг нээх</h5>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full">Received</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">Sent</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">History</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 text-sm mb-2">Статус шалгах</h5>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        <span className="text-[10px] font-semibold text-yellow-700">Pending - Хүлээгдэж байна</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-semibold text-green-700">Approved - Батлагдсан</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        <span className="text-[10px] font-semibold text-red-700">Rejected - Татгалзсан</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Important Notes */}
          <div className="bg-primary rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-third flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-bold text-lg mb-3">Анхаар!</h3>
                <ul className="space-y-2 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                    <span>Маягтыг бүрэн, зөв бөглөснөөр батлах үйл явц хурдан болно</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                    <span>Имэйл хаягаа зөв бичнэ үү (мэдэгдэл ирэх)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                    <span>Хэрэв 5 хоногоос дээш хугацаанд хариу ирэхгүй бол сургалтын албанд холбогдоно уу</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-third flex-shrink-0" />
                    <span>Баталгаажсаны дараа албан ёсны тодорхойлолт авахыг мартуузай</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>  

        {/* RIGHT SIDE - Instructions (Sticky) */}
        <div className="space-y-6">
          <div className="grid sm:grid-cols-1 gap-3">
            {forms.map((f, i) => (
              <a
                key={i}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-5 transition bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 text-primary rounded-lg bg-primary/10 flex-shrink-0">
                  <FiFileText size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {f.code}
                  </p>
                </div>

                {/* Action */}
                <FiExternalLink className="mt-1 text-gray-400 flex-shrink-0" size={16} />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
