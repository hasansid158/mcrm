import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const contactsColumns = (props = {}) => {
    return (
        [
            { field: 'firstName', headerName: 'First name', ...commonColumnProps },
            { field: 'lastName', headerName: 'Last name', ...commonColumnProps },
            { field: 'salutation', headerName: 'Salutation', ...commonColumnProps },
            {
              field: 'title',
              headerName: 'Title',
              flex: 1,
              minWidth: 200,
              editable: true,
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 1,
              minWidth: 200,
              editable: true,
            },
            {
              field: 'mobile',
              headerName: 'Mobile',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'company', headerName: 'Company', ...commonColumnProps },
          ])
    
  }
