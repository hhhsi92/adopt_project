import styled from "styled-components";
import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import Button from "../button/Button";
import SmallTable from "../table/common/smallTable";
import NoContent from "../empty/noContent";
import Modal from "../modal/modal";
import SearchBar from "../form/searchBar";
import SelectedList, { SelectedItem } from "../form/selectedList";
import { toast } from "react-toastify";
import Pagination from "../pagination/pagination";
import api from "@/common/API";
import ButtonList from "../button/buttonList";

export interface user {
  uuid: string;
  nickname: string;
  name: string;
  telNo?: string;
}

interface FormProps {
  showModal: () => void;
  selected: user;
  handleSelected: (user: user) => void;
}

export const Form = (props: FormProps) => {
  const { showModal, selected, handleSelected } = props;

  const resetSelected = () => {
    handleSelected({
      uuid: "",
      nickname: "",
      name: "",
      telNo: "",
    });
  };

  return (
    <StyledForm>
      {selected && selected.uuid && (
        <>
          <input type="hidden" name="userUuid" value={selected.uuid} />
          <input type="hidden" name="userNickname" value={selected.nickname} />
          <input type="hidden" name="userName" value={selected.name} />
        </>
      )}
      <ButtonList>
        <Button title="사용자 선택" narrow onClick={showModal} />
        {selected && selected.uuid && <Button title="선택 해제" theme="black" narrow onClick={resetSelected} />}
      </ButtonList>
      {selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          <a href={`/user/userList/${selected.uuid}`} target="_blank" rel="noreferrer">
            {selected.nickname}({selected.name})
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
  onSelect: (user: user[]) => void;
  multiple?: boolean;
}
export default function UserFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect, multiple } = props;
  const pageSize = 10;

  const [keywordCate, setKeywordCate] = useState("연락처");
  const [keyword, setKeyword] = useState("");
  const [newKeywordCate, setNewKeywordCate] = useState("연락처");
  const [newKeyword, setNewKeyword] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const [selected, setSelected] = useState<user[]>([]);
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
          searchValue: newKeyword,
        };
        const {
          data: { data },
        } = await api.get("v1/adm/users/all", { params });
        setUsers(data.content);
        setAllCount(data.totalElements);
      } catch (err) {}
    };

    getUsers();
  }, [newKeywordCate, newKeyword, page, visible]);

  const selectSingle = (user: user) => {
    onSelect([user]);
    handleVisible(false);
  };
  const selectMultiple = (user: user) => {
    const isUuid = (item: user) => item.uuid === user.uuid;
    const existItemIdx = selected.findIndex(isUuid);

    if (existItemIdx > -1) {
      // 이미 선택된 항목인 경우 선택을 해제한다.
      setSelected((prev) => prev.filter((item) => item.uuid !== user.uuid));
      return;
    }

    setSelected((prev) =>
      prev.concat({
        uuid: user.uuid,
        nickname: user.nickname,
        name: user.name,
        telNo: user.telNo,
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
      title="사용자를 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="키워드를 입력하세요."
            onSearch={search}
            cateOptions={[
              { value: "연락처", label: "연락처" },
              { value: "닉네임", label: "닉네임" },
              { value: "이름", label: "이름" },
            ]}
            cate={keywordCate}
            handleCate={setKeywordCate}
          />
          {selected.length > 0 && (
            <SelectedList
              items={selected.map((user) => ({
                value: user.uuid,
                label: user.nickname,
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
            <col width="*" />
            <col width="33.3%" />
            <col width="33.3%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>닉네임</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>연락처</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => {
                return (
                  <TableRow
                    key={`userFinder_user_${user.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      multiple ? selectMultiple(user) : selectSingle(user);
                    }}
                  >
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.telNo}</TableCell>
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
