import { Box } from "@mui/material";

import DatePicker from "common/input/DatePicker";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const projectColumns = (props = {}) => {
    return (
        [
            { field: 'projectName', headerName: 'Project Name', ...commonColumnProps },
            { field: 'projectType', headerName: 'Project Type', ...commonColumnProps },
            { field: 'clientRef', headerName: 'Client Ref', ...commonColumnProps },
            {
              field: 'salesManager',
              headerName: 'Sales Manager',
              ...commonColumnProps,
            },
            {
              field: 'accountManager',
              headerName: 'Account Manager',
              ...commonColumnProps,
            },
            {
              field: 'customerId',
              headerName: 'Customer',
              ...commonColumnProps,
            },
            {
              field: 'logo',
              headerName: 'Logo',
              ...commonColumnProps,
              align: 'center',
              headerAlign: 'center',
              editable: false,
              renderCell: item => (
                item?.row?.logo ?
                  <Box
                    p={.3}
                    component='img'
                    src={`data:image/png;base64,${item?.row?.logo || ''}`}
                    sx={{width: '50px', height: '50px'}}
                  />
                : ''
              )
            },
            {
              field: 'isActive',
              headerName: 'Is Active',
              type: 'boolean',
              ...commonColumnProps,
            },
          ])

  }
