import '../chart.css';

import api from '@/common/API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const tooltipStyle = {
  fontSize: "12px",
  outline: "none",
};

interface chartData {
  name: string;
  value: number;
}

export default function CowEstrusChart() {
  const { uuid } = useParams();
  const [chartData, setChartData] = useState<chartData[]>([]);

  const getData = async () => {
    try {
      const {
        data: { data },
      } = await api.get(`v1/adm/cow/estrus/period/${uuid}`);

      const _chartData: chartData[] = [];

      if(data.labels){
        for (let index = 0; index < data.labels.length; index++) {
          _chartData.push({
            name: data.labels[index],
            value: data.data[index]
          });
        }
  
        setChartData(_chartData);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [uuid]);

  return (
    <div className="chart" style={{ margin: "0px 0px" }}>
      <ResponsiveContainer width="100%" height="100%">
        {
          <LineChart
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
              // ticks={[0, 100, 200, 300]}
            />
            <Tooltip wrapperStyle={tooltipStyle} />
            <Line
              dataKey="value"
              strokeWidth={1.5}
              stroke="#E98237"
            />
          </LineChart>
        }
      </ResponsiveContainer>
    </div>
  );
}
