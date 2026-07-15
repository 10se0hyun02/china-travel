import { useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { travelData } from '../data/travelData.js';
import AccordionCard from '../components/AccordionCard.jsx';
import ImageModal from '../components/ImageModal.jsx';
import { BulletLine, PhraseLine, SectionHeading } from '../components/SpotDetailModal.jsx';

// 카드 아이콘 배경 톤 — 4개 카드를 눈으로 구분하기 쉽게 순환 배치
const TONES = ['sky', 'rose', 'amber', 'rose'];

const ORDER_KEY = 'info-order-v1';

function loadOrder() {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_KEY));
    return Array.isArray(saved) ? saved : null;
  } catch {
    return null;
  }
}

// 저장된 순서 중 지금도 존재하는 제목만 남기고, 순서에 없던(새로 추가된) 카드는 뒤에 붙인다.
function resolveOrder(saved, allTitles) {
  const kept = (saved ?? []).filter((t) => allTitles.includes(t));
  const missing = allTitles.filter((t) => !kept.includes(t));
  return [...kept, ...missing];
}

/** 드래그로 순서를 바꿀 수 있는 정보 카드 한 장. useSortable로 위치·이동 애니메이션을 관리. */
function SortableGuideCard({ id, delay, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className="animate-card-in"
      style={{
        animationDelay: `${delay}s`,
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
      }}
    >
      {children({ ...attributes, ...listeners })}
    </div>
  );
}

/** 정보 탭 — 앱 사용법·여행 준비 가이드를 아코디언 카드로 보여준다. 내용은 travelData.guide, 카드 순서는 드래그로 바꿔 localStorage에 저장. */
export default function Info() {
  const { guide } = travelData;
  const [driver, setDriver] = useState(null); // 회화 문장 풀스크린 확대(Show Driver Mode)

  const allTitles = guide.map((g) => g.title);
  const [order, setOrder] = useState(() => resolveOrder(loadOrder(), allTitles));
  const orderedGuide = order.map((t) => guide.find((g) => g.title === t)).filter(Boolean);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setOrder((prev) => {
      const next = arrayMove(prev, prev.indexOf(active.id), prev.indexOf(over.id));
      localStorage.setItem(ORDER_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {orderedGuide.map((g, idx) => (
            <SortableGuideCard key={g.title} id={g.title} delay={idx * 0.08}>
              {(dragHandleProps) => (
                <AccordionCard
                  icon={g.icon}
                  title={g.title}
                  defaultOpen={g.defaultOpen}
                  tone={TONES[idx % TONES.length]}
                  dragHandleProps={dragHandleProps}
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
              )}
            </SortableGuideCard>
          ))}
        </SortableContext>
      </DndContext>

      <ImageModal open={!!driver} onClose={() => setDriver(null)} {...(driver || {})} />
    </div>
  );
}
