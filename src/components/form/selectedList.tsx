import styled from "styled-components";
import { IoClose } from "react-icons/io5";

export interface SelectedItem {
  value: string | number;
  label: string;
}
interface SelectedListProps {
  items: SelectedItem[];
  removeItem: (item: SelectedItem) => void;
}

export default function SelectedList(props: SelectedListProps) {
  const { items, removeItem } = props;

  return (
    <StyledSelectedList>
      {items.map((item) => {
        return (
          <div className="item" key={`selected_item_${item.value}`}>
            {item.label}
            <button className="icon" onClick={() => removeItem(item)}>
              <IoClose />
            </button>
          </div>
        );
      })}
    </StyledSelectedList>
  );
}

const StyledSelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  & .item {
    display: flex;
    align-items: center;
    background: var(--gray-bg);
    font-size: 13px;
    padding: 0.4em 0.4em 0.4em 0.6em;
    color: var(--darkgray-color);
    border-radius: 5px;
    margin-top: 6px;

    &:not(:last-child) {
      margin-right: 6px;
    }

    & .icon {
      margin-left: 4px;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        margin-top: -1px;
        color: #aaa;
      }
    }
  }
`;
