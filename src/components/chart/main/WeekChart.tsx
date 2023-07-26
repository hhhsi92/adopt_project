import { useEffect, useState } from "react";
import "../chart.css";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from "recharts";

import { ResponseRank } from "@/pages/main/components/weeklyAccess";
import {
  NameType,
  ValueType,
} from "recharts/src/component/DefaultTooltipContent";


interface chartData {
  name: string;
  공고중: number;
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
        <p className="desc">{payload[0].value}마리</p>
      </div>
    );
  }

  return null;
};

interface ChartProps {
  rank: ResponseRank[]
}

export default function WeekChart(props: ChartProps) {
  const { rank } = props;

  const [chartData, setChartData] = useState<chartData[]>([]);

  useEffect(() => {
    const _chartData: chartData[] = [];

    for (let i = 0; i < 7; i++) {
      _chartData.push({
        name: rank[i] === undefined ? "-" : rank[i].name,
        공고중: rank[i] === undefined ? 0 : rank[i].count,
      });
    }

    setChartData(_chartData);

  }, [rank]);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
          <Area dataKey="공고중" stroke="#3d3d3d" fill="#49cec3" label={{ position: 'top', fontSize: '11px' }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
