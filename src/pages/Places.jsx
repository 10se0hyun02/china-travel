import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import PlaceCard from '../components/PlaceCard.jsx';
import ImageModal from '../components/ImageModal.jsx';

export default function Places() {
  const [modal, setModal] = useState(null);
  const { spots } = travelData;

  // 커플 스팟(isTarget)을 상단에 고정
  const sorted = Object.entries(spots).sort(([, a], [, b]) => (b.isTarget ? 1 : 0) - (a.isTarget ? 1 : 0));

  return (
    <div className="space-y-3">
      {sorted.map(([id, spot]) => (
        <PlaceCard
          key={id}
          spot={spot}
          onShowDriver={(s) => setModal({ text: [s.name_zh, s.addr] })}
          onShowMap={(s) => setModal({ title: s.name_ko, image: s.map })}
        />
      ))}

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
