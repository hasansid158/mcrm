import React, { useEffect, useState } from "react";
import {
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography } from '@mui/material';
import CustomTooltip from "./CustomToolTip";

export default function BarRecharts({
  data = [],
  dataKey = '',
  chartColor = '#fff',
  barColor = '#9e6de0',
  height = 300,
}) {
  const [barData, setBarDate] = useState(data);
  const [isAnimationActive, setIsAnimationActive] = useState(true);

  const boxStyle = {
    display: 'inline-block',
    borderRadius: 1,
    overflow: 'hidden',
    width: '100%',
  }

  useEffect(() => {
    const barInterval = setInterval(() => {
      const crop = barData?.slice(1);
      const addItem = [...crop, {[dataKey]: Number((Math.random() * 3000).toFixed())}];
      setBarDate(addItem);
    }, 3000);

    return () => clearInterval(barInterval);  
  }, [barData]);

  return (
    <Box sx={boxStyle} >
      <ResponsiveContainer 
        debounce={50} 
        width='100%' 
        height={height}
      >
        <BarChart data={barData} margin={{ left: -10 }}>
          <CartesianGrid vertical={false}/>
          <XAxis 
            fontSize={12} 
            dataKey={dataKey}
          />
          <YAxis 
            tickCount={9} 
            fontSize={12} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            content={
              <CustomTooltip 
                backgroundColor={barColor}
                color={chartColor}
              />
            }
            //to remove random outline issue
            wrapperStyle={{outline: 'none'}}
          />
          <Bar 
            dataKey={dataKey}
            fill={barColor}
            isAnimationActive={isAnimationActive}
            onAnimationEnd={() => setIsAnimationActive(false)}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
