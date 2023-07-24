import { useCallback } from "react";

interface RadioTypeProps {
  name: string;
  value: string | null;
  data: { value: string | undefined; label: string }[];
  onChange: (val: string) => void;
}
export default function RadioList(props: RadioTypeProps) {
  const { name, value, data, onChange } = props;

  const handleCheck = useCallback(
    (_value: string) => {
      onChange(_value);
    },
    [onChange]
  );

  return (
    <div className="inputList">
      {data.map((item) => (
        <div key={`radio_${name}_${item.value}`}>
          <input
            type="radio"
            name={name}
            id={`radio_${name}_${item.value}`}
            checked={item.value === value}
            onChange={() => handleCheck(item.value)}
            value={item.value}
          />
          <label htmlFor={`radio_${name}_${item.value}`}>{item.label}</label>
        </div>
      ))}
    </div>
  );
}
