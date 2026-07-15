/**
 * 아직 확정 안 된 일정 후보 — 확정된 타임라인과 구분되도록 점선 카드로 별도 표시.
 * 장소 칩을 누르면 일정 탭의 장소 상세 바텀시트가 열린다.
 */
export default function UndecidedList({ undecided, spots, onOpenSpot }) {
  if (!undecided?.length) return null;

  return (
    <section className="space-y-3">
      <p className="text-xs font-bold text-amber-500">아직 미정인 일정</p>
      {undecided.map((u) => (
        <div
          key={u.id}
          className="bg-amber-50/60 rounded-2xl border border-dashed border-amber-300 p-4"
        >
          <p className="font-bold text-gray-800">{u.label}</p>
          {u.note && <p className="mt-1 text-sm text-gray-500">{u.note}</p>}

          <div className="mt-3 grid grid-cols-2 gap-2">
            {u.spotIds.map((id) => {
              const spot = spots[id];
              if (!spot) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onOpenSpot(spot)}
                  className="text-left bg-white rounded-xl p-2.5 border border-amber-100 active:bg-amber-50 transition-colors"
                >
                  <p className="text-sm font-bold text-gray-700">{spot.name_ko}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{spot.tip ?? spot.name_zh}</p>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-amber-500">
            장소를 누르면 상세 정보가 열려요. 정해지면 타임라인에 반영해요!
          </p>
        </div>
      ))}
    </section>
  );
}
