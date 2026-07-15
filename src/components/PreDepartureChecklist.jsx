import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';

const CHECKLIST_KEY = 'predeparture-checklist-v1';

// category: 'todo'(준비사항 - 설치·설정·확인) / 'pack'(준비물 - 챙길 물건)
const ITEMS = [
  { category: 'todo', text: '고덕지도·디디추싱·알리페이·위챗페이 설치 및 카드 연동' }
  , { category: 'todo', text: '파파고 중국어 언어팩 오프라인 다운로드' }
  , { category: 'todo', text: '유심/이심 활성화 확인' }
  , { category: 'todo', text: '이 앱 한 번 열어서 오프라인 캐싱해두기' }
  , { category: 'pack', text: '여권 및 여권 사본 (만료일 6개월 이상 확인)' }
  , { category: 'pack', text: '항공권(E-ticket) 및 숙소 바우처 (바우처 파일 따로 저장하기)' }
  , { category: 'pack', text: '해외결제 가능 실물 카드 챙기기' }
  , { category: 'pack', text: '여행자 보험 가입 및 증서 확인' }
  , { category: 'pack', text: '어댑터(돼지코) 및 충전 케이블' }
  , { category: 'pack', text: '보조배터리 - 100Wh(2만mAh) 이하 5개까지, 100~160Wh는 항공사 승인 시 2개까지만 기내 반입 가능(160Wh 초과 반입 불가). 위탁 수하물 절대 금지, 기내에서 충전도 금지.' }
  , { category: 'pack', text: '비상약' }
  , { category: 'pack', text: '개인 세면도구 및 화장품 (용기당 100ml 이하, 1인당 1L 투명 지퍼백 1개)' }
  , { category: 'pack', text: '신발 및 여분의 옷·속옷' }
  , { category: 'pack', text: '선글라스' }
  , { category: 'pack', text: '선크림 (자외선 차단제)' }
  , { category: 'pack', text: '휴대용 선풍기' }
  , { category: 'pack', text: '여분의 양말' }
  , { category: 'pack', text: '잠옷 · 실내복' }
];

const TABS = [
  { id: 'todo', label: '준비사항' }
  , { id: 'pack', label: '준비물' }
];

function loadChecked() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY));
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

/** travelData.meta.departureAt(인천 출발 시각) 이전이면 true — 이 시각이 지나면 체크리스트 게이트를 아예 건너뛴다. */
export function isBeforeDeparture() {
  return Date.now() < new Date(travelData.meta.departureAt).getTime();
}

// Date.now()는 기기 자체 시계를 읽을 뿐 네트워크가 필요 없어 오프라인에서도 그대로 동작.
function formatCountdown(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSec / 86400);
  const hh = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, '0');
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  return days > 0 ? `${days}일 ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
}

/**
 * 인트로 다음에 뜨는 풀스크린 체크리스트 게이트. 출발 전에만 등장하며,
 * "여행 시작하기"를 누르면 평소 앱(홈 탭)으로 진입한다. 체크 상태는 localStorage에 저장.
 */
export default function PreDepartureChecklist({ onDone }) {
  const [checked, setChecked] = useState(loadChecked);
  const [tab, setTab] = useState('todo');
  const departureTime = new Date(travelData.meta.departureAt).getTime();
  const [remaining, setRemaining] = useState(() => departureTime - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(departureTime - Date.now()), 1000);
    return () => clearInterval(id);
  }, [departureTime]);

  useEffect(() => {
    if (remaining <= 0) onDone();
  }, [remaining, onDone]);

  const toggle = (text) => {
    setChecked((prev) => {
      const next = { ...prev, [text]: !prev[text] };
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  };

  const doneCount = ITEMS.filter((item) => checked[item.text]).length;
  const visibleItems = ITEMS.filter((item) => item.category === tab);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-amber-50 via-rose-50 to-sky-50 overflow-y-auto">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-6 pt-12 pb-8">
        <span className="text-3xl text-center">✈️</span>
        <h1 className="mt-3 text-center text-xl font-extrabold text-gray-600">출발 전 체크리스트</h1>
        <p className="mt-1 text-center text-xs font-semibold text-sky-500">
          {doneCount}/{ITEMS.length} 완료
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {TABS.map((t) => {
            const items = ITEMS.filter((item) => item.category === t.id);
            const count = items.filter((item) => checked[item.text]).length;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full py-2 text-sm font-bold transition-colors ${
                  tab === t.id ? 'bg-rose-400 text-white shadow-sm' : 'bg-white/70 text-gray-500'
                }`}
              >
                {t.label} ({count}/{items.length})
              </button>
            );
          })}
        </div>

        <ul className="mt-4 space-y-2.5">
          {visibleItems.map((item) => (
            <li key={item.text}>
              <label className="flex items-start gap-2.5 bg-white/80 rounded-xl px-3 py-2.5 text-sm text-gray-700 leading-relaxed shadow-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!checked[item.text]}
                  onChange={() => toggle(item.text)}
                  className="mt-0.5 shrink-0 w-4 h-4 accent-rose-400"
                />
                <span className={checked[item.text] ? 'line-through text-gray-400' : ''}>{item.text}</span>
              </label>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={remaining > 0 && !import.meta.env.DEV}
          onClick={onDone}
          className={`mt-8 w-full flex flex-col items-center rounded-full py-3 shadow-sm transition-transform ${
            remaining > 0 && !import.meta.env.DEV
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-rose-400 text-white active:scale-95'
          }`}
        >
          <span className="font-bold">
            {remaining > 0 ? (import.meta.env.DEV ? '여행 시작하기 (dev) →' : '아직 출발 전이에요') : '여행 시작하기 →'}
          </span>
          <span className={`text-[11px] font-semibold tabular-nums ${remaining > 0 && !import.meta.env.DEV ? 'text-gray-400' : 'text-white/80'}`}>
            {formatCountdown(remaining)} 후 자동 시작
          </span>
        </button>
      </div>
    </div>
  );
}
