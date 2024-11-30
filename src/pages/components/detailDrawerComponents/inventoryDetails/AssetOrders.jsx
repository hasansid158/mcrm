import React from 'react';

import { keys, values } from 'lodash';
import { Typography, Box, Grid } from '@mui/material';
import { camelCaseToSpace } from 'utils/textFormatUtils';

const AssetOrders = ({
  orderData = {},
}) => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={1}
    >
      {keys(orderData)?.map((order, key) => (
        <Grid
          key={key}
          item
          sm={3} xs={6}
        >
          <Box>
            <Typography variant='p3' fontWeight='bold'>
              {camelCaseToSpace(order)}
            </Typography>
          </Box>
          <Typography variant='p2'>
            {camelCaseToSpace(values(orderData)?.[key])}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default AssetOrders;
