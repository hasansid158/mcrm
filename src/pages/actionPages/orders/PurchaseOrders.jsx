import React from "react";
import { useSelector } from "react-redux";

import { purchaseorderColumns } from "components/tableColumns/purchaseorderColumn";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { fetchPurchaseOrder } from "redux/slices/actionSlice/orderSlice";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";
import { useDispatch } from "react-redux";

import { getPurchaseOrderById, uploadAttachmentsPO } from "api/orderApis";
import { crmRoutes } from "enum/routesEnum";

import { getFileFormData } from "utils/fileHelperFunctions";

const PurchaseOrders = () => {
  const dispatch = useDispatch();
  const { purchase } = useSelector(state => state?.actions?.orders);

  const handleUploadFile = async (returnData = {}, passedData = {}) => {
    const { purchaseOrderId } = returnData;
    if (!purchaseOrderId || !passedData?.files) return

    await uploadAttachmentsPO(getFileFormData(passedData?.files), purchaseOrderId)
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
      formKey={createFormEnum.purchase_orders}
      rows={purchase}
      columns={purchaseorderColumns()}
      label='Purchase Orders'
      createLabel='Create Purchase Order'
      fetchApi={fetchPurchaseOrder}
      createFormProps={{
        disableSubmitNew: true,
        callback: handleUploadFile,
        maxWidth: 'lg',
      }}
      fetchByIdApi={getPurchaseOrderById}
      detailDataFetchIdKey='purchaseOrderId'
      drawerLabelKey='purchaseOrderId'
      pagePath={crmRoutes.PURCHASE_ORDERS_PATH}
    />
  </>;
};

export default PurchaseOrders;
