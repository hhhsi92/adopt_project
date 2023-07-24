import styled from "styled-components";
import { FcSupport } from "react-icons/fc";
import { CSSProperties } from "react";

interface Props {
  background?: boolean;
  height?: number;
  style?: CSSProperties;
}
export default function NotReady(props: Props) {
  const { background, height, style } = props;

  const _theme = {
    background: background ? "var(--gray-bg)" : undefined,
    height: height ? height : undefined,
  };

  return (
    <>
      <Container theme={_theme} style={style}>
        <div className="wrap">
          <FcSupport />
          <p>해당 콘텐츠는 준비중입니다.</p>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 80px;
  background: ${(props) => props.theme.background};
  height: ${(props) => props.theme.height}px;

  & .wrap {
    text-align: center;
    & svg {
      width: 26px;
      height: 26px;
      margin-bottom: 10px;
      color: var(--gray-color);
    }
    & p {
      font-size: 13px;
      color: var(--gray-color);
    }
  }
`;
