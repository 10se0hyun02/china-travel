/**
 * 아직 확정 안 된 일정 후보 — 확정된 타임라인과 구분되도록 점선 카드로 별도 표시.
 * spotIds로 참조된 장소들의 요약 정보만 보여주고, 상세 정보·기사님 모달은 스팟 탭에서 확인하도록 안내.
 */
export default function UndecidedList({ undecided, spots }) {
  if (!undecided?.length) return null;

  return (
    <section className="space-y-3">
      <p className="text-xs font-bold text-amber-500">🤔 아직 미정인 일정</p>
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
                <div key={id} className="bg-white rounded-xl p-2.5 border border-amber-100">
                  <p className="text-sm font-bold text-gray-700">{spot.name_ko}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{spot.tip ?? spot.name_zh}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-amber-500">
            상세 정보는 스팟 탭에서 볼 수 있어요. 정해지면 일정 탭에 반영해요!
          </p>
        </div>
      ))}
    </section>
  );
}
