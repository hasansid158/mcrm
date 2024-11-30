import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";

import { Box, Typography } from '@mui/material';
import CustomTooltip from "./CustomToolTip";

export default function ComposedRechart({
  data = [],
  chartColor = '#fff',
  dataKeys = [
    'price1',
    'price3',
    'price2',
  ],
  colors = [
    '#9e6de0',
    '#faafca',
    '#e5d23f',
  ],
  height = 300,
}) {

  const boxStyle = {
    display: 'inline-block',
    borderRadius: 1,
    overflow: 'hidden',
    width: '100%',
  }

  return (
    <Box sx={boxStyle}>
      <ResponsiveContainer 
        debounce={50} 
        width='100%' 
        height={height}
      >
        <ComposedChart 
          data={data}
          margin={{ left: -10 }}
          barGap={0}
        >
          <CartesianGrid vertical={false}/>
          <XAxis 
            fontSize={12} 
            axisLine={false} 
            tickLine={false} 
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
                backgroundColor={colors?.[0]}
                color={chartColor}
              />
            }
            //to remove random outline issue
            wrapperStyle={{outline: 'none'}}
          />
          <Bar 
            dataKey={dataKeys?.[0]}
            barSize={20} 
            fill={colors?.[0]} 
          />
          <Bar 
            dataKey={dataKeys?.[1]}
            barSize={20} 
            fill={colors?.[1]} 
          />
          <Line 
            type="monotone" 
            dataKey={dataKeys?.[2]} 
            stroke={colors?.[2]} 
            strokeWidth={2} 
            animationDuration={800} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
