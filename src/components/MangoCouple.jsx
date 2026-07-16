import { useCallback, useEffect, useRef, useState } from 'react';
import { travelData } from '../data/travelData.js';

/**
 * 홈 탭 최상단 히어로 — 망고젤리 커플(망고멜랑 & 멜랑망고) 키우기.
 * 레벨별 필요 클릭수가 달라지는 점진 곡선 시스템 (Lv.20 만렙).
 * 진행도는 localStorage에 저장 — STORAGE_KEY 버전 올리면 데이터 초기화됨, 절대 올리지 말 것.
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
      <ellipse cx="46" cy="16" rx="10" ry="5" fill="#a8bf9a" transform="rotate(-25 46 16)" />
      <ellipse cx="50" cy="62" rx="34" ry="40" fill={`url(#${gradId})`} />
      <circle cx="30" cy="60" r="5" fill="#d9a8a0" opacity={mood === 'happy' || mood === 'yum' ? 0.8 : 0.5} />
      <circle cx="70" cy="60" r="5" fill="#d9a8a0" opacity={mood === 'happy' || mood === 'yum' ? 0.8 : 0.5} />
      {mood === 'happy' || mood === 'yum' ? (
        <>
          <path d="M33 54 Q38 48 43 54" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M57 54 Q62 48 67 54" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : mood === 'sad' ? (
        <>
          <path d="M34 48 Q38 51 42 53" stroke="#5b3a1e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M66 48 Q62 51 58 53" stroke="#5b3a1e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="53" r="3" fill="#5b3a1e" />
          <circle cx="62" cy="53" r="3" fill="#5b3a1e" />
          <path d="M30 58 Q27 64 30 68 Q33 64 30 58 Z" fill="#8ecae6" opacity="0.85" />
        </>
      ) : (
        <>
          <circle cx="38" cy="52" r="3.5" fill="#5b3a1e" />
          <circle cx="62" cy="52" r="3.5" fill="#5b3a1e" />
        </>
      )}
      {mood === 'yum' ? (
        <ellipse cx="50" cy="67" rx="6" ry="5" fill="#5b3a1e" />
      ) : mood === 'sad' ? (
        <path d="M41 71 Q50 63 59 71" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M40 64 Q50 73 60 64" stroke="#5b3a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {variant === 'boy' && (
        <>
          <path d="M34 45 Q38 43 42 45" stroke="#5b3a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M58 45 Q62 43 66 45" stroke="#5b3a1e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}
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

const STORAGE_KEY = 'mango-care-v5';
const MAX_LEVEL = 20;

// Lv1→2, Lv2→3, ..., Lv19→20 순서 — 초반 쉽고 후반 갈수록 어렵게
const LEVEL_THRESHOLDS = import.meta.env.DEV
  ? Array(19).fill(1) // dev: 1번에 레벨업
  : [20, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370];
// CUMULATIVE[i] = 레벨 (i+1)에 도달하는 총 누적 클릭 수
const CUMULATIVE = LEVEL_THRESHOLDS.reduce((acc, t) => [...acc, acc[acc.length - 1] + t], [0]);
const MAX_COUNT = CUMULATIVE[CUMULATIVE.length - 1]; // 3620

const LEVEL_TITLES = [
  '몽글몽글 ☁️',
  '두근두근 💓',
  '심쿵심쿵 💘',
  '애정 뿜뿜 💕',
  '꿀 뚝뚝 🍯',
  '하트 과부하 ⚡',
  '사랑이 우주만큼 🌌',
  '사랑 그 자체 👑',
  '심장 폭발 💥',
  '온세상이 핑크 🌸',
  '자기야 자기야 🥰',
  '결혼각 재는중 💍',
  '완전 콩깍지 😍',
  '사랑 초신성 ✨',
  '우리 둘만의 우주 🪐',
  '사랑 무한충전 🔋',
  '헤어짐은 없어 🔗',
  '혼인신고 임박 💌',
  '사랑 만렙 직전 🏆',
  '망고커플 전설 💎',
];

const CHARACTERS = {
  mango: {
    name: '망고멜랑',
    side: 'left',
    color: 'text-amber-600',
    bar: 'from-amber-300 to-amber-500',
    bounce: 'animate-mango-bounce-left',
    center: 27,
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

// 망고멜랑: 자기야/공주/멜랑아/델라 호칭 사용
// 멜랑망고: 자기야/강아징/강아지/메이슨/겸아 호칭 사용
const LINES = {
  mango: {
    love: [
      '라뷰 공주 💕', '공주 사랑해 ❤️', '델라 사랑해 🥰', '멜랑아 라뷰 💘', '자기야 사랑해 💝',
      '알라뷰 공주님 ✨', '뽀뽀해줘 💋', '낑', '꽁', '깡', '낑꽁깡 💕',
      '공주밖에 없어 🌸', '평생 붙어있을거야', '뀽~', '뀨', '끼잉~',
      '공주 없인 못살아 😭', '안아줘도 돼? 🤗', '뽀뽀 한번 더 💋',
      '공주 얼굴 보니까 좋다 😊', '계속 옆에 있고싶어', '손 놓기 싫어 🤝',
      '공주가 세상에서 제일 예뻐 👑', '매일 더 좋아져 💗', '심쿵사할뻔 💥',
      '멜랑아 뭐 해? 보고싶어 😍', '델라 라뷰 💖', '공주 웃는거 완전 좋아 🌟',
      '오늘도 사랑해 자기야', '진짜 많이 사랑해 💞', '공주 최고야',
      '헤헤 공주 귀여워 🥹', '낑낑 사랑해', '공주 보고싶어 벌써 😢',
      '자기야 라뷰라뷰 💕', '공주 없으면 지구가 안 돌아가 🌍',
      '멜랑아 사랑해 자꾸 말하고 싶어', '델라 내 사람이야 💍',
      '낑~ 좋아', '공주야 나만 봐줘', '자기야 눈 못 떼겠어',
      '공주 손 잡아도 돼? 🤝', '멜랑아 심장 또 쿵했어',
      '델라 없으면 여행이 여행이 아니야', '공주 이름 부르는 거 좋아',
    ],
    coffee: [
      '와 시원해 ☕', '맛있따 😋', '근데 공주 나 배아포', '커피 먹으니까 약간 속이 이상해 🙃',
      '수박주스 먹고싶다 🍉', '자기야 스타벅스 갈래? ☕', '공주가 사주는 커피가 젤 맛있어 💕',
      '한모금만 더 줘', '아아 최고얌 🧊', '커피 마시고 힘내서 걸을게!',
      '카페인보다 공주가 더 좋아 ❤️', '오늘 커피 진짜 맛있다', '한잔 더 마셔도 돼?',
      '멜랑아 커피 고마워 ☕', '이거 다 마시고 손잡자 🤝', '델라가 사주는 게 젤 맛있어',
      '공주 취향 저격이야 ✨', '사르르 녹는다 ☕', '으음 최고~', '커피향이 행복이야',
      '자기야 한 모금 더 줘봐', '멜랑아 커피 짱이야 💘', '목 넘어가는 소리 꿀꺽',
      '아이스 커피 최고야 🧊', '공주랑 마시는 커피가 제일 맛있어 💕',
      '공주야 나 이 카페 또 오고싶어', '델라 손으로 줘봐 더 맛있을 것 같아',
      '음료 다 마시고 뽀뽀해줘 💋', '멜랑아 나 카페인 과다섭취중이야',
    ],
    fan: [
      '으앙 시원해 🍃', '나 땀으루 쫄딱 다젖었어 💦', '땀나', '개더웡 💦',
      '공주 손풍기 사주는 여자 처음이야', '바람 나만 쐬도 돼~? 😊', '시원행 헤헤',
      '공주도 시원해야 대', '잎사귀 날아가겠어 🍃', '이 바람 진짜 천국이야',
      '자기야 최고의 발명품 💕', '더워죽는줄 알았어 😅', '땀 식는다 진짜',
      '멜랑아 살려줬어 🥰', '더위 싹 가셨어', '공주야 부채질도 해줄까?',
      '델라 감사해요 🌀', '시원해서 기분 좋아 😊', '헤헤 공주 최고',
      '이 바람에 날아갈 것 같아 🍃', '자기야 고마워 진짜로', '으으으 시원 짱',
      '멜랑아 바람 한 번만 더', '더워도 공주 옆에 있으면 좋아 ❤️',
      '공주야 바람 더 세게 💨', '땀 흘려도 공주 옆에 있을래',
      '자기야 나 좀 더 시원하게 해줘', '델라 덕분에 살았어',
    ],
    snack: [
      '와 이거 진짜 맛있다 🥟', '나 다 먹을 수 있어!', '다 먹는거 쉽지',
      '나 만두 진짜 50개 먹을 수 있어', '공주도 한입 아~ 😋', '배 터질 때까지 먹을래',
      '육즙 팡 💥', '진짜 맛있따', '나 배 80% 찼어', '이 만두 진짜 인생만두야',
      '한입 더 먹어도 돼?', '배터지기 직전이야', '존맛탱 🥟',
      '멜랑아 이거 먹어봐 진짜 맛있어', '자기야 맛있다 진짜야',
      '공주랑 먹어서 더 맛있어 💕', '냠냠냠 행복해', '아~ 한입만 더',
      '델라 이 집 만두 또 오자', '꾸욱~ 배불러', '다음 여행도 만두 먹으러 오자',
      '진짜 이집 만두 미쳤다 🤩', '공주도 얼른 먹어봐', '오물오물 맛있어',
      '자기야 한 입만 더 줘봐', '멜랑아 같이 먹어', '공주야 맛있지?',
      '델라 만두 하나 더 시킬까?', '배 터져도 후회 없어',
    ],
    tap: [
      '앙!', '앙!', '앙!', '낑!', '낑!', '껌딱지처럼 붙어도 돼~?', '이렇게 해도 돼~?',
      '손 잡아도 돼~? 🤝', '끼잉', '야호', '헤헤 얼굴 만져줘',
      '공주야 얼굴 만져줘', '더 만져줘', '나 착하지~?', '공주 옆이 젤 좋아 💕',
      '헤헤 좋아', '볼 비벼도 돼~?', '안아줘도 돼~?', '한번만 더 만져줘',
      '헤헤 좋아 죽겠어', '공주 손길 최고 ✨', '더 쓰다듬어줘',
      '간지러운데 좋아', '나 지금 완전 행복해 🥰', '공주 손이 약손이야',
      '멜랑아 또 만져줘', '뀨잉~', '히히 공주 최고', '낑강아지처럼 쫓아다닐래',
      '델라 나 좋아해? 😊', '자기야 더 해줘', '꺄 좋아~',
      '낑낑~', '공주야 왜 이렇게 귀여워', '손 잡아줘 자기야',
      '공주 손길에 심쿵', '멜랑아 내 볼 또 만져줘',
    ],
    levelup: [
      '레벨 업!🎉', '사랑 진화 💞', '공주 사랑 먹고 레벨업!', '나 사랑 만렙 갈거야',
      '결혼하장', '사랑 레벨 만렙 가자!', '공주 덕분에 매일 레벨업',
      '오늘도 사랑 충전 완료', '우리 사랑 끝없이 자라는중',
    ],
  },
  melang: {
    love: [
      '나두 사랑해!! 💕', '나두 사랑해', '라뷰 강아지 🐶', '라뷰', '냐옹!',
      '우리 낑강아지 사랑해 🐾', '겸아 라뷰 💘', '나도 사랑해', '낑', '꽁', '깡', '낑꽁깡 💕',
      '강아지 사랑해 ❤️', '우리강아지 최고', '최고미남 김민겸 😍', '김민겸 사랑해',
      '사랑해 민겸아', '강아징 사랑해 🐾', '자기야 나도 사랑해 💝',
      '메이슨 라뷰 💖', '강아지 없인 못살아 😭', '나도 안아줘 🤗', '뽀뽀 한번 더 해줘 💋',
      '강아지 얼굴 보면 힐링됨 🌸', '계속 붙어있고싶어', '강아지가 세상에서 제일 잘생겼어 👑',
      '매일 더 좋아지는중 💗', '강아지 웃는거 개좋아 🌟', '심쿵사 직전 💥',
      '평생 옆에 있어줘', '자기야 사랑해 진짜로', '겸아 내 사람이야 💍',
      '강아징 뀨잉 좋아', '메이슨 라뷰라뷰 💕', '강아지 없으면 우주가 텅 비어 🌌',
      '자기야 오늘도 사랑해', '진짜 많이 사랑해 강아지 💞',
      '겸아 이름 부르는 거 좋아', '강아징 심장 쿵하게 하지 마',
      '메이슨 눈에서 하트 나와 😍', '강아지야 나만 봐줘', '자기야 손 꼭 잡고싶어',
    ],
    coffee: [
      '츄릅 ☕', '오예 커피!', '물적게 얼음많이 🧊', '낑꽁깡',
      '커피 고마웡 💕', '짱!', '라뷰 커피', '야호', '강아지는 커피 먹으면 안 돼 🐶',
      '아아가 최고야 🧊', '한모금 남겨준거야? 감동 😭', '아 살거같다',
      '메이슨도 커피 마셔요? ☕', '겸아 커피 고마워', '강아지가 사준 커피 젤 맛있어 💕',
      '카페인 충전 완료 ⚡', '한잔 더 사줘도 돼? 😊', '오늘 커피 완전 내 취향',
      '강아징 감사 💖', '자기야 커피 사줘서 고마워', '으음~ 맛있어 ☕',
      '이 맛에 커피 마시지', '꿀꺽꿀꺽 맛있다', '강아지랑 마시는 커피가 제일 맛있어',
      '겸아 이 카페 또 오자', '메이슨 커피 한 모금만 줘봐',
      '강아징 음료 마시는 거 귀여워', '자기야 빨대 같이 빨래?',
    ],
    fan: [
      '살거같다 🍃', '낑', '낑꽁깡', '윙윙', '강아지도 덥지? 💦',
      '와 시원해 🌀', '으앙 개더워', '한번 더 (짝)', '멜팅 멜랑 💦',
      '상해 진짜 개덥따', '시원행 고마웡 💕', '나 날아가겠어 🍃',
      '강아지 짱', '이거 평생 해줘 사랑해 💕', '나 머리 말려줘 헤헤',
      '메이슨 여기 자리 시원해요', '겸아 고마워 진짜 🥰', '이 바람 천국이다 ✨',
      '강아지 최고의 발명품', '더위 싹 가셨어', '시원한거 최고',
      '땀 다 식었어', '강아지가 살려줬어 😍', '부채질도 해줘 제발',
      '바람아 고마워 🍃', '자기야 쪼아 시원해서',
      '강아징 나만 바람 쐬게 해줘', '겸아 나 더 시원하게 해줘',
      '메이슨 옆에 있으면 시원해짐 왜지', '강아지 곁이 젤 시원해',
    ],
    snack: [
      '냠냠! 🥟', '냠냠냐냐냠', '개마싯다', '얌얌', '짭짭슨', '짭짭슨 메이슨',
      '마싯따', '2차?', '다음엔 뭐 먹을까?', '강아지는 지금 배 얼마나 찼어?',
      '하나 더 줘', '강아지 고마워 💕', '강아지가 주는 만두 짱',
      '하이디라오 먹으러갈래? 🔥', '앙~ 하나만 더', '배불렁',
      '겸이가 주는 만두가 세상에서 제일 최고', '만두볼 됐다 나 🥟',
      '메이슨 이 집 만두 잘하네요', '메이슨 이거 드셔보실래요?',
      '이 만두 인생만두야 ✨', '한입 더 줘봐', '배불러 죽겠어 😂',
      '존맛 🥟', '만두 여왕 등극 👑', '다음 여행도 만두 먹으러 오자',
      '이집 만두 미쳤다 🤩', '강아지도 얼른 먹어봐', '오물오물 행복해',
      '자기야 맛있다 진짜야', '꾸욱~ 배불러',
      '겸아 한 접시 더 시킬까?', '강아징 같이 더 먹어',
    ],
    tap: [
      '앙!', '앙!', '앙!', '헷', '헤헤', '히히', '힛', '간지렁 😆',
      '그만 만졌', '어맛?', '어마맛', '만지지맛', '알라뷰우', '알라뷰',
      '간지럿', '꺄', '꺄아', '앙대 간지럽다구', '한번만 더 만지면 문다 😤',
      '히히 좋아', '뀨우', '우리 강아지 왜케 이쁘지~?', '강아지 왜케 잘생겼지?',
      '강아징 손길 최고 ✨', '더 쓰다듬어줘', '간지러운데 좋아 🙈',
      '나 완전 행복해 🥰', '강아지 손이 약손이야', '꼭 안아줘',
      '냥냥펀치 🐾', '겸아 또 해줘', '히힛 좋아', '꺄르르',
      '메이슨 자꾸 만지지 마세요 (만져줘) 😆', '강아징 옆이 젤 좋아',
      '자기야 손 꼭 잡아줘', '겸아 볼 비벼도 돼?',
    ],
    levelup: [
      '강아지 사랑으로 나 레벨업 🎉', '세상에서 제일 사랑해 💞',
      '겸이 사랑 먹고 레벨업', '더 사랑해줘 강아지 💗', '공주 레벨업!',
      '결혼할래?', '사랑 레벨 만렙 가자!', '강아지 덕분에 매일 레벨업',
      '오늘도 사랑 충전 완료', '우리 사랑 끝없이 자라는중',
    ],
  },
};

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

const LEVELUP_PARTICLES = [
  { emoji: '🎉', x: '14%', y: '14%', tx: '-55px', ty: '-65px', delay: '0s' },
  { emoji: '✨', x: '78%', y: '10%', tx: '55px', ty: '-70px', delay: '0.05s' },
  { emoji: '💖', x: '6%', y: '62%', tx: '-70px', ty: '35px', delay: '0.1s' },
  { emoji: '🎊', x: '84%', y: '68%', tx: '70px', ty: '45px', delay: '0.05s' },
  { emoji: '⭐', x: '46%', y: '4%', tx: '0px', ty: '-80px', delay: '0.15s' },
  { emoji: '💝', x: '4%', y: '38%', tx: '-75px', ty: '-15px', delay: '0.1s' },
  { emoji: '🌟', x: '87%', y: '38%', tx: '75px', ty: '-15px', delay: '0.2s' },
  { emoji: '💫', x: '44%', y: '86%', tx: '0px', ty: '70px', delay: '0.25s' },
  { emoji: '🎈', x: '23%', y: '84%', tx: '-50px', ty: '65px', delay: '0.1s' },
  { emoji: '🎈', x: '66%', y: '86%', tx: '50px', ty: '65px', delay: '0.15s' },
  { emoji: '💗', x: '68%', y: '7%', tx: '45px', ty: '-65px', delay: '0.2s' },
  { emoji: '🌸', x: '18%', y: '9%', tx: '-45px', ty: '-60px', delay: '0.3s' },
];

function LevelUpOverlay({ overlay, onDismiss }) {
  useEffect(() => {
    if (!overlay) return;
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [overlay, onDismiss]);

  if (!overlay) return null;

  const c = CHARACTERS[overlay.target];
  const title = LEVEL_TITLES[overlay.newLevel - 1];
  const isMax = overlay.newLevel >= MAX_LEVEL;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-levelup-bg select-none"
      style={{
        background:
          overlay.target === 'mango'
            ? 'linear-gradient(160deg, #fff8e8 0%, #fce8ec 55%, #fff3e0 100%)'
            : 'linear-gradient(160deg, #fce8ec 0%, #f9e0ec 55%, #fce8f4 100%)',
      }}
      onClick={onDismiss}
    >
      {LEVELUP_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute text-2xl pointer-events-none animate-levelup-particle"
          style={{ left: p.x, top: p.y, '--tx': p.tx, '--ty': p.ty, animationDelay: p.delay }}
        >
          {p.emoji}
        </span>
      ))}

      <div className="flex flex-col items-center gap-2 px-8 animate-levelup-pop pointer-events-none">
        <div className="scale-[1.6] mb-4">
          <MangoJelly
            id={`overlay-${overlay.target}`}
            side={c.side}
            mood="happy"
            tone={c.tone}
            variant={c.variant}
          />
        </div>

        <p className={`text-sm font-black tracking-[0.4em] uppercase ${c.color}`}>
          {isMax ? '✨ MAX LEVEL ✨' : '· Level Up ·'}
        </p>

        <p className={`text-[88px] font-black leading-none animate-levelup-number ${c.color}`}>
          {overlay.newLevel}
        </p>

        <p className={`text-lg font-bold ${c.color}`}>{c.name}</p>

        <p className="text-base font-semibold text-gray-500 animate-levelup-shine">{title}</p>

        <p className="mt-5 text-xs text-gray-300">탭하면 닫힘</p>
      </div>
    </div>
  );
}

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

const levelOf = (n) => {
  let lv = 1;
  for (let i = 0; i < CUMULATIVE.length - 1; i++) {
    if (n >= CUMULATIVE[i + 1]) lv = i + 2;
    else break;
  }
  return Math.min(lv, MAX_LEVEL);
};

export default function MangoCouple() {
  const [state, setState] = useState(loadState);
  const [effect, setEffect] = useState(null);
  const [bubble, setBubble] = useState(null);
  const [levelUpOverlay, setLevelUpOverlay] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const dismissOverlay = useCallback(() => setLevelUpOverlay(null), []);

  const react = (shape, lineKey, target) => {
    const prevLv = levelOf(state[target]);
    const newCount = Math.min(state[target] + 1, MAX_COUNT);
    const newLv = levelOf(newCount);
    const leveledUp = newLv > prevLv;

    setState((prev) => ({ ...prev, [target]: newCount, sel: target }));

    if (leveledUp) {
      setLevelUpOverlay({ target, newLevel: newLv, key: Date.now() });
    }

    const key = Date.now();
    setEffect({ shape: leveledUp ? 'levelup' : shape, target, key });
    setBubble({ text: pick(LINES[target][leveledUp ? 'levelup' : lineKey]), target, key });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setEffect(null);
      setBubble(null);
    }, 2200);
  };

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
    <>
      <LevelUpOverlay overlay={levelUpOverlay} onDismiss={dismissOverlay} />

      <div>
        <h1 className="text-center text-xl font-extrabold tracking-[0.3em] text-gray-600">
          SHANGHAI · TRAVEL
        </h1>
        <p className="mb-3 text-center text-xs font-semibold text-sky-500">{period}</p>

        <div className="relative rounded-2xl bg-gradient-to-b from-amber-100 via-rose-50 to-sky-50 shadow-sm px-4 pt-7 pb-5">
          <span className="absolute left-[16%] top-3 text-lg animate-mango-sparkle emoji-muted" style={{ animationDelay: '0s' }}>
            🧳
          </span>
          <span className="absolute right-[18%] top-5 text-base animate-mango-sparkle emoji-muted" style={{ animationDelay: '0.6s' }}>
            🎫
          </span>
          <span className="absolute left-[46%] top-0 text-sm animate-mango-sparkle emoji-muted" style={{ animationDelay: '1.2s' }}>
            ✈️
          </span>

          <p className="relative text-center text-xs font-bold text-rose-400 mb-3">
            <span className="emoji-muted">{state.sel === 'mango' ? '🐶' : '👑'}</span>{' '}
            {state.sel === 'mango' ? '강아지 돌보는중' : '공주 돌보는중'}
          </p>

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
              <ellipse cx="10.5" cy="9" rx="3" ry="2" fill="#f2d7dc" opacity="0.7" transform="rotate(-25 10.5 9)" />
            </svg>

            {renderJelly('melang')}
          </div>

          {/* 캐릭터별 애정도 게이지 */}
          <div className="relative mt-4 grid grid-cols-2 gap-2">
            {['mango', 'melang'].map((k) => {
              const c = CHARACTERS[k];
              const n = state[k];
              const lv = levelOf(n);
              const maxed = n >= MAX_COUNT;
              const lvIdx = lv - 1;
              const prog = maxed
                ? 100
                : ((n - CUMULATIVE[lvIdx]) / LEVEL_THRESHOLDS[lvIdx]) * 100;
              const within = maxed ? LEVEL_THRESHOLDS[lvIdx - 1] : n - CUMULATIVE[lvIdx];
              const needed = maxed ? LEVEL_THRESHOLDS[lvIdx - 1] : LEVEL_THRESHOLDS[lvIdx];
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
                  <div className="mt-0.5 flex items-center justify-between">
                    <p className="text-[11px] font-semibold text-gray-400">{LEVEL_TITLES[lv - 1]}</p>
                    {!maxed && (
                      <p className="text-[10px] text-gray-300">
                        {within}/{needed}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 돌보기 버튼 */}
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
    </>
  );
}
