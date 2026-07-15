import CopyAddressButton from './CopyAddressButton.jsx';

const TYPE_ICONS = {
  transport: '✈️',
  hotel: '🏨',
  sight: '🌆',
  food: '🍜',
  shopping: '🛍️',
};

/**
 * 일정 탭 타임라인 카드. spot은 travelData.spots에서 spotId로 해석해 내려받는다.
 * 카드 전체가 클릭 영역(장소 상세 바텀시트), 중문명 옆 아이콘으로 기사님용 확대·한자 상호명 복사(지도 앱 붙여넣기용).
 * item.sub가 true면 메인 일정이 아닌 보조 쇼핑 팁으로 들여쓰기·점선 카드로 구분해 표시.
 * item.badge가 있으면 작은 딱지로 표시 (예: "수정 추천" — 수정이가 추천한 스팟이라는 뜻, 앰버 톤으로 구분).
 */
export default function TimelineItem({ item, spot, isLast, onOpen, onShowDriver }) {
  const sub = !!item.sub;
  const badge = item.badge ?? (sub ? '쇼핑 팁' : null);
  const badgeTone = badge === '쇼핑 팁' ? 'text-rose-400 bg-rose-100' : 'text-amber-600 bg-amber-100';

  return (
    <div className={`flex gap-3 ${sub ? 'ml-8' : ''}`}>
      {/* 타임라인 축 — 일정 유형 라벨 */}
      <div className="flex flex-col items-center">
        <span
          className={`shrink-0 rounded-full bg-gradient-to-br from-rose-200 to-sky-200 flex items-center justify-center ${
            sub ? 'w-7 h-7 text-sm' : 'w-9 h-9 text-base'
          }`}
        >
          <span className="emoji-muted">{TYPE_ICONS[item.type] || '📍'}</span>
        </span>
        {!isLast && <span className="w-px flex-1 bg-rose-200 my-1" />}
      </div>

      {/* 카드 본문 */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => spot && onOpen(item, spot)}
        onKeyDown={(e) => e.key === 'Enter' && spot && onOpen(item, spot)}
        className={`flex-1 text-left rounded-2xl shadow-sm mb-4 active:bg-rose-50/60 transition-colors cursor-pointer ${
          sub ? 'bg-rose-50/50 border border-dashed border-rose-200 p-3' : 'bg-white border border-rose-100 p-3.5'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-bold ${sub ? 'text-rose-400' : 'text-sky-500'}`}>
            {item.time || '언제든'}
          </span>
          <div className="flex items-center gap-1.5">
            {badge && (
              <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${badgeTone}`}>
                {badge}
              </span>
            )}
            {spot && <span className="text-gray-300 text-lg leading-none">›</span>}
          </div>
        </div>

        <div className="mt-0.5 flex items-center gap-2.5">
          <p className={`font-bold text-gray-800 leading-snug ${sub ? 'text-sm' : ''}`}>
            {spot?.name_ko ?? item.spotId}
          </p>
          {spot?.name_zh && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowDriver(spot);
              }}
              className="text-sm leading-none"
              aria-label="중문 크게 보기"
            >
              🔍
            </button>
          )}
          {spot?.name_zh && (
            <CopyAddressButton
              address={spot.name_zh}
              label="📋"
              copiedLabel="✅"
              className="text-sm leading-none"
            />
          )}
        </div>

        {item.memo && (
          <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">{item.memo}</p>
        )}
      </div>
    </div>
  );
}
