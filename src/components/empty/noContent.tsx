import styled from "styled-components";

interface Props {
  text?: string;
  background?: boolean;
}

export default function NoContent(props: Props) {
  const { text, background } = props;
  return (
    <>
      <Container style={{ background: background ? "var(--white-bg)" : undefined }}>
        <div className="wrap">
          <p>{text ? text : "표시할 정보가 없습니다."}</p>
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
  & .wrap {
    text-align: center;
    & p {
      font-size: 13px;
      color: var(--gray-color);
    }
  }
`;
