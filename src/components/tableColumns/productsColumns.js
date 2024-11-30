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

export const productsColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'productId',
              headerName: 'productId',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'productcode', headerName: 'productcode', ...commonColumnProps },
            { field: 'productName', headerName: 'productName', ...commonColumnProps },
            {
              field: 'productowner',
              headerName: 'productowner',
              ...commonColumnProps,
            },
            {
              field: 'productCategory',
              headerName: 'productCategory',
              ...commonColumnProps,
              editable: true,
            },
            {
              field: 'productManufacturer',
              headerName: 'productManufacturer',
              ...commonColumnProps,
              editable: true,
            },
            { field: 'vendorName', headerName: 'vendorName', ...commonColumnProps },
            {
              field: 'productDescription',
              headerName: 'productDescription',
              ...commonColumnProps,
            },
            {
              field: 'productSaleStartDate',
              headerName: 'productSaleStartDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'productSaleEndDate',
              headerName: 'productSaleEndDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'productSupportStartDate',
              headerName: 'productSupportStartDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'productSupportEndDate',
              headerName: 'productSupportEndDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'productUnitPrice',
              headerName: 'productUnitPrice',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'productCommissionRate',
              headerName: 'productCommissionRate',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'isTaxable',
              headerName: 'isTaxable',
              ...commonColumnProps,
              type: 'boolean',
            },
            {
              field: 'productQuantity',
              headerName: 'productQuantity',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'productQuantityInStock',
              headerName: 'productQuantityInStock',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'productQuantityOrdered',
              headerName: 'productQuantityOrdered',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'productQuantityRecorderLevel',
              headerName: 'productQuantityRecorderLevel',
              ...commonColumnProps,
            },
            {
              field: 'productQuantityInDemand',
              headerName: 'productQuantityInDemand',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'isProductActive',
              headerName: 'isProductActive',
              ...commonColumnProps,
              type: 'boolean',
            },
          ])
    
  }
