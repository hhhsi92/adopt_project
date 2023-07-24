export const commonLoader = ({ request }: { request: Request }) => {
  let url = new URL(request.url);
  let page = url.searchParams.get("page");
  let pageSize = url.searchParams.get("pageSize");
  let createDate = url.searchParams.get("createDate");
  let createDateStart = url.searchParams.get("createDateStart");
  let createDateEnd = url.searchParams.get("createDateEnd");
  let keywordCate = url.searchParams.get("keywordCate");
  let keyword = url.searchParams.get("keyword");
  let orderCate = url.searchParams.get("orderCate");
  let order = url.searchParams.get("order");

  let userUuid = url.searchParams.get("userUuid");
  let userNickname = url.searchParams.get("userNickname");
  let userName = url.searchParams.get("userName");

  let farmUuid = url.searchParams.get("farmUuid");
  let farmName = url.searchParams.get("farmName");
  let farmNo = url.searchParams.get("farmNo");

  return {
    page,
    pageSize,
    createDate,
    createDateStart,
    createDateEnd,
    keywordCate,
    keyword,
    orderCate,
    order,
    userUuid,
    userNickname,
    userName,
    farmUuid,
    farmName,
    farmNo,
  };
};

export interface commonLoaderType {
  page: string | null;
  pageSize: string | null;
  createDate: string | null;
  createDateStart: string;
  createDateEnd: string;
  keywordCate: string | null;
  keyword: string | null;
  orderCate: string | null;
  order: string | null;

  userUuid: string | null;
  userNickname: string | null;
  userName: string | null;

  farmUuid: string | null;
  farmName: string | null;
  farmNo: string | null;
}
