import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, IconButton, Slide, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { disableSnackBar } from 'redux/slices/commonSlice/commonSlice'


const slideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

export default function SnackbarNotify() {
  const dispatch = useDispatch();

  const {
    open = false,
    message = '',
    options = {}
  } = useSelector(state => state.common.snackbar)

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;
    dispatch(disableSnackBar());
  };

  // const action = (
  //   <IconButton
  //     size='small'
  //     aria-label='close'
  //     color='white'
  //     onClick={handleClose}
  //   >
  //     <CloseIcon fontSize='small' />
  //   </IconButton>
  // )

  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      autoHideDuration={4000}
      TransitionComponent={slideTransition}
      key={message}
      onClose={handleClose}
      open={open}
      {...options}
    >
      <Alert
        variant='filled'
        severity={options?.severity || 'success'}
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
