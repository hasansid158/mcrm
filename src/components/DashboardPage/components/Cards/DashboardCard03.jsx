import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import RealtimeChart from '../charts/RealtimeChart';
import styles from './Dashboard.module.scss'
// Import utilities
import { tailwindConfig, hexToRGB } from '../utils';
import { Box, Stack, Typography, Divider, Button, ButtonGroup } from '@mui/material';
function DashboardCard05({ title, backgroundColor, borderColor, }) {

  // IMPORTANT:
  // Code below is for demo purpose only, and it's not covered by support.
  // If you need to replace dummy data with real data,
  // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);

  // Dummy data to be looped
  const data = [
    57.81, 57.75, 55.48, 54.28, 53.14, 52.25, 51.04, 52.49, 55.49, 56.87,
    53.73, 56.42, 58.06, 55.62, 58.16, 55.22, 58.67, 60.18, 61.31, 63.25,
    65.91, 64.44, 65.97, 62.27, 60.96, 59.34, 55.07, 59.85, 53.79, 51.92,
    50.95, 49.65, 48.09, 49.81, 47.85, 49.52, 50.21, 52.22, 54.42, 53.42,
    50.91, 58.52, 53.37, 57.58, 59.09, 59.36, 58.71, 59.42, 55.93, 57.71,
    50.62, 56.28, 57.37, 53.08, 55.94, 55.82, 53.94, 52.65, 50.25,
  ];

  const [slicedData, setSlicedData] = useState(data.slice(0, range));

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    data.forEach((v, i) => {
      dates.push(new Date(now - 2000 - i * 2000));
    });
    return dates;
  };

  const [slicedLabels, setSlicedLabels] = useState(generateDates().slice(0, range).reverse());

  // Fake update every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter(counter + 1);
  //   }, 2000);
  //   return () => clearInterval(interval)
  // }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    setIncrement(increment + 1);
    if (increment + range < data.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, data[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }
    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
    return () => setIncrement(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(borderColor)}, 0.08)`,
        borderColor: borderColor,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: borderColor,
        pointHoverBackgroundColor: borderColor,
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
      p={2}
      borderRadius={'24px'}
    >
      <Box py={1} pr={2} pl={.5}>
        <Stack spacing={1} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack>
            <Typography
              component={'p'}
              fontSize={{ xs: '20px', sm: '22px', md: '24px', lg: '24px' }}
              fontWeight={600}
              lineHeight={'28.8px'}
              fontFamily={'"Lora", sans-serif'}
              className={styles.darkText}
            >
              {title}
            </Typography>
          </Stack>
          <Stack>
            <ButtonGroup sx={{ borderRadius: '12px', boxShadow: 'none', bgcolor: '#F8F8F8' }} variant="contained" aria-label="Basic button group">
              <FilterButton title={'Today'} isActive={false} onClick={() => { }} />
              <FilterButton title={'Weekly'} isActive={false} onClick={() => { }} />
              <FilterButton title={'Monthly'} isActive={true} onClick={() => { }} />
            </ButtonGroup>
          </Stack>
        </Stack>
      </Box>
      <Box width={'100%'} pt={2}>
        <RealtimeChart data={chartData} width={'100%'} height={455} />
      </Box>
    </Box>
  );
}

export default DashboardCard05;

const FilterButton = ({ title, isActive }) => {
  return (
    <Button
      size='large'
      sx={{
        bgcolor: isActive ? 'primary.main' : '#F8F8F8',
        borderTopRightRadius: isActive ? '12px !important' : '12px',
        borderTopLeftRadius: isActive ? '12px !important' : '12px',
        borderBottomRightRadius: isActive ? '12px !important' : '12px',
        borderBottomLeftRadius: isActive ? '12px !important' : '12px',
        transition: '0.2s',
        borderRight: '0px solid !important',
        ':hover': {
          borderTopRightRadius: '12px !important',
          borderTopLeftRadius: '12px !important',
          borderBottomRightRadius: '12px !important',
          borderBottomLeftRadius: '12px !important',
        }
      }}
    >{title}
    </Button>
  )
}

