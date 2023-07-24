import styled from "styled-components";
import Button, { ButtonProps } from "../button/Button";

interface Props {
  title: string;
  buttons?: ButtonProps[];
}

export default function PageHeader(props: Props) {
  const { title, buttons } = props;
  return (
    <Container>
      <h1>{title}</h1>
      {buttons && buttons.length > 0 && (
        <div className="buttonList">
          {buttons.map((button) => {
            return (
              <Button
                key={`pageHeader_button_${button.title}`}
                title={button.title}
                onClick={button.onClick}
                theme={button.theme}
                lightColor={button.lightColor}
              />
            );
          })}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h1 {
    letter-spacing: -0.02em;
    font-weight: 700;
    font-size: 18px;
  }
  & .buttonList {
    display: flex;
    & button:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
