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

export const loadsColumns = (props = {}) => {
    const {
        userProjects,
        warehouses,
        workOrderList,
      } = props;
    return (
        [
            // { field: 'loadId', headerName: 'Load ID', ...commonColumnProps, editable: false },
            { field: 'loadNo', headerName: 'Load Number', ...commonColumnProps, editable: false  },
            {
              field: 'loadStatus',
              headerName: 'Status',
              cellClassName: 'status',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: [
                'New',
                'Approved',
                'Active',
                'Rejected',
                'Closed',
              ],
            },
            {
              field: 'projectId',
              headerName: 'Project',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: userProjects,
            },
            {
              field: 'workorder',
              headerName: 'Work Order',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: workOrderList,
            },
            {
              field: 'receivingUser',
              headerName: 'Receiving User',
              ...commonColumnProps,
              editable: false,
            },
            { field: 'clientPO', headerName: 'Client PO', ...commonColumnProps },
            { field: 'clientRef', headerName: 'Client Ref', ...commonColumnProps },
            { field: 'inventory', headerName: 'Inventory', ...commonColumnProps },
            // { field: 'connote', headerName: 'connote', ...commonColumnProps },
            // {
            //   field: 'leasingCustomerName',
            //   headerName: 'Customer',
            //   ...commonColumnProps,
            // },
            {
              field: 'warehouse',
              headerName: 'Warehouse',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: warehouses,
            },
            {
              field: 'qty',
              headerName: 'Qty',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'loadTotal',
              headerName: 'LoadTotal',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'graDate', headerName: 'GRA Date', ...commonColumnProps, ...dateCell() },
            { field: 'dateReceived', headerName: 'Received Date', ...commonColumnProps, ...dateCell() },
          ])

  }
