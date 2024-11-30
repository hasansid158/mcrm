import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { map, isEmpty } from "lodash";

import { LoadingButton } from "@mui/lab";
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import Assets from 'pages/actionPages/inventory/Assets';

import {
  setErrorDialogText,
} from "redux/slices/commonSlice/commonSlice";


const AssetToDialog = ({
  open = false,
  handleClose = () => {},
  onSubmit = () => {},
  returnSelectedAssets,
  allowEmpty = false,
  title = 'Add Assets to',
  buttonLabel = 'Attach Assets',
  filtersEnumNoBox = [],
  ...rest
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [triggerSubmit, setTriggerSubmit] = useState(0);

  const handleSubmit = async (data) => {
    const requireData = filtersEnumNoBox?.some(filter => filter.required === true);

    if (requireData && isEmpty(data)) {
      setTriggerSubmit(0);
      return;
    };
    if (!!!selectedAssets.length && !allowEmpty) {
      dispatch(setErrorDialogText('Please select at least one row from the table.'))
      return;
    }
    setLoading(true);

    if (returnSelectedAssets) {
      returnSelectedAssets(selectedAssets, selectedIndexes);
      setLoading(false);
      setTriggerSubmit(0);
      return;
    }

    await onSubmit(selectedAssets, data, (isReset) => {
      setLoading(false);
      if (isReset) {
        setSelectedAssets([]);
        setTriggerSubmit(0);
        handleClose(false);
      }
    });
  };

  return (
    <DialogBox
      open={open}
      handleClose={handleClose}
      maxWidth='xl'
      title={title}
      disableFormFooter
      py={2}
      PaperProps={{ sx: { height: '820px' } }}
    >
      <Assets
        disableAddUpdate
        checkboxSelection
        onRowSelection={(id, index) => {setSelectedAssets(id); setSelectedIndexes(index);}}
        onFilterSubmit={handleSubmit}
        triggerFilterSubmit={triggerSubmit}
        label=''
        // autoHeight
        height='650px'
        isMiniTable
        filtersEnumNoBox={filtersEnumNoBox}
        isSmall
        {...rest}

      >
        <LoadingButton
          variant='contained'
          size='tiny'
          onClick={() => setTriggerSubmit(triggerSubmit+1)}
          sx={{
            minWidth: '140px',
          }}
          loading={loading}
        >
          {buttonLabel}
        </LoadingButton>
      </Assets>
    </DialogBox>
  );
}

export default AssetToDialog;
