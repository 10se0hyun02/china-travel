import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import PlaceCard from '../components/PlaceCard.jsx';
import ImageModal from '../components/ImageModal.jsx';
import SpotDetailModal from '../components/SpotDetailModal.jsx';

export default function Places() {
  const [modal, setModal] = useState(null);
  const [detailSpot, setDetailSpot] = useState(null);
  const { spots, timelines } = travelData;

  // 일정 탭에 등장하는 순서 그대로 정렬 + 스팟이 몇 일차에 방문 예정인지 매핑
  const order = [];
  const daysBySpot = {};
  for (const day of timelines) {
    for (const item of day.items) {
      if (!order.includes(item.spotId)) order.push(item.spotId);
      (daysBySpot[item.spotId] ??= new Set()).add(day.day);
    }
  }
  const rest = Object.keys(spots).filter((id) => !order.includes(id));
  const sortedIds = [...order, ...rest];

  return (
    <div className="space-y-3">
      {sortedIds.map((id) => (
        <PlaceCard
          key={id}
          spot={spots[id]}
          days={daysBySpot[id] ? [...daysBySpot[id]].sort((a, b) => a - b) : null}
          onShowDriver={(s) => setModal({ text: [s.name_zh, s.addr] })}
          onShowDetail={setDetailSpot}
        />
      ))}

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
      <SpotDetailModal
        open={!!detailSpot}
        onClose={() => setDetailSpot(null)}
        title={detailSpot?.name_ko}
        subtitle={detailSpot?.detail?.subtitle}
        sections={detailSpot?.detail?.sections ?? []}
      />
    </div>
  );
}
