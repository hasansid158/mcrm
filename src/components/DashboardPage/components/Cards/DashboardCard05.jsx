import React from 'react';
import LineChart from '../charts/LineChart02';

// Import utilities
import styles from './Dashboard.module.scss'
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

function DashboardCard08({ title, amount, backgroundColor = '#FFFFFF' }) {

  const theme = useTheme();

  const chartData = {
    labels: [
      '12-01-2020',
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
      '10-01-2021',
      '11-01-2021',
      '12-01-2021',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Current',
        data: [73, 64, 73, 69, 104, 104, 164, 164, 120, 120, 120, 148],
        borderColor: theme.palette.primary.main,
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.primary.main,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Blue line
      {
        label: 'Previous',
        data: [184, 86, 42, 378, 42, 243, 38, 120, 0, 0, 42, 0],
        borderColor: theme.palette.blueWhite.main,
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.blueWhite.main,
        pointHoverBackgroundColor: theme.palette.blueWhite.main,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // emerald line
      {
        label: 'Average',
        data: [122, 170, 192, 86, 102, 124, 115, 115, 56, 104, 0, 72],
        borderColor: theme.palette.pinkWhite.main,
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.pinkWhite.main,
        pointHoverBackgroundColor: theme.palette.pinkWhite.main,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
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
        <LineChart data={chartData} width={'100%'} height={344} />
      </Box>
    </Box>
  );
}

export default DashboardCard08;
