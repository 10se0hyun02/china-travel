import { useState } from 'react';

/** 눌러서 펼치고 접는 카드. 내용이 긴 예약 상세정보를 스크롤 없이 요약해 보여줄 때 사용. */
export default function AccordionCard({ icon, title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div className="min-w-0 flex items-start gap-2">
          <span className="text-lg leading-none shrink-0">{icon}</span>
          <div className="min-w-0">
            <p className="font-bold text-[15px] text-gray-800 truncate">{title}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <span
          className={`shrink-0 text-gray-300 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>

      {open && <div className="px-4 pb-4 pt-2 border-t border-rose-50">{children}</div>}
    </div>
  );
}
