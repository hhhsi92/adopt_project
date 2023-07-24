import { CSSProperties } from "react";
import styled from "styled-components";

interface TextareaProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  maxLength?: number;
  style?: CSSProperties;
}
export default function Textarea(props: TextareaProps) {
  const { name, value, onChange, onSubmit, placeholder, maxLength, style } =
    props;
  return (
    <Container style={style} className="form_textarea">
      <textarea
        name={name}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onSubmit={onSubmit}
      />
      {maxLength && <span>{`${value.length} / ${maxLength}`}</span>}
    </Container>
  );
}

const Container = styled.div`
	position: relative;
    background: var(--white-bg);
    border: 1px solid var(--darkgray-border);
    border-radius: 2px;
    width: 70%;
    height: 75px;
    padding-bottom: 20px;

	& textarea{
		padding: 0.5em;
		width: 100%;
		height: 100%;
		font-size: 13px;

    &::placeholder {
      color: #aaa;
    }
	}

	& span{
		position: absolute;
    right: 4px;
    bottom: 4px;
    font-size: 13px;
    color: var(--gray-color);
	}
}
`;
