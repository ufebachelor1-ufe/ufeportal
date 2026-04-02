import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import ProgramsPage from './pages/ProgramsPage';
import Announcements from './pages/Announcements';
import Bsa from './pages/bsa/bsa';
import GpaCalculator from "./pages/GpaCalculator";
import Creators from './pages/Creators';
import StudentServices from './pages/service/shome';  
import Volunteer from './pages/volunteer/volunteer';
import Research from './pages/research/Research';
import NewsDetail from './pages/NewsDetail';
import ProgramDetail from './pages/ProgramDetail';
import NewsAll from './pages/Newsall';
import Globe from './pages/globe/global';
import Vid from './pages/vid';
import VidAll from './pages/vidall';
import Calendar from './pages/bsa/calendar';
import Newsbsa from './pages/bsa/newsbsa';
import BSADetail from './pages/bsa/bsadetail';
import Allan from './pages/allan';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/degree/:degree" element={<ProgramsPage />} />
          <Route path="/programs/id/:id" element={<ProgramDetail />} />
          <Route path="/bsa/*" element={<Bsa />} />
          <Route path="/gpa-calculator" element={<GpaCalculator />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/services/*" element={<StudentServices />} />
          <Route path="/volunteer/*" element={<Volunteer />} />
          <Route path="/research/*" element={<Research />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/newsall" element={<NewsAll />} />
          <Route path="/globe" element={<Globe />} />
          <Route path="/video" element={<Vid />} />
          <Route path="/vidall" element={<VidAll />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/newsbsa" element={<Newsbsa />} />
          <Route path="/bsa/news/:id" element={<BSADetail />} />
          <Route path="/allan" element={<Allan />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;