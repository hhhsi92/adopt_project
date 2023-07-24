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
import { faker } from "@faker-js/faker";

export interface company {
  uuid: string;
  name: string;
  telNo: string;
}

interface FormProps {
  showModal: () => void;
  selected: company;
}

export const Form = (props: FormProps) => {
  const { showModal, selected } = props;
  return (
    <StyledForm>
      <Button title="제조업체 선택" onClick={showModal} />
      {selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          {/* <a
            href={`/board/notice/${selected.uuid}`}
            target="_blank"
            rel="noreferrer"
          > */}
          {selected.name} ({selected.telNo}){/* </a> */}
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
  onSelect: (company: company) => void;
}
export default function MedicineCompanyFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect } = props;
  const pageSize = 10;

  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [companys, setCompanys] = useState<company[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getCompanys = async () => {
      const params = {
        pageNo: page,
        pageSize,
        keyword: newKeyword,
      };
      const {
        data: { data },
      } = await api.get(`v1/adm/medicine/company`, {
        params,
      });
      setAllCount(data.totalElements);
      setCompanys(data.content);
    };

    getCompanys();
  }, [newKeyword, page]);

  const handleSelect = (item: company) => {
    handleVisible(false);
    onSelect(item);
  };

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="제조사를 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="업체명으로 검색하세요."
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
            <col width="25%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>업체명</TableCell>
              <TableCell>전화번호</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companys.length > 0 ? (
              companys.map((item) => {
                return (
                  <TableRow
                    key={`noticeFinder_post_${item.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelect(item)}
                  >
                    <TableCell style={{ textAlign: "left" }}>{item.name}</TableCell>
                    <TableCell>{item.telNo}</TableCell>
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
