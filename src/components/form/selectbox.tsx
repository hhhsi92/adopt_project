import { CSSProperties } from "react";
import styled from "styled-components";

export interface SelectboxProps {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
  usePlaceholder?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}
export default function Selectbox(props: SelectboxProps) {
  const { name, value, options, onChange, usePlaceholder, disabled, style } = props;
  return (
    <StyledSelect
      name={name}
      onChange={(e) => onChange(e.target.value)}
      className="form_selectbox"
      value={value}
      style={style}
      disabled={disabled}
    >
      {usePlaceholder && (
        <option value={""} disabled>
          선택
        </option>
      )}
      {options.map((item) => {
        return (
          <option key={`option_${name}_${item.value}`} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  font-size: 13px;
  height: 28px;
  padding: 0 0.5em 0 0.3em;
  border: solid 1px var(--darkgray-border);

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
