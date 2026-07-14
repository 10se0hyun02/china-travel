import AccordionCard from './AccordionCard.jsx';

/** travelData.archive.voucherDetails의 항목 하나를 섹션별 불릿 리스트로 렌더링. */
export default function VoucherDetailCard({ voucher, onShowImage }) {
  return (
    <AccordionCard icon={voucher.icon} title={voucher.title} subtitle={voucher.subtitle}>
      {voucher.qrImage && (
        <button
          type="button"
          onClick={() => onShowImage(voucher)}
          className="w-full text-sm font-bold text-rose-400 bg-rose-50 rounded-xl py-2"
        >
          🔍 QR 코드 크게 보기
        </button>
      )}
      {voucher.sections.map((s) => (
        <div key={s.heading}>
          <p className="text-xs font-bold text-sky-500 mb-1">{s.heading}</p>
          <ul className="space-y-0.5">
            {s.lines.map((line, i) => (
              <li key={i} className="text-sm text-gray-600 leading-snug">
                · {line}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </AccordionCard>
  );
}
