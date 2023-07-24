import { useState } from "react";
import styled from "styled-components";
import NoContent from "../empty/noContent";
import { formattedDateTime } from "@/common/Func";
import { CgMailReply } from "react-icons/cg";
import Button from "../button/Button";
import ButtonList from "../button/buttonList";
import CommentWrite from "./write";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "@/common/API";

export interface commentInterface {
  no: number;
  groupNo: number;
  depthNo: number;
  orderNo: number;
  parentNo: number;
  comment: string;
  delete: boolean;
  publish: boolean;
  user: {
    uuid: string;
    userId: string;
    name: string;
    nickname: string;
    telNo: string;
    thumbnail: string;
  };
  updateDate: string;
  createDate: string;
  writer: boolean;

  replyNickname?: string;
}

interface commentListProps {
  comments: commentInterface[];
}

export default function CommentList(
  props: commentListProps,
  allCount: number,
  pageSize: number,
  handlePageSize: number
) {
  const { uuid } = useParams();
  const { comments } = props;
  const location = useLocation();

  const navigate = useNavigate();

  const [replyNo, setReplyNo] = useState(-1);
  const [replyContent, setReplyContent] = useState("");
  const [editNo, setEditNo] = useState(-1);
  const [editContent, setEditContent] = useState("");

  if (comments.length === 0) {
    return <NoContent text="작성된 답글이 없습니다." />;
  }

  const resetReplyNo = () => {
    setReplyNo(-1);
    setReplyContent("");
  };

  const handleReply = async () => {
    if (!replyContent) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    const replyformData = new FormData();

    replyformData.append("comment", replyContent);
    replyformData.append("parentNo", replyNo.toString());
    replyformData.append("boardUuid", uuid);

    let url = "";

    if (location.pathname.includes("post")) url = "/v1/adm/board/free/comment";
    if (location.pathname.includes("notice")) url = "/v1/adm/board/notice/comment";
    if (location.pathname.includes("error")) url = "/v1/adm/board/error/comment";

    try {
      await api.post(url, replyformData);
      navigate(0);
    } catch (error) {}
  };

  const onClickEdit = async (no: number, content: string) => {
    setEditContent(content);
    setEditNo(no);
  };
  const resetEditNo = () => {
    setEditNo(-1);
    setEditContent("");
  };
  const handleEdit = async () => {
    if (!editContent) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    const replyEditformData = new FormData();
    replyEditformData.append("comment", editContent);
    replyEditformData.append("no", editNo.toString());

    let modUrl = "";

    if (location.pathname.includes("post")) modUrl = "/v1/adm/board/free/comment";
    if (location.pathname.includes("notice")) modUrl = "/v1/adm/board/notice/comment";
    if (location.pathname.includes("error")) modUrl = "/v1/adm/board/error/comment";

    try {
      await api.put(modUrl, replyEditformData);
      navigate(0);
    } catch (error) {}
  };

  const handleDelete = async (no: number) => {
    const confirmed = window.confirm("해당 답글을 삭제할까요?");
    if (!confirmed) {
      return;
    }

    let delUrl = "";

    if (location.pathname.includes("post")) delUrl = `/v1/adm/board/free/comment/${no}`;
    if (location.pathname.includes("notice")) delUrl = `/v1/adm/board/notice/comment/${no}`;
    if (location.pathname.includes("error")) delUrl = `/v1/adm/board/error/comment/${no}`;

    try {
      await api.delete(delUrl);
      navigate(0);
    } catch (error) {}
  };

  const ReplyButtons = ({ comment }: { comment: commentInterface }) => {
    return (
      <>
        {replyNo === comment.no ? (
          <Button title="작성 취소" narrow theme="darkgray" onClick={resetReplyNo} />
        ) : (
          <Button title="답글 작성" narrow lightColor onClick={() => setReplyNo(comment.no)} />
        )}
      </>
    );
  };

  const EditButtons = ({ comment }: { comment: commentInterface }) => {
    return (
      <>
        {comment.writer && editNo === comment.no ? (
          <Button title="수정 취소" narrow theme="darkgray" onClick={resetEditNo} />
        ) : (
          <Button
            title="수정"
            narrow
            theme="blue"
            lightColor
            onClick={() => onClickEdit(comment.no, comment.comment)}
          />
        )}
      </>
    );
  };

  return (
    <Container>
      {comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <Item key={`comment_${comment.no}`} className={comment.depthNo > 1 && "reply"}>
              {comment.depthNo > 1 && (
                <i>
                  <CgMailReply />
                </i>
              )}
              <div className="upper">
                <div className="infoArea">
                  <span className="name" onClick={() => window.open(`/user/userList/${comment.user.uuid}`)}>
                    {comment.user.nickname}
                  </span>
                  <span className="date">
                    {formattedDateTime({
                      date: comment.createDate,
                      type: "data",
                      range: "sec",
                    })}
                  </span>
                </div>
                <ButtonList>
                  <ReplyButtons comment={comment} />
                  <EditButtons comment={comment} />
                  <Button title="삭제" narrow theme="red" lightColor onClick={() => handleDelete(comment.no)} />
                </ButtonList>
              </div>
              {comment.no === editNo ? (
                <CommentWrite
                  content={editContent}
                  handleContent={setEditContent}
                  onSubmit={handleEdit}
                  style={{ marginTop: 10 }}
                />
              ) : (
                <div className="bottom">{comment.comment}</div>
              )}

              {comment.no === replyNo && (
                <CommentWrite content={replyContent} handleContent={setReplyContent} onSubmit={handleReply} />
              )}
            </Item>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: solid 1px var(--darkgray-border);
`;

const Item = styled.div`
  font-size: 14px;
  padding: 1em;
  border-top: solid 1px var(--darkgray-border);

  &:hover {
    background: var(--gray-bg);
  }

  &.reply {
    position: relative;
    padding-left: 30px;
    & i {
      content: "";
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 15px;
      transform: rotate(180deg);
      position: absolute;
      left: 0.5em;
    }
  }
  & .upper {
    display: flex;
    justify-content: space-between;

    & .infoArea {
      display: flex;
      align-items: center;

      & *:not(:first-child) {
        margin-left: 6px;
      }

      & .name {
        display: block;
        cursor: pointer;
        font-weight: 700;
        &:after {
          content: "";
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(/src/components/table/img/info.png) center / 100%;
          margin-left: 4px;
        }
      }
      & .date {
        color: var(--gray-color);
      }
    }
  }
  & .bottom {
    margin-top: 10px;
    white-space: pre-line;
  }
`;
