import React from 'react';

import AreaRechart from 'common/dataDisplay/charts/AreaRechart';
import {Box, Typography} from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

export default function BusinessAreaChart({
  data = [],
  dataKey = '',
  backgroundColor = '#fd5190',
  title = '$18,000',
  subTitle = 'Sales Of This Year | 45%',
}) {
  return (
    <Box mb={11.5}>
      <PaperBox sx={{p: 0}}>
        <Box
          px={4}
          pt={3}
          maxHeight='140px'
        >
          <Box mb={.6}>
            <Typography variant='h4' fontWeight='normal'>{title}</Typography>
          </Box>
          <Box>
            <Typography variant='p2'>{subTitle}</Typography>
          </Box>
          <Box sx={{
            transform: 'translateY(20px)',
          }}>
            <AreaRechart
              data={data}
              dataKey={dataKey}
              backgroundColor={backgroundColor}
              height={135}
              sx={{
                boxShadow: '0px 2px 5px 0px #00000059',
              }}
            />
          </Box>
        </Box>
      </PaperBox>
    </Box>
  )
};