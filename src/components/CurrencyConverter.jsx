import { useEffect, useState } from 'react';
import { travelData } from '../data/travelData.js';

// Zero-Data: 실시간 환율 API 대신, 한 번 입력해두면 localStorage에 저장돼
// 비행기 모드에서도 그대로 계산기로 쓸 수 있는 고정 환율 방식
const RATE_KEY = 'couple-cny-rate';

function loadRate() {
  const saved = Number(localStorage.getItem(RATE_KEY));
  return saved > 0 ? saved : travelData.meta.krwPerCny;
}

export default function CurrencyConverter() {
  const [rate, setRate] = useState(loadRate);
  const [editingRate, setEditingRate] = useState(false);
  const [cny, setCny] = useState('100');
  const [krw, setKrw] = useState(() => String(Math.round(100 * loadRate())));

  useEffect(() => {
    localStorage.setItem(RATE_KEY, String(rate));
  }, [rate]);

  const onCnyChange = (v) => {
    setCny(v);
    const n = Number(v);
    setKrw(v === '' ? '' : Number.isFinite(n) ? String(Math.round(n * rate)) : krw);
  };

  const onKrwChange = (v) => {
    setKrw(v);
    const n = Number(v);
    setCny(v === '' ? '' : Number.isFinite(n) ? String(Math.round((n / rate) * 100) / 100) : cny);
  };

  const onRateChange = (v) => {
    const n = Number(v);
    setRate(n);
    if (Number.isFinite(n) && n > 0) {
      const n2 = Number(cny);
      if (Number.isFinite(n2)) setKrw(String(Math.round(n2 * n)));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-sky-400">💱 환율 계산기</p>
        <button
          type="button"
          onClick={() => setEditingRate((v) => !v)}
          className="text-xs font-bold text-rose-400"
        >
          {editingRate ? '완료' : '환율 수정'}
        </button>
      </div>

      {editingRate ? (
        <div className="flex items-center gap-2 mb-3 bg-rose-50/70 rounded-xl px-3 py-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">1위안 =</span>
          <input
            type="number"
            inputMode="decimal"
            value={rate}
            onChange={(e) => onRateChange(e.target.value)}
            className="flex-1 min-w-0 bg-white rounded-lg px-2 py-1 text-sm text-gray-700 outline-none"
          />
          <span className="text-sm text-gray-500 whitespace-nowrap">원</span>
        </div>
      ) : (
        <p className="text-xs text-gray-400 mb-3">1위안 ≈ {rate.toLocaleString()}원</p>
      )}

      <div className="space-y-2">
        <label className="flex items-center gap-2 bg-rose-50/70 rounded-xl px-3 py-2">
          <span className="text-sm font-bold text-rose-400 w-16">¥ 위안</span>
          <input
            type="number"
            inputMode="decimal"
            value={cny}
            onChange={(e) => onCnyChange(e.target.value)}
            placeholder="0"
            className="flex-1 min-w-0 bg-transparent text-right text-base font-bold text-gray-700 outline-none"
          />
        </label>
        <label className="flex items-center gap-2 bg-sky-50/70 rounded-xl px-3 py-2">
          <span className="text-sm font-bold text-sky-400 w-16">₩ 원화</span>
          <input
            type="number"
            inputMode="decimal"
            value={krw}
            onChange={(e) => onKrwChange(e.target.value)}
            placeholder="0"
            className="flex-1 min-w-0 bg-transparent text-right text-base font-bold text-gray-700 outline-none"
          />
        </label>
      </div>
    </div>
  );
}
