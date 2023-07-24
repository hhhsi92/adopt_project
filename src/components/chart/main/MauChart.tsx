import "../chart.css";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


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

const tooltipStyle = {
  fontSize: "12px",
  outline: "none",
};

export default function MAUChart() {
  return (
    <div className="chart" style={{ margin: "0.5rem 0px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
            ticks={[200, 400, 600]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            tick={{ fontSize: 10 }}
            ticks={[0, 400, 800, 1200, 1600, 2000]}
          />
          <Tooltip wrapperStyle={tooltipStyle} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              lineHeight: "20px",
              width: "",
              right: "70px",
              top: "10px",
              fontSize: "12px",
              letterSpacing: "-0.04em",
            }}
          />
          <Bar dataKey="pv" barSize={12} fill="#3D3D3D" />
          <Bar dataKey="uv" barSize={12} fill="#49cec3" />
          <Bar dataKey="amt" barSize={12} fill="#F1BF42" />
          <Line
            yAxisId="right"
            dataKey="uv"
            strokeWidth={1.5}
            stroke="#E98237"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
