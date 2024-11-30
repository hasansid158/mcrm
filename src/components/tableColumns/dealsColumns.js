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

export const dealsColumns = (props = {}) => {
    return (
        [
            //{ field: 'id', headerName: 'ID', width: 20},
            {
              field: 'dealId',
              headerName: 'DealId',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'dealOwner', headerName: 'DealOwner', ...commonColumnProps },
            { field: 'dealName', headerName: 'DealName', ...commonColumnProps },
            { field: 'dealType', headerName: 'DealType', ...commonColumnProps },
            { field: 'leadSource', headerName: 'LeadSource', ...commonColumnProps },
            { field: 'nextStep', headerName: 'NextStep', ...commonColumnProps },
            { field: 'contactName', headerName: 'ContactName', ...commonColumnProps },
            {
              field: 'amount',
              headerName: 'Amount',
              ...commonColumnProps,
              type: 'number',
            },
            {
              field: 'expectedRevenue',
              headerName: 'ExpectedRevenue',
              ...commonColumnProps,
              type: 'number',
            },
            { field: 'probability', headerName: 'Probability', ...commonColumnProps },
            { field: 'stage', headerName: 'Stage', ...commonColumnProps },
            {
              field: 'compaignSource',
              headerName: 'CompaignSource',
              ...commonColumnProps,
            },
            { field: 'description', headerName: 'Description', ...commonColumnProps },
            {
              field: 'closingDate',
              headerName: 'ClosingDate',
              ...commonColumnProps,
              ...dateCell(),
            },
          ])
    
  }
