import { travelData } from '../data/travelData.js';
import AccordionCard from '../components/AccordionCard.jsx';
import { BulletLine } from '../components/SpotDetailModal.jsx';

/** 정보 탭 — 앱 사용법·여행 준비 가이드를 아코디언 카드로 보여준다. 내용은 travelData.guide. */
export default function Info() {
  const { guide } = travelData;

  return (
    <div className="space-y-3">
      {guide.map((g) => (
        <AccordionCard key={g.title} icon={g.icon} title={g.title} defaultOpen={g.defaultOpen}>
          <div className="space-y-4">
            {g.sections.map((s, idx) => (
              <div key={s.heading} className={idx > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  {s.heading}
                </p>
                <ul className="space-y-1.5">
                  {s.lines.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-gray-300 shrink-0">•</span>
                      <BulletLine line={line} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AccordionCard>
      ))}
    </div>
  );
}
