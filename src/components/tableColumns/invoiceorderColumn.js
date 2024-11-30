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

export const invoiceorderColumns = (props = {}) => {
    return (
        [
            {
              field: 'invoiceNo',
              headerName: 'Invoice No',
              ...commonColumnProps,
            },
            {
              field: 'invoiceType',
              headerName: 'Invoice Type',
              ...commonColumnProps,
            },
            { field: 'invoiceDate',
              headerName: 'Invoice Date',
              ...commonColumnProps,
              ...dateCell(),
            },
            { field: 'customerPO', headerName: 'CustomerPO', ...commonColumnProps },
            {
              field: 'invoiceStatus',
              headerName: 'Invoice Status',
              ...commonColumnProps,
            },
            {
              field: 'invoiceTotal',
              headerName: 'Invoice Total',
              ...commonColumnProps,
              type: 'number',
            },
          ])
    
  }
