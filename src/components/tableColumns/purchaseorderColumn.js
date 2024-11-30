import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

const dateCell = () => ({
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
    renderEditCell: (props) => {
      const { id, value, field, api } = props;
  
      const handleDateChange = (newValue) => {
        api.setEditCellValue({ id, field, value: newValue });
      };
      return <DatePicker {...props} onChange={handleDateChange} />
    }
  });

export const purchaseorderColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'purchaseOrderNo',
              headerName: 'purchaseOrderNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'dateApproved',
              headerName: 'dateApproved',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'poTotal',
              headerName: 'poTotal',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'isSelected',
              headerName: 'isSelected',
              ...commonColumnProps,
              type: 'boolean',
            },
            {
              field: 'isExported',
              headerName: 'isExported',
              ...commonColumnProps,
              type: 'boolean',
            },
            {
              field: 'isInactive',
              headerName: 'isInactive',
              ...commonColumnProps,
              type: 'boolean',
            },
            {
              field: 'requestorID',
              headerName: 'requestorID',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'supplierID',
              headerName: 'supplierID',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'purchaseID',
              headerName: 'purchaseID',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'lastUpdated',
              headerName: 'lastUpdated',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'lastUpdateUser',
              headerName: 'lastUpdateUser',
              ...commonColumnProps,
            },
            {
              field: 'costCentreID',
              headerName: 'costCentreID',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'poType', headerName: 'poType', ...commonColumnProps },
            { field: 'poStatus', headerName: 'poStatus', ...commonColumnProps },
            {
              field: 'requestorComments',
              headerName: 'requestorComments',
              ...commonColumnProps,
            },
            {
              field: 'approverComments',
              headerName: 'approverComments',
              ...commonColumnProps,
            },
            {
              field: 'lastActionedDate',
              headerName: 'lastActionedDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'supplierInvoiceNo',
              headerName: 'supplierInvoiceNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'purchaseOrder_Invoice',
              headerName: 'purchaseOrder_Invoice',
              ...commonColumnProps,
            },
            {
              field: 'purchaseOrder_POAppover',
              headerName: 'purchaseOrder_POAppover',
              ...commonColumnProps,
            },
            {
              field: 'purchaseOrder_Project',
              headerName: 'purchaseOrder_Project',
              ...commonColumnProps,
            },
          ])
    
  }
