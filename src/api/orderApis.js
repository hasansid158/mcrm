import instanceApi from "./instanceApi";

import { isEmpty } from "lodash";


//dispatch
export const getDispatchOrders = async () => {
  const res = await instanceApi.get('DispatchOrder/GetDispatchOrders');
  return res?.data;
};
export const getDispatchOrderById = async (id) => {
  const res = await instanceApi.get(`DispatchOrder/GetDispatchOrderById/${id}`);
  return {
    ...res?.data,
    ...res?.data?.orderItems?.[0],
  };
};
export const createDispatchOrder = async (body) => {

  const {
    files,
    ...payload
  } = body;

  const res = await instanceApi.post('DispatchOrder/CreateDispatchOrder', payload);
  return res;
};
export const updateDispatchOrder = async (body) => {
  const res = await instanceApi.post('DispatchOrder/UpdateDispatchOrder', body);
  return res;
};
export const addAssetsToDO = async (body) => {
  const payload = {
    dispatchOrderId: body?.orderId,
    assetIds: body?.assets,
  };

  const res = await instanceApi.post('DispatchOrder/AddAssetsToDispatchOrder', payload);
  return res?.data;
};
export const removeAssetsFromDO = async (body) => {
  const payload = {
    dispatchOrderId: body?.orderId,
    assetIds: body?.assets,
  };

  const res = await instanceApi.post('DispatchOrder/RemoveAssetsFromDispatchOrder', payload);
  return res?.data;
};
export const uploadAttachmentsDO = async (formData, id) => {
  const res = await instanceApi.post(`DispatchOrder/AttachFilesToDispatchOrder/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export const getDispatchStatuses = async () => {
  const res = await instanceApi.get('DispatchOrder/GetDispatchStatuses');
  return res?.data;
};
export const getDispatchMethods = async () => {
  const res = await instanceApi.get('DispatchOrder/DispatchMethods');
  return res?.data;
};
export const getDispatchTypes = async () => {
  const res = await instanceApi.get('DispatchOrder/DispatchTypes');
  return res?.data;
};



//payments
// export const createPaymentOrder = async (body) => {
//   const res = await instanceApi.post('Payments/CreatePaymentOrder', body);
//   return res;
// };
// export const updatePaymentOrder = async (body) => {
//   const res = await instanceApi.put('Payments/UpdatePaymentOrder', body);
//   return res;
// };
// export const deletePaymentOrder = async (id) => {
//   const res = await instanceApi.delete(`/Payments/RemovePaymentOrder/${id}`);
//   return res;
// };
// export const getPaymentOrders = async () => {
//   const res = await instanceApi.get('Payments/PaymentOrders');
//   return res?.data;
// };

//purchase
export const getPurchaseOrders = async () => {
  const res = await instanceApi.get('PurchaseOrder/PurchaseOrders');
  return res?.data;
};
export const getPurchaseOrderById = async (id) => {
  const res = await instanceApi.get(`PurchaseOrder/PurchaseOrderById/${id}`);
  return res?.data;
};
export const createPurchaseOrder = async (body) => {

  const {
    files,
    ...payload
  } = body;

  const res = await instanceApi.post('PurchaseOrder/CreatePurchaseOrder', payload);
  return res;
};
export const updatePurchaseOrder = async (body) => {
  const res = await instanceApi.post('PurchaseOrder/UpdatePurchaseOrder', body);
  return res;
};
export const deletePurchaseOrders = async (id) => {
  const res = await instanceApi.delete(`/PurchaseOrder/RemovePurchaseOrder/${id}`);
  return res;
};
export const uploadAttachmentsPO = async (formData, id) => {
  const res = await instanceApi.post(`PurchaseOrder/AttachFilesToPurchaseOrder/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export const getPOStatuses = async () => {
  const res = await instanceApi.get(`PurchaseOrder/PurchaseOrderStatuses`);
  return res?.data;
};
export const getPOTypes = async () => {
  const res = await instanceApi.get(`PurchaseOrder/PurchaseOrderTypes`);
  return res?.data;
};



//Sales
export const createSalesOrder = async (body) => {
  const {
    files,
    ...payload
  } = body;

  const res = await instanceApi.post('SalesOrders/CreateSalesOrder', payload);
  return res;
};
export const updateSalesOrder = async (body) => {
  const res = await instanceApi.post('SalesOrders/UpdateSalesOrder', body);
  return res;
};
export const removeAssetsFromSalesOrder = async (body) => {
  const payload = {
    salesOrderId: body?.orderId,
    assetIDs: body?.assets,
  };

  const res = await instanceApi.post('SalesOrders/RemoveAssetsToSalesOrder', payload);
  return res?.data;
};
export const addAssetsToSalesOrder = async (body) => {
  const payload = {
    salesOrderId: body?.orderId,
    assetIDs: body?.assets,
  };

  const res = await instanceApi.post('SalesOrders/AddAssetsToSalesOrder', payload);
  return res?.data;
};
export const getSalesOrders = async () => {
  const res = await instanceApi.get('SalesOrders/SalesOrders');
  return res?.data;
};
export const getSalesOrderById = async (id) => {
  const res = await instanceApi.get(`SalesOrders/SalesOrderById/${id}`);
  return res?.data;
};
export const getSalesOrderTypes = async (id) => {
  const res = await instanceApi.get('SalesOrders/SaleOrderTypes');
  return res?.data;
};
export const getSalesOrderStatuses = async (id) => {
  const res = await instanceApi.get('SalesOrders/SaleOrderStatuses');
  return res?.data;
};
export const uploadAttachmentsSO = async (formData, id) => {
  const res = await instanceApi.post(`SalesOrders/AttachFilesToSalesOrder/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};


//work
export const createWorkOrder = async (body) => {
  const res = await instanceApi.post('WorkOrder/CreateWorkOrder', body);
  return res?.data;
};
export const updateWorkOrder = async (body, id) => {
  const res = await instanceApi.post(`WorkOrder/UpdateWorkOrder?workOrderId=${id}`, body);
  return res?.data;
};
export const getWorkOrders = async () => {
  const res = await instanceApi.get('WorkOrder/WorkOrders');
  return res?.data;
};
export const getWorkOrderById = async (id) => {
  const res = await instanceApi.get(`WorkOrder/WorkOrderDetailsById/${id}`);

  if (isEmpty(res?.data)) return;

  const { workOrderItems } = res?.data;

  const woServiceItems = workOrderItems?.map(item => ({
    ...item,
    serviceID: item?.workOrderItemID || '',
    serviceDescription: item?.workOrderItemDescription || '',
  }));

  return {
    ...res?.data,
    workOrderItems: woServiceItems,
  };
};
export const deleteWorkOrders = async (id) => {
  const res = await instanceApi.delete(`WorkOrder/RemoveWorkOrder/${id}`);
  return res;
};
export const addAssetsToWO = async (body) => {
  const res = await instanceApi.post('WorkOrder/AddAssetsToWorkOrder', body);
  return res?.data;
};
export const removeAssetsFromWO = async (body) => {
  const res = await instanceApi.post('WorkOrder/RemoveAssetsFromWO', body);
  return res?.data;
};
export const uploadAttachmentsWO = async (formData, id) => {
  const res = await instanceApi.post(`WorkOrder/uploadAttachments/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export const removeAttachmentWO = async (workOrderNo, fileName) => {
  const res = await instanceApi.get(`WorkOrder/RemoveAttachment/${workOrderNo}/${fileName}`);
  return res?.data;;
};
export const getWorkOrderAssociatedDropdowns = async (id) => {
  const res = await instanceApi.get(`WorkOrder/WorkOrderAssociatedDropdowns/${id}`);
  return res?.data;;
};
export const getWorkOrderFiles = async (id) => {
  const res = await instanceApi.get(`WorkOrder/GetWOFiles/${id}`);
  return res?.data;;
};


//invoices
export const getInvoices = async () => {
  const res = await instanceApi.get('InvoiceOrder/GetInvoiceOrders');
  return res?.data;
};
export const createInvoice = async (body) => {
  const res = await instanceApi.post('InvoiceOrder/CreateInvoiceOrder', body);
  return res;
};
export const updateInvoice = async (body) => {
  const res = await instanceApi.post('InvoiceOrder/UpdateInvoiceOrder', body);
  return res;
};
export const deleteInvoice = async (id) => {
  const res = await instanceApi.delete(`InvoiceOrder/RemoveInvoiceOrder/${id}`);
  return res;
};
export const getInvoiceById = async (id) => {
  const res = await instanceApi.get(`InvoiceOrder/InvoiceOrderById/${id}`);
  return res?.data;
};
export const getOrderServiceItems = async (body) => {
  const res = await instanceApi.post('InvoiceOrder/GetOrderServiceItems', body);
  return res?.data;
};