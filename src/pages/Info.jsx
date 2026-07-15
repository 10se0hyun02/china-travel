import { useState } from 'react';
import { travelData } from '../data/travelData.js';
import AccordionCard from '../components/AccordionCard.jsx';
import ImageModal from '../components/ImageModal.jsx';
import { BulletLine, PhraseLine, SectionHeading } from '../components/SpotDetailModal.jsx';

// 카드 아이콘 배경 톤 — 4개 카드를 눈으로 구분하기 쉽게 순환 배치
const TONES = ['sky', 'rose', 'amber', 'rose'];

/** 정보 탭 — 앱 사용법·여행 준비 가이드를 아코디언 카드로 보여준다. 내용은 travelData.guide. */
export default function Info() {
  const { guide } = travelData;
  const [driver, setDriver] = useState(null); // 회화 문장 풀스크린 확대(Show Driver Mode)

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
                  {s.highlight ? (
                    <p className="inline-block text-xs font-extrabold text-rose-500 bg-rose-100 rounded-full px-3 py-1 mb-2">
                      {s.heading}
                    </p>
                  ) : (
                    <SectionHeading>{s.heading}</SectionHeading>
                  )}
                  <ul className="space-y-2.5">
                    {s.lines.map((line, j) =>
                      s.phrasebook ? (
                        <PhraseLine
                          key={j}
                          line={line}
                          onShowDriver={(text, note) => setDriver({ text: [text], note })}
                        />
                      ) : (
                        <BulletLine key={j} line={line} />
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionCard>
        </div>
      ))}

      <ImageModal open={!!driver} onClose={() => setDriver(null)} {...(driver || {})} />
    </div>
  );
}
