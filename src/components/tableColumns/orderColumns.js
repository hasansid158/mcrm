import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};


  export const orderColumns = {
    sales: [
      //{ field: 'id', headerName: 'ID', width: 20},
      {
        field: 'salesOrderNumber',
        headerName: 'salesOrderNumber',
        ...commonColumnProps,
      },
      { field: 'orderRef', headerName: 'orderRef', ...commonColumnProps },
      {
        field: 'thirdPartyOrderNo',
        headerName: 'thirdPartyOrderNo',
        ...commonColumnProps,
      },
      { field: 'orderStatus', headerName: 'orderStatus', ...commonColumnProps },
      { field: 'orderType', headerName: 'orderType', ...commonColumnProps },
      { field: 'userId', headerName: 'userId', ...commonColumnProps },
      { field: 'firstName', headerName: 'firstName', ...commonColumnProps },
      { field: 'lastName', headerName: 'lastName', ...commonColumnProps },
      { field: 'salutation', headerName: 'salutation', ...commonColumnProps },
      { field: 'addressLine1', headerName: 'addressLine1', ...commonColumnProps },
      { field: 'addressLine2', headerName: 'addressLine2', ...commonColumnProps },
      { field: 'suburb', headerName: 'suburb', ...commonColumnProps },
      { field: 'state', headerName: 'state', ...commonColumnProps },
      { field: 'email', headerName: 'email', ...commonColumnProps },
    ],
    purchase: [
      //{ field: 'id', headerName: 'ID', width: 20},
      {
        field: 'purchaseOrderNo',
        headerName: 'purchaseOrderNo',
        ...commonColumnProps,
      },
      { field: 'dateApproved', headerName: 'dateApproved', ...commonColumnProps },
      { field: 'poTotal', headerName: 'poTotal', ...commonColumnProps },
      { field: 'isSelected', headerName: 'isSelected', ...commonColumnProps },
      { field: 'isExported', headerName: 'isExported', ...commonColumnProps },
      { field: 'isInactive', headerName: 'isInactive', ...commonColumnProps },
      { field: 'requestorID', headerName: 'requestorID', ...commonColumnProps },
      { field: 'supplierID', headerName: 'supplierID', ...commonColumnProps },
      { field: 'purchaseID', headerName: 'purchaseID', ...commonColumnProps },
      { field: 'lastUpdated', headerName: 'lastUpdated', ...commonColumnProps },
      {
        field: 'lastUpdateUser',
        headerName: 'lastUpdateUser',
        ...commonColumnProps,
      },
    ],
    payment: [
      //{ field: 'id', headerName: 'ID', width: 20},
      {
        field: 'purchaseOrderNo',
        headerName: 'purchaseOrderNo',
        ...commonColumnProps,
      },
      { field: 'dateApproved', headerName: 'dateApproved', ...commonColumnProps },
      { field: 'poTotal', headerName: 'poTotal', ...commonColumnProps },
      { field: 'isSelected', headerName: 'isSelected', ...commonColumnProps },
      { field: 'isExported', headerName: 'isExported', ...commonColumnProps },
      { field: 'isInactive', headerName: 'isInactive', ...commonColumnProps },
      { field: 'requestorID', headerName: 'requestorID', ...commonColumnProps },
      { field: 'supplierID', headerName: 'supplierID', ...commonColumnProps },
      { field: 'purchaseID', headerName: 'purchaseID', ...commonColumnProps },
      { field: 'lastUpdated', headerName: 'lastUpdated', ...commonColumnProps },
      {
        field: 'lastUpdateUser',
        headerName: 'lastUpdateUser',
        ...commonColumnProps,
      },
    ],
  
    dispatch: [
      //{ field: 'id', headerName: 'ID', width: 20},
      { field: 'dispatchNo', headerName: 'dispatchNo', ...commonColumnProps },
      { field: 'dispatchType', headerName: 'dispatchType', ...commonColumnProps },
      { field: 'dispatchedDate', headerName: 'dispatchedDate', ...commonColumnProps },
      { field: 'pickUpDate', headerName: 'pickUpDate', ...commonColumnProps },
      {
        field: 'dispatchMethod',
        headerName: 'dispatchMethod',
        ...commonColumnProps,
      },
      { field: 'dispatchUser', headerName: 'dispatchUser', ...commonColumnProps },
      {
        field: 'consignmentNo',
        headerName: 'consignmentNo',
        ...commonColumnProps,
      },
      { field: 'containerNo', headerName: 'containerNo', ...commonColumnProps },
      { field: 'sealNo', headerName: 'sealNo', ...commonColumnProps },
      { field: 'totalWeight', headerName: 'totalWeight', ...commonColumnProps },
      {
        field: 'totalCubicMetres',
        headerName: 'totalCubicMetres',
        ...commonColumnProps,
      },
      { field: 'comments', headerName: 'comments', ...commonColumnProps },
      { field: 'carrier', headerName: 'carrier', ...commonColumnProps },
      {
        field: 'dispatchStatus',
        headerName: 'dispatchStatus',
        ...commonColumnProps,
      },
    ],
    work: [
      //{ field: 'id', headerName: 'ID', width: 20},
      { field: 'workOrderID', headerName: 'workOrderID', ...commonColumnProps },
      { field: 'workOrderNo', headerName: 'workOrderID', ...commonColumnProps },
      {
        field: 'workOrderType',
        headerName: 'workOrderType',
        ...commonColumnProps,
      },
      { field: 'clientRef', headerName: 'clientRef', ...commonColumnProps },
      { field: 'clientPO', headerName: 'clientPO', ...commonColumnProps },
      { field: 'dateRaised', headerName: 'dateRaised', ...commonColumnProps },
      { field: 'sla', headerName: 'sla', ...commonColumnProps },
      { field: 'dateSigned', headerName: 'dateSigned', ...commonColumnProps },
      {
        field: 'workOrderDate',
        headerName: 'workOrderDate',
        ...commonColumnProps,
      },
      {
        field: 'workOrderTime',
        headerName: 'workOrderTime',
        ...commonColumnProps,
      },
      {
        field: 'dateCompleted',
        headerName: 'dateCompleted',
        ...commonColumnProps,
      },
      {
        field: 'opportunityNumber',
        headerName: 'opportunityNumber',
        ...commonColumnProps,
      },
      { field: 'orderSource', headerName: 'orderSource', ...commonColumnProps },
      {
        field: 'workOrderInstructions',
        headerName: 'workOrderInstructions',
        ...commonColumnProps,
      },
    ],
  };