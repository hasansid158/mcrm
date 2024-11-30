import React from "react";
import { useSelector } from "react-redux";

import { salesorderColumns } from "components/tableColumns/salesorderColumns";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { fetchSalesOrder } from "redux/slices/actionSlice/orderSlice";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";
import { useDispatch } from "react-redux";

import { getSalesOrderById, uploadAttachmentsSO } from "api/orderApis";
import { crmRoutes } from "enum/routesEnum";

import { getFileFormData } from "utils/fileHelperFunctions";

const SalesOrders = () => {
  const dispatch = useDispatch();
  const { sales } = useSelector(state => state?.actions?.orders);

  const handleUploadFile = async (returnData = {}, passedData = {}) => {
    const { salesOrderID } = returnData;
    if (!salesOrderID || !passedData?.files) return

    await uploadAttachmentsSO(getFileFormData(passedData?.files), salesOrderID)
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
      formKey={createFormEnum.sales_orders}
      rows={sales}
      columns={salesorderColumns()}
      label='Sales Orders'
      createLabel='Create Sale Order'
      fetchApi={fetchSalesOrder}
      createFormProps={{
        disableSubmitNew: true,
        callback: handleUploadFile,
        maxWidth: 'lg',
      }}
      fetchByIdApi={getSalesOrderById}
      detailDataFetchIdKey='salesOrderID'
      drawerLabelKey='salesOrderID'
      pagePath={crmRoutes.SALES_ORDERS_PATH}
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

export default SalesOrders;
