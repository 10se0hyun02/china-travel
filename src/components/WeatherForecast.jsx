const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/** 여행 4일치 날씨를 보여주는 귀여운 SVG 아이콘. 외부 API 없이 정적 데이터 + CSS 애니메이션(Zero-Data). */
function WeatherIcon({ condition }) {
  const showSun = condition !== 'light-rain';
  const showCloud = condition !== 'haze';
  const rainCount = condition === 'light-rain' ? 3 : condition === 'rain-possible' ? 2 : 0;

  return (
    <svg viewBox="0 0 60 46" className="w-10 h-8">
      {showSun && (
        <g className="animate-weather-sun" style={{ transformOrigin: '22px 17px' }}>
          <circle cx="22" cy="17" r="8" fill="#e0b877" />
          {RAYS.map((deg) => (
            <line
              key={deg}
              x1="22"
              y1="5"
              x2="22"
              y2="8"
              stroke="#e0b877"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${deg} 22 17)`}
            />
          ))}
        </g>
      )}

      {showCloud && (
        <g>
          <ellipse cx="34" cy="27" rx="16" ry="9" fill="#d7dee2" />
          <ellipse cx="25" cy="25" rx="10" ry="7" fill="#e6ebee" />
        </g>
      )}

      {Array.from({ length: rainCount }).map((_, i) => (
        <ellipse
          key={i}
          className="animate-weather-rain"
          style={{ animationDelay: `${i * 0.3}s` }}
          cx={27 + i * 8}
          cy="38"
          rx="1.6"
          ry="4"
          fill="#93a8b3"
        />
      ))}
    </svg>
  );
}

export default function WeatherForecast({ days }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-sky-500">
          <span className="emoji-muted">🌦️</span> 상해 날씨
        </p>
        <span className="text-[11px] text-gray-400">7/15 기준 예보 · 출발 전 확인</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {days.map((d) => (
          <div key={d.day} className="flex flex-col items-center bg-sky-50/60 rounded-xl py-2.5">
            <span className="text-[11px] font-bold text-gray-500">{d.date}</span>
            <WeatherIcon condition={d.condition} />
            <span className="text-sm font-bold text-gray-700 mt-0.5">{d.high}°</span>
            <span className="text-[11px] text-gray-400">{d.low}°</span>
            <span className="text-[10px] text-gray-400 mt-0.5 text-center leading-tight px-0.5">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
