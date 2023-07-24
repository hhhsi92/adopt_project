import styled from "styled-components";
import { useState, useEffect } from "react";
import TextInput from "./textInput";

interface RangeSelectorProps {
  name: string;
  startNum: number;
  endNum: number;
  onStartNumChange: (num: number) => void;
  onEndNumChange: (num: number) => void;

  useRadio?: boolean;
  radioVal?: string;
  onRadioValChange?: (val: string) => void;
}
export default function RangeSelector(props: RangeSelectorProps) {
  const {
    name,
    startNum,
    endNum,
    onStartNumChange,
    onEndNumChange,

    useRadio,
    radioVal,
    onRadioValChange,
  } = props;
  const [error, setError] = useState(false);

  useEffect(() => {
    const numDiff = endNum - startNum;
    if (numDiff < 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [startNum, endNum]);

  return (
    <Container>
      {useRadio && (
        <>
          <div className="inputList">
            <div>
              <input
                type="radio"
                name={name}
                id={`radio_${name}_전체`}
                checked={radioVal === "전체" || !radioVal}
                onChange={() => onRadioValChange("전체")}
                value="전체"
              />
              <label htmlFor={`radio_${name}_전체`}>전체</label>
            </div>
            <div>
              <input
                type="radio"
                name={name}
                id={`radio_${name}_범위선택`}
                checked={radioVal === "범위선택"}
                onChange={() => onRadioValChange("범위선택")}
                value="범위선택"
              />
              <label htmlFor={`radio_${name}_범위선택`}>범위선택</label>
            </div>
          </div>
        </>
      )}
      <TextInput
        value={startNum.toString()}
        onChange={(value) => {
          if (value.length === 0) {
            onStartNumChange(0);
            return;
          }
          onStartNumChange(parseInt(value.replace(/,/gi, ""), 10));
        }}
        style={{ width: 100, paddingRight: 0 }}
        disabled={useRadio && radioVal === "전체"}
        name={`${name}Start`}
      />
      <label className="hyphen">-</label>
      <TextInput
        value={endNum.toString()}
        onChange={(value) => {
          if (value.length === 0) {
            onEndNumChange(0);
            return;
          }
          onEndNumChange(parseInt(value.replace(/,/gi, ""), 10));
        }}
        style={{ width: 100, paddingRight: 0 }}
        disabled={useRadio && radioVal === "전체"}
        name={`${name}End`}
      />
      {error && <p className="guide">유효하지 않은 범위입니다.</p>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

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
