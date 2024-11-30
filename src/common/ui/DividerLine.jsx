import React from 'react';
import { Divider } from '@mui/material';

const DividerLine = ({
  sx,
  height = '2px',
  color = 'secondary.light',
  ...rest
}) => {
  return (
    <Divider
      light={true}
      sx={{
        borderBottomWidth: height,
        borderColor: color,
        ...sx,
      }}
      {...rest}
    />
  );
}

export default DividerLine;
