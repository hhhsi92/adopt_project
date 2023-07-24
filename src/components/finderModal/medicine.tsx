import api from '@/common/API';
import { SearchBar } from '@components/form/form';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Button from '../button/Button';
import ButtonList from '../button/buttonList';
import NoContent from '../empty/noContent';
import SelectedList, { SelectedItem } from '../form/selectedList';
import Modal from '../modal/modal';
import Pagination from '../pagination/pagination';
import SmallTable from '../table/common/smallTable';

export type medicine = {
  uuid: string;
  type: string;
  sortName: string;
  name: string;
  company: {
    name: string;
  }
};

interface FormProps {
  showModal: () => void;
  selected: medicine;
  handleSelected: (farm: medicine) => void;
}

export const Form = (props: FormProps) => {
  const { showModal, selected, handleSelected } = props;

  const resetSelected = () => {
    handleSelected({
      uuid: "",
      type: "",
      sortName: "",
      name: "",
      company: {
        name: "",
      }
    });
  };

  return (
    <StyledForm>
      <input type="hidden" name="semen" value={selected.uuid} />
      <ButtonList>
        <Button title="약품 선택" narrow onClick={showModal} />
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
            {selected.uuid}
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
export default function MedicineFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect, multiple } = props;
  const pageSize = 10;

  const [keywordCate, setKeywordCate] = useState("물품명");
  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [medicines, setMedicines] = useState<medicine[]>([]);
  const [selected, setSelected] = useState<medicine[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  let filterQuery = ``;

  useEffect(() => {
    if(keywordCate != null && keywordCate !== ""){
      filterQuery += `&keywordCate=${keywordCate}`;
    }

    if(keyword != null && keyword !== ""){
      filterQuery += `&keyword=${keyword}`;
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
        } = await api.get(`v1/adm/medicine?pageNo=${page}&pageSize=${pageSize}${filterQuery}`);
        setMedicines(data.content);
        setAllCount(data.totalElements);
      } catch (err) {}
    };

    getUsers();
  }, [newKeyword, page, visible]);

  const selectMultiple = (medicine: medicine) => {
    const isUuid = (item: medicine) => item.uuid === medicine.uuid;
    const existItemIdx = selected.findIndex(isUuid);

    if (existItemIdx > -1) {
      // 이미 선택된 항목인 경우 선택을 해제한다.
      setSelected((prev) => prev.filter((item) => item.uuid !== medicine.uuid));
      return;
    }

    setSelected((prev) =>
      prev.concat({
        uuid: medicine.uuid,
        type: medicine.type,
        sortName: medicine.sortName,
        name: medicine.name,
        company: {
            name: medicine.company.name
        }
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
      toast.error("약품을 선택해주세요!");
      return;
    }
    onSelect(selected);
  };

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="약품을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="키워드를 입력하세요."
            onSearch={() => setNewKeyword(keyword)}
            cateOptions={[{ value: "물품명", label: "물품명" }]}
            cate={keywordCate}
            handleCate={setKeywordCate}
          />
          {selected.length > 0 && (
            <SelectedList
              items={selected.map((medicine) => ({
                value: medicine.uuid,
                label: medicine.name,
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
            <col width="15%" />
            <col width="20%" />
            <col width="*" />
            <col width="*" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>구분</TableCell>
              <TableCell>종류</TableCell>
              <TableCell>물품명</TableCell>
              <TableCell>제조사</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.length > 0 ? (
              medicines.map((medicine) => {
                return (
                  <TableRow
                    key={`medicineFinder_medicine_${medicine.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      multiple ? selectMultiple(medicine) : onSelect(medicine);
                    }}
                  >
                    <TableCell>{medicine.type}</TableCell>
                    <TableCell>{medicine.sortName}</TableCell>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.company.name}</TableCell>
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
