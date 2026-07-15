import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import TimelineItem from '../components/TimelineItem.jsx';
import ImageModal from '../components/ImageModal.jsx';
import SpotDetailModal from '../components/SpotDetailModal.jsx';
import UndecidedList from '../components/UndecidedList.jsx';

export default function Itinerary() {
  const [driver, setDriver] = useState(null); // 기사님용 중문 확대 모달
  const [detail, setDetail] = useState(null); // 장소 상세 바텀시트에 띄울 spot
  const { spots, timelines, undecided } = travelData;

  const showDriver = (spot) => setDriver({ text: [spot.name_zh, spot.addr] });

  // 탭 진입 시 전체 일정 카드가 순서대로 촤라락 나타나도록 전역 인덱스로 지연시간 계산 (최대치는 캡)
  let cardIndex = 0;

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

          {day.items.map((item, i) => {
            const delay = Math.min(cardIndex++, 10) * 0.05;
            return (
              <div key={`${day.day}-${i}`} className="animate-card-in" style={{ animationDelay: `${delay}s` }}>
                <TimelineItem
                  item={item}
                  spot={spots[item.spotId]}
                  isLast={i === day.items.length - 1}
                  onOpen={(it, spot) => setDetail(spot)}
                  onShowDriver={showDriver}
                />
              </div>
            );
          })}
        </section>
      ))}

      <UndecidedList undecided={undecided} spots={spots} onOpenSpot={setDetail} />

      <SpotDetailModal open={!!detail} onClose={() => setDetail(null)} spot={detail} />
      <ImageModal open={!!driver} onClose={() => setDriver(null)} {...(driver || {})} />
    </div>
  );
}
