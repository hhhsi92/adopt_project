import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface TextInputProps {
  name: string;
  value: string;
  onChange?: (val: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  maxLength?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
}
export default function TextInput(props: TextInputProps) {
  const { value, name, onChange, onSubmit, placeholder, maxLength, style, disabled, type } = props;
  return (
    <Container style={{ ...style }}>
      <input
        type={type || "text"}
        name={name}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        onSubmit={onSubmit}
        style={{ paddingRight: maxLength ? 60 : 10 }}
      />
      {maxLength && <span>{`${value.length} / ${maxLength}`}</span>}
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  background: var(--white-bg);
  border: 1px solid var(--darkgray-border);
  border-radius: 2px;
  width: 70%;
  height: 28px;

  & input {
    width: 100%;
    height: 100%;
    font-size: 13px;
    padding: 0 0.5em;

    &::placeholder {
      color: #aaa;
    }
  }

  & span {
    position: absolute;
    right: 4px;
    bottom: 2px;
    font-size: 13px;
    color: var(--gray-color);
  }
`;
