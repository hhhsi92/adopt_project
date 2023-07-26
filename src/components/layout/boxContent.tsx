import styled from "styled-components";

export const FullBox = ({ title, titleContent, children }: { title?: string; titleContent?: any; children?: any }) => {
  return (
    <StyledFullBox>
      <div className="titleArea">
        <h2>{title}</h2>
        {titleContent}
      </div>
      {children}
    </StyledFullBox>
  );
};

interface BorderBoxProps {
  children: any;
  style?: React.CSSProperties;
}
export const BorderBox = ({ children, style }: BorderBoxProps) => {
  return <StyledBorderBox style={{ ...style }}>{children}</StyledBorderBox>;
};

export const HalfWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & > * {
    width: calc(50% - 10px);
    & > .boxContent {
      height: 240px;
      overflow: auto;
      margin-top: 15px;
      position: relative;
    }
  }
`;

const StyledFullBox = styled.div`
  box-shadow: 0px 1px 12px rgb(0 0 0 / 9%);
  background: white;
  padding: 30px 50px;
  margin-top: 30px;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }

  & .titleArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;

    & h2 {
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.02em;
    }
  }
`;

const StyledBorderBox = styled.div`
  border: solid 1px var(--darkgray-border);
  padding: 12px;
  font-size: 14px;
  white-space: pre-line;
`;
