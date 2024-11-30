import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Tab,
  Tabs
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import DataTable from 'common/dataDisplay/table/DataTable';


import Menu from "@mui/material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { styled, alpha } from "@mui/material/styles";
import {
  deepPurple,
  teal,
  orange,
  blueGrey,
  brown,
  indigo,
  pink,
} from "@mui/material/colors";
import { useSelector } from "react-redux";

import Services from "./Services";
import UserTable from "./UserTable";

const permissionColumns = [
  {
    field: "permissionName",
    headerName: "Name",
    width: 220,
    renderCell: (params) => {
      return (
        <Typography>
          {params?.row?.permissionName?.split(/(?=[A-Z])/)?.join(" ")}
        </Typography>
      );
    },
  },
  {
    field: "roleName",
    headerName: "Assigned To",
    minWidth: 580,
    flex: 1,
    renderCell: (params) => {
      const list = params.row.roleName.split(",");
      return (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={"6px"}
        >
          {list?.map((item, index) => (
            <Stack key={index}>
              {item === "SaaS-Administrator" ? (
                <Chip color="primary" size="small" label={item} />
              ) : item === "Account-Administrator" ? (
                <Chip color="success" size="small" label={item} />
              ) : item === "Analyst" ? (
                <Chip color="blueWhite" size="small" label={item} />
              ) : item === "Marketing Manager" ? (
                <Chip color="pinkWhite" size="small" label={item} />
              ) : item === "Restricted User" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: "" }}
                  size="small"
                  label={item}
                />
              ) : item === "Sales Representative" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: teal[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "Accountant" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: deepPurple[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "Inventory Manager" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: orange[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "HR Manager" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: blueGrey[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "Production Supervisor" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: brown[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "Asset Tester" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: indigo[500] }}
                  size="small"
                  label={item}
                />
              ) : item === "Customer Support" ? (
                <Chip
                  color="error"
                  sx={{ backgroundColor: pink[500] }}
                  size="small"
                  label={item}
                />
              ) : (
                item
              )}
            </Stack>
          ))}
        </Stack>
      );
    },
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    width: 100,
    renderCell: (params) => {
      return (
        <Stack direction={"row"}>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlinedIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];
const UserPermissions = () => {
  const permissionList = useSelector((state) => state?.adminPermissions);
  const adminUserRolePermissions = useSelector(
    (state) => state?.adminUserRolePermissions
  );

  const [allAdminUserRolePermission, setAllAdminUserRolePermission] = useState(
    []
  );
  const [allPermissionList, setAllPermissionList] = useState([]);

  const [showTable, setShowTable] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (adminUserRolePermissions) {
      setAllAdminUserRolePermission(adminUserRolePermissions);
    }
  }, [adminUserRolePermissions]);

  useEffect(() => {
    if (permissionList) {
      setAllPermissionList(permissionList);
    }
  }, [permissionList]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return ( 
    <>

    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="User Table" />
      <Tab label="Permissions List" />
      <Tab label="Services" />
    </Tabs> </Box>
     <Stack spacing={3}>
      
      <Paper>
      
        <Stack sx={{ p: "1.25rem" }}>
          {tabValue === 0 && <UserTable />}
          {tabValue === 1 && (
        <Stack>
          <Paper>
            <Stack sx={{ p: "1.25rem 1.25rem 0.75rem" }}>
              <Typography variant="h6" fontWeight={500}>
                Permissions List
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Each category (Basic, Professional, and Business) includes the
                four predefined roles shown below.
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              sx={{ p: "1.25rem 1.25rem 0.75rem", pt: "0.75rem" }}
              justifyContent={"space-between"}
            >
              <TextField
                //   value={permSearchTerm}
                //   onChange={handlePermSearchChange}
                size="small"
                variant="outlined"
                placeholder="Search Permissions"
              />
              <Button sx={{ height: "40px" }} variant="contained">
                Add Permission
              </Button>
            </Stack>
            <Stack sx={{ p: "1.25rem  0.75rem", pt: "1rem" }} width={"100%"}>
              <DataTable
                rowData={allPermissionList.length ? allPermissionList : []}
                columns={permissionColumns}
                autoHeight={true}
                sx={{
                  borderRadius: 0,
                  borderTop: 0,
                  "& .MuiDataGrid-row": {
                    // p: 2,
                    minHeight: "50px !important",
                    maxHeight: "50px !important",
                    fontSize: "14px",
                  },
                  "& .MuiDataGrid-cell": {
                    p: 2,
                    minHeight: "50px !important",
                    maxHeight: "50px !important",
                  },
                }}
              />
            </Stack>
          </Paper>
        </Stack>)}
        {tabValue === 2 && <Services />}
        </Stack>
      </Paper>
    </Stack>
    </>
  );
};

export default UserPermissions;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 120,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CustomizedMenus = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <VisibilityOutlinedIcon />
          View
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <DeleteOutlinedIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
