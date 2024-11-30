import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../charts/LineChart01';
import styles from './Dashboard.module.scss'

// Import utilities
import { hexToRGB, tailwindConfig } from '../utils';
import { Box, Stack, Typography } from '@mui/material';

function DashboardCard01({ title, increment, amount, backgroundColor, borderColor, }) {

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
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
      '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(borderColor)}, 0.08)`,
        borderColor: borderColor,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: borderColor,
        pointHoverBackgroundColor: borderColor,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.6
      },
    ],
  };

  return (
    <Box
      bgcolor={backgroundColor}
      p={2}
      className={styles.graphBox}
    >
      <Stack spacing={1}>
        <Stack direction={'row'} justifyContent={'space-between'} >
          <Typography
            component={'p'}
            fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
            fontWeight={400}
            lineHeight={'32px'}
            fontFamily={'"Poppins", sans-serif'}
          >
            {title}
          </Typography>
          <Box className={styles.increment}>
            <Typography
              variant="p"
              fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
              color={"#FFFFFF"}
              className="poppins-font"
              fontWeight={600}
            >
              {increment}
            </Typography>
          </Box>
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
      {/* Chart built with Chart.js 3 */}
      <Box width={'100%'}>
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={'100%'} height={128} />
      </Box>
    </Box>
  );
}

export default DashboardCard01;
