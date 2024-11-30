import { Chip, Typography, Box } from "@mui/material";

export const userTableColumns = [
  {
    field: "emailAddress",
    headerName: "Email Address",
    width: 300,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 250,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      `${params.row.userFirstName} ${params.row.userLastName}`
    ),
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 250,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: "isAdmin",
    headerName: "Role",
    width: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Chip
        sx={{
          color: params.row.isAdmin ? "success.main" : "primary.main",
          backgroundColor: params.row.isAdmin ? "#2e7d321f" : "#FFCB5B1f",
        }}
        size="small"
        label={params.row.isAdmin ? "Admin" : "User"}
      />
    ),
  },
  {
    field: "isUserAgreedToTnC",
    headerName: "Agreed to T&C",
    width: 200,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => (
      <Chip
        sx={{
          color: params.row.isUserAgreedToTnC ? "success.main" : "primary.main",
          backgroundColor: params.row.isUserAgreedToTnC ? "#2e7d321f" : "#FFCB5B1f",
        }}
        size="small"
        label={params.row.isUserAgreedToTnC ? "Yes" : "No"}
      />
    ),
  },
];