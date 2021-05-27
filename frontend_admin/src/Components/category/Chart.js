import React, {useEffect, useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from '../outline/Title';
import {getTimeInfo} from '../../lib/function/dateToString';

export default function Chart({paymentList}) {
  // Generate Sales Data
  function createData(time, amount) {
    return {time, amount};
  }

  const theme = useTheme();
  useEffect(() => {
    paymentList.map(item => sumPaymentWithTime(item));
    setData(tmp);
  }, [paymentList]);

  const [data, setData] = useState([]);
  const tmp = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const sumPaymentWithTime = item => {
    let price = parseInt(item.paymentAmount);
    let time = parseInt(getTimeInfo(item.txDateTime));
    tmp[time] = parseInt(tmp[time]) + price;
  };
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data.map((item, index) => createData(index, item))}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{textAnchor: 'middle', fill: theme.palette.text.primary}}>
              Sales (₩)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
