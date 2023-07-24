import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import "../table.css";

export default function MAUTable() {
  const data = [
    {
      name: "1월",
      uv: 400,
      pv: 240,
      amt: 240,
    },
    {
      name: "2월",
      uv: 300,
      pv: 138,
      amt: 221,
    },
    {
      name: "3월",
      uv: 200,
      pv: 380,
      amt: 229,
    },
    {
      name: "4월",
      uv: 270,
      pv: 390,
      amt: 200,
    },
    {
      name: "5월",
      uv: 180,
      pv: 480,
      amt: 218,
    },
    {
      name: "6월",
      uv: 239,
      pv: 380,
      amt: 250,
    },
    {
      name: "7월",
      uv: 349,
      pv: 430,
      amt: 210,
    },
    {
      name: "8월",
      uv: 349,
      pv: 430,
      amt: 210,
    },
    {
      name: "9월",
      uv: 349,
      pv: 430,
      amt: 210,
    },
    {
      name: "10월",
      uv: 349,
      pv: 430,
      amt: 210,
    },
    {
      name: "11월",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "12월",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ];

  // // 더미 데이터 사용 - 나중에 API로 전환하기
  // useEffect(() => {
  //     axios.get("https://jsonplaceholder.typicode.com/users")
  //         .then(res => setInfo(res.data))
  //         .catch(err => console.log(err));
  // }, []);
  // console.log(info);

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
            <TableCell>전체회원</TableCell>
            {data.map(({ name }, i) => (
              <TableCell key={i}>{name}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>MAU</TableCell>
            {data.map(({ uv }, i) => (
              <TableCell key={i}>{uv}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>기존회원</TableCell>
            {data.map(({ pv }, i) => (
              <TableCell key={i}>{pv}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>신규회원</TableCell>
            {data.map(({ amt }, i) => (
              <TableCell key={i}>{amt}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
