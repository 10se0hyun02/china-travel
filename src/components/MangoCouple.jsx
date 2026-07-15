import { useEffect, useRef, useState } from 'react';
import { travelData } from '../data/travelData.js';

/**
 * 홈 탭 최상단 히어로 — 망고젤리 커플(망고멜랑 & 멜랑망고) 키우기.
 * 젤리를 탭해 돌볼 아이를 고르고, 사랑/선풍기/샤오롱바오 버튼으로 애정도를 올린다.
 * 애정도는 캐릭터별로 따로 쌓여서 여행 끝에 누가 더 사랑받았는지 비교 가능.
 * 외부 이미지/폰트 없이 인라인 SVG + CSS keyframes로만 구현 (Zero-Data).
 * 진행도는 localStorage에 저장되어 오프라인에서도 유지.
 */
export function MangoJelly({ id, tone, side, mood = 'normal', variant }) {
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
      {/* 볼터치 — 기분 좋을 땐 더 발그레 */}
      <circle cx="30" cy="60" r="5" fill="#d9a8a0" opacity={mood === 'normal' ? 0.5 : 0.8} />
      <circle cx="70" cy="60" r="5" fill="#d9a8a0" opacity={mood === 'normal' ? 0.5 : 0.8} />
      {/* 눈 — 기분 좋을 땐 웃는 눈(^^) */}
      {mood === 'normal' ? (
        <>
          <circle cx="38" cy="52" r="3.5" fill="#5b3a1e" />
          <circle cx="62" cy="52" r="3.5" fill="#5b3a1e" />
        </>
      ) : (
        <>
          <path d="M33 54 Q38 48 43 54" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M57 54 Q62 48 67 54" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* 입 — 간식 먹을 땐 아~ 벌린 입 */}
      {mood === 'yum' ? (
        <ellipse cx="50" cy="67" rx="6" ry="5" fill="#5b3a1e" />
      ) : (
        <path d="M40 64 Q50 73 60 64" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {/* 남자친구 포인트 — 듬직한 눈썹 */}
      {variant === 'boy' && (
        <>
          <path d="M34 45 Q38 43 42 45" stroke="#5b3a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M58 45 Q62 43 66 45" stroke="#5b3a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* 여자친구 포인트 — 속눈썹(눈마다 한 줄) + 머리 리본 */}
      {variant === 'girl' && (
        <>
          <path d="M34.5 51 L30.5 50.5" stroke="#5b3a1e" strokeWidth="2" strokeLinecap="round" />
          <path d="M65.5 51 L69.5 50.5" stroke="#5b3a1e" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="65" cy="31" rx="5" ry="3.5" fill="#c9808f" transform="rotate(-20 65 31)" />
          <ellipse cx="75" cy="31" rx="5" ry="3.5" fill="#c9808f" transform="rotate(20 75 31)" />
          <circle cx="70" cy="31" r="2.2" fill="#b06a7c" />
        </>
      )}
    </svg>
  );
}

const STORAGE_KEY = 'mango-care-v4'; // v3 -> v4: 애정도 리셋 목적으로 키 버전만 올림 (이전 데이터는 자연히 무시됨)
const MAX_LEVEL = 8;
const PRESSES_PER_LEVEL = 100; // 캐릭터별 100회마다 레벨 +1, 각자 800회에 만렙
const MAX_COUNT = MAX_LEVEL * PRESSES_PER_LEVEL;

const LEVEL_TITLES = [
  '몽글몽글 ☁️',
  '두근두근 💓',
  '심쿵심쿵 💘',
  '애정 뿜뿜 💕',
  '꿀 뚝뚝 🍯',
  '하트 과부하 ⚡',
  '사랑이 우주만큼 🌌',
  '사랑 그 자체 👑',
];

// 캐릭터 정보 — mango: 망고멜랑(왼쪽), melang: 멜랑망고(오른쪽)
const CHARACTERS = {
  mango: {
    name: '망고멜랑',
    side: 'left',
    color: 'text-amber-600',
    bar: 'from-amber-300 to-amber-500',
    bounce: 'animate-mango-bounce-left',
    center: 27, // 이펙트/말풍선 기준 가로 위치(%)
    variant: 'boy',
    tone: { from: '#e8c98a', to: '#c9955a' },
  },
  melang: {
    name: '멜랑망고',
    side: 'right',
    color: 'text-rose-500',
    bar: 'from-rose-300 to-rose-400',
    bounce: 'animate-mango-bounce-right',
    center: 69,
    variant: 'girl',
    tone: { from: '#ddb8c0', to: '#c491a0' },
  },
};

const ACTIONS = [
  { type: 'love', label: '사랑주기', emoji: '💖' },
  { type: 'coffee', label: '커피주기', emoji: '☕' },
  { type: 'snack', label: '만두주기', emoji: '🥟' },
  { type: 'fan', label: '선풍기주기', emoji: '🌀' },
];

// 캐릭터별 전용 대사 — 자유롭게 수정/추가하세요! (배열에서 랜덤으로 하나씩 나옴)
const LINES = {
  mango: {
    love: ['라뷰 💕','라뷰 공주', '사랑해', '알라뷰', '뽀뽀해줘 💋','낑', '꽁','깡','낑꽁깡','공주 사랑해','내가 더 사랑하는데~?','심장 발싸','공주밖에 없어','평생 붙어있을거야','뀽','뀨','끼잉','공주 없인 못살아','안아줘도돼?','뽀뽀 한번 더','공주 얼굴 보니까 좋다','계속 옆에 있고싶어','손 놓기 싫어','공주가 세상에서 제일 예뻐','매일 더 좋아져','공주 웃는거 완전 좋아','심쿵사할뻔'],
    coffee: ['와 시원해 ☕', '맛있따', '근데 공주 나 배아포', '커피 먹으니까 약간 속이 이상해','맛있다 커피','수박주스 먹고싶다','델라 저랑 스타벅스 가실래요?','공주가 사주는 커피가 젤 맛있어','한모금만 더 줘','아아 최고얌','커피 마시고 힘내서 걸을게!','카페인보다 공주가 더 좋아','오늘 커피 진짜 맛있다','공주 취향 저격 커피네','한잔 더 마셔도돼?','커피 사줘서 고마워 진짜','이거 다 마시고 손잡자','공주랑 마시는 커피가 제일 맛있어','든든하다 이제 걸을수있어'],
    fan: ['으앙 시원해🍃', '나 땀으루 쫄딱 다젖었어', '땀나', '개더웡 💦','손풍기 사주는여자 처음이야','바람 나만 쐬도돼~?','시원행 헤헤','공주도 시원해야대','잎사귀 날아가겟어','이 바람 진짜 천국이야','공주 최고의 발명품','더워죽는줄','시원한거 최고','땀 식는다 진짜','공주가 살려줬어','더위 싹 가셨어','부채질도 해줄까?'],
    snack: ['와 이거 진짜맛있다 🥟', '나 다먹을 수 있어!', '다먹는거 쉽지', '다 먹어도돼?','나 만두 진짜 50개 먹을 수 있어','만두는 비비고가 짱이다진짜','공주도 한입 아~','배 터질때까지 먹을래','육즙 팡','진짜 맛있따','나 배 80%찼어', '진짜 배불러 진짜야','이 만두 진짜 인생만두야','한입 더 먹어도돼?','배터지기 직전이야','존맛탱','만두 왕이 됐어','다음 여행도 만두먹으러 오자','진짜 이집 만두 미쳤다','공주도 얼른 먹어봐'],
    tap: ['앙!','앙!','앙!','낑!','낑!','껌딱지처럼 붙어도돼~?', '이렇게 해도돼~?', '손 잡아도돼~?', '끼잉','야호','헤헤 얼굴만져줘','공주야 얼굴만져줘','더 만져줘','나 착하지~?','공주 옆이 젤 좋아','헤헤 좋아','볼 비벼도돼~?','안아줘도돼~?','한번만 더 만져줘','헤헤 좋아 죽겠어','공주 손길 최고','더 쓰다듬어줘','간지러운데 좋아','나 지금 완전 행복해','공주 손이 약손이야','이래도 되나 싶을만큼 좋아','꼭 안아줘'],
    levelup: ['레벨 업!🎉', '사랑 진화 💞','공주 사랑 먹고 레벨업!','나 사랑 만렙 갈거야','결혼하장','사랑 레벨 만렙 가자!','공주 덕분에 매일 레벨업','오늘도 사랑 충전 완료','우리 사랑 끝없이 자라는중'],
  },
  melang: {
    love: ['나두 사랑해!!','나두 사랑해','라뷰 강아지🐶', '라뷰','냐옹!','우리 낑강아지 사랑해','겸아 라뷰','나도 사랑해', '낑', '꽁','깡','낑꽁깡','강아지 사랑해','우리강아지 최고','최고미남 김민겸','김민겸 사랑해','사랑해 민겸아','강아지 최고 사랑해','똑똑이 강아지 사랑해','우리 똑똑잉 사랑해','겸아 라뷰','내 강아지 평생 해','뀨','김민겸이 최고','평생 사랑해','우리강아지 짱','강아지 사랑해','라뷰 라뷰','겸아 라뷰','김메이슨 사랑햇','알랴뷰','사랑해','사랑해 진~짜 많이','강아지 없인 못살아','나도 안아줘','뽀뽀 한번 더 해줘','강아지 얼굴 보면 힐링됨','계속 붙어있고싶어','강아지가 세상에서 제일 잘생겼어','매일 더 좋아지는중','강아지 웃는거 개좋아','심쿵사 직전','평생 옆에 있어줘'],
    coffee: ['츄릅','오예 커피☕', '물적게 얼음많이☕','낑꽁깡','커피 고마웡', '짱!', '라뷰 커피', '물적게 얼음 많이! 땡큐', '야호', '강아지는 커피먹으면 안대','커피는 역시 강아지가 사주는거','카페인 충전 완료','아아가 최고야','한모금 남겨준거야? 감동','아 살거같다','메이슨도 커피마셔요?','메이슨 커피 감사해요','메이슨 이따 커피 한잔 하실래요?','오늘 커피 완전 내 취향','한잔 더 사줘도돼?','강아지가 사준 커피는 다 맛있어','카페인 충전 완료 고마워','든든하다 힘내서 걷자','다음에도 이 카페 오자','강아지랑 마시는 커피가 제일 맛있어'],
    fan: ['살거같다 🍃','낑','낑꽁깡','윙윙', '강아지두 덥지?','와 시원','와 시원해' , '으앙 개더워', '한번 더 (짝)', '멜팅 멜랑💦','상해 진짜 개덥따','시원행 고마웡','나 날아가겠엉','강아지 짱','나 이거 평생 해줘 사랑해','나 머리 말려줭','메이슨 여기 자리 시원해요','메이슨도 좀 쐬실래요?','이 바람 천국이다','강아지 최고의 발명품','더위 싹 가셨어','시원한거 최고','땀 다 식었어','강아지가 살려줬어','부채질도 해줘','더워죽는줄 알았어'],
    snack: ['냠냠! 🥟','냠냠냐냐ㅑ냠', '개마싯다', '얌얌','짭짭슨','짭짭슨 메이슨','마싯따','2차?','다음엔 뭐먹을까?','강아지는 지금 배 얼마나 찼어?','다음엔 뭐먹을래?', '2차 고?','하나 더 줘','강아지 고마워','강아지는 배 얼마나불러?','강아지가 주는 만두 짱','하이디라오 먹으러갈래?','앙~ 하나만 더','배불렁','겸이가 주는 만두가 세상에서 제일 최고','만두볼 됐다 나','메이슨도 이거 드셔보실래요?','메이슨 이 집 만두 잘하네요','메이슨 점심 뭐 드셨어요?','이 만두 인생만두야','한입 더 줘봐','배불러 죽겠어','존맛','만두 여왕 등극','다음 여행도 만두 먹으러 오자','이집 만두 미쳤다','강아지도 얼른 먹어봐'],
    tap: ['앙!','앙!','앙!','헷','헤헤','히히','힛','간지렁', '그만 만졋', '어맛?','어마맛','만지지맛', '알라뷰우','알라뷰','간지럿','꺄','꺄아','앙대 간지럽다구','한번만 더 만지면 문다','히히 좋아','뀨우','우리 강아지 왜케 이쁘지~?','우리 강아지 왜케 잘생겼지?','한번만 더 만져줘','헤헤 좋아','강아지 손길 최고','더 쓰다듬어줘','간지러운데 좋아','나 완전 행복해','강아지 손이 약손이야','이래도 되나 싶을만큼 좋아','꼭 안아줘','냥냥펀치'],
    levelup: ['강아지 사랑으로 나 레벨업 🎉', '세상에서 제일 사랑해 💞','겸이 사랑 먹고 레벨업','더 사랑해줘 강아지 💗','공주 레벨업!','결혼할래?','사랑 레벨 만렙 가자!','강아지 덕분에 매일 레벨업','오늘도 사랑 충전 완료','우리 사랑 끝없이 자라는중'],
  },
};

// 반응별 이펙트 이모지 모양 — dx는 대상 캐릭터 중심에서의 가로 오프셋(%)
const EFFECT_SHAPES = {
  love: [
    { emoji: '💖', dx: -14, top: '36%', delay: 0 },
    { emoji: '💕', dx: 0, top: '28%', delay: 0.15 },
    { emoji: '❤️', dx: 13, top: '36%', delay: 0.3 },
    { emoji: '💗', dx: -7, top: '24%', delay: 0.45 },
    { emoji: '💘', dx: 7, top: '44%', delay: 0.6 },
  ],
  fan: [
    { emoji: '🍃', dx: -12, top: '40%', delay: 0, wind: true },
    { emoji: '💨', dx: 0, top: '52%', delay: 0.2, wind: true },
    { emoji: '🍃', dx: 10, top: '34%', delay: 0.4, wind: true },
    { emoji: '💨', dx: -6, top: '26%', delay: 0.55, wind: true },
    { emoji: '🍃', dx: 5, top: '46%', delay: 0.7, wind: true },
  ],
  coffee: [
    { emoji: '☕', dx: -5, top: '34%', delay: 0 },
    { emoji: '✨', dx: 9, top: '26%', delay: 0.25 },
    { emoji: '🧋', dx: -12, top: '26%', delay: 0.4 },
    { emoji: '🤍', dx: 4, top: '42%', delay: 0.55 },
  ],
  snack: [
    { emoji: '🥟', dx: -5, top: '34%', delay: 0 },
    { emoji: '✨', dx: 9, top: '26%', delay: 0.25 },
    { emoji: '🥟', dx: -13, top: '26%', delay: 0.4 },
    { emoji: '😋', dx: 3, top: '44%', delay: 0.55 },
  ],
  tap: [
    { emoji: '❤️', dx: 0, top: '30%', delay: 0 },
    { emoji: '💗', dx: -8, top: '38%', delay: 0.2 },
    { emoji: '✨', dx: 8, top: '26%', delay: 0.35 },
  ],
  levelup: [
    { emoji: '🎉', dx: -16, top: '38%', delay: 0 },
    { emoji: '✨', dx: -6, top: '26%', delay: 0.15 },
    { emoji: '💖', dx: 6, top: '36%', delay: 0.3 },
    { emoji: '🎊', dx: 16, top: '26%', delay: 0.45 },
    { emoji: '⭐', dx: -11, top: '48%', delay: 0.6 },
    { emoji: '💝', dx: 11, top: '46%', delay: 0.75 },
    { emoji: '✨', dx: 0, top: '20%', delay: 0.9 },
  ],
};

function loadState() {
  const clamp = (n) => Math.max(0, Math.min(n, MAX_COUNT));
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isFinite(saved.mango) && Number.isFinite(saved.melang)) {
      return {
        mango: clamp(saved.mango),
        melang: clamp(saved.melang),
        sel: saved.sel === 'melang' ? 'melang' : 'mango',
      };
    }
  } catch { /* 손상된 저장값은 초기화 */ }
  // 구버전(v2: 합산 카운트) 저장값은 반씩 나눠서 이어받기
  try {
    const v2 = JSON.parse(localStorage.getItem('mango-care-v2'));
    if (v2 && Number.isFinite(v2.count)) {
      const half = clamp(Math.floor(v2.count / 2));
      return { mango: half, melang: half, sel: 'mango' };
    }
  } catch { /* 무시 */ }
  return { mango: 0, melang: 0, sel: 'mango' };
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const levelOf = (n) => Math.min(Math.floor(n / PRESSES_PER_LEVEL) + 1, MAX_LEVEL);

export default function MangoCouple() {
  const [state, setState] = useState(loadState);
  const [effect, setEffect] = useState(null); // { shape, target, key }
  const [bubble, setBubble] = useState(null); // { text, target, key }
  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const react = (shape, lineKey, target) => {
    const newCount = Math.min(state[target] + 1, MAX_COUNT);
    const leveledUp = newCount > state[target] && newCount % PRESSES_PER_LEVEL === 0;
    setState((prev) => ({ ...prev, [target]: newCount, sel: target }));

    const key = Date.now();
    const lines = LINES[target];
    setEffect({ shape: leveledUp ? 'levelup' : shape, target, key });
    setBubble({ text: pick(leveledUp ? lines.levelup : lines[lineKey]), target, key });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setEffect(null);
      setBubble(null);
    }, 2200);
  };

  // 반응 중인 캐릭터만 표정 변화: 간식은 아~, 나머지는 웃는 눈
  const moodOf = (k) =>
    !effect || effect.target !== k
      ? 'normal'
      : effect.shape === 'snack' || effect.shape === 'coffee'
        ? 'yum'
        : 'happy';

  const renderJelly = (k) => {
    const c = CHARACTERS[k];
    const isSelected = state.sel === k;
    const isFanning = effect?.shape === 'fan' && effect.target === k;
    return (
      <div className={isFanning ? 'animate-care-wiggle' : ''}>
        <button
          type="button"
          onClick={() => react('tap', 'tap', k)}
          className={`flex flex-col items-center ${c.bounce} active:scale-95 transition-all rounded-2xl px-2 pt-1 pb-0.5 ${
            isSelected ? 'bg-white/50 ring-2 ring-white/90' : ''
          }`}
          aria-label={`${c.name} 쓰다듬기`}
        >
          <MangoJelly id={c.side} side={c.side} mood={moodOf(k)} tone={c.tone} variant={c.variant} />
          <span className={`mt-1 text-xs font-bold ${c.color}`}>{c.name}</span>
        </button>
      </div>
    );
  };

  const { startDate, endDate } = travelData.meta;
  const period = `${startDate.replaceAll('-', '.')} — ${endDate.slice(5).replace('-', '.')}`;

  return (
    <div>
      <h1 className="text-center text-xl font-extrabold tracking-[0.3em] text-gray-600">
        SHANGHAI · TRAVEL
      </h1>
      <p className="mb-3 text-center text-xs font-semibold text-sky-500">{period}</p>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-100 via-rose-50 to-sky-50 shadow-sm px-4 pt-7 pb-5">
      <span className="absolute left-[16%] top-3 text-lg animate-mango-sparkle emoji-muted" style={{ animationDelay: '0s' }}>
        🧳
      </span>
      <span className="absolute right-[18%] top-5 text-base animate-mango-sparkle emoji-muted" style={{ animationDelay: '0.6s' }}>
        🎫
      </span>
      <span className="absolute left-[46%] top-0 text-sm animate-mango-sparkle emoji-muted" style={{ animationDelay: '1.2s' }}>
        ✈️
      </span>

      {/* 지금 누구를 돌보고 있는지 — 캐릭터 위 중앙에 표시 */}
      <p className="relative text-center text-xs font-bold text-rose-400 mb-3">
        <span className="emoji-muted">{state.sel === 'mango' ? '🐶' : '👑'}</span>{' '}
        {state.sel === 'mango' ? '강아지 돌보는중' : '공주 돌보는중'}
      </p>

      {/* 반응 이펙트 이모지 — 대상 캐릭터 쪽에 표시 */}
      {effect &&
        EFFECT_SHAPES[effect.shape]?.map((fx, i) => (
          <span
            key={`${effect.key}-${i}`}
            className={`absolute z-10 text-lg pointer-events-none ${fx.wind ? 'animate-care-wind' : 'animate-care-float'}`}
            style={{
              left: `${CHARACTERS[effect.target].center + fx.dx}%`,
              top: fx.top,
              animationDelay: `${fx.delay}s`,
            }}
          >
            {fx.emoji}
          </span>
        ))}

      {/* 말풍선 — 말하는 캐릭터 위에 표시 */}
      {bubble && (
        <p
          key={bubble.key}
          className="absolute -translate-x-1/2 top-2 z-20 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-gray-600 shadow-sm animate-care-bubble whitespace-nowrap"
          style={{ left: bubble.target === 'mango' ? '34%' : '66%' }}
        >
          {bubble.text}
        </p>
      )}

      <div className="relative flex items-end justify-center gap-5">
        {renderJelly('mango')}

        {/* 둘 사이에 떠 있는 하트 — 젤리와 같은 인라인 SVG 그림체 */}
        <svg
          viewBox="0 0 32 32"
          className="w-5 h-5 mb-10 shrink-0 animate-pulse z-10"
          style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.08))' }}
        >
          <defs>
            <linearGradient id="couple-heart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e3b3bd" />
              <stop offset="100%" stopColor="#c9808f" />
            </linearGradient>
          </defs>
          <path
            d="M16 28 C8 21 3 16 3 10.5 C3 6.4 6.4 3 10.5 3 C13 3 15 4.5 16 6.5 C17 4.5 19 3 21.5 3 C25.6 3 29 6.4 29 10.5 C29 16 24 21 16 28 Z"
            fill="url(#couple-heart-grad)"
          />
          {/* 하이라이트 */}
          <ellipse cx="10.5" cy="9" rx="3" ry="2" fill="#f2d7dc" opacity="0.7" transform="rotate(-25 10.5 9)" />
        </svg>

        {renderJelly('melang')}
      </div>

      {/* 캐릭터별 애정도 게이지 — 탭하면 돌볼 아이 선택 */}
      <div className="relative mt-4 grid grid-cols-2 gap-2">
        {['mango', 'melang'].map((k) => {
          const c = CHARACTERS[k];
          const n = state[k];
          const lv = levelOf(n);
          const maxed = n >= MAX_COUNT;
          const prog = maxed ? 100 : n % PRESSES_PER_LEVEL;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setState((prev) => ({ ...prev, sel: k }))}
              className={`rounded-xl px-2.5 py-1.5 text-left transition-colors ${
                state.sel === k ? 'bg-white/80 shadow-sm' : 'bg-white/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${c.color}`}>{c.name}</span>
                <span className="text-xs font-bold text-gray-500">
                  {maxed ? '👑 MAX' : `Lv.${lv}`}
                </span>
              </div>
              <div className="mt-1 h-2 bg-rose-100/60 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${c.bar} rounded-full transition-all duration-500`}
                  style={{ width: `${prog}%` }}
                />
              </div>
              <p className="mt-0.5 text-[11px] font-semibold text-gray-400">{LEVEL_TITLES[lv - 1]}</p>
            </button>
          );
        })}
      </div>

      {/* 돌보기 버튼 — 선택된 아이에게 적용 */}
      <div className="relative mt-4 grid grid-cols-4 gap-1.5">
        {ACTIONS.map((a) => (
          <button
            key={a.type}
            type="button"
            onClick={() => react(a.type, a.type, state.sel)}
            className="flex items-center justify-center gap-0.5 bg-white/80 rounded-full py-2.5 px-1 text-xs font-bold text-gray-600 shadow-sm active:scale-95 active:bg-rose-100 transition-all whitespace-nowrap"
          >
            <span className="text-sm emoji-muted shrink-0">{a.emoji}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
