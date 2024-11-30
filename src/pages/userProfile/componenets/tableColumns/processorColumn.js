const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };
  
  export const processorColumn = [
    {
      field: "processorName",
      headerName: "Processor Name",
      ...commonColumnProps,
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
      field: "serial",
      headerName: "Serial",
      ...commonColumnProps,
    },
    {
      field: "assetTag",
      headerName: "Asset Tag",
      ...commonColumnProps,
    },
    {
      field: "dmiSpeed",
      headerName: "DMI Speed (MT/s)",
      ...commonColumnProps,
    },
    {
      field: "externalClock",
      headerName: "External Clock (GHz)",
      ...commonColumnProps,
    },
    {
      field: "frequency",
      headerName: "Frequency (MHz)",
      ...commonColumnProps,
    },
    {
      field: "maxCores",
      headerName: "Max Cores",
      ...commonColumnProps,
    },
    {
      field: "physID",
      headerName: "Physical ID",
      ...commonColumnProps,
    },
    {
      field: "voltage",
      headerName: "Voltage (V)",
      ...commonColumnProps,
    },
    {
      field: "size",
      headerName: "Size (KB)",
      ...commonColumnProps,
    },
    {
      field: "threads",
      headerName: "Threads",
      ...commonColumnProps,
    },
    {
      field: "cores",
      headerName: "Cores",
      ...commonColumnProps,
    },
    {
      field: "baseSpeedGHz",
      headerName: "Base Speed (GHz)",
      ...commonColumnProps,
    },
    {
      field: "maxSpeedGHz",
      headerName: "Max Speed (GHz)",
      ...commonColumnProps,
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      ...commonColumnProps,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      ...commonColumnProps,
    },
  ];