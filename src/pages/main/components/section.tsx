import styled from "styled-components";

interface Props {
  children: any;
}

export default function Section(props: Props) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const Container = styled.div`
  margin-top: 40px;
`;
