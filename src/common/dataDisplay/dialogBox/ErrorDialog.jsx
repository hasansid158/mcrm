import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DialogBox from './DialogBox'
import { Box, Button } from '@mui/material'

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice'

export default function ErrorDialog() {
  const dispatch = useDispatch();
  const { errorDialogText } = useSelector(state => state.common)

  return !!errorDialogText ? (
    <DialogBox
      open
      handleClose={() => dispatch(setErrorDialogText(null))}
      maxWidth="xs"
      disableFormFooter
      title={
        <Box color='common.error'>Error</Box>
      }
      isGrey
      sx={{ zIndex: 99999999 }}
    >
      <Box
        px={1}
        py={2}
        borderRadius={1}
        backgroundColor='white'
      >
        {errorDialogText}
      </Box>

      <Box
        mt='20px'
        pb={2}
      >
        <Button
          onClick={() => dispatch(setErrorDialogText(null))}
          fullWidth
          variant='outlined'
          color='secondary'
        >
          OK
        </Button>
      </Box>
    </DialogBox>
  ) : null;
}
