import React from 'react';
import BarChart from '../charts/BarChart01';

import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
// Import utilities
import { hexToRGB, tailwindConfig } from '../utils';
import styles from './Dashboard.module.scss'
function DashboardCard02({ title, amount, backgroundColor = '#FFFFFF', borderColor = '#FFCB5B' }) {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
    ],
    datasets: [
      {
        label: 'Direct',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: borderColor,
        hoverBackgroundColor: borderColor,
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      }
    ],
  };

  return (
    <Box
      bgcolor={backgroundColor}

      className={styles.graphBox}
    >
      <Box p={2} px={3}>
        <Stack spacing={1}>
          <Stack>
            <Typography
              component={'p'}
              fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
              fontWeight={400}
              lineHeight={'32px'}
              fontFamily={'"Poppins", sans-serif'}
              className={styles.greyText}
            >
              {title}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              fontWeight={600}
              lineHeight={'32px'}
              fontSize={{ xs: '24px', sm: '28px', md: '32px' }}
              className={`${styles.darkText} outfit-font`}>
              {amount}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box width={'100%'} p={3}>
        <BarChart data={chartData} width={'100%'} height={380} />
      </Box>
    </Box>
  );
}

export default DashboardCard02;
