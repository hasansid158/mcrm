import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeLoadById } from 'api/masterApi';
import { Box, Typography } from '@mui/material';

import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';
import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

const RemoveLoad = ({
  loadId,
  loadNo,
  onLoadRemove = () => {},
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState();
  const [loading, setLoading] = useState();

  const handleConfirm = () => {
    setLoading(true);

    removeLoadById(loadId)
      .then(res => {
        onLoadRemove();
        dispatch(setSnackBar({
          open: true,
          message: `Successfully removed load ${loadNo}`,
        }))
      })
      .catch(err => {
        console.log(err);
        dispatch(setErrorDialogText('Error while removing load, please try again later.'))
      })
      .finally(() => {
        setLoading(false);
        setOpen();
      });
  }

  return <>
    <ConfirmDialog
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={handleConfirm}
      loading={loading}
    >
      <Typography>Are you sure you want to remove assets from load {loadNo || ''}</Typography>
    </ConfirmDialog>

    <Box
      onClick={() => setOpen(true)}
    >
      Remove Assets
    </Box>
  </>;
}

export default RemoveLoad;
