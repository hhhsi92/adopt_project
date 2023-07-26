import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { StringDate, subtractDate } from "@/common/Func";

interface PeriodSelectorProps {
  name: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;

  usePeriodYn?: boolean;
  periodYn?: string;
  onPeriodYnChange?: (periodYn: string) => void;
}
export default function PeriodSelector(props: PeriodSelectorProps) {
  const {
    name,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,

    usePeriodYn,
    periodYn,
    onPeriodYnChange,
  } = props;
  const [error, setError] = useState(false);

  useEffect(() => {
    const dateDiff = subtractDate(new Date(endDate), new Date(startDate));
    if (dateDiff < 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [startDate, endDate]);

  return (
    <Container className="periodSelector">
      {usePeriodYn && (
        <>
          <div className="inputList">
            <div>
              <input
                type="radio"
                name={name}
                id={`radio_${name}_전체`}
                checked={periodYn === "전체" || !periodYn}
                onChange={() => onPeriodYnChange("전체")}
                value="전체"
              />
              <label htmlFor={`radio_${name}_전체`}>전체</label>
            </div>
            <div>
              <input
                type="radio"
                name={name}
                id={`radio_${name}_기간선택`}
                checked={periodYn === "기간선택"}
                onChange={() => onPeriodYnChange("기간선택")}
                value="기간선택"
              />
              <label htmlFor={`radio_${name}_기간선택`}>기간선택</label>
            </div>
          </div>
        </>
      )}
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={new Date(startDate)}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        onChange={(date) => onStartDateChange(StringDate(date))}
        selectsStart
        maxDate={new Date()}
        disabled={usePeriodYn && periodYn === "전체"}
        name={`${name}Start`}
        className="datepicker_input"
      />
      <label className="hyphen">-</label>
      <DatePicker
        locale={ko}
        dateFormat="yyyy-MM-dd"
        selected={new Date(endDate)}
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        onChange={(date) => onEndDateChange(StringDate(date))}
        selectsEnd
        // maxDate={new Date()}
        disabled={usePeriodYn && periodYn === "전체"}
        name={`${name}End`}
        className="datepicker_input"
      />
      {error && <span className="guide">종료 날짜를 확인해주세요.</span>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: inline-grid;
  }

  & .hyphen {
    font-weight: 500;
    font-size: 13px;
    color: #888888;
    margin: 0 0.4em;
  }

  & .guide {
    color: var(--gray-color) !important;
    margin-left: 10px;
    font-size: 13px;
  }
`;
