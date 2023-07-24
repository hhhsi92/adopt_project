import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import "./searchFilter.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../button/Button";
import { Form } from "react-router-dom";

export default function SearchFilter({ children }: { children: any }) {
  const loaderData = useLoaderData();
  const disableInputs = () => {
    const inputs = document.querySelectorAll(
      "input.unsubmit"
    ) as NodeListOf<HTMLInputElement>;
    for (const input of inputs) {
      input.disabled = true;
    }
  };

  const enableInputs = () => {
    const inputs = document.querySelectorAll(
      "input.unsubmit"
    ) as NodeListOf<HTMLInputElement>;
    for (const input of inputs) {
      input.disabled = false;
    }
  };

  useEffect(() => {
    enableInputs();
  }, [loaderData]);

  return (
    <Form name="searchFilter" onSubmit={disableInputs}>
      <div className="searchFilter">{children}</div>
    </Form>
  );
}

export function SearchLine({ children }: { children: any }) {
  return <div className="line">{children}</div>;
}

interface SearchKeywordProps {
  selectOptions?: { value: string; label: string }[];
  selectCate: string;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onOptionChange: (value: string) => void;
  onSearch?: () => void;
}
const SearchKeyword = (props: SearchKeywordProps) => {
  const {
    selectOptions,
    selectCate,
    keyword,
    onKeywordChange,
    onOptionChange,
    onSearch,
  } = props;
  return (
    <div className="searchKeywordWrap">
      <div className="searchKeyword">
        <select
          name="keywordCate"
          onChange={(e) => onOptionChange(e.target.value)}
          value={selectCate}
        >
          {selectOptions && selectOptions.map((item) => {
            return (
              <option value={item.value} key={`keyword_cate_${item.value}`}>
                {item.label}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="keyword"
          className="keyword"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSearch && onSearch()}
        />
      </div>
      <Button
        title="검색"
        style={{ marginLeft: 5 }}
        theme="darkgray"
        type="submit"
        onClick={onSearch}
      />
    </div>
  );
};

export { SearchKeyword };
