import { Oval } from "react-loader-spinner";
import styled from "styled-components";

export default function Loading() {
  return (
    <Container>
      <Oval
        height={30}
        width={30}
        color="var(--main-color)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#aaa"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </Container>
  );
}

export const ContentLoading = () => {
  return (
    <ContentContainer>
      <Oval
        height={24}
        width={24}
        color="var(--main-color)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#aaa"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </ContentContainer>
  );
};

const Container = styled.div`
  background: var(--white-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 120px;
  justify-content: center;
`;
