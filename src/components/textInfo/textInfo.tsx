import styled from "styled-components";

export const TextInfoBox = styled.div`
  &.line {
    border: solid 1px var(--gray-border);
    padding: 12px;
  }
  & h2 {
    font-size: 14px;
    font-weight: 700;
  }
  & .item {
    display: flex;
    font-size: 13px;
    &:not(:first-child) {
      margin-top: 10px;
    }
    & .title {
      font-size: 13px;
      font-weight: 500;
      width: 100px;
      color: var(--gray-color);
    }
    & .content {
      flex: 1;
    }
  }
`;
