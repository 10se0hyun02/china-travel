import AccordionCard from './AccordionCard.jsx';

/** travelData.archive.voucherDetails의 항목 하나를 섹션별로 렌더링.
 * 한 줄짜리 정보는 라벨 아래 값 하나로, 여러 줄은 불릿 리스트로 — 스캔하기 쉽게 구분. */
export default function VoucherDetailCard({ voucher, onShowImage, onShowDriver }) {
  return (
    <AccordionCard icon={voucher.icon} title={voucher.title} subtitle={voucher.subtitle}>
      {(voucher.qrImage || voucher.driverSpotId) && (
        <div className="flex gap-2 mb-3">
          {voucher.driverSpotId && (
            <button
              type="button"
              onClick={() => onShowDriver(voucher)}
              className="flex-1 text-sm font-bold text-sky-600 bg-sky-50 rounded-xl py-2.5"
            >
              기사님께 보여주기
            </button>
          )}
          {voucher.qrImage && (
            <button
              type="button"
              onClick={() => onShowImage(voucher)}
              className="flex-1 text-sm font-bold text-rose-500 bg-rose-50 rounded-xl py-2.5"
            >
              QR 코드 크게 보기
            </button>
          )}
        </div>
      )}
      {voucher.sections.map((s, idx) => (
        <div key={s.heading} className={idx > 0 ? 'pt-3 mt-3 border-t border-gray-100' : ''}>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">{s.heading}</p>
          {s.lines.length === 1 ? (
            <p className="text-sm text-gray-700 leading-relaxed">{s.lines[0]}</p>
          ) : (
            <ul className="space-y-1.5">
              {s.lines.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="text-gray-300 shrink-0">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </AccordionCard>
  );
}
