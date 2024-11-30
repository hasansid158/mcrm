import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { map, find } from "lodash";

import { LoadingButton } from "@mui/lab";
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import Assets from 'pages/actionPages/inventory/Assets';
import AddToLoad from "pages/components/assets/AddToLoad";

import {
  setErrorDialogText,
  setSnackBar,
} from "redux/slices/commonSlice/commonSlice";

import { addAssetsToWO } from 'api/orderApis';

const AddAssetsToLoadsDialog = ({
  open = false,
  handleClose = () => {},
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [triggerSubmit, setTriggerSubmit] = useState(0);

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    loads,
    workOrderList,
  } = useSelector(state => state.lists);
  const { assets } = useSelector(state => state.actions);

  const onSubmit = async (data) => {
    if (!!!selectedAssets.length) {
      dispatch(setErrorDialogText('Please select at least one row from the table.'))
      return;
    }
    setLoading(true);

    const workOrderID = find(workOrderList, ['value', data?.workOrder])?.id;

    await addAssetsToWO({
      workOrderID,
      assets: {
        assets: selectedAssets,
      },
    }).then((res) => {
      dispatch(setSnackBar({open: true, message: `${selectedAssets?.length} assets added to the Word Order`}));

    }).catch((err) => {
      console.log(err?.response)
      dispatch(setErrorDialogText('Server error occured, please try again.'))
    })

    setSelectedAssets([]);
    setLoading(false);
    handleClose();
  }

  return <>
    <DialogBox
      open={open}
      handleClose={handleClose}
      maxWidth='xl'
      title='Assets to Loads'
      disableFormFooter
      py={2}
    >
      <Assets
        disableAddUpdate
        checkboxSelection
        onRowSelection={id => setSelectedAssets(id)}
        rowSelectionModel={selectedAssets}
        label=''
        onSubmit={onSubmit}
        triggerSubmit={triggerSubmit}
        tableLoading={loading}
        // filtersEnum={[
        //   {
        //     name: "project",
        //     label: "Projects",
        //     data: projects,
        //     required: true,
        //   },
        //   {
        //     name: "load",
        //     label: "Loads",
        //     data: loads,
        //     required: true,
        //   },
        //   {
        //     name: "workOrder",
        //     label: "Work Orders",
        //     data: workOrderList,
        //     required: true,
        //   },
        // ]}
        autoHeight
        isMiniTable
      >
        <AddToLoad
          selectedAssets={selectedAssets}
          setTableLoading={setLoading}
        />
        <AddToLoad
          selectedAssets={selectedAssets}
          setTableLoading={setLoading}
          buttonLabel='Remove from Load'
          // buttonProps={{
          //   variant: 'outlined',
          //   color: 'secondary'
          // }}
        />
      </Assets>
    </DialogBox>
  </>;
}

export default AddAssetsToLoadsDialog;
