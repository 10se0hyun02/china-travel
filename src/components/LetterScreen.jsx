import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';

const LETTER_DURATION_MS = 4 * 60 * 60 * 1000; // 편지 노출 시간 - letterAt부터 4시간
const FADE_OUT_MS = 600; // letter-content-out 애니메이션 길이와 맞춤

const LETTER_LINES = [
  'TO 사랑하는 강아지'
  , '자기야 안녕~'
  , '우리가 오래 기다리고 기대했던 상해여행이 아쉽게도 마지막날이 되었네 흐앙'
  , '엄청 추운 겨울에 비행기를 예매하며, 여름 휴가를 계획할때만해도 올해 7월은 까마득했는데 어느샌가 더운 여름이왔다니 시간이 믿기지가 않는다'
  , '내가 매번 시간이 너무 빠른거같아! 하면, 그저 우리가 같이하는 시간이 길어지는거라 좋은거라던 자기 말이 이제 나에게도 와닿으며 나도 정말 그렇게 생각하게됐어'
  , '이번 상해여행은 앞으로 우리가 약속한 무수히 많은 미래들 중에 하루를 의미있게 보낸거라고 생각하며, 아쉽지만 이 시간은 너무너무 행복했던 추억으로 남기고 앞으로 더 행복한 미래를 꿈꾸는 것으로 우리 여행은 마무리해보려고해'
  , '나흘동안 매 순간 함께해서 말못하게 행복했고, 매일을 함께했지만 더욱 특별한 날들을 선물받은것 같아서 감사했어'
  , '매번 말하지만, 새삼스레 더 느껴지는건 자기를 만나 나는 정말 매순간 행복해'
  , '사랑해 자기야, 앞으로도 사랑해'
  , 'FROM 강아지의 멜랑공주'
];

const LINE_EMOJI = { 0: '🐶', 8: '❤️', 9: '👑' };

/**
 * travelData.meta.letterAt이 지나는 순간부터 4시간 동안만 뜨는 깜짝 편지 화면.
 * 그 전엔 안 뜨고, 4시간이 지나면 자동으로 사라져 평소 앱으로 돌아간다.
 * 봉투를 눌러야 편지가 열리고, 닫으면 이번 화면을 보는 동안만 닫힘 - 앱을 새로 열면(새로고침해도)
 * 1시간 안이라면 다시 봉투 화면부터 뜬다(닫힘 상태를 저장하지 않음, 세션 한정 state).
 */
export default function LetterScreen({ checklistDismissed }) {
  const [now, setNow] = useState(Date.now());
  const [opened, setOpened] = useState(false);
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

  const start = new Date(travelData.meta.letterAt).getTime();
  const end = start + LETTER_DURATION_MS;
  const inWindow = now >= start && now < end;

  const devPreview = import.meta.env.DEV && checklistDismissed;
  if ((!inWindow && !devPreview) || dismissed) return null;

  const close = () => setLeaving(true);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-rose-100 via-rose-50 to-pink-100">
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
            <span className="text-6xl emoji-muted animate-letter-envelope">💌</span>
            <span className="text-sm font-bold text-rose-500 animate-intro-tap-hint">봉투를 눌러서 열어보기</span>
          </button>
        ) : (
          <div className="w-full -rotate-1 bg-[#fdf3f5] rounded-sm shadow-[0_10px_28px_rgba(200,100,140,0.2)] border border-rose-100/80 p-6 pb-7 animate-sheet-slide-up max-h-[80vh] overflow-y-auto">
            <div className="space-y-3">
              {LETTER_LINES.map((line, i) => {
                const isFirst = i === 0;
                const isLast = i === LETTER_LINES.length - 1;
                const isClosingLine = i === LETTER_LINES.length - 2;

                if (isFirst || isLast) {
                  const [prefix, ...rest] = line.split(' ');
                  return (
                    <p key={i} className={`text-sm font-bold text-gray-500 ${isLast ? 'text-right mt-1' : ''}`}>
                      <span className="text-rose-400">{prefix}</span> {rest.join(' ')}
                      {LINE_EMOJI[i] && <span className="emoji-muted"> {LINE_EMOJI[i]}</span>}
                    </p>
                  );
                }

                return (
                  <p
                    key={i}
                    className={
                      isClosingLine
                        ? 'text-sm font-bold text-rose-500 mt-2'
                        : 'text-sm text-gray-700 leading-relaxed'
                    }
                  >
                    {line}
                    {LINE_EMOJI[i] && <span className="emoji-muted"> {LINE_EMOJI[i]}</span>}
                  </p>
                );
              })}
            </div>
            <button
              type="button"
              onClick={close}
              className="mt-6 mx-auto block px-5 py-1.5 rounded-full bg-rose-100 text-rose-500 text-xs font-bold active:scale-95 transition-transform"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
