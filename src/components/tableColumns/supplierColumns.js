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

export const supplierColumns = [
  { field: 'vendorName', headerName: 'Vendor', ...commonColumnProps },
  { field: 'contactNumber', headerName: 'Contact', ...commonColumnProps },
  { field: 'suburb', headerName: 'Suburb', ...commonColumnProps },
  { field: 'state', headerName: 'State', ...commonColumnProps },
  { field: 'country', headerName: 'Country', ...commonColumnProps },
  { field: 'postcode', headerName: 'Postcode', ...commonColumnProps },
  { field: 'abn', headerName: 'ABN', ...commonColumnProps },
  {
    field: 'bankName',
    headerName: 'BankName',
    ...commonColumnProps,
  },
  {
    field: 'bankAccountNumber',
    headerName: 'AccountNumber',
    ...commonColumnProps,
  },
  {
    field: 'paymentTerms',
    headerName: 'PaymentTerms',
    ...commonColumnProps,
  },
  {
    field: 'lastPurchaseDate',
    headerName: 'LastPurchase',
    ...commonColumnProps,
    ...dateCell(),
  },
  {
    field: 'lastPaymentDate',
    headerName: 'LastPayment',
    ...commonColumnProps,
    ...dateCell(),
  },
  {
    field: 'isPreferredVendor',
    headerName: 'PreferredVendor',
    ...commonColumnProps,
    type: 'boolean',
  },
  {
    field: 'isActive',
    headerName: 'isActive',
    ...commonColumnProps,
    type: 'boolean',
  },
]
