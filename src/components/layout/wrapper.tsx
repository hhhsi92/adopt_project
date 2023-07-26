import styled from "styled-components";

interface Props {
  children: any;
  left?: boolean;
}
export default function Wrapper(props: Props) {
  const { children, left } = props;
  const theme = {
    left,
  };
  return <Container theme={theme}>{children}</Container>;
}

const Container = styled.div`
  width: ${(props) => (props.theme.left ? "calc(100% - 80px)" : "85%")};
  max-width: 1200px;
  margin: ${(props) => (props.theme.left ? "0" : "0 auto")};

  @media all and (max-width: 768px) {
    width: calc(100% - 40px);
    // margin-left: ${(props) => (props.theme.left ? "20px" : "auto")};
  }
`;
