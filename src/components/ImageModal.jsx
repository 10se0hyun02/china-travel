import { useEffect, useState } from 'react';

/**
 * 크게 보기 팝업 (명세서 2번의 ImageModal).
 * - image 전달 시: 바우처 이미지 뷰어. 모달이 열릴 때만 <img>를 렌더링하는
 *   레이지 로딩 규칙(명세서 4번)의 실행 지점 — 목록 화면에는 <img>가 존재하지 않는다.
 * - text 전달 시: Show Driver Mode. 화이트 배경 풀스크린에 중문 텍스트만
 *   text-4xl font-bold로 표시해 기사님께 제시.
 */
export default function ImageModal({ open, onClose, title, image, text }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  // travelData의 절대 경로("/assets/...")를 배포 base(서브경로 포함)에 맞게 보정
  const src = image && image.startsWith('/') ? import.meta.env.BASE_URL + image.slice(1) : image;

  if (text) {
    return (
      <div
        className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8 p-6 cursor-pointer"
        onClick={onClose}
        role="dialog"
        aria-label="기사님께 보여주기"
      >
        {text.map((line, i) => (
          <p key={i} className="text-4xl font-bold text-gray-900 text-center break-keep leading-snug">
            {line}
          </p>
        ))}
        <p className="absolute bottom-8 text-sm text-gray-300">화면을 누르면 닫혀요</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex flex-col items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-label={title}
    >
      {title && <p className="text-white font-bold mb-3">{title}</p>}
      {failed ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-500 text-sm">
          이미지가 아직 없어요 🥲
          <br />
          <code className="text-xs text-rose-400">{image}</code>
          <br />
          경로에 파일을 넣어주세요.
        </div>
      ) : (
        <img
          src={src}
          alt={title || '이미지 크게 보기'}
          className="max-w-full max-h-[80vh] object-contain rounded-xl"
          onError={() => setFailed(true)}
        />
      )}
      <p className="text-white/50 text-sm mt-4">화면을 누르면 닫혀요</p>
    </div>
  );
}
