import React from 'react';
import { dotWave, waveform } from 'ldrs';

import LinearProgress from '@mui/material/LinearProgress';

import theme from 'core/theme';
import { Box, Typography } from '@mui/material';

dotWave.register();
waveform.register();

const SpinLoader = ({
  loading = false,
  disabled = false,
  // isFullScreen = false,
  isProgress = false,
  progressValue = 0,
  progressText = '',
  noBlur = false,
  rest,
  sx = {},
}) => {
  if (!loading && !disabled) return;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9000,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        backdropFilter: noBlur ? 'unset' : 'blur(1px)',
        ...sx,
      }}
    >
      {isProgress && (
        <Box
          backgroundColor="white"
          boxShadow="0px 0px 16px -3px #9f9f9f"
          width="90%"
          borderRadius={1}
          p={1.5}
        >
          <Box mb={1.5}>
            <Typography variant="p2">{progressText}</Typography>
          </Box>
          <Typography variant="h6" textAlign="center">
            {progressValue}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{ height: '16px' }}
          />
        </Box>
      )}

      {!isProgress && !disabled && (
        <Box
          borderRadius="50%"
          backgroundColor="white"
          boxShadow="0px 0px 16px -3px #9f9f9f"
          width="75px"
          height="75px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <l-waveform
            color={theme.palette.primary.main}
            size={30}
            speed={0.9}
            stroke="4"
            {...rest}
          ></l-waveform>
        </Box>
      )}
    </Box>
  );
};

export default SpinLoader;
