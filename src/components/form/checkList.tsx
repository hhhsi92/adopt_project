import { useCallback } from "react";

interface CheckTypeProps {
  name: string;
  value: string[];
  data: { value: "all" | string; label: string }[];
  onChange: (val: string[]) => void;
  useAll?: boolean;
}
export default function CheckList(props: CheckTypeProps) {
  const { name, value, data, onChange, useAll } = props;

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

  return (
    <div className="inputList">
      {useAll && (
        <div key={`check_${name}_all`}>
          <input
            type="checkbox"
            name={name}
            id={`check_${name}_all`}
            checked={value.length >= data.length}
            onChange={() => handleAllCheck(value.length >= data.length)}
            value="전체"
            className="unsubmit"
          />
          <label htmlFor={`check_${name}_all`}>전체</label>
        </div>
      )}
      {data.map((item) => (
        <div key={`check_${name}_${item.value}`}>
          <input
            type="checkbox"
            name={name}
            id={`check_${name}_${item.value}`}
            checked={value.includes(item.value)}
            onChange={() =>
              handleSingleCheck(value.includes(item.value), item.value)
            }
            value={item.value}
          />
          <label htmlFor={`check_${name}_${item.value}`}>{item.label}</label>
        </div>
      ))}
    </div>
  );
}
