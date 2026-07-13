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
