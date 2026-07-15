import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import ImageModal from '../components/ImageModal.jsx';
import VoucherDetailCard from '../components/VoucherDetailCard.jsx';

// 카드 아이콘 배경 톤 — 정보 탭과 동일한 순환 규칙으로 스캔하기 쉽게
const TONES = ['sky', 'rose', 'amber', 'rose'];

export default function Archive() {
  const [modal, setModal] = useState(null);
  const { archive, spots } = travelData;

  return (
    <div className="space-y-4">
      {/* 예약 상세정보 — 원문이 길어 접이식 카드로 핵심만 요약 */}
      <section className="space-y-2">
        <p className="text-xs font-bold text-rose-400 px-1">
          <span className="emoji-muted">📋</span> 예약 상세정보
        </p>
        {archive.voucherDetails.map((v, idx) => (
          <div key={v.id} className="animate-card-in" style={{ animationDelay: `${idx * 0.08}s` }}>
            <VoucherDetailCard
              voucher={v}
              tone={TONES[idx % TONES.length]}
              onShowImage={(voucher) => setModal({ title: `${voucher.title} QR`, image: voucher.qrImage })}
              onShowDriver={(voucher) => {
                const spot = spots[voucher.driverSpotId];
                setModal({ text: [spot.name_zh, spot.addr] });
              }}
            />
          </div>
        ))}
      </section>

      <ImageModal open={!!modal} onClose={() => setModal(null)} {...(modal || {})} />
    </div>
  );
}
