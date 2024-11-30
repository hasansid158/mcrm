import React from 'react';

import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import DetailCard from './DetailCard';
import { cardEnum } from './cardEnum';

import useScreenSize from 'hooks/useScreenSize';

const DetailSection = () => {
  const {isLaptop} = useScreenSize();

  const BulletPoint = ({heading, detail}) => (
    <Box
      display='flex'
      alignItems='flex-start'
    >
      <DoneIcon sx={{
          fontSize: 32,
          mr: .5,
          transform: 'translateY(-6px)',
        }}
      />
      <Box>
        <Typography
          component='div'
          mb={.5}
          variant='pb'
        >
          {heading}
        </Typography>
        <Typography
          component='div'
          variant='p'
        >
          {detail}
        </Typography>
      </Box>
    </Box>
  );

  const bulletContent = [
    {
      heading: 'Run with industry best practicies',
      detail: 'by applying preconfigured processes that are ready to go',
    },
    {
      heading: 'Build your own breakthroughs',
      detail: 'by reshaping business models and redefining work on the fly',
    },
    {
      heading: 'Grow without limits',
      detail: 'by adding customers, markets and products without adding complexity',
    },
    {
      heading: 'Go live with confidence',
      detail: 'by using proven guidance to deliver speed and agility',
    },
  ]

  return (
    <Grid
      container
      mb={8} pt={5}
    >
      <Grid item lg={5} px={2}>
        <Box
          display='flex'
          flexDirection='column'
          rowGap={6}
        >
          {bulletContent?.map((content, key) => (
            <BulletPoint
              key={key}
              heading={content?.heading}
              detail={content?.detail}
            />
          ))}
        </Box>
      </Grid>
      <Grid item lg={7}>
        <Grid
          container
          rowGap='10px'
          columnSpacing='10px'
          justifyContent='center'
          mt={isLaptop ? 3 : 0}
        >
          {cardEnum?.map((card, key) => (
            <Grid key={key} item lg={3}>
              <DetailCard
                cardHeading={card?.heading}
                cardDetail={card?.detail}
                bullets={card?.bullets}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DetailSection;
