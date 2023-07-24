import styled from "styled-components";
import Textarea from "../form/textarea";
import Button from "../button/Button";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  content: string;
  handleContent: (content: string) => void;
  onSubmit: () => void;
  style?: CSSProperties;
}
export default function CommentWrite(props: Props) {
  const { content, handleContent, onSubmit, style } = props;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
    } catch (err) {}
    navigate(0);
    setIsLoading(false);
  };

  return (
    <Container style={style}>
      <Textarea
        name="content"
        value={content}
        onChange={(val) => handleContent(val)}
        placeholder="답글을 작성해주세요."
        style={{ fontSize: 14, paddingBottom: 0 }}
      />
      <Button
        title="등록"
        theme={"black"}
        style={{ marginLeft: 5, height: 75 }}
        onClick={handleSave}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  & .form_textarea {
    width: 100%;
    flex: 1;
  }
`;
