import React from 'react';

import { Box, Typography, Grid } from '@mui/material';

import { ReactComponent as BannerArrow } from 'components/assets/bannerArrow.svg';
import PaperBox from 'common/ui/PaperBox';

import theme from 'core/theme';

const ProgressSteps = ({
  labels = [],
  selected = '',
}) => {
  const {
    backgroundGrey,
    highGreen,
    lowGreen,
    error,
    grey,
  } = theme.palette.common;

  const selectedIdx = labels?.indexOf(selected);

  return (
    <PaperBox
      sx={{
        backgroundColor: backgroundGrey,
        minHeight: 0,
        mb: 1,
        p: 1,
      }}
    >
      <Grid
        container
        rowGap={1}
      >
        {labels?.map((label, key) => (
          <Grid
            key={key}
            item
            xs={4}
            md={labels?.length > 6 ? 'auto' : 2}
            position='relative'
            width='100%'
            minHeight='40px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            px={2}
          >
            <Box zIndex='1' textAlign='center' lineHeight={0}>
              <Typography
                variant='p3'
                fontWeight='600'
              >
                {label}
              </Typography>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                '& svg': {
                  fill:
                  (key === labels?.length - 2 && selectedIdx >= labels?.length - 1)
                  ? grey
                  : (key === labels?.length - 1 && selectedIdx >= labels?.length - 1)
                  ? error
                  : selectedIdx > key
                  ? lowGreen
                  : selectedIdx === key
                  ? highGreen
                  : grey,
                  // stroke: selectedIdx === key ? highGreen : '',
                  width: '100%',
                  height: '100%',
                }
              }}
            >
              <BannerArrow />
            </Box>
          </Grid>
        ))}
        </Grid>
      </PaperBox>

  );
}

export default ProgressSteps;
