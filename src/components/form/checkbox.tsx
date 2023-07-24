import { CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  name: string;
  checked: boolean;
  label?: string;
  onChange: (val: boolean) => void;
  style?: CSSProperties;
}
export default function Checkbox(props: Props) {
  const { name, checked, label, onChange, style } = props;
  return (
    <StyledContainer style={style}>
      <input type="checkbox" checked={checked} id={name} onChange={() => onChange(!checked)} />
      {label && <label htmlFor={name}>{label}</label>}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: inline-block;

  & label {
    font-size: 13px;
    color: var(--darkgray-color);
  }
`;
