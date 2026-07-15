import { travelData } from '../data/travelData.js';
import AccordionCard from '../components/AccordionCard.jsx';
import { BulletLine } from '../components/SpotDetailModal.jsx';

// 카드 아이콘 배경 톤 — 4개 카드를 눈으로 구분하기 쉽게 순환 배치
const TONES = ['sky', 'rose', 'amber', 'rose'];

/** 정보 탭 — 앱 사용법·여행 준비 가이드를 아코디언 카드로 보여준다. 내용은 travelData.guide. */
export default function Info() {
  const { guide } = travelData;

  return (
    <div className="space-y-3">
      {guide.map((g, idx) => (
        <div
          key={g.title}
          className="animate-card-in"
          style={{ animationDelay: `${idx * 0.08}s` }}
        >
          <AccordionCard
            icon={g.icon}
            title={g.title}
            defaultOpen={g.defaultOpen}
            tone={TONES[idx % TONES.length]}
          >
            <div className="space-y-4">
              {g.sections.map((s, i) => (
                <div key={s.heading} className={i > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                    {s.heading}
                  </p>
                  <ul className="space-y-1.5">
                    {s.lines.map((line, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="text-gray-300 shrink-0">•</span>
                        <BulletLine line={line} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionCard>
        </div>
      ))}
    </div>
  );
}
