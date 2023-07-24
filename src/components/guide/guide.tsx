import styled from "styled-components";
import { colorTypes } from "@/common/Types";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

interface Props {
  children: any;
  theme?: colorTypes;
  noBox?: boolean;
  style?: CSSProperties;
  marginTop?: boolean;
}

export default function Guide(props: Props) {
  const { children, theme, noBox, style, marginTop } = props;

  let color = "var(--main-color)";
  if (theme) {
    color = `var(--${theme}-color)`;
  }

  let background = "var(--main-bg)";
  if (noBox) {
    background = "none";
  } else {
    if (theme) {
      background = `var(--${theme}-bg)`;
    }
  }

  const styleTheme = {
    color,
    padding: noBox ? 0 : "1em",
    background,
    marginTop: marginTop ? "10px" : 0,
  };

  return (
    <Container theme={styleTheme} style={style}>
      {children}
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.background};
  font-size: 13px;
  line-height: 1.4;
  padding: ${(props) => props.theme.padding};
  color: ${(props) => props.theme.color};
  margin-top: ${(props) => props.theme.marginTop};
`;
