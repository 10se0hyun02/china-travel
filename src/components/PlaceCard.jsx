import CopyAddressButton from './CopyAddressButton.jsx';

/** 스팟 탭 장소 카드. days는 이 장소를 방문하는 일정 탭의 DAY 번호 목록(없으면 미정). */
export default function PlaceCard({ spot, days, onShowDriver }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="font-bold text-gray-800">{spot.name_ko}</p>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              {days?.length ? days.map((d) => `DAY ${d}`).join(' · ') : '미정'}
            </span>
          </div>
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

      <CopyAddressButton
        address={spot.addr}
        className="mt-3 w-full text-sm font-bold text-rose-400 bg-rose-50 rounded-xl py-2"
      />
    </div>
  );
}
