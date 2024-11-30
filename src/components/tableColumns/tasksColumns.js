import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const tasksColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'taskID',
              headerName: 'Task ID',
              ...commonColumnProps,
              editable: false,
            },
            { field: 'taskOwner', headerName: 'TaskOwner', ...commonColumnProps },
            { field: 'subject', headerName: 'Subject', ...commonColumnProps },
            { field: 'contact', headerName: 'Contact', ...commonColumnProps },
            { field: 'status', headerName: 'Status', ...commonColumnProps },
            { field: 'priority', headerName: 'Priority', ...commonColumnProps },
            { field: 'description', headerName: 'Description', ...commonColumnProps },
            { field: 'account', headerName: 'Account', ...commonColumnProps },
            {
              field: 'accountId',
              headerName: 'accountId',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'dueDate', headerName: 'Due Date', ...commonColumnProps },
            { field: 'reminder', headerName: 'Reminder', ...commonColumnProps },
            {
              field: 'repeat',
              headerName: 'Repeat',
              ...commonColumnProps,
              type: 'boolean',
            },
          ]
          )
    
  }
