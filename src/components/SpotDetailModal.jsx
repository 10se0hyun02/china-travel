import { useEffect } from 'react';

/** 스팟 탭 "자세히 보기" — 장소별 실전 팁을 바텀시트로 보여준다. spot.detail이 있는 장소만 진입 가능. */
export default function SpotDetailModal({ open, onClose, title, subtitle, sections }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold text-lg text-gray-800">{title}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-gray-300 text-2xl leading-none px-1"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {sections.map((s, idx) => (
            <div key={s.heading} className={idx > 0 ? 'pt-4 border-t border-gray-100' : ''}>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">{s.heading}</p>
              <ul className="space-y-1.5">
                {s.lines.map((line, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-gray-300 shrink-0">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
