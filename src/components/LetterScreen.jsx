import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';

const FADE_OUT_MS = 600;
const DAY1_DURATION_MS = 60 * 60 * 1000; // 출발 후 1시간
const DAY2_END_AT = '2026-07-17T11:00:00+09:00'; // DAY2 편지 종료 시각

// ── DAY1 편지 내용 ───────────────────────────────────────────────
const LETTER_DAY1_LINES = [
  'TO 사랑하는 강아지',
  '안녕 깡아지! 굿모닝',
  '우리의 첫번째 해외여행, 상해여행을 떠나기 전 자기를 위한 작은 선물을 준비했어.',
  '뭐가 있을지 궁금해줬으면 좋겠고, 내 선물이 우리의 3박 4일 동안 자기를 더 더 많이 행복하게 만들어주길 바라는 마음으로!',
  '언제나 나랑 같이 있는 시간을 행복해해주는 자기 덕분에, 자기와 함께하는 모든 일들을 나 또한 기다리게돼.',
  '우리 그동안 진짜 너무 수고 많았어! 이번 여행에서만큼은 다 내려놓고 신나게 놀고, 푹 쉬면서 앞으로 잘 살아갈 힘을 잔뜩 얻어가자.',
  '매일 매순간 서로를 사랑하는 시간으로 꽉 채우자! 맛있는거 많이많이 먹고, 같이 땀도 뻘뻘 흘리고, 사진도 영상도 많이많이 찍자.',
  '언제나 내편인 똑똑이 강아지 내가 정말정말 대빵 사랑해!',
  'PS. 나 상해 여름 날씨 너무 무서워. 불쾌지수와 우리가 같은편이 돼서 온 몸으로 싸우고 우리는 사이좋게 다녀오자.',
  'FROM 강아지의 멜랑공주',
];
const LETTER_DAY1_EMOJI = { 0: '🐶', 7: '❤️', 9: '👑' };

// ── DAY2 편지 내용 — 아래 배열만 수정하면 됩니다 ───────────────
const LETTER_DAY2_LINES = [
  'TO 사랑하는 강아지',
  '둘째날도 굿모닝!',
  '여기에 DAY2 편지 내용을 입력해주세요.',
  '여기에 DAY2 편지 내용을 입력해주세요.',
  'FROM 강아지의 멜랑공주',
];
const LETTER_DAY2_EMOJI = { 0: '🐶', 4: '👑' };

// ── 편지별 스타일 정의 ──────────────────────────────────────────
const LETTER_CONFIG = {
  day1: {
    label: 'DAY 1',
    bgClass: 'from-rose-100 via-rose-50 to-pink-100',
    paperBg: '#fdf3f5',
    paperShadow: 'rgba(200,100,140,0.2)',
    paperBorderClass: 'border-rose-100/80',
    labelClass: 'bg-rose-200/70 text-rose-500',
    lines: LETTER_DAY1_LINES,
    emoji: LETTER_DAY1_EMOJI,
  },
  day2: {
    label: 'DAY 2',
    bgClass: 'from-violet-100 via-purple-50 to-pink-100',
    paperBg: '#f7f4fd',
    paperShadow: 'rgba(150,110,210,0.18)',
    paperBorderClass: 'border-violet-100/80',
    labelClass: 'bg-violet-200/70 text-violet-500',
    lines: LETTER_DAY2_LINES,
    emoji: LETTER_DAY2_EMOJI,
  },
};

function LetterContent({ config, onClose, leaving }) {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={`w-full max-w-md h-full mx-auto flex flex-col items-center justify-center px-8 ${
        leaving ? 'animate-letter-content-out' : 'animate-letter-content-in'
      }`}
    >
      {!opened ? (
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="flex flex-col items-center gap-4 active:scale-95 transition-transform"
        >
          {/* DAY 뱃지 */}
          <span className={`text-xs font-black tracking-widest px-3 py-1 rounded-full ${config.labelClass}`}>
            {config.label}
          </span>
          <span className="text-6xl emoji-muted animate-letter-envelope">💌</span>
          <span className="text-sm font-bold text-rose-500 animate-intro-tap-hint">봉투를 눌러서 열어보기</span>
        </button>
      ) : (
        <div
          className={`w-full -rotate-1 rounded-sm shadow-[0_10px_28px] border p-6 pb-7 animate-sheet-slide-up max-h-[80vh] overflow-y-auto ${config.paperBorderClass}`}
          style={{
            backgroundColor: config.paperBg,
            boxShadow: `0 10px 28px ${config.paperShadow}`,
          }}
        >
          {/* DAY 뱃지 (편지 내부) */}
          <div className="flex justify-end mb-3">
            <span className={`text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded-full ${config.labelClass}`}>
              {config.label}
            </span>
          </div>

          <div className="space-y-3">
            {config.lines.map((line, i) => {
              const isFirst = i === 0;
              const isLast = i === config.lines.length - 1;
              const isPs = line.startsWith('PS.');

              if (isFirst || isLast) {
                const [prefix, ...rest] = line.split(' ');
                return (
                  <p key={i} className={`text-sm font-bold text-gray-500 ${isLast ? 'text-right mt-1' : ''}`}>
                    <span className="text-rose-400">{prefix}</span> {rest.join(' ')}
                    {config.emoji[i] && <span className="emoji-muted"> {config.emoji[i]}</span>}
                  </p>
                );
              }

              return (
                <p key={i} className={isPs ? 'text-xs text-gray-400 italic mt-2' : 'text-sm text-gray-700 leading-relaxed'}>
                  {line}
                  {config.emoji[i] && <span className="emoji-muted"> {config.emoji[i]}</span>}
                </p>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 mx-auto block px-5 py-1.5 rounded-full bg-rose-100 text-rose-500 text-xs font-bold active:scale-95 transition-transform"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * 출발 후 1시간 = DAY1 편지, 이후 ~ 다음날 11시 = DAY2 편지.
 * dev 서버에서는 체크리스트를 넘긴 뒤 현재 시각 기준으로 미리보기 가능.
 */
export default function LetterScreen({ checklistDismissed }) {
  const [now, setNow] = useState(Date.now());
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setDismissed(true), FADE_OUT_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  const day1Start = new Date(travelData.meta.departureAt).getTime();
  const day1End = day1Start + DAY1_DURATION_MS;
  const day2End = new Date(DAY2_END_AT).getTime();

  const activeLetter =
    now >= day1Start && now < day1End ? LETTER_CONFIG.day1
    : now >= day1End && now < day2End ? LETTER_CONFIG.day2
    : null;

  const devPreview = import.meta.env.DEV && checklistDismissed;
  if ((!activeLetter && !devPreview) || dismissed) return null;

  // dev에서 창 밖이면 현재 시각상 가장 가까운 편지로 폴백
  const letter = activeLetter ?? (now < day1End ? LETTER_CONFIG.day1 : LETTER_CONFIG.day2);

  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b ${letter.bgClass}`}>
      <LetterContent config={letter} onClose={() => setLeaving(true)} leaving={leaving} />
    </div>
  );
}
