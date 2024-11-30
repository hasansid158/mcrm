import { Chip, Typography, Box } from "@mui/material";
import SwitchToggle from "common/input/SwitchToggle"; // Make sure to import your SwitchToggle component

const commonColumnProps = {
  minWidth: 80,
  editable: false,
  headerAlign: "left",
  align: "left",
};

export const statusColumn = [
  {
    field: "status",
    headerName: "Status Name",
    ...commonColumnProps,
    flex: 1,
  },
  {
    field: "isActive",
    headerName: "Is Active",
    ...commonColumnProps,
    headerAlign: "center",
    align: "center",
    isToggle: true,
  },
];