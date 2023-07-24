import styled from "styled-components";
import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import Button from "../button/Button";
import SmallTable from "../table/common/smallTable";
import NoContent from "../empty/noContent";
import Modal from "../modal/modal";
import { SearchBar } from "@components/form/form";
import Pagination from "../pagination/pagination";
import api from "@/common/API";

export interface ingredient {
  uuid: string;
  nameKr: string;
  nameEn: string;
  createDate: string;
}

interface FormProps {
  showModal: () => void;
}

export const Form = (props: FormProps) => {
  const { showModal } = props;
  return (
    <StyledForm>
      <Button title="성분 추가" onClick={showModal} />
    </StyledForm>
  );
};

const StyledForm = styled.div`
  & .selected {
    background: var(--main-bg);
    margin-top: 10px;
    padding: 0.6em 0.8em;
    font-size: 13px;
    & em {
      margin-right: 10px;
      color: var(--main-color);
      font-weight: 600;
    }
    & a {
      color: var(--darkgray-color);
    }
  }
`;

interface FinderProps {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
  onSelect: (ingredient: ingredient) => void;
}
export default function MedicineIngredientFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect } = props;
  const pageSize = 10;

  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [ingredients, setingredients] = useState<ingredient[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getIngredients = async () => {
      const params = {
        pageNo: page,
        pageSize,
        keyword: newKeyword,
      };
      const {
        data: { data },
      } = await api.get(`v1/adm/medicine/ingredient`, {
        params,
      });
      setAllCount(data.totalElements);
      setingredients(data.content);
    };

    getIngredients();
  }, [newKeyword, page]);

  const handleSelect = (item: ingredient) => {
    handleVisible(false);
    onSelect(item);
  };

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="성분을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="성분명으로 검색하세요."
            onSearch={() => setNewKeyword(keyword)}
          />
        </div>
      }
      footerComponent={
        <Pagination allCount={allCount} pageSize={pageSize} page={page} onChange={setPage} siblingCount={2} />
      }
    >
      <SmallTable textAlign="center" stickyHeader>
        <Table>
          <colgroup>
            <col width="*" />
            <col width="50%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>성분명</TableCell>
              <TableCell>영문명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.length > 0 ? (
              ingredients.map((item) => {
                return (
                  <TableRow
                    key={`noticeFinder_post_${item.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(item)}
                  >
                    <TableCell>{item.nameKr}</TableCell>
                    <TableCell>{item.nameEn}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  <NoContent />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SmallTable>
    </Modal>
  );
}
