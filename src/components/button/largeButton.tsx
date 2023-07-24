import styled from "styled-components";
import { colorTypes } from "../../common/Types";

export interface ButtonProps {
  title: string;
  onClick?: () => void;
  theme?: colorTypes;
  lightColor?: boolean;
  style?: object;
}
export default function LargeButton(props: ButtonProps) {
  const { title, theme, onClick, lightColor, style } = props;
  const _theme = {
    color: lightColor
      ? theme
        ? `--${theme}-color`
        : "--main-color"
      : "--white-color",
    background: lightColor
      ? theme
        ? `--${theme}-bg`
        : "--main-bg"
      : theme
      ? `--${theme}-color`
      : "--main-color",
  };
  return (
    <>
      <StyledButton
        onClick={onClick}
        theme={_theme}
        style={style}
        disabled={!onClick}
      >
        {title}
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 100%;
  height: 45px;
  padding: 0 0.8em;

  color: var(${(props) => props.theme.color});
  background: var(${(props) => props.theme.background});
  &:disabled {
    background: var(--gray-border);
    color: var(--gray-color);
  }
`;

StyledButton.defaultProps = {
  theme: {
    color: "--gray-color",
    background: "--gray-bg",
  },
};
