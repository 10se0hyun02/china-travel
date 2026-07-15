import { useState } from 'react';

/** 주소를 클립보드에 복사해 지도 앱에 바로 붙여넣을 수 있게 하는 버튼. label로 아이콘만 표시 가능. */
export default function CopyAddressButton({ address, className, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    e.stopPropagation(); // 클릭 가능한 카드 안에서도 카드 열림 없이 복사만 되도록
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      const el = document.createElement('textarea');
      el.value = address;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button type="button" onClick={copy} className={className} aria-label="주소 복사">
      {copied ? (copiedLabel ?? '주소 복사됨') : (label ?? '주소 복사')}
    </button>
  );
}
