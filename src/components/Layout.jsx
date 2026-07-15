// 탭 아이콘 — 이모지 대신 라인 아이콘(1.6px stroke)으로 통일, currentColor로 활성/비활성 색 상속
const ICONS = {
  dashboard: (
    <path d="M3 10.5 L11 4 L19 10.5 V19 a1 1 0 0 1 -1 1 H4 a1 1 0 0 1 -1 -1 Z M8 20 V13 h6 v7" />
  ),
  itinerary: (
    <>
      <rect x="3.5" y="4.5" width="15" height="15" rx="2.5" />
      <path d="M3.5 9 h15 M7.5 3 v3 M14.5 3 v3 M7 13 h3 M7 16.5 h6" />
    </>
  ),
  info: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M11 10.2 V15.5 M11 7.2 v0.2" />
    </>
  ),
  archive: <path d="M3.5 8 h15 v9.5 a1 1 0 0 1 -1 1 H4.5 a1 1 0 0 1 -1 -1 Z M3.5 8 L5 4.5 h12 L18.5 8" />,
};

const TABS = [
  { id: 'dashboard', label: '홈' },
  { id: 'itinerary', label: '일정' },
  { id: 'info', label: '정보' },
  { id: 'archive', label: '보관함' },
];

export default function Layout({ activeTab, onTabChange, children }) {
  return (
    <div className="max-w-md mx-auto bg-rose-50/30 flex flex-col min-h-screen shadow-lg">
      <main className="flex-1 px-4 pt-6 pb-24">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 z-30 mx-auto max-w-md bg-white/95 backdrop-blur border-t border-rose-100">
        <ul className="flex">
          {TABS.map((tab) => (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex flex-col items-center gap-0.5 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-sm transition-colors ${
                  activeTab === tab.id ? 'text-rose-500 font-bold' : 'text-gray-400'
                }`}
              >
                <svg
                  viewBox="0 0 22 22"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[tab.id]}
                </svg>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
