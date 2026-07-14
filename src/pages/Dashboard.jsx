import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import ImageModal from '../components/ImageModal.jsx';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import MangoCouple from '../components/MangoCouple.jsx';
import CopyAddressButton from '../components/CopyAddressButton.jsx';

export default function Dashboard() {
  const [modal, setModal] = useState(null);
  const { meta, spots } = travelData;

  const hotel = spots.hotel_jinglai;

  return (
    <div className="space-y-4">
      <MangoCouple />

      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 text-center">
        <p className="text-sm text-gray-500">
          {meta.startDate} ~ {meta.endDate}
        </p>
      </div>

      <CurrencyConverter />

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
            기사님께 보여주기
          </button>
          <CopyAddressButton
            address={hotel.addr}
            className="flex-1 text-sm font-bold text-rose-400 bg-rose-50 rounded-xl py-2"
          />
        </div>
      </div>

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
