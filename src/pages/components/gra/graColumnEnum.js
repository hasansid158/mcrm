
const dateCell = {
  type: 'date',
  valueGetter: ({ value }) => value && new Date(value),
};

export const graColumns = [
  { field: 'graid', headerName: 'GRA Id', align: 'center', width: 80},
  { field: 'projectId', headerName: 'Project', flex: 1 },
  { field: 'load', headerName: 'Load', flex: 1 },
  { field: 'graDate', headerName: 'GRA Date', flex: 1, ...dateCell },
  { field: 'workorder', headerName: 'Work Order No', flex: 1 },
  { field: 'warehouseInformation', headerName: 'Warehouse Information', flex: 1 },
  { field: 'qualityInspection', headerName: 'Quality Inspection', flex: 1 },
  { field: 'grAdassets', headerName: 'GRA Assets', flex: 1 },
];