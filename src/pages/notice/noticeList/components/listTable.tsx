import { StringDateDot, getGenderText, getTypeText } from "@/common/Func";
import NoContent from "@/components/empty/noContent";
import Loading from "@/components/loading/loadSpinner";
import Pagination, { navigatePage } from "@/components/pagination/pagination";
import RowInfo, { defaultPageSize } from "@/components/table/common/RowInfo";
import TableHead from "@/components/table/common/TableHead";
import { apiKey } from "@/config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import ListImage from "@/components/table/common/ListImage";
import axios from "axios";
import { loaderDataInterface } from "../list";
import styled from "styled-components";

interface DataProps {
  desertionNo: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
  noticeComment: string;
}

const headCells = [
  { label: "번호" },
  { label: "상태" },
  { label: "품종" },
  { label: "이미지" },
  { label: "성별" },
  { label: "체중" },
  { label: "나이" },
  { label: "공고번호" },
  { label: "발견장소" },
  { label: "접수일" },
];

interface SetDateProps {
  startDate: string;
  endDate: string;
}

export default function NoticeListTable(props: SetDateProps) {
  const { startDate, endDate } = props;

  const location = useLocation();
  const filterData = useLoaderData() as loaderDataInterface;
  const navigate = useNavigate();
  const page = parseInt(filterData.page, 10) || 1;
  const pageSize = parseInt(filterData.pageSize, 10) || defaultPageSize;

  const [isLoading, setIsLoading] = useState(false);
  const [allCount, setAllCount] = useState(0);
  const [info, setInfo] = useState<DataProps[]>([]);

  const setData = async (loadData: DataProps) => {
    navigate(loadData.desertionNo, { state: { loadData } });
  };

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);

      try {
        const params: any = {
          serviceKey: apiKey,
          _type: "json",
          state: "notice",
          pageNo: page,
          numOfRows: pageSize,
          upkind:
            filterData.type && filterData.type !== "전체"
              ? filterData.type
              : null,
          upr_cd:
            filterData.location && filterData.location !== "전체"
              ? filterData.location
              : null,
          bgnde:
            filterData.createDate && filterData.createDate === "기간선택"
              ? filterData.createDateStart.replaceAll("-", "")
              : null,
          endde:
            filterData.createDate && filterData.createDate === "기간선택"
              ? filterData.createDateEnd.replaceAll("-", "")
              : null,
        };

        const response = await axios.get(
          "/api/1543061/abandonmentPublicSrvc/abandonmentPublic",
          { params }
        );
        // console.log(response.data.response.body.items.item);
        setInfo(response.data.response.body.items.item);
        setAllCount(response.data.response.body.totalCount);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    getList();
  }, [pageSize, page, filterData, startDate, endDate]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <RowInfo allCount={allCount} pageSize={pageSize} />
      <TableContainer>
        <Table
          stickyHeader
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          className="MainTable"
        >
          <colgroup>
            <col width="5%" />
            <col width="7%" />
            <col width="*" />
            <col width="6%" />
            <col width="5%" />
            <col width="5%" />
            <col width="8%" />
            <col width="*" />
            <col width="*" />
            <col width="6%" />
          </colgroup>
          <TableHead headCells={headCells} order={"desc"} orderCate={""} />
          <TableBody>
            {info.length > 0 ? (
              info.map((row: DataProps, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${index}_${row.desertionNo}`}
                    onClick={() => {
                      setData(row);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {allCount - page * pageSize - index + pageSize}
                    </TableCell>
                    <TableCell>
                      <Button title={"공고중"} narrow theme="blue" lightColor />
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                    >
                      {getTypeText(row.kindCd)}
                    </TableCell>
                    <TableCell>
                      <ListImage uri={row.popfile} />
                    </TableCell>
                    <TableCell>{getGenderText(row.sexCd)}</TableCell>
                    <TableCell>{row.weight}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.noticeNo}</TableCell>
                    <TableCell>
                      <img
                        src="https://img.icons8.com/ios/250/000000/marker.png"
                        alt=""
                        className="list_icon"
                      />
                      {row.happenPlace}
                    </TableCell>
                    <TableCell>{StringDateDot(row.happenDt)}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
                  <NoContent />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        allCount={allCount}
        pageSize={pageSize}
        page={page}
        onChange={(page) => navigatePage(page, location, navigate)}
      />
    </>
  );
}
