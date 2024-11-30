import React from 'react';
import DoughnutChart from '../charts/DoughnutChart';

// Import utilities
import { hexToRGB } from '../utils';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import styles from './Dashboard.module.scss'

function DashboardCard05({ title, amount, backgroundColor = '#FFFFFF', borderColor = '#FFCB5B' }) {

  const chartData = {
    labels: ['Approved', 'Pending', 'Under review', 'Rejected'],
    datasets: [
      {
        label: 'Top Countries',
        data: [
          610, 342, 240, 190
        ],
        backgroundColor: [
          '#07CCD2',
          '#F76A63',
          '#46C79E',
          '#FFCB5B',
        ],
        // hoverBackgroundColor: [
        //   'red',
        //   'red',
        //   'red',
        // ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box
      bgcolor={backgroundColor}
      className={styles.graphBox}
      position={'relative'}
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
      <Box width={'100%'} p={3} >
        <DoughnutChart data={chartData} width={'100%'} height={'375.65'} />
      </Box>
    </Box>
  );
}

export default DashboardCard05;
