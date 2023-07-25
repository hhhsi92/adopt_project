import styled from "styled-components";

interface Props {
  title: string;
  titleContent?: any;
}
export default function TitleArea(props: Props) {
  const { title, titleContent } = props;

  return (
    <Container>
      <h2>{title}</h2>
      {titleContent}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: inline-block;
    width: 100%;
  }

  & h2 {
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
  }

  & .showMore {
    color: #888888;
    letter-spacing: -0.02em;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    margin-left: auto;

    & svg {
      vertical-align: middle;
      margin-top: -3px;
    }
  }
`;
