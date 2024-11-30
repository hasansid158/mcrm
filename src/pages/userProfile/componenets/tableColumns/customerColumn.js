const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };
  
  export const customersColumn = [
    {
      field: "customerName",
      headerName: "Customer Name",
      ...commonColumnProps,
    },
    {
      field: "customerType",
      headerName: "Customer Type",
      ...commonColumnProps,
    },
    {
      field: "clientRef",
      headerName: "Client Reference",
      ...commonColumnProps,
    },
    {
      field: "customerPO",
      headerName: "Customer PO",
      ...commonColumnProps,
    },
    {
      field: "salesPersonID",
      headerName: "Sales Person ID",
      ...commonColumnProps,
    },
    {
      field: "projectManagerID",
      headerName: "Project Manager ID",
      ...commonColumnProps,
    },
    {
      field: "sendEmailNotifications",
      headerName: "Send Email Notifications",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "welcomeMessage",
      headerName: "Welcome Message",
      ...commonColumnProps,
    },
    {
      field: "billingType",
      headerName: "Billing Type",
      ...commonColumnProps,
    },
    {
      field: "useNetInvoicing",
      headerName: "Use Net Invoicing",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "isInactive",
      headerName: "Inactive",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "includeClientRefInCafFilename",
      headerName: "Include Client Ref in CAF Filename",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "urlSegment",
      headerName: "URL Segment",
      ...commonColumnProps,
    },
    {
      field: "phone",
      headerName: "Phone",
      ...commonColumnProps,
    },
    {
      field: "email",
      headerName: "Email",
      ...commonColumnProps,
    },
    {
      field: "street",
      headerName: "Street",
      ...commonColumnProps,
    },
    {
      field: "city",
      headerName: "City",
      ...commonColumnProps,
    },
    {
      field: "state",
      headerName: "State",
      ...commonColumnProps,
    },
    {
      field: "country",
      headerName: "Country",
      ...commonColumnProps,
    },
    {
      field: "postcode",
      headerName: "Postcode",
      ...commonColumnProps,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      ...commonColumnProps,
    },
    {
      field: "shippingMethod",
      headerName: "Shipping Method",
      ...commonColumnProps,
    },
    {
      field: "currency",
      headerName: "Currency",
      ...commonColumnProps,
    },
    {
      field: "accountId",
      headerName: "Account ID",
      ...commonColumnProps,
    },
    {
      field: "created",
      headerName: "Created",
      ...commonColumnProps,
    },
  ];
  
  export default customersColumn;