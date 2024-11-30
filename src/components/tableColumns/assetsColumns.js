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

export const assetsColumns = (props = {}) => {
    const {
        makes,
    models,
    itemTypes,
    projects,
    loads,
    warehouses,
    assetStatus,
      } = props;
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'ssn',
              headerName: 'SSN',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'make',
              headerName: 'Make',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: makes,
            },
            {
              field: 'model',
              headerName: 'Model',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: models,
            },
            { field: 'serialNo', headerName: 'Serial No', ...commonColumnProps },
            { field: 'barcode', headerName: 'Barcode', ...commonColumnProps },
            { field: 'clientRef', headerName: 'ClientRef', ...commonColumnProps },
            {
              field: 'clientAssetTag',
              headerName: 'Client Asset Tag',
              ...commonColumnProps,
            },
            // { field: 'subGrade', headerName: 'subGrade', ...commonColumnProps },
            // { field: 'reservationCode', headerName: 'reservationCode', ...commonColumnProps },
            // { field: 'reservationDate', headerName: 'reservationDate', ...commonColumnProps, ...dateCell() },
            // { field: 'reservationComment', headerName: 'reservationComment', ...commonColumnProps },
            // { field: 'recycle', headerName: 'recycle', ...commonColumnProps, type: 'boolean' },
            // { field: 'releaseDate', headerName: 'releaseDate', ...commonColumnProps, ...dateCell() },
            // { field: 'completeness', headerName: 'completeness', ...commonColumnProps },
            // { field: 'appearance', headerName: 'appearance', ...commonColumnProps },
            // { field: 'services', headerName: 'services', ...commonColumnProps },
            // { field: 'operability', headerName: 'operability', ...commonColumnProps },
            // { field: 'qtyOnHand', headerName: 'qtyOnHand', ...commonColumnProps, type: 'number' },
            // { field: 'isSerialised', headerName: 'isSerialised', ...commonColumnProps, type: 'boolean' },
            // { field: 'physicalInspectionDate', headerName: 'physicalInspectionDate', ...commonColumnProps, ...dateCell() },
            // { field: 'physicalInspectionUser', headerName: 'physicalInspectionUser', ...commonColumnProps },
            {
              field: 'itemType',
              headerName: 'ItemType',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: itemTypes,
            },
            {
              field: 'assetStatus',
              headerName: 'Status',
              cellClassName: 'status',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: assetStatus,
            },
            {
              field: 'buyPrice',
              headerName: 'Buy Price',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'sellPrice',
              headerName: 'sell Price',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'grade', headerName: 'Grade', ...commonColumnProps },
            { field: 'workOrder', headerName: 'workOrder', ...commonColumnProps },
            {
              field: 'projectId',
              headerName: 'Project',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: projects,
            },
            {
              field: 'load',
              headerName: 'Load',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: loads,
            },
            {
              field: 'warehouse',
              headerName: 'Warehouse',
              ...commonColumnProps,
              type: 'singleSelect',
              valueOptions: warehouses,
            },
            {
              field: 'dateReceived',
              headerName: 'Received',
              ...commonColumnProps,
              ...dateCell(),
            },
            // { field: 'location', headerName: 'location', ...commonColumnProps, type: 'singleSelect',  valueOptions: locations },
            // { field: 'assetComment', headerName: 'assetComment', ...commonColumnProps },
            // { field: 'palletNo', headerName: 'palletNo', ...commonColumnProps, type: 'number' },
            // { field: 'r2Grade', headerName: 'r2Grade', ...commonColumnProps },
            // { field: 'modified', headerName: 'modified', ...commonColumnProps, type: 'boolean' },
          ])

  }
