import { Chip, Typography, Box } from "@mui/material";
import SwitchToggle from "common/input/SwitchToggle";

const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: "left",
    align: "left",
    flex: 1,
  };

  export const operatingsystemColumn = [
    {
      field: "osName",
      headerName: "OS Name",
      ...commonColumnProps,
    },
    {
      field:"osVersion",
      headerName:"Version",
      ...commonColumnProps,
    },
    {
      field: "osType",
      headerName: "Type",
      ...commonColumnProps,
    },
    {
      field: "architecture",
      headerName: "Architecture",
      ...commonColumnProps,
    },
    {
      field: "licenseType",
      headerName: "License Type",
      ...commonColumnProps,
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      ...commonColumnProps,
    },
    {
      field: "eolSupportDate",
      headerName: "Eol SupportDate",
      ...commonColumnProps,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      ...commonColumnProps,
    },
    {
      field: "kernelVersion",
      headerName: "Kernel Version",
      ...commonColumnProps,
    },
    {
      field: "buildNumber",
      headerName: "Build Number",
      ...commonColumnProps,
    },
    {
      field: "installationSizeMB",
      headerName: "Installation Size MB",
      ...commonColumnProps,
    },
    {
      field: "defaultBrowser",
      headerName: "Default Browser",
      ...commonColumnProps,
    },
    {
      field: "isSupported",
      headerName: "Is Supported",
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
