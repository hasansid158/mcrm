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

export const salesorderColumns = (props = {}) => {
    const {
        saleOrderStatuses,
        saleOrderTypes,
      } = props;
    return (
        [
            // { field: 'salesOrderID', headerName: 'Order ID', ...commonColumnProps,},
            {
              field: 'salesOrderNumber',
              headerName: 'Sale Order',
              ...commonColumnProps,
            },
            { field: 'orderRef', headerName: 'Order Ref', ...commonColumnProps },
            // {
            //   field: 'thirdPartyOrderNo',
            //   headerName: 'thirdPartyOrderNo',
            //   ...commonColumnProps,
            //   type: 'number',
            // },
            {
              field: 'orderStatus',
              headerName: 'Status',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: saleOrderStatuses,
            },
            {
              field: 'orderType',
              headerName: 'Type',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: saleOrderTypes,
            },
            // { field: 'firstName', headerName: 'firstName', ...commonColumnProps },
            // { field: 'lastName', headerName: 'lastName', ...commonColumnProps },
            // { field: 'salutation', headerName: 'salutation', ...commonColumnProps },
            // {
            //   field: 'addressLine1',
            //   headerName: 'addressLine1',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'addressLine2',
            //   headerName: 'addressLine2',
            //   ...commonColumnProps,
            // },
            // { field: 'suburb', headerName: 'suburb', ...commonColumnProps },
            // { field: 'state', headerName: 'state', ...commonColumnProps },
            // { field: 'email', headerName: 'email', ...commonColumnProps },
            // { field: 'postcode', headerName: 'postcode', ...commonColumnProps },
            // {
            //   field: 'mobileNumber',
            //   headerName: 'mobileNumber',
            //   ...commonColumnProps,
            //   type: 'number',
            // },
            // {
            //   field: 'projectId',
            //   headerName: 'projectId',
            //   ...commonColumnProps,
            //   type: 'number',
            // },
            // {
            //   field: 'currency',
            //   headerName: 'Currency',
            //   ...commonColumnProps,
            //   type: 'number',
            // },
            {
              field: 'salesOrderTotal',
              headerName: 'Order Total',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'netTotal',
              headerName: 'Net Total',
              ...commonColumnProps,
              type: 'number',
            },
            // {
            //   field: 'billing_AddressLine1',
            //   headerName: 'billing_AddressLine1',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'billing_AddressLine2',
            //   headerName: 'billing_AddressLine2',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'billing_Suburb',
            //   headerName: 'billing_Suburb',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'billing_State',
            //   headerName: 'billing_State',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'billing_Postcode',
            //   headerName: 'billing_Postcode',
            //   ...commonColumnProps,
            // },
            // {
            //   field: 'isBillingAddressDifferent',
            //   headerName: 'isBillingAddressDifferent',
            //   ...commonColumnProps,
            // },
            // {
            {
              field: 'salesOrderDate',
              headerName: 'Order Date',
              ...commonColumnProps,
              ...dateCell(),
            },
          ])

  }
