# 오프라인 에셋 폴더

여행 전에 아래 파일들을 채워 넣으세요. 빌드 시 서비스 워커가 전부 프리캐싱하므로
**빌드/배포 후 최초 1회 접속**만 하면 비행기 모드에서도 전부 열립니다.

| 경로 | 내용 |
|---|---|
| `maps/hotel.webp` | 징라이 호텔 부쉐 주변 고덕지도(Amap) 캡처 |
| `maps/nanjing_road.webp` | 난징동루 보행가 주변 고덕지도 캡처 |
| `maps/the_bund.webp` | 와이탄 주변 고덕지도 캡처 |
| `maps/oriental_pearl.webp` | 동방명주 주변 고덕지도 캡처 |
| `maps/disneyland.webp` | 상하이 디즈니랜드 주변 고덕지도 캡처 |
| `maps/kr_provisional_gov.webp` | 대한민국 임시정부 청사 주변 고덕지도 캡처 |
| `maps/xintiandi.webp` | 신천지 주변 고덕지도 캡처 |
| `maps/wukang_road.webp` | 우캉루(우캉맨션) 주변 고덕지도 캡처 |
| `maps/yuyuan.webp` | 예원 주변 고덕지도 캡처 |
| `maps/tianzifang.webp` | 티엔즈팡 주변 고덕지도 캡처 |
| `maps/metro.webp` | 상해 지하철 노선도 |
| `vouchers/hotel.webp` | 호텔 예약 확인증 캡처 |

- 포맷은 `webp` 권장 (용량 절약). 파일명은 `src/data/travelData.js`의 경로와 일치해야 합니다.
- 새 장소/바우처를 추가하면 `travelData.js`에 항목을 추가하고 여기에 이미지를 넣으면 끝.
- 일요일(귀국일) 오전 일정은 아직 미정 — `travelData.js`의 `undecided`에서 정리 중. 정해지면 해당 항목을 `timelines`의 4일차로 옮기세요.
