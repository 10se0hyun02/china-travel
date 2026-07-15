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
                className={`w-full py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-sm transition-colors ${
                  activeTab === tab.id ? 'text-rose-500 font-bold' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
