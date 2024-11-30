import React from 'react';

import { Box, Button } from '@mui/material';

const MenuButton = ({
  label = '',
  icon = '',
  onClick = () => {},
  isButton,
  outlined = false,
  ...rest
}) => {
  if (isButton) return (
    <Button
      onClick={onClick}
      variant={outlined ? 'outlined' : 'contained'}
      color={outlined ? 'secondary' : 'primary'}
      startIcon={icon}
      sx={{minWidth: '140px'}}
      {...rest}
    >
      {label}
    </Button>
  )

  return (
    <Box
      onClick={onClick}
      {...rest}
    >
      {icon}
      {label}
    </Box>
  );
}

export default MenuButton;
