import { Chip, Typography, Box } from '@mui/material';
import SwitchToggle from 'common/input/SwitchToggle';

const commonColumnProps = {
  flex: 1,
  minWidth: 80,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

export const itemTypesColumn = [
  {
    field: 'makeName' ,
    headerName: 'Make',
    ...commonColumnProps,
  },
  {
    field: 'modelName',
    headerName: 'Model',
    ...commonColumnProps,
  },
  {
    field: 'productTypeName',
    headerName: 'Product Type',
    ...commonColumnProps,
  },
];
