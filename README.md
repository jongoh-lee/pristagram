# pristagram
Clone insta with React + Prisma + Graphql + Nodejs

#기능

개발 순서
1. 로그인/ 회원가입 구현
2. 내 정보 등록하기
3. Post 기능 구현
4. like/follow/ comment 구현
5. 

리펙토링 추가
1. 테마 컬러 변경/ Context에 추가(Component에서 State 변경 가능)
2. 탈퇴/ 아이디 찾기
3. 

1. User 기능!!!!!!!!!!!!!!!!!!

- Auth
[-] 회원가입(이메일/ 전화번호/ 아이디/ 이름/ 생년월일)
[-] 로그인 인증키 생성/ 만료
[ ] 로그인 인증키 입력
[ ] 아이디 찾기
[ ] 탈퇴하기

- My Info
[ ] 내 프로필 보기
[-] 내 정보 등록/변경하기
[-] 내 위치 등록하기 => 지하철역 기준
[-] 내 팔로워/ 팔로잉 보기 
[-] 내 소개/ 아바타 추가하기
[-] 지갑(포인트) 보기 > 결제 기능과 합치기
[ ] 새로운 소식 > 나중에

- User Connection
[ ] User 찾기/ 업체 찾기 / 추가: 해시태그, 장소 검색
[ ] 리뷰 보기
[-] 좋아요/ 좋아요 취소
[-] 댓글 달기
[ ] User 프로필 보기
[-] 팔로우/ 언팔로우
[ ] 피드 보기 *

- Franhcise Connection
[-] 단골 등록하기
[-] 사진 올리기
[ ] 리뷰 수정하기
[-] 포인트 적립하기
[ ] 단골 영업정보 받기

- Owner Connection
[-] 주변 음식점으로 등록하기


2. Franchise 기능!!!!!!!!!!!!!!!

- 프로필 사전 신청
[-] 프로필 참/ 거짓
[-] 메인메뉴(이름/가격/할인가격)
[-] 메뉴 소개
[-] 업체 컨셉
[-] 경력 소개

- 프로필
[ ] 프로필 등록/수정하기
[ ] 사업자 인증- 근로 제공자 이미지 인증/ 계좌 등록
[ ] 홍보하기
[ ] 단골 보기

- Franchise Connection
[ ] 프로필 프랜차이즈 올리기
[ ] 프로필에 아이디 추가하기
[ ] 추가된 아이디 권한

- Owner Connection
[ ] 공유 음식점 검색
[ ] 공유 음식점 즐겨찾기
[ ] 공유 음식점 예약
[ ] 결제/ 예약 취소
[ ] 댓글 달기

- 채팅
[ ] 채팅(프랜차이즈) 방 나가기
[ ] 내용 삭제하기
[ ] 알람 끄기
[ ] 차단하기
[ ] 신고하기

3. Owner 기능!!!!!!!!!!!!!!!

- 음식점 사전 신청
[ ] 공유 음식점 참/ 거짓
[ ] 음식점 이미지 3개
[ ] 음식점 위치
[ ] 남은 계약 기간/ 최소 계약 기간 1년 권리금 포기 계약

- 공유 음식점 등록
[ ] 공유 음식점 등록/ 수정
[ ] 사업자 인증- 사업장 + 이미지 인증/ 계좌 등록

- 채팅
[ ] 채팅(프랜차이즈) 방 나가기
[ ] 내용 삭제하기
[ ] 알람 끄기
[ ] 차단하기
[ ] 신고하기

- 가격 정보 등록
[ ] 영업 불가=기본 설정/ 직접 영업/ 가격 설정/ 초기화
[ ] 예약 현황 확인
[ ] 월별 수익 확인

4. 공통기능
- 탈퇴하기
- 신고하기
- 로그아웃
- 알림설정
- 테마 변경

5. facility 연습
type Facility {
  id: ID! @id
  owner: Owner! @relation(link:TABLE)
  #fridgeBox
  size_25: Boolean! @default(value: "false")
  size_30: Boolean! @default(value: "false")
  size_45: Boolean! @default(value: "false")
  size_65: Boolean! @default(value: "false")
  fridgeBox_ect: Boolean! @default(value: "false")
  #fidge
  showcase: Boolean! @default(value: "false")
  table: Boolean! @default(value: "false")
  vat: Boolean! @default(value: "false")
  kimchi: Boolean! @default(value: "false")
  tuna: Boolean! @default(value: "false")
  wine: Boolean! @default(value: "false")
  ice_cream: Boolean! @default(value: "false")
  fridge_ect: Boolean! @default(value: "false")
  #fire
  lower_stove: Boolean! @default(value: "false")
  chinese_stove: Boolean! @default(value: "false")
  gas_stove: Boolean! @default(value: "false")
  house_stove: Boolean! @default(value: "false")
  induction: Boolean! @default(value: "false")
  fire_ect: Boolean! @default(value: "false")
  #griller
  fire_above: Boolean! @default(value: "false")
  fire_below: Boolean! @default(value: "false")
  charcoal: Boolean! @default(value: "false")
  griller_ect: Boolean! @default(value: "false")
  #griddle
  size_600: Boolean! @default(value: "false")
  size_900: Boolean! @default(value: "false")
  size_1200: Boolean! @default(value: "false")
  size_1500: Boolean! @default(value: "false")
  griddle_ect: Boolean! @default(value: "false")
  #fryer
  electric: Boolean! @default(value: "false")
  gas:Boolean! @default(value: "false")
  fryer_ect:Boolean! @default(value: "false")
  #oven
  deck: Boolean! @default(value: "false")
  convection: Boolean! @default(value: "false")
  steam_convection: Boolean! @default(value: "false")
  combi_steamer: Boolean! @default(value: "false")
  oven_ect: Boolean! @default(value: "false")
  #cafe
  espresso_machine: String
  coffee_bean_grinder: String
  roasting_machine: String
  ice_maker: String
  ice_shaver: String
  water_heater: String
  blender: String
  cafe_ect: String
  #electronics
  rice_cooker: Boolean! @default(value: "false")
  soup_heater: Boolean! @default(value: "false")
  dish_washer: Boolean! @default(value: "false")
  microwave: Boolean! @default(value: "false")
  take_out_packing: Boolean! @default(value: "false")
  induction_small: Boolean! @default(value: "false")
  blender_small: Boolean! @default(value: "false")
  food_warmer: Boolean! @default(value: "false")
  dough_machine: Boolean! @default(value: "false")
  fermenter: Boolean! @default(value: "false")
  noodle_cooker: Boolean! @default(value: "false")
  noodle_maker: Boolean! @default(value: "false")
  pasta_noodle_maker: Boolean! @default(value: "false")
  cold_noodle_maker: Boolean! @default(value: "false")
  soda_dispenser: Boolean! @default(value: "false")
  soft_cone_machine: Boolean! @default(value: "false")
  beer_dispenser: Boolean! @default(value: "false")
  #tableware
  spoon_holder: Boolean! @default(value: "false")
  napkin_holder: Boolean! @default(value: "false")
  seasoning_container: Boolean! @default(value: "false")
  wet_wipe: Boolean! @default(value: "false")
  opener: Boolean! @default(value: "false")
  spoon: Boolean! @default(value: "false")
  chopsticks: Boolean! @default(value: "false")
  fork: Boolean! @default(value: "false")
  knife: Boolean! @default(value: "false")
  tray: Boolean! @default(value: "false")
  water_bottle: Boolean! @default(value: "false")
  kettle: Boolean! @default(value: "false")
  가스버너: Boolean! @default(value: "false")
  호출벨: Boolean! @default(value: "false")
} 