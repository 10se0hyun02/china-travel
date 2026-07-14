import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import TimelineItem from '../components/TimelineItem.jsx';
import ImageModal from '../components/ImageModal.jsx';
import UndecidedList from '../components/UndecidedList.jsx';

export default function Itinerary() {
  const [modal, setModal] = useState(null);
  const { spots, timelines, undecided } = travelData;

  const showDriver = (spot) => setModal({ text: [spot.name_zh, spot.addr] });

  return (
    <div className="space-y-6">
      {timelines.map((day) => (
        <section key={day.day}>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="bg-rose-400 text-white text-xs font-bold rounded-full px-2.5 py-1">
              DAY {day.day}
            </span>
            <span className="text-sm font-bold text-gray-700">{day.date}</span>
            <span className="text-xs text-gray-400">{day.desc}</span>
          </div>

          {day.items.map((item, i) => (
            <TimelineItem
              key={`${day.day}-${i}`}
              item={item}
              spot={spots[item.spotId]}
              isLast={i === day.items.length - 1}
              onShowDriver={showDriver}
            />
          ))}
        </section>
      ))}

      <UndecidedList undecided={undecided} spots={spots} />

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
