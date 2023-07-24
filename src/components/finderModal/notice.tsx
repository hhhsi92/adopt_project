import styled from "styled-components";
import { useState, useEffect } from "react";
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
import { formattedDateTime } from "@/common/Func";
import Pagination from "../pagination/pagination";
import api from "@/common/API";

export interface post {
  uuid: string;
  subject: string;
  createDate: string;
}

interface FormProps {
  showModal: () => void;
  selected: post;
}

export const Form = (props: FormProps) => {
  const { showModal, selected } = props;
  return (
    <StyledForm>
      <Button title="게시글 선택" narrow onClick={showModal} />
      {selected.uuid && (
        <div className="selected">
          <em>선택된 항목</em>
          <a
            href={`/board/notice/${selected.uuid}`}
            target="_blank"
            rel="noreferrer"
          >
            {selected.subject}
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
  onSelect: (post: post) => void;
}
export default function NoticeFinder(props: FinderProps) {
  const { visible, handleVisible, onSelect } = props;
  const pageSize = 10;

  const [keyword, setKeyword] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [posts, setPosts] = useState<post[]>([]);
  const [allCount, setAllCount] = useState(0);
  const [page, setPage] = useState(0);

  let filterQuery = ``;

  useEffect(() => {

    if(keyword.length > 0){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      filterQuery += `&searchKey=제목`;
      filterQuery += `&searchValue=${keyword}`;
    }

    const getPosts = async () => {
      try {
        const {
          data: { data },
        } = await api.get(`v1/adm/board/notice?pageNo=${page}&pageSize=${pageSize}${filterQuery}`);
        setPosts(data.content);
        setAllCount(data.totalElements);
      } catch (err) {}
    };

    getPosts();
  }, [filterQuery, newKeyword, page]);

  return (
    <Modal
      visible={visible}
      handleVisible={handleVisible}
      title="공지사항 게시글을 선택하세요."
      headerComponent={
        <div style={{ marginTop: 20 }}>
          <SearchBar
            name="keyword"
            value={keyword}
            handleValue={setKeyword}
            placeholder="제목으로 검색하세요."
            onSearch={() => setNewKeyword(keyword)}
          />
        </div>
      }
      footerComponent={
        <Pagination
          allCount={allCount}
          pageSize={pageSize}
          page={page}
          onChange={setPage}
          siblingCount={2}
        />
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
              <TableCell>제목</TableCell>
              <TableCell>등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <TableRow
                    key={`noticeFinder_post_${post.uuid}`}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect(post)}
                  >
                    <TableCell style={{ textAlign: "left" }}>
                      {post.subject}
                    </TableCell>
                    <TableCell>
                      {formattedDateTime({
                        date: post.createDate,
                        type: "data",
                        range: "date",
                      })}</TableCell>
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
