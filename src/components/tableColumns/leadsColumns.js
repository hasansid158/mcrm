import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const leadsColumns = (props = {}) => {
    return (
        [
            { field: 'leadId', headerName: 'lead ID', ...commonColumnProps, editable: false},
            { field: 'leadOwner', headerName: 'Lead owner', ...commonColumnProps },
            { field: 'leadName', headerName: 'Lead name', ...commonColumnProps },
            {
              field: 'leadStatus',
              headerName: 'Lead status',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: ['On Going', 'In Progress', 'Completed'],
            },
            { field: 'salutation', headerName: 'Salutation', ...commonColumnProps },
            { field: 'firstName', headerName: 'First name', ...commonColumnProps },
            { field: 'lastName', headerName: 'Last name', ...commonColumnProps },
            { field: 'title', headerName: 'Title', ...commonColumnProps },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1,
              minWidth: 200,
              editable: true,
            },
            {
              field: 'phone',
              headerName: 'Phone',
              ...commonColumnProps,
              minWidth: 150,
              type: 'number',
            },
            { field: 'company', headerName: 'Company', ...commonColumnProps },
            { field: 'website', headerName: 'Website', ...commonColumnProps },
          ])
    
  }
