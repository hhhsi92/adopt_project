import { CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  justifyContent?: "flex-start" | "center" | "flex-end";
  marginTop?: boolean;
  children: any;
  style?: CSSProperties;
}
export default function ButtonList(props: Props) {
  const { justifyContent, marginTop, children, style } = props;
  const theme = {
    justifyContent: justifyContent ? justifyContent : "flex-start",
    marginTop: marginTop ? "20px" : "0",
  };
  return (
    <Container theme={theme} style={style}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => props.theme.justifyContent};
  margin-top: ${(props) => props.theme.marginTop};

  & button:not(:last-child) {
    margin-right: 6px;
  }
`;

Container.defaultProps = {
  theme: {
    justifyContent: "flex-start",
    marginTop: "20px",
  },
};
