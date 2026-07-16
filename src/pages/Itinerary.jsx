import { useState } from 'react';
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { travelData } from '../data/travelData.js';
import TimelineItem from '../components/TimelineItem.jsx';
import ImageModal from '../components/ImageModal.jsx';
import SpotDetailModal from '../components/SpotDetailModal.jsx';
import TripProgressBar from '../components/TripProgressBar.jsx';

// DAY별 테마 색 - 뱃지 색과(디즈니만) 카드 묶음 테두리를 다르게 해서 하루하루를 구분
const DAY_THEMES = {
  rose: { badge: 'bg-rose-200 text-rose-700' },
  sky: { badge: 'bg-sky-200 text-sky-700' },
  emerald: { badge: 'bg-emerald-200 text-emerald-700' },
  disney: {
    badge: 'bg-indigo-200 text-indigo-700',
    box: 'rounded-2xl border border-indigo-200 bg-indigo-50/30 p-3',
    sparkle: true,
  },
};

const ORDER_KEY = 'itinerary-order-v1';
const CUSTOM_KEY = 'itinerary-custom-v1';
const HIDDEN_KEY = 'itinerary-hidden-v1';
const REMOVED_KEY = 'itinerary-removed-v1';
const OVERRIDE_KEY = 'itinerary-override-v1';

function loadJSON(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved && typeof saved === 'object' ? saved : fallback;
  } catch {
    return fallback;
  }
}

// 저장된 순서 중 지금도 존재하는 id만 남기고, 순서에 없던(새로 추가/복원된) id는 뒤에 붙인다.
function resolveOrder(saved, allIds) {
  const kept = Array.isArray(saved) ? saved.filter((id) => allIds.includes(id)) : [];
  const missing = allIds.filter((id) => !kept.includes(id));
  return [...kept, ...missing];
}

/** 드래그로 순서를 바꿀 수 있는 타임라인 카드 한 장. useSortable로 위치·이동 애니메이션을 관리. */
function SortableTimelineItem({ id, delay, ...itemProps }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div className="animate-card-in" style={{ animationDelay: `${delay}s` }}>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.6 : 1,
          zIndex: isDragging ? 10 : 'auto',
          position: 'relative',
        }}
      >
        <TimelineItem {...itemProps} dragHandleProps={{ ...attributes, ...listeners }} />
      </div>
    </div>
  );
}

/** 카드 추가용 인라인 폼 — 시간/제목/메모만 입력하는 메모 카드(스팟 연결 없음). */
function AddCardForm({ onAdd, onCancel }) {
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ time: time.trim(), title: title.trim(), memo: memo.trim() });
  };

  return (
    <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-3 mb-4 space-y-2">
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="시간 (예: 15:00, 비워두면 '언제든')"
        className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white"
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white"
      />
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모 (선택)"
        rows={2}
        className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white resize-none"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={submit}
          className="flex-1 rounded-full bg-sky-400 text-white text-sm font-bold py-1.5 active:scale-95 transition-transform"
        >
          추가
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full bg-white border border-sky-100 text-gray-400 text-sm font-bold py-1.5"
        >
          취소
        </button>
      </div>
    </div>
  );
}

/** 카드 수정용 인라인 폼 — 커스텀 카드는 제목까지, 원본 카드는 시간·메모만 고칠 수 있다. */
function EditCardForm({ item, onSave, onCancel }) {
  const [time, setTime] = useState(item.time || '');
  const [title, setTitle] = useState(item.__title || '');
  const [memo, setMemo] = useState(item.memo || '');

  return (
    <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-3 mb-4 space-y-2">
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="시간 (예: 15:00)"
        className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white"
      />
      {item.__custom && (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white"
        />
      )}
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모"
        rows={2}
        className="w-full rounded-lg border border-sky-100 px-2.5 py-1.5 text-sm bg-white resize-none"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSave({ time: time.trim(), title: title.trim(), memo: memo.trim() })}
          className="flex-1 rounded-full bg-sky-400 text-white text-sm font-bold py-1.5 active:scale-95 transition-transform"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full bg-white border border-sky-100 text-gray-400 text-sm font-bold py-1.5"
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default function Itinerary() {
  const [view, setView] = useState('itinerary'); // 'itinerary' | 'meals'
  const [driver, setDriver] = useState(null); // 기사님용 중문 확대 모달
  const [detail, setDetail] = useState(null); // 장소 상세 바텀시트에 띄울 spot
  const [order, setOrder] = useState(() => loadJSON(ORDER_KEY, {})); // { [day]: id[] }
  const [custom, setCustom] = useState(() => loadJSON(CUSTOM_KEY, {})); // { [day]: {id,time,title,memo}[] }
  const [hidden, setHidden] = useState(() => loadJSON(HIDDEN_KEY, {})); // { [day]: id[] } - 숨기기(복원 가능)
  const [removed, setRemoved] = useState(() => loadJSON(REMOVED_KEY, {})); // { [day]: id[] } - 삭제(영구, 복원 UI 없음)
  const [overrides, setOverrides] = useState(() => loadJSON(OVERRIDE_KEY, {})); // { [day]: { [origId]: {time,memo} } }
  const [addingDay, setAddingDay] = useState(null);
  const [editingId, setEditingId] = useState(null); // 지금 수정 폼이 열려있는 카드 __id
  const { spots, timelines, flexSpots } = travelData;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const showDriver = (spot) => setDriver({ text: [spot.name_zh, spot.addr] });

  const persist = (key, setter) => (next) => {
    setter(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  const saveOrder = persist(ORDER_KEY, setOrder);
  const saveCustom = persist(CUSTOM_KEY, setCustom);
  const saveHidden = persist(HIDDEN_KEY, setHidden);
  const saveRemoved = persist(REMOVED_KEY, setRemoved);
  const saveOverrides = persist(OVERRIDE_KEY, setOverrides);

  const addCard = (day, { time, title, memo }) => {
    const card = { id: `c${Date.now()}`, time, title, memo };
    saveCustom({ ...custom, [day]: [...(custom[day] ?? []), card] });
    setAddingDay(null);
  };

  // 커스텀 카드는 자기 데이터를 직접 수정, 원본 카드는 로컬 오버라이드(시간·메모만)로 겹쳐 보여준다
  const editCard = (day, item, { time, title, memo }) => {
    if (item.__custom) {
      const origId = item.__id.replace('custom-', '');
      saveCustom({
        ...custom,
        [day]: (custom[day] ?? []).map((c) => (c.id === origId ? { ...c, time, title, memo } : c)),
      });
    } else {
      saveOverrides({ ...overrides, [day]: { ...(overrides[day] ?? {}), [item.__id]: { time, memo } } });
    }
    setEditingId(null);
  };

  const hideCard = (day, id) => {
    saveHidden({ ...hidden, [day]: [...(hidden[day] ?? []), id] });
  };

  // 커스텀 카드는 저장 데이터에서 완전히 지우고, 원본 카드는 static 데이터라 지울 수 없어
  // "삭제" 목록에 넣어 숨긴 카드 복원 목록에는 안 잡히게 한다(사실상 영구 제거).
  const deleteCard = (day, item) => {
    if (item.__custom) {
      const origId = item.__id.replace('custom-', '');
      saveCustom({ ...custom, [day]: (custom[day] ?? []).filter((c) => c.id !== origId) });
    } else {
      saveRemoved({ ...removed, [day]: [...(removed[day] ?? []), item.__id] });
    }
  };

  // 순서·추가한 카드·숨김·삭제·수정 내역을 전부 지우고 travelData.js 기본 상태로 되돌린다.
  const resetDay = (day) => {
    const drop = (obj) => {
      if (obj[day] == null) return obj;
      const next = { ...obj };
      delete next[day];
      return next;
    };
    saveOrder(drop(order));
    saveCustom(drop(custom));
    saveHidden(drop(hidden));
    saveRemoved(drop(removed));
    saveOverrides(drop(overrides));
  };

  const handleDragEnd = (day, visibleIds) => (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = visibleIds.indexOf(active.id);
    const newIndex = visibleIds.indexOf(over.id);
    saveOrder({ ...order, [day]: arrayMove(visibleIds, oldIndex, newIndex) });
  };

  // DAY별로 원본+커스텀 카드를 합치고 숨김/삭제/순서/오버라이드를 반영한 최종 목록을 미리 계산 —
  // '일정' 뷰와 '식사' 뷰(식당만 필터링) 둘 다 이 결과를 그대로 재사용한다.
  const dayViews = timelines.map((day) => {
    const dayOverrides = overrides[day.day] ?? {};
    const originItems = day.items.map((it, idx) => {
      const id = `orig-${idx}`;
      return { ...it, ...(dayOverrides[id] ?? {}), __id: id };
    });
    const customItems = (custom[day.day] ?? []).map((c) => ({
      __id: `custom-${c.id}`,
      time: c.time,
      memo: c.memo,
      type: 'custom',
      __title: c.title,
      __custom: true,
    }));
    const allItems = [...originItems, ...customItems];
    const hiddenIds = hidden[day.day] ?? [];
    const removedIds = removed[day.day] ?? [];
    const visibleItems = allItems.filter((it) => !hiddenIds.includes(it.__id) && !removedIds.includes(it.__id));
    const visibleIds = visibleItems.map((it) => it.__id);
    const orderIds = resolveOrder(order[day.day], visibleIds);
    const orderedItems = orderIds.map((id) => visibleItems.find((it) => it.__id === id));
    const theme = DAY_THEMES[day.theme] ?? DAY_THEMES.rose;
    return { day, orderedItems, orderIds, hiddenIds, theme };
  });

  // 탭 진입 시 전체 일정 카드가 순서대로 촤라락 나타나도록 전역 인덱스로 지연시간 계산 (최대치는 캡)
  let cardIndex = 0;

  return (
    <div className="space-y-6">
      <TripProgressBar />

      <div className="grid grid-cols-2 gap-2">
        {[
          { id: 'itinerary', label: '일정' },
          { id: 'meals', label: '식사' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setView(t.id)}
            className={`rounded-full py-2 text-sm font-bold transition-colors ${
              view === t.id ? 'bg-rose-400 text-white shadow-sm' : 'bg-white border border-rose-100 text-gray-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {view === 'meals' ? (
        <div className="space-y-6">
          {dayViews.map(({ day, orderedItems, theme }) => {
            const meals = orderedItems.filter((item) => item.type === 'food');
            if (meals.length === 0) return null;
            return (
              <section key={day.day}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className={`${theme.badge} text-xs font-bold rounded-full px-2.5 py-1`}>
                    DAY {day.day}
                  </span>
                  <span className="text-sm font-bold text-gray-700">{day.date}</span>
                </div>
                {meals.map((item, i) => {
                  const delay = Math.min(cardIndex++, 10) * 0.05;
                  const spot = item.__custom ? { name_ko: item.__title } : spots[item.spotId];
                  return (
                    <div key={item.__id} className="animate-card-in" style={{ animationDelay: `${delay}s` }}>
                      <TimelineItem
                        item={item}
                        spot={spot}
                        isLast={i === meals.length - 1}
                        onOpen={(it, s) => !item.__custom && setDetail(s)}
                        onShowDriver={showDriver}
                      />
                    </div>
                  );
                })}
              </section>
            );
          })}

          {(() => {
            const flexMeals = (flexSpots ?? []).filter((item) => item.type === 'food');
            if (flexMeals.length === 0) return null;
            return (
              <section>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="bg-amber-400 text-white text-xs font-bold rounded-full px-2.5 py-1">TIP</span>
                  <span className="text-sm font-bold text-gray-700">비어있는 시간 활용하기</span>
                </div>
                {flexMeals.map((item, i) => {
                  const delay = Math.min(cardIndex++, 10) * 0.05;
                  return (
                    <div key={i} className="animate-card-in" style={{ animationDelay: `${delay}s` }}>
                      <TimelineItem
                        item={item}
                        spot={spots[item.spotId]}
                        isLast={i === flexMeals.length - 1}
                        onOpen={(it, spot) => setDetail(spot)}
                        onShowDriver={showDriver}
                      />
                    </div>
                  );
                })}
              </section>
            );
          })()}
        </div>
      ) : (
        <>
      {dayViews.map(({ day, orderedItems, orderIds, hiddenIds, theme }) => {
        const length = orderedItems.length;

        return (
          <section key={day.day} className={theme.box ? `relative ${theme.box}` : ''}>
            {theme.sparkle && (
              <>
                <span className="absolute -top-2 left-6 text-sm animate-mango-sparkle" style={{ animationDelay: '0s' }}>
                  ✨
                </span>
                <span className="absolute -top-1 right-10 text-xs animate-mango-sparkle" style={{ animationDelay: '0.8s' }}>
                  ✨
                </span>
              </>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span className={`${theme.badge} text-xs font-bold rounded-full px-2.5 py-1 shrink-0`}>
                DAY {day.day}
              </span>
              <span className="text-sm font-bold text-gray-700 shrink-0">{day.date}</span>
              <span className="text-xs text-gray-400 truncate">{day.desc}</span>
              {hiddenIds.length > 0 && (
                <span className="text-[11px] text-gray-400 shrink-0">숨김 {hiddenIds.length}개</span>
              )}
              <button
                type="button"
                onClick={() => resetDay(day.day)}
                className="ml-auto text-[11px] font-semibold text-sky-400 shrink-0"
              >
                초기화
              </button>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd(day.day, orderIds)}
            >
              <SortableContext items={orderIds} strategy={verticalListSortingStrategy}>
                {orderedItems.map((item, i) => {
                  const delay = Math.min(cardIndex++, 10) * 0.05;
                  const spot = item.__custom ? { name_ko: item.__title } : spots[item.spotId];

                  if (editingId === item.__id) {
                    return (
                      <EditCardForm
                        key={item.__id}
                        item={item}
                        onSave={(values) => editCard(day.day, item, values)}
                        onCancel={() => setEditingId(null)}
                      />
                    );
                  }

                  return (
                    <SortableTimelineItem
                      key={item.__id}
                      id={item.__id}
                      delay={delay}
                      item={item}
                      spot={spot}
                      isLast={i === length - 1}
                      onOpen={(it, s) => !item.__custom && setDetail(s)}
                      onShowDriver={showDriver}
                      onHide={() => hideCard(day.day, item.__id)}
                      onDelete={() => deleteCard(day.day, item)}
                      onEdit={() => setEditingId(item.__id)}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>

            {addingDay === day.day ? (
              <AddCardForm onAdd={(card) => addCard(day.day, card)} onCancel={() => setAddingDay(null)} />
            ) : (
              <button
                type="button"
                onClick={() => setAddingDay(day.day)}
                className="w-full rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm font-semibold py-2.5 mb-4 last:mb-0"
              >
                + 카드 추가
              </button>
            )}
          </section>
        );
      })}

      {flexSpots?.length > 0 && (
        <section>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="bg-amber-400 text-white text-xs font-bold rounded-full px-2.5 py-1">TIP</span>
            <span className="text-sm font-bold text-gray-700">비어있는 시간 활용하기</span>
          </div>

          {flexSpots.map((item, i) => {
            const delay = Math.min(cardIndex++, 10) * 0.05;
            return (
              <div key={i} className="animate-card-in" style={{ animationDelay: `${delay}s` }}>
                <TimelineItem
                  item={item}
                  spot={spots[item.spotId]}
                  isLast={i === flexSpots.length - 1}
                  onOpen={(it, spot) => setDetail(spot)}
                  onShowDriver={showDriver}
                />
              </div>
            );
          })}
        </section>
      )}
        </>
      )}

      <SpotDetailModal
        open={!!detail}
        onClose={() => setDetail(null)}
        spot={detail}
        onShowPhrase={(text, note) => setDriver({ text: [text], note })}
      />
      <ImageModal open={!!driver} onClose={() => setDriver(null)} {...(driver || {})} />
    </div>
  );
}
