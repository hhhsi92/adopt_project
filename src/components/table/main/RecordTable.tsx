import "../table.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

export default function RecordTable() {
  const data = [
    {
      name: "1월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 412,
    },
    {
      name: "2월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "3월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "4월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "5월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "6월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "7월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "8월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "9월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "10월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "11월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
    {
      name: "12월",
      분만: 1000,
      임신: 400,
      수정: 240,
      발정: 240,
    },
  ];

  return (
    <Paper className="table_back">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {data.map((data, i) => (
              <TableCell key={data.name}>{i + 1}월</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>분만</TableCell>
            {data.map(({ 분만 }, i) => (
              <TableCell key={i}>{분만}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>임신</TableCell>
            {data.map(({ 임신 }, i) => (
              <TableCell key={i}>{임신}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>수정</TableCell>
            {data.map(({ 수정 }, i) => (
              <TableCell key={i}>{수정}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>발정</TableCell>
            {data.map(({ 발정 }, i) => (
              <TableCell key={i}>{발정}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
