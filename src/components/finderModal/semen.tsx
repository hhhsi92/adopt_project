import styled from "styled-components";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import Button from "../button/Button";
import SmallTable from "../table/common/smallTable";
import NoContent from "../empty/noContent";
import Modal from "../modal/modal";
import { SearchBar } from "@components/form/form";
import SelectedList, { SelectedItem } from "../form/selectedList";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import ButtonList from "../button/buttonList";
import api from "@/common/API";

export type semen = {
  uuid: string;
  number: string;
  type: string;
};

interface FormProps {
  showModal: () => void;
  selected: semen;
  handleSelected: (farm: semen) => void;
}

export const Form = (props: FormProps) => {
  const { showModal, selected, handleSelected } = props;

  const resetSelected = () => {
    handleSelected({
      uuid: "",
      number: "",
      type: "",
    });
  };

  return (
    <StyledForm>
      <input type="hidden" name="semen" value={selected.uuid} />
      <ButtonList>
        <Button title="정액 선택" narrow onClick={showModal} />
        {selected.uuid && (
          <Button
            title="선택 해제"
            narrow
            onClick={resetSelected}
            theme="black"
          />
        )}
      </ButtonList>
      {selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          <a
            href={`/cowfarm/farm/farmList/${selected.uuid}`}
            target="_blank"
            rel="noreferrer"
          >
            {selected.number}
          </a>
        </div>
      )}
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
  onSelect: (farm: any) => void;
  multiple?: boolean;
}
export default function SemenFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect, multiple } = props;
  const pageSize = 10;

  const [keywordCate, setKeywordCate] = useState("정액번호");
  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [semens, setSemens] = useState<semen[]>([]);
  const [selected, setSelected] = useState<semen[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  let filterQuery = ``;

  useEffect(() => {
    if(keywordCate != null && keywordCate != ""){
      filterQuery += `&searchKey=${keywordCate}`;
    }

    if(keyword != null && keyword != ""){
      filterQuery += `&searchValue=${keyword}`;
    }

    const getUsers = async () => {
      if (!visible) {
        setSelected([]);
        setPage(0);
        setAllCount(0);
        return;
      }
      try {
        const {
          data: { data },
        } = await api.get(`v1/adm/semen?pageNo=${page}&pageSize=${pageSize}${filterQuery}`);
        setSemens(data.content);
        setAllCount(data.totalElements);
      } catch (err) {}
    };

    getUsers();
  }, [newKeyword, page, visible]);

  const selectMultiple = (semen: semen) => {
    const isUuid = (item: semen) => item.uuid === semen.uuid;
    const existItemIdx = selected.findIndex(isUuid);

    if (existItemIdx > -1) {
      // 이미 선택된 항목인 경우 선택을 해제한다.
      setSelected((prev) => prev.filter((item) => item.uuid !== semen.uuid));
      return;
    }

    setSelected((prev) =>
      prev.concat({
        uuid: semen.uuid,
        number: semen.number,
        type: semen.type,
      })
    );
  };

  const removeSelectedUser = (item: SelectedItem) => {
    setSelected((prev) =>
      prev.filter((selected) => selected.uuid !== item.value)
    );
  };

  const submitMultipleSelect = () => {
    if (selected.length === 0) {
      toast.error("정액을 선택해주세요!");
      return;
    }
    onSelect(selected);
  };

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="정액을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="키워드를 입력하세요."
            onSearch={() => setNewKeyword(keyword)}
            cateOptions={[{ value: "정액번호", label: "정액번호" }]}
            cate={keywordCate}
            handleCate={setKeywordCate}
          />
          {selected.length > 0 && (
            <SelectedList
              items={selected.map((user) => ({
                value: user.uuid,
                label: user.number,
              }))}
              removeItem={removeSelectedUser}
            />
          )}
        </div>
      }
      buttons={
        multiple && [{ title: "선택완료", onClick: submitMultipleSelect }]
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
              <TableCell>구분</TableCell>
              <TableCell>정액명</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {semens.length > 0 ? (
              semens.map((semen) => {
                return (
                  <TableRow
                    key={`semenFinder_semen_${semen.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      multiple ? selectMultiple(semen) : onSelect(semen);
                    }}
                  >
                    <TableCell>{semen.type}</TableCell>
                    <TableCell>{semen.number}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <NoContent />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          allCount={allCount}
          pageSize={pageSize}
          page={page}
          onChange={setPage}
          siblingCount={2}
        />
      </SmallTable>
    </Modal>
  );
}
