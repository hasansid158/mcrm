
const commonColumnProps = {
  minWidth: 80,
  editable: false,
  headerAlign: "left",
  align: "left",
  flex: 1,
};

export const skuColumn = [
  {
    field: "sku",
    headerName: "SKU",
    ...commonColumnProps,
  },
  {
    field:"deviceType",
    headerName:"Device Type",
    ...commonColumnProps,
  },
  {
    field: "make",
    headerName: "Make",
    ...commonColumnProps,
  },
  {
    field: "model",
    headerName: "Model",
    ...commonColumnProps,
  },
  {
    field: "storage",
    headerName: "Storage",
    ...commonColumnProps,
  },
  {
    field: "memory",
    headerName: "Memory",
    ...commonColumnProps,
  },
  {
    field: "processor",
    headerName: "Processor",
    ...commonColumnProps,
  },
  {
    field: "networkCapabilities",
    headerName: "Network Capabilities",
    ...commonColumnProps,
  },
  {
    field: "graphics",
    headerName: "Graphics",
    ...commonColumnProps,
  },
  {
    field: "os",
    headerName: "OS",
    ...commonColumnProps,
  },
  {
    field: "color",
    headerName: "Color",
    ...commonColumnProps,
  },
  {
    field: "mobileMonsterURL",
    headerName: "Mobile Monster URL",
    ...commonColumnProps,
  },
  {
    field: "reebeloURL",
    headerName: "Reebelo URL",
    ...commonColumnProps,
  },
  {
    field: "errorMessage",
    headerName: "ErrorMessage",
    ...commonColumnProps,
  },
];
