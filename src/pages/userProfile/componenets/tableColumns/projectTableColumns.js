import { Box } from "@mui/material";

import { base64ToImgSrc } from "utils/fileHelperFunctions";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const projectTableColumns = [
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
          src={base64ToImgSrc(item?.row?.logo || '')}
          sx={{width: '35px', height: '35px'}}
        />
      : ''
    )
  },
  {
    field: 'isActive',
    headerName: 'Is Active',
    isToggle: true,
    maxWidth: 120,
    ...commonColumnProps,
  },
]