/**
 * 스팟 탭 장소 카드. isTarget이면 커플 스팟 전용 하트 핀으로 표시.
 * 지도 이미지는 여기서 절대 렌더링하지 않는다 — 클릭 시 ImageModal에서만 로드(레이지 로딩).
 */
export default function PlaceCard({ spot, onShowDriver, onShowMap }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border p-4 ${
        spot.isTarget ? 'border-rose-300 ring-1 ring-rose-200' : 'border-rose-100'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-gray-800 flex items-center gap-1.5">
            <span>{spot.isTarget ? '❤️' : '📍'}</span>
            {spot.name_ko}
            {spot.isTarget && (
              <span className="text-[10px] bg-rose-100 text-rose-500 font-bold rounded-full px-2 py-0.5">
                커플 스팟
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-gray-500">{spot.name_zh}</p>
          <p className="text-xs text-gray-400">{spot.addr}</p>
        </div>
        <button
          type="button"
          onClick={() => onShowDriver(spot)}
          className="shrink-0 text-xs font-bold text-sky-600 bg-sky-50 border border-sky-100 rounded-full px-3 py-1.5"
        >
          🔍 中文 확대
        </button>
      </div>

      {spot.tip && (
        <p className="mt-2 text-sm text-rose-400 bg-rose-50/70 rounded-xl px-3 py-2">💡 {spot.tip}</p>
      )}

      {spot.map && (
        <button
          type="button"
          onClick={() => onShowMap(spot)}
          className="mt-3 w-full text-sm font-bold text-rose-400 bg-rose-50 rounded-xl py-2"
        >
          🗺️ 고덕지도 캡처 보기
        </button>
      )}
    </div>
  );
}
