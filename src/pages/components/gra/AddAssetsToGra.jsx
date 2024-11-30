import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import AssetToDialog from '../common/AssetToDialog';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import GraInfoForm from './GraInfoForm';

import { isEmpty } from 'lodash';

import MenuButton from '../common/MenuButton';

const AddAssetsToGra = ({
  assetList = [],
  selectedLoadId,
  disableAssetTable = false,
  title,
  buttonLabel,
  isButton,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [graInfoData, setGraInfoData] = useState({});

  const { userProjects = [] } = useSelector(state => state?.userDetails);

  const {
    loads,
  } = useSelector(state => state.lists);

  const filterSelectorEnumNoBox = [
    {
      name: "projectId",
      label: "Projects",
      data: userProjects,
      required: true,
    },
    {
      name: "load",
      label: "Loads",
      data: loads,
      required: true,
    },
  ];

  const triggerGraApi = (
    data = {},
    assetIds = [],
    callBackFunc = () => {}
  ) => {
    setGraInfoData({
      ...data,
      assetIDs: assetIds,
    })
    callBackFunc(true);
  }


  const handleSubmit = (selectedAssetIds, data, callBackFunc) => {
    if (!data?.load) {
      callBackFunc(false);
      dispatch(setErrorDialogText('Please select project and load from the dropdown.'));
      return;
    }
    console.log(data)
    const loadId = loads?.find(load => load?.value === data?.load)?.id;
    const projectId = userProjects?.find(proj => proj?.value === data?.projectId)?.id;
    triggerGraApi({ loadId, projectId }, selectedAssetIds, callBackFunc);
  }


  const handleOpenClick = () => {
    if (!disableAssetTable) {
      setOpen(true);
      return;
    }

    if (!assetList?.length) {
      dispatch(setErrorDialogText('Please select at least one row from the table.'));
      return;
    }

    triggerGraApi(selectedLoadId, assetList);
  }

  return (
    <>
      <GraInfoForm
        open={!isEmpty(graInfoData)}
        handleClose={() => setGraInfoData({})}
        graInfoData={graInfoData}
      />

      <AssetToDialog
        open={open}
        handleClose={() => setOpen(false)}
        filtersEnumNoBox={filterSelectorEnumNoBox}
        isMultiSelectFilters={false}
        onSubmit={handleSubmit}
        title={title}
        buttonLabel={buttonLabel}
      />

      <MenuButton
        onClick={handleOpenClick}
        label='Complete GRA'
        isButton={isButton}
      />
    </>
  );
}

export default AddAssetsToGra;
