import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import ImageModal from '../components/ImageModal.jsx';

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function diffDays(from, to) {
  return Math.round((to - from) / 86400000);
}

export default function Dashboard() {
  const [modal, setModal] = useState(null);
  const { meta, spots, archive } = travelData;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const loveDays = diffDays(parseDate(meta.anniversaryDate), today) + 1; // 사귄 첫날 = 1일
  const toTrip = diffDays(today, parseDate(meta.startDate));
  const toEnd = diffDays(today, parseDate(meta.endDate));
  const dday =
    toTrip > 0
      ? `D-${toTrip}`
      : toEnd >= 0
        ? `여행 ${1 - toTrip}일차 💕`
        : '여행 완료 🎉';

  const hotel = spots.grand_central;

  return (
    <div className="space-y-4">
      {/* 명세서 4번: 기념일 카운터 + 여행 D-Day 위젯 상단 배치 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-xs text-rose-400 font-bold">우리 사귄 지</p>
          <p className="mt-1 text-2xl font-bold text-rose-500">{loveDays.toLocaleString()}일 ❤️</p>
        </div>
        <div className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl p-4 text-center shadow-sm">
          <p className="text-xs text-sky-400 font-bold">상해 여행</p>
          <p className="mt-1 text-2xl font-bold text-sky-500">{dday}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 text-center">
        <p className="text-sm text-gray-500">
          ✈️ {meta.startDate} ~ {meta.endDate}
        </p>
      </div>

      {/* 명세서 4번: grand_central 숙소 정보 홈 화면 고정 노출 */}
      <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-4">
        <p className="text-xs font-bold text-sky-400 mb-2">🏨 우리 숙소</p>
        <p className="font-bold text-gray-800">{hotel.name_ko}</p>
        <p className="text-sm text-gray-500 mt-0.5">{hotel.name_zh}</p>
        <p className="text-xs text-gray-400">{hotel.addr}</p>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => setModal({ text: [hotel.name_zh, hotel.addr] })}
            className="flex-1 text-sm font-bold text-sky-600 bg-sky-50 rounded-xl py-2"
          >
            🚕 기사님께 보여주기
          </button>
          {hotel.map && (
            <button
              type="button"
              onClick={() => setModal({ title: hotel.name_ko, image: hotel.map })}
              className="flex-1 text-sm font-bold text-rose-400 bg-rose-50 rounded-xl py-2"
            >
              🗺️ 지도 보기
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4">
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
      </div>

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
