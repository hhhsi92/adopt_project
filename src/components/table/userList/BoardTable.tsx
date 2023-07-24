import "../table.css";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import api from "@/common/API";
import { Link, useParams } from "react-router-dom";
import { splitDate } from "@/common/Func";
import NoContent from "@/components/empty/noContent";
import SmallTable from "../common/smallTable";

interface Props {
  url: string;
  link: string;
}

interface ResponseDataItem {
  uuid: string;
  subject: string;
  content: string;
  comment: string;
  viewCount: number;
  userId: string;
  nickname: string;
  createDate: string;
}

export default function BoardTable(props: Props) {
  const { uuid: userUuid } = useParams();

  const { url, link } = props;
  const [info, setInfo] = useState<ResponseDataItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { data },
        } = await api.get(url + userUuid);
        setInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [url, userUuid]);

  return (
    <SmallTable>
      <Table size="small">
        <colgroup>
          <col width="10%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>등록일</TableCell>
            <TableCell>조회</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.length > 0 ? (
            info.map(({ uuid, content, comment, userId, createDate, viewCount }, i) => (
              <TableRow key={i + 1}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Link to={`${link}${uuid}`} style={{ display: "flex", fontWeight: "bold" }}>
                    {content
                      ? `${content.substring(0, content.length > 10 ? 10 : content.length)} ${
                          content.length > 10 ? "..." : ""
                        }`
                      : comment &&
                        `${comment.substring(0, comment.length > 40 ? 40 : comment.length)} ${
                          comment.length > 40 ? "..." : ""
                        }`}
                  </Link>
                </TableCell>
                <TableCell>{userId}</TableCell>
                <TableCell>{createDate && splitDate(createDate)}</TableCell>
                <TableCell>{viewCount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <NoContent />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </SmallTable>
  );
}
