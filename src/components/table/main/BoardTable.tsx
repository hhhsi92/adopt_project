import {
  CommaNumber,
  StringDateDot,
  StringDateSimple,
  getGenderText,
  getTypeText
} from "@/common/Func";
import { DataProps } from "@/common/Types";
import NoContent from "@/components/empty/noContent";
import { apiKey } from "@/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListImage from "../common/ListImage";
import SmallTable from "../common/smallTable";
import "../table.css";

interface Props {
  type: string;
  url: string;
  link: string;
}

export default function BoardTable(props: Props) {
  const { type, url, link } = props;
  const pageSize = 5;

  const [info, setInfo] = useState<DataProps[]>([]);
  const [allCount, setAllCount] = useState(0);

  const navigate = useNavigate();

  const setData = async (loadData: DataProps) => {
    navigate(link + loadData.desertionNo, { state: { loadData } });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const params: any = {
          serviceKey: apiKey,
          _type: "json",
          state: type,
          numOfRows: pageSize,
        };
        const response = await axios.get(url, { params });
        // console.log(response.data.response.body.items.item);

        setAllCount(response.data.response.body.totalCount);
        setInfo(response.data.response.body.items.item);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [url]);

  return (
    <SmallTable>
      <Table size="small">
        <colgroup>
          <col width="7%" />
          <col width="20%" />
          <col width="6%" />
          <col width="8%" />
          <col width="14%" />
          <col width="9%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>품종</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>나이</TableCell>
            <TableCell>공고번호</TableCell>
            <TableCell>등록일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.length > 0 ? (
            info.map((row: DataProps, i) => (
              <TableRow
                key={i + 1}
                className={row.happenDt === StringDateSimple(new Date()) ? "new" : null}
              >
                <TableCell>{CommaNumber(allCount - i)}</TableCell>
                <TableCell onClick={() => {setData(row)}}>
                  <Link to={``} style={{ display: "flex", fontWeight: "bold" }}>
                    <ListImage uri={row.popfile} size={"mini"} />
                    {getTypeText(row.kindCd)}
                  </Link>
                </TableCell>
                <TableCell>{getGenderText(row.sexCd)}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.noticeNo}</TableCell>
                <TableCell className={row.happenDt === StringDateSimple(new Date()) ? "new" : null}>
                  {row.happenDt && StringDateDot(row.happenDt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <NoContent />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </SmallTable>
  );
}
