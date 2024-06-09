import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { format, parseISO } from 'date-fns';
import gradient from '../assets/uvindex.webp'

const Chart = ({ data }) => {
  // const today = new Date();
  // const endDate = new Date(today);
  // endDate.setDate(today.getDate() + 1);
  const today = new Date();
  const endDate = new Date(today);
  endDate.setHours(today.getHours() + 12);

  const filteredData = data.filter((item) => {
    const itemDate = parseISO(item.time);
    return itemDate >= today && itemDate <= endDate;
  });

  const formatXAxis = (ticketItem) => {
    const date = parseISO(ticketItem);
    return `${format(date, 'EEE')} - ${format(date, 'HH:mm')}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = parseISO(label);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${format(date, 'PPpp')}`}</p>
          <p className="intro">{`UV Index: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const getColor = (value) => {
    if (value >= 0 && value < 2.5) {
      return 'lightgreen' 
    } else if (value >= 2.5 && value < 5.5) {
      return  'yellow' 
    } else if (value >= 5.5 && value < 7.5) {
      return 'orange' 
    } else if (value >= 7.5 && value < 10.5) {
      return  'red' 
    } else if (value >= 10.5 && value <= 16) {
      return  'purple' 
    } else {
      return 'grey'
    }
  };

  return (
    <div className="chart-container">
     
      <div className='chartitem-2'>
      <ResponsiveContainer width="100%" height={300} >
        <BarChart
          data={filteredData}
          margin={{
            top: 65,
            right: 30,
            left: 30,
            bottom: 50, // Increased bottom margin to provide space for the label
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatXAxis}>
            {/* <Label value="Two day forecast" offset={-20} position="insideBottom" /> */}
          </XAxis>
          <YAxis ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>
              UV Index
            </Label>
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="uvi" 
            fill="red" 
            shape={(props) => {
              const color = getColor(props.payload.uvi);
              return <rect {...props} fill={color} />;
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
      
      <div className='chartitem-3'>
        <img src={gradient}></img>
      </div>
    </div>
  );
};

export default Chart;
