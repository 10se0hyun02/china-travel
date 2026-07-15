import CopyAddressButton from './CopyAddressButton.jsx';

const TYPE_LABELS = {
  transport: '이동',
  hotel: '숙소',
  sight: '관광',
  food: '식사',
  shopping: '쇼핑',
};

/**
 * 일정 탭 타임라인 카드. spot은 travelData.spots에서 spotId로 해석해 내려받는다.
 * 카드 전체가 클릭 영역(장소 상세 바텀시트), 중문명 옆 아이콘으로 기사님용 확대·주소 복사.
 */
export default function TimelineItem({ item, spot, isLast, onOpen, onShowDriver }) {
  return (
    <div className="flex gap-3">
      {/* 타임라인 축 — 일정 유형 라벨 */}
      <div className="flex flex-col items-center">
        <span className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-rose-200 to-sky-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
          {TYPE_LABELS[item.type] || '기타'}
        </span>
        {!isLast && <span className="w-px flex-1 bg-rose-200 my-1" />}
      </div>

      {/* 카드 본문 */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => spot && onOpen(item, spot)}
        onKeyDown={(e) => e.key === 'Enter' && spot && onOpen(item, spot)}
        className="flex-1 text-left bg-white rounded-2xl shadow-sm border border-rose-100 p-3.5 mb-4 active:bg-rose-50/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-sky-500">{item.time}</span>
          {spot && <span className="text-gray-300 text-lg leading-none">›</span>}
        </div>

        <div className="mt-0.5 flex items-center gap-2.5">
          <p className="font-bold text-gray-800 leading-snug">
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
          {spot?.addr && (
            <CopyAddressButton
              address={spot.addr}
              label="📋"
              copiedLabel="✅"
              className="text-sm leading-none"
            />
          )}
        </div>

        {item.memo && (
          <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{item.memo}</p>
        )}
      </div>
    </div>
  );
}
