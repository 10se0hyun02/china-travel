import { useEffect, useState } from 'react';
import { MangoJelly } from './MangoCouple.jsx';
import { travelData } from '../data/travelData.js';

const FADE_OUT_MS = 500;

/**
 * 앱 진입 시 보이는 인트로 스플래시. 인라인 SVG + CSS keyframes만 사용 (Zero-Data).
 * 화면을 탭하면 페이드아웃되며 앱으로 진입.
 */
export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, FADE_OUT_MS);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  const { startDate, endDate } = travelData.meta;
  const period = `${startDate.replaceAll('-', '.')} — ${endDate.slice(5).replace('-', '.')}`;

  return (
    <div
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-amber-100 via-rose-50 to-sky-100 ${
        leaving ? 'animate-intro-fade-out' : ''
      }`}
    >
      <div className="w-full max-w-md flex flex-col items-center px-8">
        <span className="text-3xl animate-intro-plane">✈️</span>

        <div className="mt-4 flex items-end justify-center animate-intro-rise">
          <div className="animate-mango-bounce-left">
            <MangoJelly id="intro-left" side="left" variant="boy" tone={{ from: '#e8c98a', to: '#c9955a' }} />
          </div>
          <span className="mb-8 -mx-2 text-base shrink-0 animate-pulse">❤️</span>
          <div className="animate-mango-bounce-right">
            <MangoJelly id="intro-right" side="right" variant="girl" tone={{ from: '#ddb8c0', to: '#c491a0' }} />
          </div>
        </div>

        <h1
          className="mt-5 text-2xl font-extrabold tracking-[0.25em] text-gray-600 animate-intro-rise"
          style={{ animationDelay: '0.15s' }}
        >
          SHANGHAI
        </h1>
        <p
          className="mt-1 text-sm font-bold tracking-[0.35em] text-rose-400 animate-intro-rise"
          style={{ animationDelay: '0.3s' }}
        >
          망고멜랑 ❤️ 멜랑망고
        </p>
        <p
          className="mt-4 text-xs font-semibold text-sky-500 animate-intro-rise"
          style={{ animationDelay: '0.45s' }}
        >
          {period}
        </p>
        <p
          className="mt-10 text-[11px] font-semibold text-gray-400 animate-intro-tap-hint"
          style={{ animationDelay: '1s' }}
        >
          화면을 탭해서 시작하기
        </p>
      </div>
    </div>
  );
}
