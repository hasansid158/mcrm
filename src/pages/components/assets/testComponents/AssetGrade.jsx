import React from 'react';

import { Box, Typography } from '@mui/material';

const AssetGrade = ({ grade = 'a' }) => {

  const gradeColorMap = {
    'a': '#4CAF50',
    'b': '#8BC34A',
    'c': '#CDDC39',
    'd': '#FFC107',
    'e': '#FF5722',
    'f': '#F44336',
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      columnGap={1}
    >
      <Typography variant='p2' fontWeight='bold'>Grade:</Typography>
      <Box
        sx={{
          width: '32px',
          height: '32px',
          backgroundColor: gradeColorMap?.[grade?.toLowerCase()] || 'red',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h4'
          color='white'
          sx={{ transform: 'translateY(-1px)' }}
        >
          {grade}
        </Typography>
      </Box>
    </Box>
  );
}

export default AssetGrade;
