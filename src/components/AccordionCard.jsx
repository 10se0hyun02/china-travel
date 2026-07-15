import { useState } from 'react';

const TONE_STYLES = {
  rose: 'bg-rose-100 text-rose-500',
  sky: 'bg-sky-100 text-sky-600',
  amber: 'bg-amber-100 text-amber-600',
};

/** 눌러서 펼치고 접는 카드. 내용이 긴 예약 상세정보를 스크롤 없이 요약해 보여줄 때 사용. */
export default function AccordionCard({ icon, title, subtitle, defaultOpen = false, tone = 'rose', children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-rose-50/50 transition-colors"
      >
        <div className="min-w-0 flex items-center gap-3">
          <span
            className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-base ${TONE_STYLES[tone]}`}
          >
            <span className="emoji-muted">{icon}</span>
          </span>
          <div className="min-w-0">
            <p className="font-bold text-[15px] text-gray-800 truncate">{title}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <span
          className={`shrink-0 text-xs transition-all duration-300 ${
            open ? 'rotate-180 text-rose-400' : 'text-gray-300'
          }`}
        >
          ▼
        </span>
      </button>

      {/* grid-template-rows 0fr↔1fr 트릭으로 높이를 몰라도 부드럽게 펼침/접힘 */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={`px-4 pb-4 pt-2 border-t border-rose-50 transition-opacity duration-300 ${
              open ? 'opacity-100 delay-100' : 'opacity-0'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
