import React from 'react'
import { Box, Typography } from '@mui/material';

const CustomTooltip = ({ active, payload, backgroundColor, color }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        backgroundColor: backgroundColor+'cc',
        border: `2px solid ${color}`,
        borderRadius: 2,
        p: .8,
        boxShadow: '0px 0px 4px 0px #0000004f',
      }}>
        {payload?.map((data, key) => (
          <Box key={key}>
            <Typography
              color={color}
              variant='p2'
            >
              {data?.name}: {data?.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export default CustomTooltip;