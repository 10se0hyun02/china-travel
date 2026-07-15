import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';
import { MangoJelly } from './MangoCouple.jsx';

const clamp = (n) => Math.min(100, Math.max(0, n));

/**
 * 일정 탭 맨 위 - 지금 접속 시각이 출발~귀국 사이 어디쯤인지 "여행 길" 형태로 보여주는 상태바.
 * 길 위를 망고커플이 진행률(0~100%)만큼 이동하고, Day1~4 지점을 실제 날짜 비례로 점·라벨로 표시한다.
 * 1분마다 갱신 - 진행 표시라 초 단위 정밀도는 불필요.
 */
export default function TripProgressBar() {
  const [now, setNow] = useState(Date.now());
  const [moodTick, setMoodTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  // Day1~3 구간에서 평범/웃는 표정을 번갈아 보여주는 아이들 표정 - 진행률 갱신과는 별개 주기
  useEffect(() => {
    const id = setInterval(() => setMoodTick((v) => v + 1), 2500);
    return () => clearInterval(id);
  }, []);

  const start = new Date(travelData.meta.departureAt).getTime();
  const end = new Date(travelData.meta.returnAt).getTime();
  const pct = clamp(((now - start) / (end - start)) * 100);

  const tripStartMidnight = new Date(`${travelData.meta.startDate}T00:00:00+09:00`).getTime();
  const dayTicks = travelData.timelines.map((d, i) => ({
    day: d.day,
    pct: clamp(((tripStartMidnight + i * 86400000 - start) / (end - start)) * 100),
  }));

  // 지금이 실제로 며칠째인지(마지막으로 지난 Day 경계) - 마지막 날엔 울상, 그 전엔 평범/웃는 표정 반복
  const lastDay = travelData.timelines.at(-1).day;
  const currentDay = travelData.timelines.reduce(
    (acc, d, i) => (now >= tripStartMidnight + i * 86400000 ? d.day : acc),
    travelData.timelines[0].day
  );
  const mood = currentDay >= lastDay ? 'sad' : moodTick % 2 === 0 ? 'normal' : 'happy';

  return (
    <div className="rounded-2xl bg-white border border-rose-100 px-4 pt-9 pb-3 shadow-sm animate-card-in">
      <div className="relative h-1.5 rounded-full bg-rose-100 mb-1">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-300 to-rose-400 transition-[width] duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
        {dayTicks.map((t) => (
          <span
            key={t.day}
            className="absolute top-1/2 w-1.5 h-1.5 rounded-full bg-white border border-rose-300"
            style={{ left: `${t.pct}%`, transform: 'translate(-50%, -50%)' }}
          />
        ))}
        {/* 진행률 지점에 선 망고커플 - 한 덩어리로 묶은 뒤 통째로 scale해서 발밑이 길에 딱 맞게 닿는다(origin-bottom) */}
        <div
          className="absolute bottom-full flex justify-center transition-[left] duration-1000 ease-out"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        >
          <div className="scale-[0.55] origin-bottom flex items-end -space-x-4">
            <div className="animate-mango-bounce-left">
              <MangoJelly id="progress-left" side="left" variant="boy" mood={mood} tone={{ from: '#e8c98a', to: '#c9955a' }} />
            </div>
            <div className="animate-mango-bounce-right" style={{ animationDelay: '0.15s' }}>
              <MangoJelly id="progress-right" side="right" variant="girl" mood={mood} tone={{ from: '#ddb8c0', to: '#c491a0' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-4 mt-1">
        {dayTicks.map((t) => (
          <span
            key={t.day}
            className="absolute -translate-x-1/2 text-[10px] font-semibold text-gray-300"
            style={{ left: `${t.pct}%` }}
          >
            Day{t.day}
          </span>
        ))}
      </div>
    </div>
  );
}
