import * as React from "react";
import styled from "styled-components";
import { Pagination } from "@mui/material";

interface Props {
  count: number;
  page: number;
  onChange: (page: number) => void;
}
export default function Pager(props: Props) {
  const { count, page, onChange } = props;
  return (
    <StyledContainer>
      <Pagination
        boundaryCount={1}
        count={count}
        siblingCount={5}
        page={page + 1}
        onChange={(e, page) => onChange(page - 1)}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-top: 20px;
`;
