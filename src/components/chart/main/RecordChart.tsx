import "../chart.css";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const tooltipStyle = {
  fontSize: "12px",
  outline: "none",
};

export default function RecordChart() {
  return (
    <div className="chart" style={{ margin: "0.5rem 0px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          height={246}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="0 0" />
          <XAxis dataKey="name" tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 12 }}
            ticks={[0, 2000, 4000, 6000, 8000]}
          />
          <Tooltip wrapperStyle={tooltipStyle} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              lineHeight: "20px",
              width: "",
              right: "10px",
              top: "10px",
              fontSize: "10px",
              letterSpacing: "-0.04em",
            }}
          />
          <Bar stackId="a" dataKey="분만" barSize={25} fill="#3D3D3D" />
          <Bar stackId="a" dataKey="임신" fill="#49cec3" />
          <Bar stackId="a" dataKey="수정" fill="#F1BF42" />
          <Bar stackId="a" dataKey="발정" fill="#E98237" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
