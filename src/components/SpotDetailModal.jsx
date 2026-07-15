import { useEffect } from 'react';

/**
 * 장소 상세 바텀시트 — 일정 탭 카드를 누르면 열린다.
 * 중문명·주소·팁·실전 정보(detail.sections)를 한 곳에 모아 보여준다.
 * 일정 메모는 타임라인 카드 쪽 표시 — 여기는 장소 정보만 담당.
 */
export default function SpotDetailModal({ open, onClose, spot }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !spot) return null;

  const sections = spot.detail?.sections ?? [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-backdrop-fade"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl p-5 pb-8 animate-sheet-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={spot.name_ko}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold text-lg text-gray-800 leading-snug">{spot.name_ko}</p>
            <p className="mt-1 text-sm text-gray-500">{spot.name_zh}</p>
            {spot.addr && <p className="mt-0.5 text-xs text-gray-400">{spot.addr}</p>}
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

        <div className="mt-5 space-y-4">
          {spot.tip && (
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">팁</p>
              <p className="text-sm text-rose-500/90 bg-rose-50/70 rounded-xl px-3 py-2 leading-relaxed">
                {spot.tip}
              </p>
            </div>
          )}

          {sections.map((s, idx) => (
            <div
              key={s.heading}
              className={idx > 0 || spot.tip ? 'pt-4 border-t border-gray-100' : ''}
            >
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                {s.heading}
              </p>
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
