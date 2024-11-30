import { Chip, Typography, Box } from "@mui/material";
import SwitchToggle from "common/input/SwitchToggle"; // Make sure to import your SwitchToggle component


export const ServiceColumn = [
  {
    field: "serviceDescription",
    headerName: "Service Description",
    headerAlign: "center",
    align: "center",
    width: 300,
  },
  {
    field: "serviceType",
    headerName: "Service Type",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "serviceCategory",
    headerName: "Service Category",
    width: 300,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "gst",
    headerName: "GST",
    headerAlign: "center",
    align: "center",
    width: 200,
  },
  {
    field: "isActive",
    headerName: "Is Active",
    type: "boolean",
    headerAlign: "center",
    align: "center",
    isToggle: true,
  },
];