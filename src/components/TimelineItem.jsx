const TYPE_ICONS = {
  transport: '🚄',
  hotel: '🏨',
  sight: '🌆',
  food: '🍜',
  shopping: '🛍️',
};

/** 일정 탭 타임라인 카드. spot은 travelData.spots에서 spotId로 해석해 내려받는다. */
export default function TimelineItem({ item, spot, isLast, onShowDriver, onShowMap }) {
  return (
    <div className="flex gap-3">
      {/* 타임라인 축 */}
      <div className="flex flex-col items-center">
        <span className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-rose-200 to-sky-200 flex items-center justify-center text-lg shadow-sm">
          {TYPE_ICONS[item.type] || '📍'}
        </span>
        {!isLast && <span className="w-px flex-1 bg-rose-200 my-1" />}
      </div>

      {/* 카드 본문 */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-rose-100 p-3 mb-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-bold text-gray-800">{spot?.name_ko ?? item.spotId}</p>
          <span className="text-xs font-bold text-sky-500 shrink-0">{item.time}</span>
        </div>

        {spot?.name_zh && (
          <button
            type="button"
            onClick={() => onShowDriver(spot)}
            className="mt-1 inline-flex items-center gap-1 text-sm text-gray-500"
          >
            {spot.name_zh}
            <span className="text-[10px] bg-sky-100 text-sky-600 font-bold rounded-full px-1.5 py-0.5">🔍 확대</span>
          </button>
        )}

        {item.memo && <p className="mt-1.5 text-sm text-gray-600">💬 {item.memo}</p>}

        {spot?.map && (
          <button
            type="button"
            onClick={() => onShowMap(spot)}
            className="mt-2 text-xs font-bold text-rose-400 bg-rose-50 rounded-full px-3 py-1.5"
          >
            🗺️ 지도 캡처 보기
          </button>
        )}
      </div>
    </div>
  );
}
