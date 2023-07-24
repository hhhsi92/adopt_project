import styled from "styled-components";
import { useCallback } from "react";
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { StringDate, subtractDate } from "@/common/Func";
import Button from "../button/Button";

// 단일 체크박스
interface SingleCheckProps {
  id: string;
  checked: boolean;
  label?: string;
  onChange: (val: boolean) => void;
}
const SingleCheck = (props: SingleCheckProps) => {
  const { id, checked, label, onChange } = props;
  return (
    <div className="form_singleCheck">
      <input
        type="checkbox"
        checked={checked}
        id={id}
        onChange={() => onChange(!checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// 다중선택 리스트
interface CheckTypeProps {
  type: string;
  value: string[];
  data: { value: "all" | string; label: string }[];
  onChange: (val: string[]) => void;
  useAll?: boolean;
}
const CheckList = (props: CheckTypeProps) => {
  const { type, value, data, onChange, useAll } = props;

  const handleSingleCheck = useCallback(
    (checked: boolean, _value: string) => {
      if (checked) {
        onChange(value.filter((el) => el !== _value));
      } else {
        onChange([...value, _value]);
      }
    },
    [onChange, value]
  );

  const handleAllCheck = useCallback(
    (checked: boolean) => {
      if (checked) {
        onChange([]);
      } else {
        onChange(data.map((item) => item.value));
      }
    },
    [data, onChange]
  );

  return <div className="inputList"></div>;
};

// 단일선택 리스트
interface RadioTypeProps {
  type: string;
  value: string | null;
  data: { value: string | undefined; label: string }[];
  onChange: (val: string) => void;
}
const RadioList = (props: RadioTypeProps) => {
  const { type, value, data, onChange } = props;

  const handleCheck = useCallback(
    (_value: string) => {
      onChange(_value);
    },
    [onChange]
  );

  return <div className="inputList"></div>;
};

// 기간선택
interface PeriodSelectorProps {
  type: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;

  usePeriodYn?: boolean;
  periodYn?: string;
  onPeriodYnChange?: (periodYn: string) => void;
}
const PeriodSelector = (props: PeriodSelectorProps) => {
  const {
    type,
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

  return <div className="periodSelector"></div>;
};

// 범위선택
interface RangeSelectorProps {
  type: string;
  startNum: number;
  endNum: number;
  onStartNumChange: (num: number) => void;
  onEndNumChange: (num: number) => void;

  useRadio?: boolean;
  radioVal?: string;
  onRadioValChange?: (val: string) => void;
}
const RangeSelector = (props: RangeSelectorProps) => {
  const {
    type,
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

  return <div className="periodSelector"></div>;
};

// 검색
interface SearchBarProps {
  name: string;
  value: string;
  handleValue: (value: string) => void;
  onSearch: () => void;

  placeholder?: string;
  cate?: string;
  cateOptions?: SelectboxProps["options"];
  handleCate?: (cate: string) => void;
}
const SearchBar = (props: SearchBarProps) => {
  const {
    name,
    value,
    handleValue,
    onSearch,

    placeholder,
    cate,
    cateOptions,
    handleCate,
  } = props;
  return (
    <>
      <StyledSearchBar>
        <div className="inputArea">
          {cate && (
            <Selectbox
              name={`${name}Cate`}
              value={cate}
              onChange={handleCate}
              options={cateOptions}
            />
          )}
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.nativeEvent.key === "Enter") {
                onSearch();
              }
            }}
          />
        </div>
        <Button title="검색" theme="black" onClick={onSearch} />
      </StyledSearchBar>
    </>
  );
};

const StyledSearchBar = styled.div`
  display: flex;

  & .inputArea {
    display: flex;
    flex: 1;
    border: solid 1px var(--darkgray-border);

    & input {
      flex: 1;
      font-size: 14px;
      padding: 0 0.5em;
    }
  }
`;

// textInput
interface TextInputProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  maxLength?: number;
  style?: object;
  disabled?: boolean;
}
const TextInput = (props: TextInputProps) => {
  const {
    value,
    name,
    onChange,
    onSubmit,
    placeholder,
    maxLength,
    style,
    disabled,
  } = props;
  return <div className="form_textInput" style={{ ...style }}></div>;
};

// textarea
interface TextareaProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  maxLength?: number;
  style?: object;
}
const Textarea = (props: TextareaProps) => {
  const { name, value, onChange, onSubmit, placeholder, maxLength, style } =
    props;
  return <div className="form_textarea" style={{ ...style }}></div>;
};

// selectbox
interface SelectboxProps {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
  usePlaceholder?: boolean;
}
const Selectbox = (props: SelectboxProps) => {
  const { name, value, options, onChange, usePlaceholder } = props;
  return (
    <select
      name={name}
      onChange={(e) => onChange(e.target.value)}
      className="form_selectbox"
      value={value}
      style={{ padding: "0 .5em" }}
    >
      {options.map((item) => {
        return (
          <option value={item.value} key={`keyword_cate_${item.value}`}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

// 파일 선택
interface fileInputListProps {
  max: number;
  name: string;
  uploadedFiles: FileList;
  handleUploadedFiles: (Files: FileList) => void;
}
const FileInputList = (props: fileInputListProps) => {
  const { max, name, uploadedFiles, handleUploadedFiles } = props;

  const removeInput = (file: File) => {
    console.log("삭제", file);
    const dt = new DataTransfer();

    for (let _file of uploadedFiles) {
      if (_file !== file) {
        dt.items.add(_file);
      }
    }

    handleUploadedFiles(dt.files);
  };

  const handleChange = (files: FileList) => {
    if (files.length > max) {
      alert(`선택 가능한 최대 파일 개수는 ${max}개 입니다.`);
      return;
    }
    handleUploadedFiles(files);
  };

  return <div className="form_fileInput"></div>;
};

export {
  SingleCheck,
  CheckList,
  RadioList,
  PeriodSelector,
  RangeSelector,
  SearchBar,
  TextInput,
  Textarea,
  Selectbox,
  FileInputList,
};

const ErrorMessage = styled.span`
  color: var(--gray-color) !important;
  margin-left: 10px;
`;
