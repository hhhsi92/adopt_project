import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import "../table.css";
import { arrDivision } from "../../../common/Func";

export default function UserAreaTable() {
  const [info, setInfo] = useState([]);

  // 더미 데이터 사용 - 나중에 API로 전환하기
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setInfo(arrDivision(res.data, 13));
      })
      .catch((err) => console.log(err));
  }, []);

  type Rowdata = {
    body: string;
    id: number;
    title: string;
    userId: number;
  };

  // console.log(info);

  return (
    <div className="area">
      <Paper className="table_back">
        <Table size="small">
          {Object.keys(info).map((key: any) => {
            return (
              <TableBody key={key}>
                <TableRow>
                  {info[key].map((dataItem: Rowdata) => {
                    return (
                      <TableCell key={dataItem.title}>
                        {dataItem.userId}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  {info[key].map((dataItem: Rowdata) => {
                    return (
                      <TableCell key={dataItem.body}>{dataItem.id}</TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </Paper>
    </div>
  );
}
