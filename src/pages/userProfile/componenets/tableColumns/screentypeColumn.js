const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };

  export const screentypesColumn = [
    {
      field: "screenTypeName",
      headerName: "Screen Type Name",
      ...commonColumnProps,
    },
    {
      field: "technology",
      headerName: "Technology",
      ...commonColumnProps,
    },
    {
      field: "resolution",
      headerName: "Resolution",
      ...commonColumnProps,
    },
    {
      field: "refreshRate",
      headerName: "Refresh Rate (Hz)",
      ...commonColumnProps,
    },
    {
      field: "aspectRatio",
      headerName: "Aspect Ratio",
      ...commonColumnProps,
    },
    {
      field: "brightness",
      headerName: "Brightness (nits)",
      ...commonColumnProps,
    },
    {
      field: "contrastRatio",
      headerName: "Contrast Ratio",
      ...commonColumnProps,
    },
    {
      field: "colorGamut",
      headerName: "Color Gamut",
      ...commonColumnProps,
    },
    {
      field: "viewingAngle",
      headerName: "Viewing Angle",
      ...commonColumnProps,
    },
    {
      field: "responseTime",
      headerName: "Response Time (ms)",
      ...commonColumnProps,
    },
    {
      field: "panelType",
      headerName: "Panel Type",
      ...commonColumnProps,
    },
    {
      field: "ports",
      headerName: "Ports",
      ...commonColumnProps,
    },
    {
      field: "backlight",
      headerName: "Backlight",
      ...commonColumnProps,
    },
    {
      field: "screenSize",
      headerName: "Screen Size (inches)",
      ...commonColumnProps,
    },
    {
      field: "hdrSupport",
      headerName: "HDR Support",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "touchSupport",
      headerName: "Touch Support",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "curved",
      headerName: "Curved",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "speakerSupport",
      headerName: "Speaker Support",
      ...commonColumnProps,
      isToggle: true,
    },
    {
      field: "vesaMountSupport",
      headerName: "VESA Mount Support",
      ...commonColumnProps,
      isToggle: true,
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