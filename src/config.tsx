export const apiKey = import.meta.env.VITE_API_KEY;

export type MenuData = {
  [index: string]: MenuDataItem[];
  setting: MenuDataItem[];
  protect: MenuDataItem[];
  board: MenuDataItem[];
  cowfarm: MenuDataItem[];
  extra: MenuDataItem[];
  commerce: MenuDataItem[];
  cowmarket: MenuDataItem[];
  homepage: MenuDataItem[];
};

export type MenuDataItem = {
  title: string;
  link: string;
  child?: MenuDataItem[];
};

export const menuData: MenuData = {
  setting: [
    { 
      title: "기본설정", 
      link: "/setting/config/marketticket",
      child: [
        { title: "우시장 구매권 설정", link: "/setting/config/marketticket" },
        { title: "회원등급 혜택 설정", link: "/setting/config/level" },
      ],
    },
    {
      title: "이용약관",
      link: "/setting/terms/use",
      child: [
        { title: "이용약관", link: "/setting/terms/use" },
        { title: "개인정보 수집", link: "/setting/terms/privacy" },
        { title: "소 정보 수집", link: "/setting/terms/cow" },
        { title: "서비스 안내 수신", link: "/setting/terms/guide" },
      ],
    },
  ],
  protect : [
    { title: "보호중이에요", link: "/protect/list" },
  ],
  board: [
    // 게시판 관리
    {
      title: "소통방",
      link: "/board/community/post",
      child: [
        { title: "소통방 게시글", link: "/board/community/post" },
        { title: "게시글/댓글 신고", link: "/board/community/report" },
        // { title: "사용자 신고", link: "/board/community/userReport" },
      ],
    },
    { title: "공지사항", link: "/board/notice" },
    { title: "키우소 문의하기", link: "/board/error" },
    { title: "앱 사용설명", link: "/board/guide" },
  ],
  cowfarm: [
    // 목장데이터
    {
      title: "목장 목록",
      link: "/cowfarm/farm/farmList",
      child: [
        { title: "전체 목장", link: "/cowfarm/farm/farmList" },
        { title: "젖소개량사업소 연동 내역", link: "/cowfarm/farm/dcic" },
      ],
    },

    {
      title: "기록관리",
      link: "/cowfarm/record/history",
      child: [
        { title: "전체 기록내역", link: "/cowfarm/record/history" },
        { title: "내보내기 내역", link: "/cowfarm/record/export" },
      ],
    },
    {
      title: "약품관리",
      link: "/cowfarm/medicine/info",
      child: [
        { title: "전체 약품목록", link: "/cowfarm/medicine/info" },
        { title: "목장 약품목록", link: "/cowfarm/medicine/farm" },
        { title: "성분 관리", link: "/cowfarm/medicine/ingredient" },
        { title: "제조사 관리", link: "/cowfarm/medicine/company" },
        { title: "약품 등록 신청", link: "/cowfarm/medicine/request" },
      ],
    },
    {
      title: "정액관리",
      link: "/cowfarm/semen/info",
      child: [
        { title: "전체 정액목록", link: "/cowfarm/semen/info" },
        { title: "목장 정액목록", link: "/cowfarm/semen/farm" },
      ],
    },
    { title: "우방관리", link: "/cowfarm/cowRoom" },
    { title: "오늘의 할 일", link: "/cowfarm/todo" },
    {
      title: "소 데이터",
      link: "/cowfarm/cow/users",
      child: [
        { title: "회원 소 데이터", link: "/cowfarm/cow/users" },
        { title: "DB 소 데이터", link: "/cowfarm/cow/database" },
        { title: "자동 업데이트 내역", link: "/cowfarm/cow/updated" },
        { title: "도축 성적", link: "/cowfarm/cow/butchery" },
      ],
    },
    { title: "알람관리", link: "/cowfarm/alarm" },
  ],
  extra: [
    // 부가기능
    { title: "배너관리", link: "/extra/banner" },
    { title: "팝업관리", link: "/extra/popup" },
    { title: "EPD관리", link: "/extra/epd" },
    // { title: "축산시세 정보", link: "/extra/price" },
    { title: "조합관리", link: "/extra/johap" },
  ],
  commerce: [
    // 목장물품
    { title: "상품관리", link: "/commerce/product" },
    { title: "상품광고관리", link: "/commerce/ad" },
    { title: "전화문의내역", link: "/commerce/call" },
    { title: "상품문의관리", link: "/commerce/inquiry" },
    { title: "주문내역", link: "/commerce/order" },
    { title: "목장물품 공지사항", link: "/commerce/notice" },
  ],
  cowmarket: [
    // 우시장관리
    { title: "우시장 목록", link: "/cowmarket/marketList" },
    { title: "우시장 수집정보", link: "/cowmarket/marketData" },
    { title: "구매권 충전 내역", link: "/cowmarket/ticket" },
    { title: "우시장 구매내역", link: "/cowmarket/purchase" },
  ],
  homepage: [
    // 홈페이지
    { title: "회사연혁", link: "/homepage/history" },
    {
      title: "문의하기",
      link: "/homepage/inquiry/recruit",
      child: [
        { title: "인재영입", link: "/homepage/inquiry/recruit" },
        { title: "기타문의", link: "/homepage/inquiry/etc" },
      ],
    },
  ],
};
