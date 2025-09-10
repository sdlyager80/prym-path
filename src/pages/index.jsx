import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard";
import Phases from "./Phases";
import Exercise from "./Exercise";
import SkillsMap from "./SkillsMap";
import Assessments from "./Assessments";
import AssessmentAttempt from "./AssessmentAttempt";
import Resources from "./Resources";
import CapstoneProject from "./CapstoneProject";

import { Route, Routes, useLocation } from 'react-router-dom'; // ← Removed BrowserRouter import

const PAGES = {
    Dashboard: Dashboard,
    Phases: Phases,
    Exercise: Exercise,
    SkillsMap: SkillsMap,
    Assessments: Assessments,
    AssessmentAttempt: AssessmentAttempt,
    Resources: Resources,
    CapstoneProject: CapstoneProject,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// No longer wrapping with Router since App.jsx already has BrowserRouter
export default function Pages() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Phases" element={<Phases />} />
                <Route path="/Exercise" element={<Exercise />} />
                <Route path="/SkillsMap" element={<SkillsMap />} />
                <Route path="/Assessments" element={<Assessments />} />
                <Route path="/AssessmentAttempt" element={<AssessmentAttempt />} />
                <Route path="/Resources" element={<Resources />} />
                <Route path="/CapstoneProject" element={<CapstoneProject />} />
            </Routes>
        </Layout>
    );
}