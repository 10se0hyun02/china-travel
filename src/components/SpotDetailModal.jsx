import { useEffect } from 'react';

/** 소제목 — 컬러 악센트 바 + 굵은 로즈 텍스트로 본문과 확실히 분리. */
export function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span className="w-1 h-3.5 rounded-full bg-rose-300 shrink-0" />
      <p className="text-[13px] font-extrabold text-rose-500">{children}</p>
    </div>
  );
}

/**
 * "라벨: 내용" 형태의 불릿은 라벨을 작은 칩으로 떼어내 그 아래 설명을 붙인다 —
 * 줄글로 이어지던 문장을 "미니 소제목 + 본문" 두 줄 블록으로 나눠 스캔하기 쉽게 한다.
 * 라벨은 45자 이내 + 콜론 뒤 공백이 있을 때만 인식 (시간 표기 07:30 등은 오인식 안 됨).
 * "라벨 : 내용"처럼 콜론 앞에 공백이 있는 표기도 허용. 라벨이 없는 일반 문장은 기존처럼 점 불릿으로.
 */
export function BulletLine({ line }) {
  const m = line.match(/^(.{1,45}?)\s*[:：]\s(.*)$/s);
  if (!m) {
    return (
      <li className="flex gap-2 text-sm text-gray-700 leading-relaxed">
        <span className="text-gray-300 shrink-0 mt-[3px]">•</span>
        <span>{line}</span>
      </li>
    );
  }
  return (
    <li className="text-sm text-gray-700 leading-relaxed">
      <span className="inline-block bg-sky-50 text-sky-600 font-bold text-xs rounded-md px-2 py-0.5 mb-1">
        {m[1]}
      </span>
      <p>{m[2]}</p>
    </li>
  );
}

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
              <SectionHeading>팁</SectionHeading>
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
