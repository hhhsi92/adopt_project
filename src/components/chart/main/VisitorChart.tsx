import "../chart.css";
import { useEffect, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";

import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent";
import { ResponseRank } from "@/pages/main/components/weeklyAccess";


interface chartData {
  name: string;
  mobile: number;
}


const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="desc">{payload[0].value}명 접속</p>
      </div>
    );
  }

  return null;
};

interface VisitorChartProps {
  rank: ResponseRank[]
}

export default function VisitorChart(props: VisitorChartProps) {
  const { rank } = props;

  const [chartData, setChartData] = useState<chartData[]>([]);

  useEffect(() => {
    const _chartData: chartData[] = [];

    for (let i = 0; i < 7; i++) {
      _chartData.push({
        name: rank[i] === undefined ? "-" : rank[i].name,
        mobile: rank[i] === undefined ? 0 : rank[i].count,
      });
    }

    setChartData(_chartData);

  }, [rank]);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          height={246}
          data={chartData}
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
            tickCount={7}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              lineHeight: "20px",
              width: "70px",
              right: "0",
              top: "10px",
              fontSize: "10px",
              letterSpacing: "-0.04em",
            }}
          />
          <Bar dataKey="mobile" barSize={57} fill="#49cec3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
