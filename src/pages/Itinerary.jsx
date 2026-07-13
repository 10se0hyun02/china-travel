import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';
import TimelineItem from '../components/TimelineItem.jsx';
import ImageModal from '../components/ImageModal.jsx';

const DIARY_KEY = 'couple-diaries';

function loadDiaries() {
  try {
    return JSON.parse(localStorage.getItem(DIARY_KEY)) || {};
  } catch {
    return {};
  }
}

export default function Itinerary() {
  const [modal, setModal] = useState(null);
  const [diaries, setDiaries] = useState(loadDiaries);
  const { spots, timelines } = travelData;

  useEffect(() => {
    localStorage.setItem(DIARY_KEY, JSON.stringify(diaries));
  }, [diaries]);

  const showDriver = (spot) => setModal({ text: [spot.name_zh, spot.addr] });
  const showMap = (spot) => setModal({ title: spot.name_ko, image: spot.map });

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
              onShowMap={showMap}
            />
          ))}

          {/* 커플 한 줄 일기 — 오프라인에서도 localStorage에 기록 */}
          <div className="bg-gradient-to-r from-rose-50 to-sky-50 rounded-2xl border border-rose-100 p-3 mt-1">
            <p className="text-xs font-bold text-rose-400 mb-1.5">📝 오늘의 한 줄 일기</p>
            <input
              type="text"
              value={diaries[day.day] ?? day.diary}
              onChange={(e) => setDiaries((d) => ({ ...d, [day.day]: e.target.value }))}
              placeholder="오늘의 추억을 한 줄로 남겨요"
              className="w-full bg-white/70 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </section>
      ))}

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
