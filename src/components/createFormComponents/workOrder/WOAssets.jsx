import React, { useEffect, useState } from 'react';

import ActionPageMain from 'pages/components/ActionPageMain';
import { detailColumn } from 'enum/tableColumnEnum';

import { Button, Box, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import AssetToDialog from 'pages/components/common/AssetToDialog';

import { addAssetsToWO, removeAssetsFromWO } from 'api/orderApis';

import { isNil, isEmpty } from 'lodash';

import { setSnackBar, setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import { useDispatch } from 'react-redux';

import Assets from 'pages/actionPages/inventory/Assets';

import { crmRoutes } from 'enum/routesEnum';

const WOAssets = ({
  selectedAssets = [],
  setSelectedAssets = () => {},

  selectedAssetIndexes = [],
  setSelectedAssetIndexes = () => {},

  selectedOrderId = null,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addAssetsDialogLoading, setAddAssetsDialogLoading] = useState(false);

  const [assetIdsToRemove, setAssetIdsToRemove] = useState([]);


  const handleAssetSubmit = (assets, indexes) => {
    if (!isUpdate) {
      setSelectedAssets(assets);
      setSelectedAssetIndexes(indexes);
      setOpenAddDialog(false);
      return
    }

    setAddAssetsDialogLoading(true);

    const selectedAssetIds = assets?.map((item) => item?.assetID);

    const payload = {
      workOrderID: selectedOrderId,
      assets: {
        assets: selectedAssetIds
      }
    };

    addAssetsToWO(payload)
      ?.then(res => {
        dispatch(setSnackBar({
          open: true,
          message: `${selectedAssetIds?.length} assets successfully added to the work order!`,
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

    const payload = {
      workOrderID: selectedOrderId,
      assets: {
        assets: assetIdsToRemove
      }
    };

    removeAssetsFromWO(payload)
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
      <Typography variant='pb'>No assets in this work order, please add new asset.</Typography>
    </Box>
  )

  return <>
    <Assets
      isMiniTable
      autoHeight
      label='Work order Assets'
      drawerProps={{ drawerZIndex: 99999 }}
      assetsData={selectedAssets || []}
      replaceContent={!selectedAssets?.length ?  <NoAssetsText/> : null}
      disableAddUpdate
      checkboxSelection={isUpdate}
      onRowSelection={id => setAssetIdsToRemove(id)}
      tableLoading={loading}
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
          variant='contained'
          sx={{minWidth: '140px'}}
          onClick={() => setOpenAddDialog(true)}
          endIcon={<AddCircleIcon/>}
          disabled={loading}
        >
          Add Assets
        </Button>
      </Box>
    </Assets>

    <AssetToDialog
      open={openAddDialog}
      handleClose={() => setOpenAddDialog(false)}
      returnSelectedAssets={handleAssetSubmit}
      title='Add Assets to WO'
      buttonLabel='Submit'
      onSelectReturnFullAsset
      allowEmpty
      defaultSelectedAssetIndexes={selectedAssetIndexes}
      tableLoading={addAssetsDialogLoading}
    />
  </>;
}

export default WOAssets;
