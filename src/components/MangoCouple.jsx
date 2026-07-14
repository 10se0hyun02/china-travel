/**
 * 홈 탭 최상단 히어로 — 여행에 들뜬 망고젤리 커플(망고멜랑 & 멜랑망고)이 손잡고 있는
 * 동화풍 애니메이션. 외부 이미지/폰트 없이 인라인 SVG + CSS keyframes로만 구현 (Zero-Data).
 */
function MangoJelly({ id, tone, side }) {
  const gradId = `mango-grad-${id}`;
  return (
    <svg
      viewBox="0 0 100 110"
      className={`w-16 h-[70px] ${side === 'right' ? '-scale-x-100' : ''}`}
      style={{ filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.08))' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone.from} />
          <stop offset="100%" stopColor={tone.to} />
        </linearGradient>
      </defs>
      {/* 잎사귀 */}
      <ellipse cx="46" cy="16" rx="10" ry="5" fill="#a8bf9a" transform="rotate(-25 46 16)" />
      {/* 몸통 */}
      <ellipse cx="50" cy="62" rx="34" ry="40" fill={`url(#${gradId})`} />
      {/* 볼터치 */}
      <circle cx="30" cy="60" r="5" fill="#d9a8a0" opacity="0.5" />
      <circle cx="70" cy="60" r="5" fill="#d9a8a0" opacity="0.5" />
      {/* 눈 */}
      <circle cx="38" cy="52" r="3.5" fill="#5b3a1e" />
      <circle cx="62" cy="52" r="3.5" fill="#5b3a1e" />
      {/* 미소 */}
      <path d="M40 64 Q50 73 60 64" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function MangoCouple() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-100 via-rose-50 to-sky-50 shadow-sm px-4 pt-6 pb-3">
      <span className="absolute left-[16%] top-3 text-lg animate-mango-sparkle" style={{ animationDelay: '0s' }}>
        🧳
      </span>
      <span className="absolute right-[18%] top-5 text-base animate-mango-sparkle" style={{ animationDelay: '0.6s' }}>
        🎫
      </span>
      <span className="absolute left-[46%] top-0 text-sm animate-mango-sparkle" style={{ animationDelay: '1.2s' }}>
        ✈️
      </span>

      <div className="relative flex items-end justify-center">
        <div className="flex flex-col items-center animate-mango-bounce-left">
          <MangoJelly id="left" side="left" tone={{ from: '#e8c98a', to: '#c9955a' }} />
          <span className="mt-1 text-[11px] font-bold text-amber-600">망고멜랑</span>
        </div>

        {/* 맞잡은 손 사이 하트 */}
        <span className="mb-9 -mx-2 text-base shrink-0 animate-pulse">❤️</span>

        <div className="flex flex-col items-center animate-mango-bounce-right">
          <MangoJelly id="right" side="right" tone={{ from: '#ddb8c0', to: '#c491a0' }} />
          <span className="mt-1 text-[11px] font-bold text-rose-500">멜랑망고</span>
        </div>
      </div>

      <p className="relative mt-1 text-center text-xs font-bold text-gray-500 tracking-wide">
        SHANGHAI TRAVEL
      </p>
    </div>
  );
}
