import React from 'react';

import DialogBox from './DialogBox';
import { Box, Button } from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

export default function ConfirmDialog({
  title = 'Warning',
  onConfirm = () => {},
  onCancel = () => {},
  children,
  open = false,
  ...rest
}) {
  return (
    <DialogBox
      maxWidth="xs"
      disableFormFooter
      title={<Box color="common.warning">{title}</Box>}
      handleClose={onCancel}
      open={open}
      {...rest}
    >
      <PaperBox>{children}</PaperBox>

      <Box mt="20px" display="flex" columnGap={1}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Box>
    </DialogBox>
  );
}
