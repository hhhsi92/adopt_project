import styled from "styled-components";
import { useEffect } from "react";
import { Location, NavigateFunction, useLocation } from "react-router-dom";
import { Pagination as MUIPagination } from "@mui/material";
import queryString from "query-string";

export const navigatePage = (page: number, location: Location, navigate: NavigateFunction) => {
  const currentParams = queryString.parse(location.search);
  currentParams.page = page.toString();
  const nativateURL = location.pathname + "?" + queryString.stringify(currentParams);
  navigate(nativateURL);
};

interface Props {
  allCount: number;
  pageSize: number;
  page: number;
  onChange: (page: number) => void;
  handleDefaultPage?: (page: number) => void;
  siblingCount?: number;
}

export default function Pagination({ allCount, pageSize, page, onChange, handleDefaultPage, siblingCount }: Props) {
  const location = useLocation();

  useEffect(() => {
    if (!handleDefaultPage) {
      return;
    }

    const currentParams = queryString.parse(location.search);
    const _page: number = +currentParams.page;
    handleDefaultPage(_page ? _page : 1);
  }, [handleDefaultPage, location]);
  // console.log(Math.ceil(allCount), Math.ceil(pageSize));
  return (
    <StyledContainer>
      <MUIPagination
        boundaryCount={1}
        count={Math.ceil(allCount / pageSize)}
        siblingCount={siblingCount ? siblingCount : 5}
        page={page}
        onChange={(e, page) => onChange(page)}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-top: 20px;
  & ul {
    justify-content: center;
  }
`;
