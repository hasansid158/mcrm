import React from 'react';
import {
  Paper,
  Typography,
  Box,
} from '@mui/material';

import useScreenSize from 'hooks/useScreenSize';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

const PaperBox = ({
  children,
  elevation = 0,
  sx = {},
  fullHeight = false,
  label,
  square = false,
  heightDiff = 140,
  enableBorder = false,
  white = false,
  loading = false,
  ...rest
}) => {

  const { isMobile } = useScreenSize();

  return (
    <Paper
      sx={{
        px: isMobile ? 1 : 2,
        py: 1.5,
        // minHeight: 80,
        height: fullHeight ? `calc(100dvh - ${heightDiff}px)` : 'auto',
        border: theme => !enableBorder ? '' : `2px solid ${theme.palette.secondary.light}`,
        borderRadius: square ? 0 : 1,
        backgroundColor: white ? 'white' : 'common.backgroundGrey',
        position: 'relative',
        ...sx,
      }}
      elevation={elevation}
      {...rest}
    >
      <SpinLoader loading={loading} sx={{ borderRadius: square ? 0 : 1 }}/>

      {label &&
        <Box mb={1}>
          <Typography variant='p'>
            <b>{label}</b>
          </Typography>
        </Box>
      }
      {children}
    </Paper>
  );
}

export default PaperBox;
