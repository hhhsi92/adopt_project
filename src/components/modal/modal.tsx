import { Modal as MUIModal } from "@mui/material";
import LargeButton, { ButtonProps } from "../button/largeButton";
import styled, { CSSProperties } from "styled-components";
import { ReactElement } from "react";

interface Props {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  children: any;
  width?: string;
  title?: string;
  subTitle?: string;
  buttons?: ButtonProps[];
  headerComponent?: ReactElement;
  footerComponent?: ReactElement;
  style?: CSSProperties;
}
export default function Modal(props: Props) {
  const { visible, handleVisible, children, width, title, subTitle, buttons, headerComponent, footerComponent, style } =
    props;

  return (
    <MUIModal open={visible} onClose={() => handleVisible(false)}>
      <Container style={{ ...style, width: width ? width : "500px" }}>
        <div className="titleArea">
          {title && <h2>{title}</h2>}
          {subTitle && <h3>{subTitle}</h3>}

          {headerComponent}
        </div>

        <div className="contentArea">{children}</div>

        {buttons && (
          <>
            <div className="buttonList">
              {buttons.map((button) => {
                return (
                  <LargeButton
                    key={`modalButtonList_${button.title}`}
                    title={button.title}
                    onClick={button.onClick}
                    theme={button.theme}
                    lightColor={button.lightColor}
                  />
                );
              })}
            </div>
          </>
        )}
        {footerComponent}
      </Container>
    </MUIModal>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px 20px;

  & .titleArea {
    margin-bottom: 10px;

    & h2 {
      font-weight: 700;
      font-size: 18px;
      line-height: 1.2;
      letter-spacing: -0.02em;
      opacity: 0.3;
    }

    & h3 {
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.02em;
      margin-top: 10px;
    }
  }

  & .contentArea {
    max-height: 50vh;
    overflow-y: auto;
  }

  & .buttonList {
    display: flex;
    margin-top: 20px;

    & *:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
