# China Travel — 상해 커플 여행 오프라인 PWA

인터넷이 불안정한 상해 현지에서 오프라인으로 여행 일정·바우처를 조회하고 커플 추억을 기록하는 모바일 퍼스트 PWA.

## 필수 참조 문서

@travel-spec.md

## 핵심 원칙 (요약)

- **Zero-Data**: 외부 API·외부 폰트·지도 SDK 금지. 100% 로컬 자원(App Shell) 캐싱.
- **오프라인 퍼스트**: `vite-plugin-pwa`로 전체 페이지·데이터 캐싱. 비행기 모드에서도 완전 동작해야 함.
- **상해 맞춤 UX**: 중문 확대 모달, 고덕지도(Amap) 캡처 이미지 사용 (실시간 지도 대신).
- **커플 감성 UI**: 파스텔톤, 따뜻하고 러블리한 디자인.

## 구조

- 스택: Vite + React + Tailwind CSS, PWA는 `vite-plugin-pwa` 사용 (5번 섹션의 `globPatterns` 필수).
- 폴더 구조는 `travel-spec.md` 2번, 데이터 스키마는 3번, UI/UX 지침은 4번 섹션을 따를 것.
- 모든 여행 데이터는 `src/data/travelData.js` 정적 파일 하나로 관리. 장소 정보는 `spots`에 통합하고 `spotId`로 참조 (중복 금지).
- 이미지는 lazy loading (모달 열릴 때만 렌더링), 중문 텍스트에는 기사님용 확대 모달(Show Driver Mode) 제공.
