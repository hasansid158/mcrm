import React from 'react';

import ComposedRechart from 'common/dataDisplay/charts/ComposedRechart';
import {Box, Typography} from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

export default function BusinessComposedChart({
  data = [],
  dataKeys = [],
  colors = [],
}) {
  return (
    <Box>
      <PaperBox sx={{p: 0,}}>
        <Box
          px={4}
          py={3}
        >
          <Box mb={.6}>
            <Typography variant='h5'>
              Income And Expenses
            </Typography>
          </Box>
          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            pb={2}
            pt={4}
          >
            {colors?.map((color, key) => (
              <Box key={key}>
                <Box
                sx={{
                  width: 20,
                  height: 5,
                  background: color,
                  display: 'inline-block',
                  mr: '2px',
                  ml: '10px',
                }}
                />
                <Typography variant='description'>
                  {dataKeys?.[key]}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box>
            <ComposedRechart
              data={data}
              dataKeys={dataKeys}
              colors={colors}
            />
          </Box>
        </Box>
      </PaperBox>
    </Box>
  )
};