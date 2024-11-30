const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };
  
  export const hddsColumn = [
    {
      field: "diskSize",
      headerName: "Disk Size",
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
      field: "interfaceType",
      headerName: "Interface Type",
      ...commonColumnProps,
    },
    {
      field: "rpm",
      headerName: "RPM",
      ...commonColumnProps,
    },
    {
      field: "cacheSizeMB",
      headerName: "Cache Size (MB)",
      ...commonColumnProps,
    },
    {
      field: "isSSD",
      headerName: "SSD",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      ...commonColumnProps,
    },
    {
      field: "model",
      headerName: "Model",
      ...commonColumnProps,
    },
    {
      field: "isActive",
      headerName: "Active",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "manufacturerDate",
      headerName: "Manufacturer Date",
      ...commonColumnProps,
    },
    {
      field: "created",
      headerName: "Created",
      ...commonColumnProps,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      ...commonColumnProps,
    },
  ];