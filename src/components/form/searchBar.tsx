import styled from "styled-components";
import Selectbox, { SelectboxProps } from "./selectbox";
import Button from "../button/Button";

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
export default function SearchBar(props: SearchBarProps) {
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
}

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
