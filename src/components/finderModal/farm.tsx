import styled from "styled-components";
import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
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

export type farm = {
  uuid: string;
  farmNo: string;
  farmName: string;
  representativeManager: {
    uuid: string;
    name: string;
    nickname: string;
  }
};

interface FormProps {
  showModal: () => void;
  selected: farm;
  handleSelected: (farm: farm) => void;
}

export const Form = (props: FormProps) => {
  const { showModal, selected, handleSelected } = props;

  const resetSelected = () => {
    handleSelected({
      uuid: "",
      farmName: "",
      farmNo: "",
      representativeManager: {
        uuid: "",
        name: "",
        nickname: "",
      }
    });
  };

  return (
    <StyledForm>
      {selected && selected.uuid && (
        <>
          <input type="hidden" name="farmUuid" value={selected.uuid} />
          <input type="hidden" name="farmName" value={selected.farmName} />
          <input type="hidden" name="farmNo" value={selected.farmNo} />
        </>
      )}
      <ButtonList>
        <Button title="목장 선택" narrow onClick={showModal} />
        {selected && selected.uuid && <Button title="선택 해제" narrow onClick={resetSelected} theme="black" />}
      </ButtonList>
      {selected && selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          <a href={`/cowfarm/farm/farmList/${selected.uuid}`} target="_blank" rel="noreferrer">
            {selected.farmName}({selected.farmNo})
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
export default function FarmFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect, multiple } = props;
  const pageSize = 10;

  const [keywordCate, setKeywordCate] = useState("목장명");
  const [keyword, setKeyword] = useState("");
  const [newKeywordCate, setNewKeywordCate] = useState("연락처");
  const [newKeyword, setNewKeyword] = useState("");
  const [farms, setFarms] = useState<farm[]>([]);
  const [selected, setSelected] = useState<farm[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      if (!visible) {
        setSelected([]);
        setPage(0);
        setAllCount(0);
        return;
      }
      try {
        const params: any = {
          pageNo: page,
          pageSize,
          searchKey: newKeywordCate,
          searchVal: newKeyword,
        };
        const {
          data: { data },
        } = await api.get("v1/adm/farm", { params });
        console.log(data.content);
        setFarms(data.content);
        setAllCount(data.totalElements);
      } catch (err) {}
    };

    getUsers();
  }, [newKeywordCate, newKeyword, page, visible]);

  const selectMultiple = (farm: farm) => {
    const isUuid = (item: farm) => item.uuid === farm.uuid;
    const existItemIdx = selected.findIndex(isUuid);

    if (existItemIdx > -1) {
      // 이미 선택된 항목인 경우 선택을 해제한다.
      setSelected((prev) => prev.filter((item) => item.uuid !== farm.uuid));
      return;
    }

    setSelected((prev) =>
      prev.concat({
        uuid: farm.uuid,
        farmNo: farm.farmNo,
        farmName: farm.farmName,
        representativeManager: {
          uuid: farm.representativeManager.uuid,
          name: farm.representativeManager.name,
          nickname: farm.representativeManager.nickname
        }
      })
    );
  };

  const removeSelectedUser = (item: SelectedItem) => {
    setSelected((prev) => prev.filter((selected) => selected.uuid !== item.value));
  };

  const submitMultipleSelect = () => {
    if (selected.length === 0) {
      toast.error("사용자를 선택해주세요!");
      return;
    }
    onSelect(selected);
  };

  const search = () => {
    setNewKeywordCate(keywordCate);
    setNewKeyword(keyword);
  };

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="목장을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="키워드를 입력하세요."
            onSearch={search}
            cateOptions={[
              { value: "목장명", label: "목장명" },
              { value: "목장코드", label: "목장코드" },
              { value: "목장주", label: "목장주" },
            ]}
            cate={keywordCate}
            handleCate={setKeywordCate}
          />
          {selected.length > 0 && (
            <SelectedList
              items={selected.map((user) => ({
                value: user.uuid,
                label: user.farmName,
              }))}
              removeItem={removeSelectedUser}
            />
          )}
        </div>
      }
      buttons={multiple && [{ title: "선택완료", onClick: submitMultipleSelect }]}
      style={{ minHeight: "60vh" }}
    >
      <SmallTable textAlign="center" stickyHeader>
        <Table>
          <colgroup>
            <col width="30%" />
            <col width="*" />
            <col width="35%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>목장코드</TableCell>
              <TableCell>목장명</TableCell>
              <TableCell>대표관리자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farms.length > 0 ? (
              farms.map((farm) => {
                return (
                  <TableRow
                    key={`farmFinder_farm_${farm.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      multiple ? selectMultiple(farm) : onSelect(farm);
                    }}
                  >
                    <TableCell>{farm.farmNo}</TableCell>
                    <TableCell>{farm.farmName}</TableCell>
                    <TableCell>{farm.representativeManager.name}</TableCell>
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
        <Pagination allCount={allCount} pageSize={pageSize} page={page} onChange={setPage} siblingCount={2} />
      </SmallTable>
    </Modal>
  );
}
