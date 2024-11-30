import React from 'react';

import { Box, Typography } from '@mui/material';
import RichTextfield from './richTextField/RichTextfield';

const RichNoteField = ({
  formData,
  name = 'note',
  label = 'Note:',
  minWidth = '325px',
  ...rest
}) => {
  return (
    <Box flex={1} minWidth={minWidth}>
      <Typography
        component='div'
        variant='p2'
        fontWeight='500'
        mb={1}
      >
        {label}
      </Typography>
      <RichTextfield
        formData={formData}
        name={name}
        placeholder="Detailed note..."
        disableImage
        {...rest}
      />
    </Box>
  );
}

export default RichNoteField;
