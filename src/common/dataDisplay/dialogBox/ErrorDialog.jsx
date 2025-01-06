import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DialogBox from './DialogBox';
import { Box, Button } from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import parse from 'html-react-parser';

export default function ErrorDialog() {
  const dispatch = useDispatch();
  const { errorDialogText } = useSelector((state) => state.common);

  return errorDialogText ? (
    <DialogBox
      open
      handleClose={() => dispatch(setErrorDialogText(null))}
      maxWidth="sm"
      disableFormFooter
      title={<Box color="common.error">Error</Box>}
      sx={{ zIndex: 99999999 }}
    >
      <PaperBox>{parse(errorDialogText || '')}</PaperBox>

      <Box mt="20px">
        <Button
          onClick={() => dispatch(setErrorDialogText(null))}
          fullWidth
          variant="outlined"
          color="secondary"
        >
          OK
        </Button>
      </Box>
    </DialogBox>
  ) : null;
}
