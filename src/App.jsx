import { useState } from 'react';
import Layout from './components/Layout.jsx';
import Intro from './components/Intro.jsx';
import PreDepartureChecklist, { isBeforeDeparture } from './components/PreDepartureChecklist.jsx';
import LetterScreen from './components/LetterScreen.jsx';
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
  const [checklistLeaving, setChecklistLeaving] = useState(false);
  const Page = PAGES[tab];

  return (
    <>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      {showChecklist && (
        <PreDepartureChecklist onDone={() => setShowChecklist(false)} onLeaving={() => setChecklistLeaving(true)} />
      )}
      {/* 체크리스트가 사라지는 순간과 편지가 뜨는 순간 사이에 앱 본문이 잠깐 비치지 않도록,
          showChecklist와 무관하게 항상 마운트해두고 자체 시간 로직으로 노출 여부를 결정한다
          (체크리스트와 같은 z-40, DOM상 뒤에 있어 체크리스트가 페이드아웃될 때 그 밑에서 자연스럽게 겹쳐 보인다).
          checklistLeaving은 체크리스트가 페이드아웃을 "시작"하는 그 순간 바로 true가 되므로(onDone은 500ms 뒤),
          dev 미리보기도 체크리스트가 다 사라지길 기다리지 않고 그 즉시 겹쳐 뜬다. */}
      <LetterScreen checklistDismissed={!showChecklist || checklistLeaving} />
      <Layout activeTab={tab} onTabChange={setTab}>
        <Page />
      </Layout>
    </>
  );
}
