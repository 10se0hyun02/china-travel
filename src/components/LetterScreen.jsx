import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';

const LETTER_DURATION_MS = 60 * 60 * 1000; // 편지 노출 시간 - 출발 시각부터 1시간
const FADE_OUT_MS = 500; // 인트로 화면과 동일한 페이드아웃 길이

const LETTER_LINES = [
  'TO 사랑하는 강아지'
  , '안녕 깡아지! 굿모닝'
  , '우리의 첫번째 해외여행, 상해여행을 떠나기 전 자기를 위한 작은 선물을 준비했어.'
  , '뭐가 있을지 궁금해줬으면 좋겠고, 내 선물이 우리의 3박 4일 동안 자기를 더 더 많이 행복하게 만들어주길 바라는 마음으로!'
  , '언제나 나랑 같이 있는 시간을 행복해해주는 자기 덕분에, 자기와 함께하는 모든 일들을 나 또한 기다리게돼.'
  , '우리 그동안 진짜 너무 수고 많았어! 이번 여행에서만큼은 다 내려놓고 신나게 놀고, 푹 쉬면서 앞으로 잘 살아갈 힘을 잔뜩 얻어가자.'
  , '매일 매순간 서로를 사랑하는 시간으로 꽉 채우자! 맛있는거 많이많이 먹고, 같이 땀도 뻘뻘 흘리고, 사진도 영상도 많이많이 찍자.'
  , '언제나 내편인 똑똑이 강아지 내가 정말정말 대빵 사랑해!'
  , 'PS. 나 상해 여름 날씨 너무 무서워. 불쾌지수와 우리가 같은편이 돼서 온 몸으로 싸우고 우리는 사이좋게 다녀오자.'
  , 'FROM 강아지의 멜랑공주'
];

// 특정 줄 끝에 붙는 이모지 - 파스텔 톤과 어울리도록 항상 emoji-muted로 렌더링
const LINE_EMOJI = { 0: '🐶', 7: '❤️', 9: '👑' };

/**
 * 출발 시각(travelData.meta.departureAt)이 지나는 순간부터 1시간 동안만 뜨는 깜짝 편지 화면.
 * 그 전엔 안 뜨고(출발 전 체크리스트가 대신 보임), 1시간이 지나면 자동으로 사라져 평소 앱으로 돌아간다.
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

  const start = new Date(travelData.meta.departureAt).getTime();
  const end = start + LETTER_DURATION_MS;
  const inWindow = now >= start && now < end;

  // dev 서버에서는 실제 시각과 무관하게 미리보기 가능하지만, 체크리스트를 넘긴 뒤에만 (프로덕션 빌드에선 이 분기가 제거됨)
  const devPreview = import.meta.env.DEV && checklistDismissed;
  if ((!inWindow && !devPreview) || dismissed) return null;

  const close = () => setLeaving(true);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-rose-100 via-rose-50 to-pink-100 ${
        leaving ? 'animate-intro-fade-out' : 'animate-backdrop-fade'
      }`}
    >
      <div className="w-full max-w-md h-full mx-auto flex flex-col items-center justify-center px-8">
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
                const isPs = i === LETTER_LINES.length - 2;

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
                  <p key={i} className={isPs ? 'text-xs text-gray-400 italic mt-2' : 'text-sm text-gray-700 leading-relaxed'}>
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
