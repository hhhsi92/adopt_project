import Button from "@/components/button/Button";
import NoContent from "@/components/empty/noContent";
import Loading from "@/components/loading/loadSpinner";
import Pagination, { navigatePage } from "@/components/pagination/pagination";
import RowInfo, { defaultPageSize } from "@/components/table/common/RowInfo";
import TableHead from "@/components/table/common/TableHead";
import api from "@common/API";
import { imgNameCut } from "@common/Func";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate
} from "react-router-dom";
import { toast } from "react-toastify";

import { apiKey } from "@/config";
import axios from "axios";
import { loaderDataInterface } from "../list";

interface DataProps {
  breedCnt: number;
  careAddr: string;
  careNm: string;
  careTel: string;
  closeDay: string;
  dataStdDt: string;
  divisionNm: string;
  dsignationDate: string;
  feedCnt: number;
  jibunAddr: string;
  lat: number;
  lng: number;
  medicalCnt: number;
  orgNm: string;
  quarabtineCnt: number;
  saveTrgtAnimal: string;
  specsPersonCnt: number;
  transCarCnt: number;
  vetPersonCnt: number;
  weekCellEtime: string;
  weekCellStime: string;
  weekOprEtime: string;
  weekOprStime: string;
  weekendCellEtime: string;
  weekendCellStime: string;
  weekendOprEtime: string;
  weekendOprStime: string;
}

const headCells = [
  { label: "번호" },
  { label: "관할구역" },
  { label: "보호센터명" },
  { label: "전화번호" },
  { label: "보호센터주소" },
  { label: "유형" },
  { label: "운영시간" },
];

export default function ListTable() {
  const location = useLocation();
  const loaderData = useLoaderData() as loaderDataInterface;
  const navigate = useNavigate();
  const page = parseInt(loaderData.page, 10) || 1;
  const pageSize = parseInt(loaderData.pageSize, 10) || defaultPageSize;

  const [isLoading, setIsLoading] = useState(false);
  const [allCount, setAllCount] = useState(0);
  const [info, setInfo] = useState<DataProps[]>([]);

  const handleDelete = async (uuid: string) => {
    const confirmed = window.confirm("해당 조합을 삭제할까요?");
    if (!confirmed) {
      return;
    }

    let delUrl = `/v1/adm/cooperative/${uuid}`;

    try {
      await api.delete(delUrl);
      toast.success("조합이 삭제되었습니다.");
      navigate(0);
    } catch (error) {}
  };

  const setData = async (loadData: DataProps) => {
    navigate(loadData.careNm, { state: { loadData } });
  };

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      try {
        const params: any = {
          serviceKey: apiKey,
          _type: "json",
          pageNo: page,
          numOfRows: pageSize,
          care_nm: loaderData.keyword
        };
        // console.log(params);

        const response = await axios.get(
          "/api/1543061/animalShelterSrvc/shelterInfo",
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
  }, [pageSize, page, loaderData]);

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
            <col width="6%" />
            <col width="12%" />
            <col width="15%" />
            <col width="15%" />
            <col width="*" />
            <col width="8%" />
            <col width="12%" />
          </colgroup>
          <TableHead
            headCells={headCells}
            order={"desc"}
          />
          <TableBody>
            {info && info.length > 0 ? (
              info.map((row: DataProps, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={`${index}_${row.careNm}`} onClick={() => {setData(row)}} style={{ cursor: "pointer" }}>
                    <TableCell>
                      {allCount - page * pageSize - index + pageSize}
                    </TableCell>
                    <TableCell>{row.orgNm}</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {row.careNm}
                    </TableCell>
                    <TableCell>
                    <a href={"tel:" + row.careTel}>
                      <img
                        src="https://img.icons8.com/ios/250/000000/phone.png"
                        alt=""
                        className="list_icon"
                      />
                      {row.careTel}
                      </a>
                    </TableCell>
                    <TableCell>
                      <img
                        src="https://img.icons8.com/ios/250/000000/marker.png"
                        alt=""
                        className="list_icon"
                      />
                      {imgNameCut(row.careAddr)}
                    </TableCell>
                    <TableCell>
                      <Button
                        title={row.divisionNm}
                        narrow
                        theme={row.divisionNm === "법인" ? "gray" : "green"}
                        lightColor
                      />  
                    </TableCell>
                    <TableCell>{row.weekOprStime && row.weekOprStime + " ~ " + row.weekOprEtime}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
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
