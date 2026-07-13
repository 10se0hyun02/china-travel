import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';
import ImageModal from '../components/ImageModal.jsx';

const SHOPPING_KEY = 'couple-shopping';

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(SHOPPING_KEY)) || {};
  } catch {
    return {};
  }
}

export default function Archive() {
  const [modal, setModal] = useState(null);
  const [checked, setChecked] = useState(loadChecked);
  const { archive } = travelData;

  useEffect(() => {
    localStorage.setItem(SHOPPING_KEY, JSON.stringify(checked));
  }, [checked]);

  const isChecked = (m) => checked[m.id] ?? m.checked;
  const doneCount = archive.shopping.filter(isChecked).length;

  return (
    <div className="space-y-4">
      {/* 바우처 — 목록에는 <img> 없음, 카드 클릭 시 모달에서만 로드(레이지 로딩) */}
      <section className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4">
        <p className="text-xs font-bold text-rose-400 mb-2">🎫 예약증 보관함</p>
        <div className="space-y-2">
          {archive.vouchers.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setModal({ title: v.title, image: v.image })}
              className="w-full flex items-center justify-between bg-rose-50/70 rounded-xl px-3 py-3 text-sm font-bold text-gray-700"
            >
              <span>📄 {v.title}</span>
              <span className="text-xs text-rose-400">크게 보기 ›</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setModal({ title: '상해 지하철 노선도', image: archive.metroMap })}
            className="w-full flex items-center justify-between bg-sky-50/70 rounded-xl px-3 py-3 text-sm font-bold text-gray-700"
          >
            <span>🚇 지하철 노선도</span>
            <span className="text-xs text-sky-400">크게 보기 ›</span>
          </button>
        </div>
      </section>

      {/* 커플 쇼핑 미션 — 체크 상태는 오프라인에서도 localStorage에 보존 */}
      <section className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-rose-400">🛍️ 커플 쇼핑 미션</p>
          <span className="text-xs font-bold text-sky-400">
            {doneCount}/{archive.shopping.length} 완료
          </span>
        </div>
        <ul className="space-y-1">
          {archive.shopping.map((m) => (
            <li key={m.id}>
              <label className="flex items-center gap-3 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked(m)}
                  onChange={(e) => setChecked((c) => ({ ...c, [m.id]: e.target.checked }))}
                  className="w-5 h-5 accent-rose-400"
                />
                <span
                  className={`text-sm ${isChecked(m) ? 'text-gray-300 line-through' : 'text-gray-700'}`}
                >
                  {m.item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* 비상 연락처 */}
      <section className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4">
        <p className="text-xs font-bold text-rose-400 mb-2">🚨 비상 연락처</p>
        {archive.emergency.map((e) => (
          <a
            key={e.label}
            href={`tel:${e.value}`}
            className="flex justify-between items-center py-1.5 text-sm"
          >
            <span className="text-gray-700">{e.label}</span>
            <span className="font-bold text-gray-800">{e.value}</span>
          </a>
        ))}
      </section>

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
