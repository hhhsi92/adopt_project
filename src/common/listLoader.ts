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
}
