import { useState } from 'react';
import Layout from './components/Layout.jsx';
import Intro from './components/Intro.jsx';
import PreDepartureChecklist, { isBeforeDeparture } from './components/PreDepartureChecklist.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Itinerary from './pages/Itinerary.jsx';
import Archive from './pages/Archive.jsx';
import Info from './pages/Info.jsx';
// Zero-Data: 라우터 라이브러리 없이 상태 기반 탭 전환 — 번들 최소화 + 완전 오프라인
const PAGES = {
  dashboard: Dashboard,
  itinerary: Itinerary,
  archive: Archive,
  info: Info,
};

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [showIntro, setShowIntro] = useState(true);
  const [showChecklist, setShowChecklist] = useState(isBeforeDeparture);
  const Page = PAGES[tab];

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      {showChecklist && <PreDepartureChecklist onDone={() => setShowChecklist(false)} />}
      <Layout activeTab={tab} onTabChange={setTab}>
        <Page />
      </Layout>
    </>
  );
}
