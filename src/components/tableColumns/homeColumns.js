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

  export const homeColumns = {
    leads: [
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
      ],
      tasks: [
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
      ],
      quotes: [
        {
          field: 'quoteID',
          headerName: 'quoteID',
          ...commonColumnProps,
        },
        // { field: 'customerID', headerName: 'Vendor', ...commonColumnProps },
        {
          field: 'customerContactPersonName',
          headerName: 'ContactPerson',
          ...commonColumnProps,
        },
        { field: 'customerPhone', headerName: 'Phone', ...commonColumnProps },
        { field: 'customerEmail', headerName: 'Email', ...commonColumnProps },
        { field: 'customerAddress', headerName: 'Address', ...commonColumnProps },
        { field: 'customerCity', headerName: 'City', ...commonColumnProps },
        { field: 'customerCountry', headerName: 'Country', ...commonColumnProps },
        { field: 'customerState', headerName: 'State', ...commonColumnProps },
        {
          field: 'customerZipCode',
          headerName: 'PostCode',
          ...commonColumnProps,
        },
        {
          field: 'quoteDate',
          headerName: 'QuoteDate',
          ...commonColumnProps,
          ...dateCell(),
        },
        {
          field: 'quoteExpiryDate',
          headerName: 'ExpiryDate',
          ...commonColumnProps,
          ...dateCell(),
        },
        { field: 'salesPerson', headerName: 'SalesPerson', ...commonColumnProps },
        { field: 'poNumber', headerName: 'PONumber', ...commonColumnProps },
        { field: 'quantity', headerName: 'Quantity', ...commonColumnProps },
        // { field: 'description', headerName: 'LastPayment', ...commonColumnProps, ...dateCell() },
        { field: 'quoteType', headerName: 'QuoteType', ...commonColumnProps },
        //{ field: 'unitPrice', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
        // { field: 'taxes', headerName: 'LastPayment', ...commonColumnProps, ...dateCell() },
        { field: 'totalAmount', headerName: 'TotalAmount', ...commonColumnProps },
        // { field: 'paymentMethod', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
        // { field: 'currency', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
        // { field: 'discount', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
        // { field: 'shippingMethod', headerName: 'isActive', ...commonColumnProps, type: 'boolean' },
      ],
      deals: [
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
      ],
  };