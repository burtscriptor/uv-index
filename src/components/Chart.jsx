import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const Chart = ({ data }) => {

const today = new Date();
const endDate = new Date(today);
endDate.setDate(today.getDate() + 2); 

const filteredData = data.filter((item) => {
  const itemDate = new Date(item.time);
  return itemDate >= today && itemDate <= endDate;
});

  
  const formatXAxis = (ticketItem) => {
    const date = parseISO(ticketItem);
    return `${format(date, 'EEE')} - ${format(date, 'HH:mm')}`;
  };

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="uvi" stroke="#8884d8" fill="red" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
