import React, { useState, useEffect } from 'react';

import DrawerBar from 'common/dataDisplay/DrawerBar/DrawerBar';

import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';

import { updateAssetItem } from 'redux/slices/actionSlice/assetSlice';

import { useDispatch } from 'react-redux';
import {
  setErrorDialogText,
  setSnackBar,
} from 'redux/slices/commonSlice/commonSlice';
import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

import { LoadingButton } from '@mui/lab';
import { isEmpty } from 'lodash';

import formComponentsEnum from 'enum/formComponentsEnum';

import useReactForm from 'hooks/useReactForm';

const BulkEdit = ({
  bulkItems,
  editForm,
  formKey,
  editedValues,
  updateApi,
  removeFields = [],
  apiPayloadObj = () => {},
  setEditedValues = () => {},
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (!editedValues) return;

    const {
      name,
      value,
    } = editedValues;

    setUpdateData(prev => {
      const newData = { ...prev };
      if (!!!value && value !== false) {
        delete newData[name];
      } else {
        newData[name] = value;
      }
      return newData;
    });
  }, [editedValues]);


  const handleConfirm = async () => {
    setOpenConfirmDialog(false);
    setLoading(true);

    const bulkUpdateData = apiPayloadObj({ids: bulkItems, updateData: updateData});

    updateApi(bulkUpdateData)
      .then(res => {
        dispatch(updateAssetItem(res?.data || {}));
        dispatch(setSnackBar({
          open: true,
          message: `Successfully updated values of ${bulkItems.length} rows`,
        }));
        setOpen(false);
      })
      .catch(err => dispatch(setErrorDialogText('Server error occurred, please try again.')))
      .finally(() => setLoading(false));
  }

  const handleClick = () => {
    if (bulkItems?.length < 2) {
      dispatch(setErrorDialogText('Please select at least two rows!'));
      return;
    }
    setOpen(true)
  }

  const {
    formData,
    useWatch
  } = useReactForm();

  const formProps = {
    formData: formData,
    watchedData: useWatch({control: formData.control}),
    notrequired: true,
    isUpdate: true,
    gridContainerProps: {px: 2},
    gridItemSize: { xs: 12, md: 12, sm: 12 },
    onChange: (name, value) => setEditedValues({name, value}),
    disableStar: true,
    placeholder: 'Keep current value',
    removeFields,
    returnLabel: true,
  };

  return <>
    <DrawerBar
      anchor='right'
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxWidth: '300px',
        }}
      >
        <Box
          sx={{
            borderBottom: theme => `1px solid ${theme.palette.primary.main}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            height: '40px',
          }}
        >
          <Typography variant='h6'>
            Bulk Edit
          </Typography>

          <IconButton
            sx={{
              color: 'white',
              background: theme => `${theme.palette.common.error}d4`,
              '&:hover': {
                background: theme => theme.palette.common.error,
              }
            }}
            variant='contained'
            size='small'
            onClick={() => setOpen(false)}
          >
            <CloseIcon sx={{fontSize: '14px'}}/>
          </IconButton>
        </Box>

        <Box
          flex={1}
          sx={{
            overflow: 'auto',
            backgroundColor: theme => theme.palette.common.backgroundGrey,
            py: 1,
          }}
        >
          {/* {editForm} */}
          {formComponentsEnum(formProps)?.[formKey]?.createForm}
        </Box>

        <Box sx={{
          borderTop: theme => `1px solid ${theme.palette.primary.main}`,
          p: 1.5,
          px: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <LoadingButton
            variant='contained'
            fullWidth
            size='small'
            onClick={() => setOpenConfirmDialog(true)}
            loading={loading}
            disabled={isEmpty(updateData)}
          >
            <Typography variant='p2' sx={{py: .5}}>
              Update {bulkItems?.length} rows
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </DrawerBar>

    <Box
      onClick={handleClick}
      display='flex' alignItems='center'
    >
      <DesignServicesRoundedIcon/>
      Bulk Edit
    </Box>


    <ConfirmDialog
      open={!!openConfirmDialog}
      onConfirm={handleConfirm}
      onCancel={() => setOpenConfirmDialog(false)}
      title='Are you sure?'
    >
      You are updating the data of {bulkItems?.length} rows.
    </ConfirmDialog>
  </>;
}

export default BulkEdit;
