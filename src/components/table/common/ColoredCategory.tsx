import styled from "styled-components";
import { colorTypes } from "../../../common/Types";

interface Props {
  text: string;
  theme: colorTypes;
}

const Container = styled.span`
  color: var(--${(props) => props.theme.color}-color);
`;
const After = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: var(--${(props) => props.theme.color}-color);
  border-radius: 100%;
  margin-left: 2px;
  margin-bottom: 2px;
`;

Container.defaultProps = {
  theme: {
    color: "main",
  },
};
After.defaultProps = {
  theme: {
    color: "main",
  },
};

export default function ColoredCategory(props: Props) {
  const { text, theme } = props;

  const _theme = {
    color: theme ? theme : "main",
  };

  return (
    <Container theme={_theme}>
      {text}
      <After theme={_theme} />
    </Container>
  );
}
