import { Typography, Box } from "@mui/material";
import SwitchToggle from "common/input/SwitchToggle";

export const warehouseTableColumns = [
  {
    field: "warehouseName",
    headerName: "Warehouse Name",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "warehouseNo",
    headerName: "Warehouse#",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "suburb",
    headerName: "Suburb",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "addressLine",
    headerName: "Address",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "postCode",
    headerName: "Postcode",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "phoneNo",
    headerName: "Phone No.",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "ePostActive",
    headerName: "ePost Active",
    type: "boolean",
    minWidth: 80,
    flex: 1,
    isToggle: true,
  },
  {
    field: "isActive",
    headerName: "Is Active",
    minWidth: 80,
    headerAlign: "center",
    align: "center",
    flex: 1,
    isToggle: true,
  },
];