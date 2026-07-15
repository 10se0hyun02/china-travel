import { useState } from 'react';
import Layout from './components/Layout.jsx';
import Intro from './components/Intro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Itinerary from './pages/Itinerary.jsx';
import Places from './pages/Places.jsx';
import Archive from './pages/Archive.jsx';
// Zero-Data: 라우터 라이브러리 없이 상태 기반 탭 전환 — 번들 최소화 + 완전 오프라인
const PAGES = {
  dashboard: Dashboard,
  itinerary: Itinerary,
  places: Places,
  archive: Archive,
};

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [showIntro, setShowIntro] = useState(true);
  const Page = PAGES[tab];

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <Layout activeTab={tab} onTabChange={setTab}>
        <Page />
      </Layout>
    </>
  );
}
