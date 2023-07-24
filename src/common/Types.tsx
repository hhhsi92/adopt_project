export type colorTypes =
  | "red"
  | "blue"
  | "pink"
  | "green"
  | "brown"
  | "orange"
  | "yellow"
  | "purple"
  | "gray"
  | "darkgray"
  | "black";


export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  timestamp: string;
};

export interface DataProps {
  desertionNo: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
  noticeComment: string;
}
  

export type Token = {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
  idToken: string;
  notBeforePolicy: number;
  sessionState: string;
  scope: string;
  userToken: string;
};

