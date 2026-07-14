export const travelData = {
  meta: {
    title: "SHANGHAI TRAVEL"
    , startDate: "2026-07-16"
    , endDate: "2026-07-19"
    , krwPerCny: 190 // 1위안=원 기준환율 기본값. 출국 전 앱 내 "환율 수정"으로 최신값으로 갱신 권장
  }
  // 장소 마스터 데이터 (한자, 주소 중복 방지를 위해 이곳에 통합)
  , spots: {
    "pudong_airport": { name_ko: "상해 푸동 국제공항", name_zh: "上海浦东国际机场", addr: "浦东新区" }
    , "hotel_jinglai": { name_ko: "징라이 호텔 부쉐", name_zh: "京莱酒店·轻奢", addr: "上海市静安区曲阜路9弄66号", tip: "曲阜路역 5번 출구 도보권, 인민광장 도보 5분" }
    , "nanjing_road": { name_ko: "난징동루 보행가", name_zh: "南京东路步行街", addr: "上海市黄浦区南京东路", tip: "7월 낮엔 폭염 — 오후 4~5시 이후 걷기 추천" }
    , "the_bund": { name_ko: "와이탄", name_zh: "外滩(中山东一路)", addr: "上海市黄浦区中山东一路", tip: "건물 조명은 보통 19~22(23)시 점등, 상해 대표 야경 데이트" }
    , "oriental_pearl": { name_ko: "동방명주", name_zh: "东方明珠广播电视塔", addr: "上海市浦东新区世纪大道1号", tip: "와이탄→푸동은 황푸강 도도륜 페리(2위안) 추천, 저렴하고 낭만적" }
    , "disneyland": { name_ko: "상하이 디즈니랜드", name_zh: "上海迪士尼乐园", addr: "上海市浦东新区川沙新镇黄赵路310号", tip: "오픈런 필수! 앱으로 실시간 대기시간 확인. 불꽃놀이는 보통 20~20:30시" }
    , "kr_provisional_gov": { name_ko: "대한민국 임시정부 청사", name_zh: "大韩民国临时政府旧址", addr: "上海市黄浦区马当路306弄4号", tip: "오전에 방문하면 비교적 한산함" }
    , "xintiandi": { name_ko: "신천지", name_zh: "新天地", addr: "上海市黄浦区太仓路181弄", tip: "임시정부 바로 옆 — 점심·카페 타임 좋음" }
    , "wukang_road": { name_ko: "우캉루(우캉맨션)", name_zh: "武康大楼(武康路)", addr: "上海市徐汇区淮海中路1850号", tip: "플라타너스 가로수길 스냅 명소, 늦은 오후 추천" }
    , "yuyuan": { name_ko: "예원", name_zh: "豫园", addr: "上海市黄浦区福佑路168号", tip: "전통 정원·상점가, 기념품·탕후루 구경하기 좋음" }
    , "tianzifang": { name_ko: "티엔즈팡", name_zh: "田子坊", addr: "上海市黄浦区泰康路210弄", tip: "골목 아트샵·카페, 여인크림·차 선물 사기 좋음" }
  }
  , timelines: [
    {
      day: 1, date: "07/16 (목)", desc: "상해 입국 & 랜드마크 야경"
      , items: [
        { time: "13:45", type: "transport", spotId: "pudong_airport", memo: "인천 12:35 출발 → 상해 13:45 도착(현지시간)" }
        , { time: "15:00", type: "hotel", spotId: "hotel_jinglai", memo: "체크인 & 짐 풀기" }
        , { time: "16:30", type: "shopping", spotId: "nanjing_road", memo: "난징동루에서 와이탄까지 도보 15~20분" }
        , { time: "19:00", type: "sight", spotId: "the_bund", memo: "건물 조명 점등 시간대에 맞춰 산책" }
        , { time: "20:30", type: "sight", spotId: "oriental_pearl", memo: "페리로 황푸강 건너서 야경 감상 🌉" }
      ]
    }
    , {
      day: 2, date: "07/17 (금)", desc: "상하이 디즈니랜드 올데이"
      , items: [
        { time: "08:00", type: "sight", spotId: "disneyland", memo: "오픈런! 평일이지만 7월 방학 시즌이라 붐빌 수 있음" }
        , { time: "20:00", type: "sight", spotId: "disneyland", memo: "일루미네이션 불꽃놀이 관람 — 중간중간 실내에서 휴식 필수" }
      ]
    }
    , {
      day: 3, date: "07/18 (토)", desc: "조계지 트렌디 & 역사 코스"
      , items: [
        { time: "10:00", type: "sight", spotId: "kr_provisional_gov", memo: "오전 한산할 때 차분하게 관람" }
        , { time: "12:30", type: "food", spotId: "xintiandi", memo: "점심 식사 & 커피 한잔" }
        , { time: "16:00", type: "sight", spotId: "wukang_road", memo: "우캉맨션 앞에서 인생샷 남기기" }
      ]
    }
    , {
      day: 4, date: "07/19 (일)", desc: "귀국일 — 오전 미정, 오후 출국"
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
    vouchers: [
      { id: "v_hotel", title: "호텔 바우처", image: "/assets/vouchers/hotel.webp" }
    ]
    // 클룩 예약 바우처 요약 — 원문 PDF는 길어서 접이식 카드로 핵심만 정리
    , voucherDetails: [
      {
        id: "flight_info"
        , icon: "✈️"
        , title: "항공권 정보 (2인)"
        , subtitle: "2026-07-16 ~ 2026-07-19 · 주문번호 1111-851-777"
        , sections: [
          { heading: "가는편", lines: ["2026-07-16 (목) 12:35 인천(ICN) 출발 → 13:45 상하이(PVG) 도착 (2시간 10분)"] }
          , { heading: "오는편", lines: ["2026-07-19 (일) 16:50 상하이(PVG) 출발 → 20:05 인천(ICN) 도착 (2시간 15분)"] }
          , {
            heading: "탑승객"
            , lines: ["CHO SEOHYUN (전자항공권 7849553235726)", "KIM MINKYEOM (전자항공권 7849553235727)"]
          }
          , {
            heading: "수하물"
            , lines: ["개인 물품 1개", "기내 수하물 1개 · 8kg (20×40×55cm)", "위탁 수하물 1개 · 23kg"]
          }
          , { heading: "예약처", lines: ["Mytrip · 주문번호 1111-851-777"] }
          , { heading: "연락처", lines: ["seohyun0002@naver.com", "+82 10-8612-0435"] }
        ]
      }
      , {
        id: "disneyland_ticket"
        , icon: "🎢"
        , title: "상하이 디즈니랜드 티켓 (2인)"
        , subtitle: "2026-07-17 · 예약번호 KQB082145"
        , qrImage: "/assets/vouchers/disneyland_qr.png"
        , sections: [
          {
            heading: "패키지"
            , lines: [
              "1일 파크 입장권"
              , "프리미어 액세스 1회 — 트론 라이트사이클 파워 런 (신장 122cm 이상)"
              , "[무료] 프리미어 액세스 1회 — 피터팬 플라이트 (신장 81cm 이상)"
            ]
          }
          , {
            heading: "예약자"
            , lines: ["CHO SEOHYUN (여권 M14244396)", "KIM MINKYEOM (여권 M443F8019)"]
          }
          , { heading: "바우처 번호", lines: ["GAL0022078703363200"] }
          , { heading: "운영시간", lines: ["매일 08:30~21:30 (입장 마감 20:00)"] }
          , {
            heading: "사용방법"
            , lines: [
              "정문에서 실물 여권 원본 + 바우처 QR 제시 → 실물 티켓으로 교환"
              , "QR코드가 1개만 발급되므로 일행 전원이 함께 입장해야 함"
              , "프리미어 액세스는 상하이 디즈니 공식 앱 또는 티켓 QR 스캔, 지정 어트랙션에 1회만 사용 가능"
            ]
          }
          , {
            heading: "주의사항"
            , lines: ["예약 변경·취소·환불 불가", "실물 여권 원본 필수 (사본·디지털 이미지 불가)"]
          }
          , { heading: "문의", lines: ["+86-21-2099-8001 (현지 운영업체)"] }
        ]
      }
      , {
        id: "china_esim"
        , icon: "📶"
        , title: "중국 eSIM (무료 선물)"
        , subtitle: "5GB · 15일 · 데이터 전용 · 예약번호 HXE437008"
        , sections: [
          { heading: "커버리지", lines: ["중국 전역 (VPN 불필요)", "차이나 유니콤 / 차이나 텔레콤 · 4G/5G 속도제한 없음"] }
          , {
            heading: "유효기간"
            , lines: ["예약확정일로부터 180일 이내 개통 필요", "목적지 네트워크에 연결된 시점부터 15일 카운트다운 시작"]
          }
          , {
            heading: "설치 (출국 전, Wi-Fi 연결 상태에서)"
            , lines: [
              "① 클룩 앱 → 계정 → 예약내역 → 활성화"
              , "② 안내 확인 후 설치 시작 (이 시점엔 시간·데이터 차감 안 됨)"
              , "③ Wi-Fi 연결 상태에서 설치, 설치 중 화면 이탈 금지"
              , "④ 기본회선(Primary)·iMessage/FaceTime은 원래 유심 그대로 유지"
              , "⑤ 셀룰러 데이터 회선만 새 eSIM으로 전환 + '셀룰러 데이터 전환 허용' 끄기"
            ]
          }
          , {
            heading: "상해 도착 후"
            , lines: [
              "⑥ 설정 → 셀룰러에서 eSIM 활성화 + 데이터 로밍 켜기"
              , "⑦ 셀룰러 데이터를 eSIM으로 전환"
              , "⑧ 클룩 앱 예약내역에서 잔여 데이터·유효기간 확인 가능"
            ]
          }
          , { heading: "문의", lines: ["WhatsApp +65 66318453", "Line @redteago", "service@redteago.com"] }
        ]
      }
    ]
  }
};
