import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import { StringDate } from "@/common/Func";

interface Props {
  name: string;
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}
export default function DateSelector(props: Props) {
  const { name, value, onChange, disabled, maxDate, minDate } = props;

  return (
    <Container>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={new Date(value)}
        onChange={(date) => onChange(StringDate(date))}
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        name={name}
      />
    </Container>
  );
}

const Container = styled.div`
  & input {
    height: 28px;
    padding: 0 0.5em;
    border: solid 1px var(--darkgray-border);
    cursor: pointer;
  }
`;
