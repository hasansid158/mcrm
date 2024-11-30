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

export const dispatchorderColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'dispatchNo',
              headerName: 'dispatchNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'dispatchType',
              headerName: 'dispatchType',
              ...commonColumnProps,
            },
            {
              field: 'dispatchedDate',
              headerName: 'dispatchedDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'pickUpDate',
              headerName: 'pickUpDate',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'dispatchMethod',
              headerName: 'dispatchMethod',
              ...commonColumnProps,
            },
            {
              field: 'dispatchUser',
              headerName: 'dispatchUser',
              ...commonColumnProps,
            },
            {
              field: 'consignmentNo',
              headerName: 'consignmentNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'containerNo',
              headerName: 'containerNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'sealNo',
              headerName: 'sealNo',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'totalWeight',
              headerName: 'totalWeight',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'totalCubicMetres',
              headerName: 'totalCubicMetres',
              ...commonColumnProps,
              type: 'number',
            },
            // { field: 'comments', headerName: 'comments', ...commonColumnProps },
            { field: 'carrier', headerName: 'carrier', ...commonColumnProps },
            {
              field: 'dispatchStatus',
              headerName: 'dispatchStatus',
              ...commonColumnProps,
            },
            {
              field: 'length',
              headerName: 'length',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'height',
              headerName: 'height',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'width',
              headerName: 'width',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'projectId',
              headerName: 'projectId',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'createdBy', headerName: 'createdBy', ...commonColumnProps },
            {
              field: 'created',
              headerName: 'created',
              ...commonColumnProps,
              ...dateCell(),
            },
          ])
    
  }
