export const travelData = {
  meta: {
    title: "SHANGHAI TRAVEL"
    , startDate: "2026-07-16"
    , endDate: "2026-07-19"
    , anniversaryDate: "2024-05-12"
    , krwPerCny: 190 // 1위안=원 기준환율 기본값. 출국 전 앱 내 "환율 수정"으로 최신값으로 갱신 권장
  }
  // 장소 마스터 데이터 (한자, 주소 중복 방지를 위해 이곳에 통합)
  , spots: {
    "pudong_airport": { name_ko: "상해 푸동 국제공항", name_zh: "上海浦东国际机场", addr: "浦东新区", map: "" }
    , "hotel_jinglai": { name_ko: "징라이 호텔 부쉐", name_zh: "京莱酒店·轻奢", addr: "上海市静安区曲阜路9弄66号", map: "/assets/maps/hotel.webp", tip: "曲阜路역 5번 출구 도보권, 인민광장 도보 5분" }
    , "nanjing_road": { name_ko: "난징동루 보행가", name_zh: "南京东路步行街", addr: "上海市黄浦区南京东路", map: "/assets/maps/nanjing_road.webp", tip: "7월 낮엔 폭염 — 오후 4~5시 이후 걷기 추천 🥵" }
    , "the_bund": { name_ko: "와이탄", name_zh: "外滩(中山东一路)", addr: "上海市黄浦区中山东一路", map: "/assets/maps/the_bund.webp", isTarget: true, tip: "건물 조명은 보통 19~22(23)시 점등 ✨ 상해 대표 야경 데이트" }
    , "oriental_pearl": { name_ko: "동방명주", name_zh: "东方明珠广播电视塔", addr: "上海市浦东新区世纪大道1号", map: "/assets/maps/oriental_pearl.webp", isTarget: true, tip: "와이탄→푸동은 황푸강 도도륜 페리(2위안) 추천, 저렴하고 낭만적 🚢" }
    , "disneyland": { name_ko: "상하이 디즈니랜드", name_zh: "上海迪士尼乐园", addr: "上海市浦东新区川沙新镇黄赵路310号", map: "/assets/maps/disneyland.webp", tip: "오픈런 필수! 앱으로 실시간 대기시간 확인. 불꽃놀이는 보통 20~20:30시 🎆" }
    , "kr_provisional_gov": { name_ko: "대한민국 임시정부 청사", name_zh: "大韩民国临时政府旧址", addr: "上海市黄浦区马当路306弄4号", map: "/assets/maps/kr_provisional_gov.webp", tip: "오전에 방문하면 비교적 한산함" }
    , "xintiandi": { name_ko: "신천지", name_zh: "新天地", addr: "上海市黄浦区太仓路181弄", map: "/assets/maps/xintiandi.webp", tip: "임시정부 바로 옆 — 점심·카페 타임 좋음" }
    , "wukang_road": { name_ko: "우캉루(우캉맨션)", name_zh: "武康大楼(武康路)", addr: "上海市徐汇区淮海中路1850号", map: "/assets/maps/wukang_road.webp", tip: "플라타너스 가로수길 스냅 명소 📸 늦은 오후 추천" }
    , "yuyuan": { name_ko: "예원", name_zh: "豫园", addr: "上海市黄浦区福佑路168号", map: "/assets/maps/yuyuan.webp", isTarget: true, tip: "전통 정원·상점가, 기념품·탕후루 구경하기 좋음" }
    , "tianzifang": { name_ko: "티엔즈팡", name_zh: "田子坊", addr: "上海市黄浦区泰康路210弄", map: "/assets/maps/tianzifang.webp", tip: "골목 아트샵·카페, 여인크림·차 선물 사기 좋음" }
  }
  , timelines: [
    {
      day: 1, date: "07/16 (목)", desc: "상해 입국 & 랜드마크 야경"
      , diary: "우리 첫 상해 여행 시작! 야경 완전 기대돼 ❤️"
      , items: [
        { time: "13:45", type: "transport", spotId: "pudong_airport", memo: "인천 12:25 출발 → 상해 13:45 도착(현지시간)" }
        , { time: "15:00", type: "hotel", spotId: "hotel_jinglai", memo: "체크인 & 짐 풀기" }
        , { time: "16:30", type: "shopping", spotId: "nanjing_road", memo: "난징동루에서 와이탄까지 도보 15~20분" }
        , { time: "19:00", type: "sight", spotId: "the_bund", memo: "건물 조명 점등 시간대에 맞춰 산책" }
        , { time: "20:30", type: "sight", spotId: "oriental_pearl", memo: "페리로 황푸강 건너서 야경 감상 🌉" }
      ]
    }
    , {
      day: 2, date: "07/17 (금)", desc: "상하이 디즈니랜드 올데이"
      , diary: "디즈니에서 신나게 논 하루 🎢"
      , items: [
        { time: "08:00", type: "sight", spotId: "disneyland", memo: "오픈런! 평일이지만 7월 방학 시즌이라 붐빌 수 있음" }
        , { time: "20:00", type: "sight", spotId: "disneyland", memo: "일루미네이션 불꽃놀이 관람 — 중간중간 실내에서 휴식 필수" }
      ]
    }
    , {
      day: 3, date: "07/18 (토)", desc: "조계지 트렌디 & 역사 코스"
      , diary: "골목골목 예쁜 상해 감성 가득 담은 날 📸"
      , items: [
        { time: "10:00", type: "sight", spotId: "kr_provisional_gov", memo: "오전 한산할 때 차분하게 관람" }
        , { time: "12:30", type: "food", spotId: "xintiandi", memo: "점심 식사 & 커피 한잔" }
        , { time: "16:00", type: "sight", spotId: "wukang_road", memo: "우캉맨션 앞에서 인생샷 남기기" }
      ]
    }
    , {
      day: 4, date: "07/19 (일)", desc: "귀국일 — 오전 미정, 오후 출국"
      , diary: "벌써 마지막 날이라니... 다음에 또 오자 🥹"
      , items: [
        { time: "13:00", type: "hotel", spotId: "hotel_jinglai", memo: "체크아웃 & 공항 이동" }
        , { time: "16:50", type: "transport", spotId: "pudong_airport", memo: "상해 16:50 출발 → 인천 20:05 도착 예정" }
      ]
    }
  ]
  // 아직 확정 안 된 일정 — 같이 보고 정하기 (타임라인에는 넣지 않음)
  , undecided: [
    {
      id: "day4_morning"
      , day: 4
      , label: "일요일(귀국일) 오전 일정"
      , note: "16:50 비행기라 오전 반나절만 가능해요. 같이 보고 정해요! 🤔"
      , spotIds: ["yuyuan", "tianzifang"]
    }
  ]
  , archive: {
    emergency: [{ label: "총영사관", value: "+86-21-6295-5000" }]
    , shopping: [
      { id: 1, item: "페이유에 커플 스니커즈 사기", checked: false }
      , { id: 2, item: "여인크림 챙기기", checked: false }
    ]
    , vouchers: [
      { id: "v_hotel", title: "호텔 바우처", image: "/assets/vouchers/hotel.webp" }
    ]
    , metroMap: "/assets/maps/metro.webp"
  }
};
