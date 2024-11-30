import React from 'react';
import { Drawer } from '@mui/material';
import theme from 'core/theme';

const DrawerBar = ({
  open = false,
  onClose = () => {},
  children,
  // disableTopClip = false,
  // topClip = 6,
  sx = {},
  ...rest
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      // PaperProps={{
      //   sx: {
      //     top: !disableTopClip ? theme.spacing(topClip) : 0,
      //     height: `calc(100dvh - ${!disableTopClip ? theme.spacing(topClip) : 0})`,
      //   },
      // }}
      sx={{
        zIndex: 9999,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Drawer>
  );
}

export default DrawerBar;
