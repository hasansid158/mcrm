import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import CustomTooltip from "./CustomToolTip";

export default function AreaRechart({
  data = [],
  dataKey = '',
  syncId = 'synced',
  chartColor = '#fff',
  backgroundColor = '#8884d8',
  height = 200,
  sx,
}) {

  const activeDotStyle = {
    stroke: chartColor, 
    fill: backgroundColor,
    fillOpacity: .6,
    strokeWidth: 2,
    r: 6,
  }
  const boxStyle = {
    display: 'inline-block',
    backgroundColor: backgroundColor,
    borderRadius: 1,
    overflow: 'hidden',
    width: '100%',
    ...sx,
  }

  return (
    <Box sx={boxStyle}>
      <ResponsiveContainer debounce={50} width='100%' height={height}>
        <AreaChart 
          data={data} 
          margin={0}
          syncId={syncId}
        >
          <defs>
            <linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={chartColor} stopOpacity={0.8}/>
              <stop offset='95%' stopColor={chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip 
            //to remove random outline issue
            wrapperStyle={{outline: 'none'}}
            content={
              <CustomTooltip 
                backgroundColor={backgroundColor}
                color={chartColor}
              />
            }          />
          <Area 
            type='monotone' 
            activeDot={activeDotStyle} 
            dataKey={dataKey}
            stroke={chartColor}
            fillOpacity={1} 
            fill='url(#colorGradient)' 
            strokeWidth={2}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
