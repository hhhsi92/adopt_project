import { CSSProperties } from "react";
import styled from "styled-components";
import { colorTypes } from "../../common/Types";
import { Oval } from "react-loader-spinner";

export interface ButtonProps {
  title: string;
  onClick?: () => void;
  theme?: colorTypes;
  lightColor?: boolean;
  style?: CSSProperties;
  narrow?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}
export default function Button(props: ButtonProps) {
  const { title, theme, onClick, lightColor, style, narrow, type, disabled, isLoading } = props;
  const _theme = {
    color: lightColor ? (theme ? `--${theme}-color` : "--main-color") : "--white-color",
    background: lightColor ? (theme ? `--${theme}-bg` : "--main-bg") : theme ? `--${theme}-color` : "--main-color",
    height: narrow ? "26px" : "28px",
    padding: narrow ? "0 .6em" : "0 .8em",
    cursor: disabled ? "inherit" : "pointer",
  };

  return (
    <StyledButton theme={_theme} onClick={onClick} style={style} type={type ? type : "button"} disabled={disabled}>
      {isLoading && (
        <span className="spinner">
          <Oval
            height={12}
            width={12}
            color="var(--main-color)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#aaa"
            strokeWidth={10}
            strokeWidthSecondary={10}
          />
        </span>
      )}
      {title}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: relative;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  color: var(${(props) => props.theme.color});
  cursor: ${(props) => props.theme.cursor};
  background: var(${(props) => props.theme.background});
  height: ${(props) => props.theme.height};
  padding: ${(props) => props.theme.padding};

  @media screen and (max-width: 768px) {
    font-size: 0.65rem;
    min-width: 50px;
    width: auto;
    justify-content: center;
  }

  & .spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: lightgray;
  }
`;

StyledButton.defaultProps = {
  theme: {
    color: "--gray-color",
    background: "--gray-bg",
  },
};
