import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  uri?: string;
  text?: string;
  onClick?: () => void;
  linkTo?: string;
  size?: string;
}
export default function ListImage(props: Props) {
  const { uri, text, onClick, linkTo, size } = props;
  return (
    <>
      {linkTo ? (
        <Link to={linkTo} style={{ display: "flex", fontWeight: "bold" }}>
          <Container onClick={onClick} className={size === "mini" ? "mini" : null}>
            {uri && <Image src={uri} alt="" style={uri.includes('null') || uri.includes('undefined') ? { display:'none'} : {display:''}}/>}
            {text && <Text>{text}</Text>}
          </Container>
        </Link>
      ) : (
        <Container onClick={onClick} className={size === "mini" ? "mini" : null}>
          {uri && <Image src={uri} alt="" style={uri.includes('null') || uri.includes('undefined') ? { display:'none'} : {display:''}}/>}
          {text && <Text>{text}</Text>}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--gray-border);
  border-radius: 10px;

  &:hover {
    transform: scale(1.5);
  }
`;
const Text = styled.span`
  margin-left: 5px;
  flex: 1;
`;
