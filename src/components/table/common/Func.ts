import { Location } from "react-router-dom";
import { SortDirection } from "@material-ui/core";
import queryString from "query-string";

export const getSortPageURL = (location: Location, property: string, order: SortDirection, orderCate: string) => {
  const isAsc = orderCate === property && order === "desc";
  const currentParams = queryString.parse(location.search);
  currentParams.orderCate = property;
  currentParams.order = isAsc ? "asc" : "desc";
  currentParams.page = "0";
  const navigateURL = location.pathname + "?" + queryString.stringify(currentParams);
  return navigateURL;
};
