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

export const quotesColumns = (props = {}) => {
    return (
        [
            {
              field: 'quoteID',
              headerName: 'quoteID',
              ...commonColumnProps,
            },
            // { field: 'customerID', headerName: 'Vendor', ...commonColumnProps },
            {
              field: 'customerContactPersonName',
              headerName: 'ContactPerson',
              ...commonColumnProps,
            },
            { field: 'customerPhone', headerName: 'Phone', ...commonColumnProps },
            { field: 'customerEmail', headerName: 'Email', ...commonColumnProps },
            { field: 'customerAddress', headerName: 'Address', ...commonColumnProps },
            { field: 'customerCity', headerName: 'City', ...commonColumnProps },
            { field: 'customerCountry', headerName: 'Country', ...commonColumnProps },
            { field: 'customerState', headerName: 'State', ...commonColumnProps },
            {
              field: 'customerZipCode',
              headerName: 'PostCode',
              ...commonColumnProps,
            },
            {
              field: 'quoteDate',
              headerName: 'QuoteDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'quoteExpiryDate',
              headerName: 'ExpiryDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            { field: 'salesPerson', headerName: 'SalesPerson', ...commonColumnProps },
            { field: 'poNumber', headerName: 'PONumber', ...commonColumnProps },
            { field: 'quantity', headerName: 'Quantity', ...commonColumnProps },
            // { field: 'description', headerName: 'LastPayment', ...commonColumnProps, ...dateCell() },
            { field: 'quoteType', headerName: 'QuoteType', ...commonColumnProps },
            //{ field: 'unitPrice', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
            // { field: 'taxes', headerName: 'LastPayment', ...commonColumnProps, ...dateCell() },
            { field: 'totalAmount', headerName: 'TotalAmount', ...commonColumnProps },
            // { field: 'paymentMethod', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
            // { field: 'currency', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
            // { field: 'discount', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
            // { field: 'shippingMethod', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
          ])
    
  }
