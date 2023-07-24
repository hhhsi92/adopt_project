import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { NativeSelect } from "@mui/material";
import queryString from "query-string";
import { CommaNumber } from "@/common/Func";

export const defaultPageSize = 10;

export default function RowInfo({
  allCount,
  pageSize,
  handlePageSize,
}: {
  allCount: number;
  pageSize: number;
  handlePageSize?: (pageSize: number) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigatePage = (pageSize: number) => {
    const currentParams = queryString.parse(location.search);
    currentParams.pageSize = pageSize.toString();
    const nativateURL = location.pathname + "?" + queryString.stringify(currentParams);
    navigate(nativateURL);
  };

  return (
    <StyledContainer>
      <p style={{ fontSize: 13 }}>전체 : {CommaNumber(allCount)}건</p>
      <NativeSelect
        value={pageSize}
        onChange={(e) => {
          navigatePage(parseInt(e.target.value, 10));
        }}
        style={{ fontSize: 13 }}
      >
        <option value={10}>10개씩</option>
        <option value={25}>25개씩</option>
        <option value={50}>50개씩</option>
        <option value={100}>100개씩</option>
      </NativeSelect>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
`;
