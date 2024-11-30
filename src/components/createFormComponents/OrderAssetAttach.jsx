import React, { useEffect, useState } from 'react';

import { Button, Box, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import AssetToDialog from 'pages/components/common/AssetToDialog';

import { sumBy, isEmpty } from 'lodash';
import { setSnackBar, setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';
import { useDispatch, useSelector } from 'react-redux';

import Assets from 'pages/actionPages/inventory/Assets';

import { toCurrency } from 'utils/textFormatUtils';

const OrderAssetAttach = ({
  addAssetsToApi = () => {},
  removeAssetsFromApi = () => {},
  isUpdate = false,
  selectedOrderId = null,
  assetIdsKey = 'assetIDs',
  formData = {},
}) => {
  const dispatch = useDispatch();
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedAssetIndexes, setSelectedAssetIndexes] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addAssetsDialogLoading, setAddAssetsDialogLoading] = useState(false);

  const [assetIdsToRemove, setAssetIdsToRemove] = useState([]);

  const { actions } = useSelector(state => state);

  const {
    assets
  } = formData?.watch();

  useEffect(() => {
    isEmpty(assets) && formData?.setValue(assetIdsKey, []);
  }, []);

  useEffect(() => {
    if (!isUpdate) return;

    setSelectedAssets(assets);
  }, [assets]);

  const handleAssetSubmit = (assets, indexes) => {
    const selectedAssetIds = assets?.map((item) => item?.assetID);

    if (!isUpdate) {
      formData?.setValue(assetIdsKey, selectedAssetIds)
      setSelectedAssets(assets);
      setSelectedAssetIndexes(indexes);
      setOpenAddDialog(false);
      return
    }

    setAddAssetsDialogLoading(true);

    //modify the payload in api function e.g in orderApis
    const payload = {
      orderId: selectedOrderId,
      assets: selectedAssetIds
    };

    addAssetsToApi(payload)
      ?.then(res => {
        dispatch(setSnackBar({
          open: true,
          message: `${selectedAssetIds?.length} assets successfully added!`,
        }))
        setSelectedAssets(res);
        setOpenAddDialog(false);
      })
      .catch(() => setErrorDialogText('Server error occured while adding new assets, please try again later.'))
      .finally(() => setAddAssetsDialogLoading(false));
  }

  const handleRemoveAssets = () => {
    if (isEmpty(assetIdsToRemove)) {
      dispatch(setErrorDialogText('Please select at least one asset to remove.'));
      return;
    }

    setLoading(true);

    //modify the payload in api function e.g in orderApis
    const payload = {
      orderId: selectedOrderId,
      assets: assetIdsToRemove
    };

    removeAssetsFromApi(payload)
      ?.then(res => {
        dispatch(setSnackBar({
          open: true,
          message: `${assetIdsToRemove?.length} assets removed successfully!`,
        }));
        setSelectedAssets(res);
        setAssetIdsToRemove([]);
      })
      .catch(() => setErrorDialogText('Server error occured while adding new assets, please try again later.'))
      .finally(() => setLoading(false));
  }

  const NoAssetsText = () => (
    <Box textAlign='center' pt={3} pb={2}>
      <Typography variant='pb'>No assets in this order, please add new asset.</Typography>
    </Box>
  )

  return <>
    <Assets
      isMiniTable
      label='Order Assets'
      drawerProps={{ drawerZIndex: 99999 }}
      assetsData={selectedAssets || []}
      replaceContent={isEmpty(selectedAssets) ?  <NoAssetsText/> : null}
      disableAddUpdate
      checkboxSelection={isUpdate}
      onRowSelection={id => setAssetIdsToRemove(id)}
      tableLoading={loading}
      tableProps={{maxHeight: '545px'}}
      isSmall
      contentAboveTable={(!isEmpty(selectedAssets) &&
        <Box
          p={2}
          display='flex'
          flexWrap='wrap'
          columnGap={4}
          rowGap={2}
        >
          <Box>
            <Typography variant='p2' fontWeight='500'>Total Buy Price&nbsp;</Typography>
            <Typography variant='pb'>( {toCurrency(sumBy(selectedAssets, 'buyPrice') || '0')} )</Typography>
          </Box>
          <Box>
            <Typography variant='p2' fontWeight='500'>Total Sell Price&nbsp;</Typography>
            <Typography variant='pb'>( {toCurrency(sumBy(selectedAssets, 'sellPrice') || '0')} )</Typography>
          </Box>
        </Box>
      )}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap={2}
        flexWrap='wrap'
      >
        {isUpdate && !isEmpty(selectedAssets) &&
          <Button
            size='tiny'
            variant='outlined'
            sx={{minWidth: '140px'}}
            onClick={handleRemoveAssets}
            endIcon={<RemoveCircleOutlineIcon/>}
            disabled={loading}
          >
            Remove Assets
          </Button>
        }

        <Button
          size='tiny'
          variant='contained'
          sx={{minWidth: '140px'}}
          onClick={() => setOpenAddDialog(true)}
          endIcon={<AddCircleIcon/>}
          disabled={loading || isEmpty(actions?.assets)}
        >
          Add Assets
        </Button>
      </Box>
    </Assets>

    <AssetToDialog
      open={openAddDialog}
      handleClose={() => setOpenAddDialog(false)}
      returnSelectedAssets={handleAssetSubmit}
      title='Add Assets'
      buttonLabel='Submit'
      onSelectReturnFullAsset
      allowEmpty
      defaultSelectedAssetIndexes={selectedAssetIndexes}
      tableLoading={addAssetsDialogLoading}
    />
  </>;
}

export default OrderAssetAttach;
