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

export const workorderColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'workOrderNo',
              headerName: 'Work Order',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'workOrderType',
              headerName: 'Work Order Type',
              ...commonColumnProps,
            },
            {
              field: 'workOrderStatus',
              headerName: 'Work Order Status',
              ...commonColumnProps,
            },
            { field: 'account', headerName: 'Account', ...commonColumnProps },
            { field: 'clientRef', headerName: 'Client Ref', ...commonColumnProps },
            { field: 'clientPO', headerName: 'Client PO', ...commonColumnProps },
            {
              field: 'assignedUser',
              headerName: 'Assigned User',
              ...commonColumnProps,
            },
            { field: 'projectId', headerName: 'Project', ...commonColumnProps },
            {
              field: 'customer',
              headerName: 'Customer',
              ...commonColumnProps,
            },
            {
              field: 'workOrderStartDate',
              headerName: 'Work Order Start Date',
              ...commonColumnProps,
              ...dateCell(),
            },
            // { field: 'workOrderTime', headerName: 'workOrderTime', ...commonColumnProps },
            {
              field: 'workOrderEndDate',
              headerName: 'Work Order End Date',
              ...commonColumnProps,
              ...dateCell(),
            },
            {
              field: 'requestCreated',
              headerName: 'Request Created',
              ...commonColumnProps,
            },
            {
              field: 'orderSource',
              headerName: 'Order Source',
              ...commonColumnProps,
            },
            {
              field: 'contactPerson',
              headerName: 'Contact Person',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'mobileNumber',
              headerName: 'Mobile Number',
              ...commonColumnProps,
            },
            { field: 'email', headerName: 'email', ...commonColumnProps },
            { field: 'severity', headerName: 'Severity', ...commonColumnProps },
          ])

  }
