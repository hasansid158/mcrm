import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, rest } from 'lodash';

import DrawerBar from 'common/dataDisplay/DrawerBar/DrawerBar';
import SearchSelect from 'common/input/SearchSelect';
import InputField from 'common/input/InputField';

import { Button, Typography, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import DividerLine from 'common/ui/DividerLine';

import {
  setErrorDialogText,
  setSnackBar,
} from 'redux/slices/commonSlice/commonSlice';
import {
  fetchAssetTransferLocations,
} from 'redux/slices/listSlice/listSlice';
import { submitAssetTransferLocation } from 'api/masterApi';

import useReactForm from 'hooks/useReactForm';


const AssetTransfer = ({
  assetIDs = [],
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [selectedAisle, setSelectedAisle] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedBin, setSelectedBin] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState([]);


  const {
    assetTransferLocations,
    warehouses,
  } = useSelector(state => state.lists)

  useEffect(() => {
    if (!open) return;
    isEmpty(assetTransferLocations) && dispatch(fetchAssetTransferLocations());
  }, [open]);


  const handleOpen = () => {
    if (!assetIDs?.length) {
      dispatch(setErrorDialogText('Please select at least one row!'));
      return;
    };

    setOpen(true);
  }

  const {
    formData,
    handleSubmit,
    reset,
  } = useReactForm({}, { mode: 'onSubmit' });

  const handleWarehouseChange = (value) => {
      const warehouse = assetTransferLocations.warehouses.find(w => w?.name === value);
      setSelectedWarehouse(warehouse);
      setSelectedAisle([]);
      setSelectedLocation([]);
      setSelectedBin([]);
      setSelectedContainer([]);
  };

  const handleAisleChange = (val) => {
      const aisle = selectedWarehouse.aisles.find(a => a.id === val);
      setSelectedAisle(aisle);
      setSelectedLocation([]);
      setSelectedBin([]);
      setSelectedContainer([]);
  };

  const handleLocationChange = (val) => {
      const location = selectedAisle.locations.find(l => l.id === val);
      setSelectedLocation(location);
      setSelectedBin([]);
      setSelectedContainer([]);
  };

  const handleBinChange = (val) => {
      const bin = selectedLocation.bins.find(b => b.id === val);
      setSelectedBin(bin);
      setSelectedContainer([]);
  };

  const handleContainerChange = (val) => {
      const container = selectedBin.containers.find(c => c.id === val);
      setSelectedContainer(container);
  };


  const onSubmit = (data) => {
    setLoading(true);

    const warehouseId = warehouses?.find(w => w?.value === data?.warehouseId)?.id;

    const transferData = {
      ...data,
      warehouseId,
      assetIds: assetIDs,
    };

    submitAssetTransferLocation(transferData)
      .then(res => {
        dispatch(setSnackBar({
          open: true,
          message: `${assetIDs?.length} asset${assetIDs?.length > 1 ? 's' : ''} transferred successfully`,
        }));
        reset({});
      })
      .catch(err => {
        console.error(err);
        dispatch(setErrorDialogText('Server error occured, please try again later.'));
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  }

  const arrowSx = {
    color: 'darkgrey',
    alignSelf: 'center',
    fontSize: '30px',
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
            Asset Transfer
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
          width='300px'
          display='flex'
          flexDirection='column'
          backgroundColor={theme => theme.palette.common.backgroundGrey}
          p={2}
          pt={3}
          rowGap={2}
        >
          <SearchSelect
            formData={formData}
            name='warehouseId'
            label='Warehouse'
            searchSelectData={warehouses}
            onChange={(name, val) => handleWarehouseChange(val)}
            returnLabel
            required
            disableStar
            loading={isEmpty(warehouses) || isEmpty(assetTransferLocations)}
          />

          <ArrowDownwardRoundedIcon sx={arrowSx}/>

          <SearchSelect
            formData={formData}
            name='aisleId'
            label='Aisles'
            searchSelectData={
              selectedWarehouse?.aisles?.map((a) => (
              { id: a?.id, value: a?.value }
            ))}
            onChange={(name, val) => handleAisleChange(val)}
            required
            disableStar
            disabled={isEmpty(selectedWarehouse?.aisles)}
          />

          <ArrowDownwardRoundedIcon sx={arrowSx}/>

          <SearchSelect
            formData={formData}
            name='locationId'
            label='Location'
            searchSelectData={
              selectedAisle?.locations?.map((l) => (
              { id: l?.id, value: l?.value }
            ))}
            onChange={(name, val) => handleLocationChange(val)}
            required
            disableStar
            disabled={isEmpty(selectedAisle?.locations)}
          />

          <ArrowDownwardRoundedIcon sx={arrowSx}/>

          <SearchSelect
            formData={formData}
            name='binId'
            label='Bin'
            searchSelectData={
              selectedLocation?.bins?.map(b => (
              { id: b?.id, value: b?.value }
            ))}
            onChange={(name, val) => handleBinChange(val)}
            required
            disableStar
            disabled={isEmpty(selectedLocation?.bins)}
          />

          <ArrowDownwardRoundedIcon sx={arrowSx}/>

          <SearchSelect
            formData={formData}
            name='containerId'
            label='Container'
            searchSelectData={
              selectedBin?.containers?.map(c => (
              { id: c?.id, value: c?.value }
            ))}
            onChange={(name, val) => handleContainerChange(val)}
            required
            disableStar
            disabled={isEmpty(selectedBin?.containers)}
          />

          <ArrowDownwardRoundedIcon sx={arrowSx}/>

          <SearchSelect
            formData={formData}
            name='palletId'
            label='Pallet'
            searchSelectData={
              selectedContainer?.pallets?.map(p => (
              { id: p?.id, value: p?.value }
            ))}
            required
            disableStar
            disabled={isEmpty(selectedContainer?.pallets)}
          />

          <DividerLine color='grey' sx={{mt: 1, mb: 2}}/>

          <InputField
            name='performedBy'
            formData={formData}
            required
            disableStar
          />
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
            onClick={() => handleSubmit(onSubmit)()}
            loading={loading}
            disabled={!formData?.isValid}
          >
            <Typography variant='p2' sx={{py: .5}}>
              Transfer {assetIDs?.length} asset{assetIDs?.length > 1 ? 's' : ''}
            </Typography>
          </LoadingButton>
        </Box>
      </Box>
    </DrawerBar>

    <Box
      onClick={handleOpen}
      display='flex' alignItems='center'
    >
      <MoveDownRoundedIcon/>
      Asset Transfer
    </Box>
  </>;
}

export default AssetTransfer;
