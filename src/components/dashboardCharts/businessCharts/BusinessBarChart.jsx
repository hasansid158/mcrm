import React from 'react';

import BarRecharts from 'common/dataDisplay/charts/BarRecharts';
import {Box, Typography} from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

export default function BusinessBarChart({
  data = [],
  dataKey = '',
  barColor = '#9e6de0',
}) {
  return (
    <Box>
      <PaperBox sx={{p: 0}}>
        <Box
          px={4}
          py={3}
        >
          <Box mb={9}>
            <Typography variant='h5'>
              Current Users
            </Typography>
          </Box>
          <Box>
            <BarRecharts
              data={data}
              dataKey={dataKey}
              barColor={barColor}
            />
          </Box>
        </Box>
      </PaperBox>
    </Box>
  )
};