const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };
  
  export const memoryColumn = [
    {
      field: "memorySize",
      headerName: "Memory Size",
      ...commonColumnProps,
    },
    {
      field: "capacity",
      headerName: "Capacity (bytes)",
      ...commonColumnProps,
    },
    {
      field: "formFactor",
      headerName: "Form Factor",
      ...commonColumnProps,
    },
    {
      field: "hz",
      headerName: "Frequency (Hz)",
      ...commonColumnProps,
    },
    {
      field: "serial",
      headerName: "Serial Number",
      ...commonColumnProps,
    },
    {
      field: "type",
      headerName: "Type",
      ...commonColumnProps,
    },
    {
      field: "speed",
      headerName: "Speed",
      ...commonColumnProps,
    },
    {
      field: "voltage",
      headerName: "Voltage",
      ...commonColumnProps,
    },
    {
      field: "latency",
      headerName: "Latency",
      ...commonColumnProps,
    },
    {
      field: "eccSupport",
      headerName: "ECC Support",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      ...commonColumnProps,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      ...commonColumnProps,
    },
  ];