import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import ImageModal from '../components/ImageModal.jsx';
import VoucherDetailCard from '../components/VoucherDetailCard.jsx';

export default function Archive() {
  const [modal, setModal] = useState(null);
  const { archive } = travelData;

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
        </div>
      </section>

      {/* 예약 상세정보 — 원문이 길어 접이식 카드로 핵심만 요약 */}
      <section className="space-y-2">
        <p className="text-xs font-bold text-rose-400 px-1">📋 예약 상세정보</p>
        {archive.voucherDetails.map((v) => (
          <VoucherDetailCard
            key={v.id}
            voucher={v}
            onShowImage={(voucher) => setModal({ title: `${voucher.title} QR`, image: voucher.qrImage })}
          />
        ))}
      </section>

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
