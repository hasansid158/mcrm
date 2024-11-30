import React from "react";
import { useSelector } from "react-redux";

import { dispatchorderColumns } from "components/tableColumns/dispatchorderColumns";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { fetchDispatchOrder } from "redux/slices/actionSlice/orderSlice";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";
import { useDispatch } from "react-redux";

import { getDispatchOrderById, uploadAttachmentsDO } from "api/orderApis";
import { crmRoutes } from "enum/routesEnum";

import { getFileFormData } from "utils/fileHelperFunctions";

const DispatchOrders = () => {
  const dispatch = useDispatch();
  const { dispatchOrder } = useSelector(state => state?.actions?.orders);

  const handleUploadFile = async (returnData = {}, passedData = {}) => {
    const { dispatchId } = returnData;
    if (!dispatchId || !passedData?.files) return

    await uploadAttachmentsDO(getFileFormData(passedData?.files), dispatchId)
      ?.then(res => {
        // dispatch(setSnackBar({
        //   open: true,
        //   message: `${passedData?.files?.length} files uploaded to time sheet successfully!`
        // }));
        // setAcceptedFiles(allFiles);
      })
      ?.catch(() => dispatch(setErrorDialogText('Error occurred while uploading documents, please try again later.')))
      // ?.finally(() => setLoading(false));
  }

  return <>
    <ActionPageMain
      formKey={createFormEnum.dispatch_orders}
      rows={dispatchOrder}
      columns={dispatchorderColumns()}
      label='Dispatch Orders'
      createLabel='Create Dispatch Order'
      fetchApi={fetchDispatchOrder}
      createFormProps={{
        disableSubmitNew: true,
        callback: handleUploadFile,
        maxWidth: 'lg',
      }}
      fetchByIdApi={getDispatchOrderById}
      detailDataFetchIdKey='dispatchId'
      drawerLabelKey='dispatchId'
      pagePath={crmRoutes.DISPATCH_ORDERS_PATH}
      // preFillUpdateData={preFilledUpdateData}
      // detailDrawerListContent={SalesOrderDrawerContent}
      // drawerProps={{
      //   drawerLabel: `Sale Order:  ${selectedSaleNumber}`,
      //   drawerFetchApiTrigger: performAssetFetchBySale,
      //   open: selectedSalesId !== null,
      //   // selectedId: selectedSalesId,
      // }}
    />
  </>;
};

export default DispatchOrders;
