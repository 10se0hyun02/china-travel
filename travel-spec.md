# 🇨🇳 상해 오프라인 커플 여행 PWA 웹앱 명세서

## 🎯 1. 핵심 원칙
1. **Zero-Data**: 외부 API 배제, 100% 로컬 자원(App Shell) 캐싱.
2. **PWA**: `vite-plugin-pwa` 활용, 비행기 모드에서도 완벽 구동.
3. **China UX**: 기사님 제시용 중문 확대 모달, 고덕지도 캡처 이미지 대응.
4. **Couple**: 핑크/스카이블루 톤앤매너, 기념일 카운터 및 오프라인 쇼핑 미션.

## 📂 2. 파일 구조
- `src/components/`: Layout, TimelineItem, PlaceCard, ImageModal
- `src/pages/`: Dashboard, Itinerary, Places, Archive
- `src/data/travelData.js`: 마스터 데이터

## 📊 3. 최적화 마스터 데이터 (`src/data/travelData.js`)
```javascript
export const travelData = {
  meta: {
    title: "우리들의 상해 여행 ✈️"
    , startDate: "2026-10-01"
    , endDate: "2026-10-04"
    , anniversaryDate: "2024-05-12"
  }
  // 장소 마스터 데이터 (한자, 주소 중복 방지를 위해 이곳에 통합)
  , spots: {
    "pudong_airport": { name_ko: "푸동 공항", name_zh: "上海浦东国际机场", addr: "浦东新区", map: "" }
    , "grand_central": { name_ko: "그랜드 센트럴 호텔", name_zh: "上海大酒店", addr: "黄浦区九江路505号", map: "/assets/maps/hotel.webp" }
    , "yuyuan": { name_ko: "예원", name_zh: "豫园", addr: "黄浦区福佑路168号", map: "/assets/maps/yuyuan.webp", isTarget: true, tip: "해질녘 조명 예쁨! ❤️" }
  }
  , timelines: [
    {
      day: 1, date: "10/01 (목)", desc: "상해 입국 및 야경"
      , diary: "우리 첫 상해 여행 화이팅! ❤️"
      , items: [
        { time: "11:30", type: "transport", spotId: "pudong_airport", memo: "자기부상열차 탑승" }
        , { time: "14:00", type: "hotel", spotId: "grand_central", memo: "인민광장역 14번 출구" }
        , { time: "20:00", type: "sight", spotId: "yuyuan", memo: "인생샷 스폿 📸" }
      ]
    }
  ]
  , archive: {
    emergency: [{ label: "총영사관", value: "+86-21-6295-5000" }]
    , shopping: [
      { id: 1, item: "페이유에 커플 스니커즈 사기", checked: false }
      , { id: 2, item: "여인크림 쟁이기", checked: false }
    ]
    , vouchers: [
      { id: "v_hotel", title: "호텔 바우처", image: "/assets/vouchers/hotel.webp" }
    ]
    , metroMap: "/assets/maps/metro.webp"
  }
};
```

## 🎨 4. UI/UX 구현 지침 (Tailwind CSS)
- **Layout**: `max-w-md mx-auto bg-rose-50/30 flex flex-col min-h-screen` (하단 고정 탭 바 포함)
- **Lazy Loading**: `spots` 이미지 및 `vouchers` 이미지는 목록에서 로드하지 않고, 카드를 클릭하여 상세 모달이 열릴 때만 `<img>` 태그 렌더링.
- **Show Driver Mode**: 중문(`name_zh`, `addr`) 옆 확대 버튼 클릭 시, 화이트 배경에 해당 텍스트만 초거대 폰트(`text-4xl font-bold`)로 채워지는 풀스크린 모달 표시.
- **Dashboard**: `meta.anniversaryDate` 기준 사귄 일수 및 여행 D-Day 계산 위젯 상단 배치. `grand_central` 숙소 정보 홈 화면 고정 노출.

## 🛠️ 5. PWA 설정
- `vite-plugin-pwa` 기본 적용. `globPatterns: ['**/*.{js,css,html,png,jpg,svg,webp}']` 필수 설정.
