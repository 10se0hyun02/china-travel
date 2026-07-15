import { useEffect } from 'react';
import { SectionHeading, BulletLine } from './SpotDetailModal.jsx';

/**
 * 홈 탭 최상단 "SHANGHAI TRAVEL 이용가이드" 링크를 누르면 뜨는 바텀시트.
 * travelData.appGuide(아이콘·제목·sections)를 SpotDetailModal과 같은 스타일로 보여준다 - 정보 탭 카드 목록과는 별개.
 */
export default function AppGuideModal({ open, onClose, data }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-backdrop-fade"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl p-5 pb-8 animate-sheet-slide-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={data.title}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="font-bold text-lg text-gray-800 leading-snug">
            <span className="emoji-muted">{data.icon}</span> {data.title}
          </p>
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
          {data.sections.map((s, idx) => (
            <div key={s.heading} className={idx > 0 ? 'pt-4 border-t border-gray-100' : ''}>
              <SectionHeading>{s.heading}</SectionHeading>
              <ul className="space-y-2.5">
                {s.lines.map((line, i) => (
                  <BulletLine key={i} line={line} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
