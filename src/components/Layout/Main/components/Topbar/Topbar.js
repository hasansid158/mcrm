import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import master_crm_logo from "components/assets/master-crm-logo.png";
import { otherRoutes } from "enum/routesEnum";
import { useNavigate, NavLink } from "react-router-dom";
import useScreenSize from "hooks/useScreenSize";
import { navItems } from "../../navigation";
import PersonIcon from '@mui/icons-material/Person';

const Topbar = ({ onSidebarOpen }) => {
  const { isTablet } = useScreenSize();
  const navigate = useNavigate();
  const theme = useTheme();

  const NavComponent = ({ label = "", link = "" }) => (
    // <NavLink
    //   to={`/${link}`}
    //   className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
    // >
    <Link
      onClick={() => navigate(link)}
      sx={{
        textDecoration: "none",
        px: { md: 1, lg: 2 },
        "&:hover": {
          cursor: "pointer",

          // outline: theme => `1px solid ${theme.palette.secondary.light}`
        },
        // color: 'primary.light',
      }}
      color={"secondary"}
    >
      <Typography
        variant="p"
        className="poppins-font"
        sx={{ fontWeight: "500" }}
      >
        {label}
      </Typography>
    </Link>
    // </NavLink>
  );

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      height={{ xs: "72px", sm: "88px" }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Box
          marginRight={{ xs: 1, sm: 2 }}
          display={{ xs: "block", md: "none" }}
        >
          <IconButton onClick={onSidebarOpen} aria-label="Menu">
            <MenuIcon sx={{ fontSize: "30px", color: "black" }} />
          </IconButton>
        </Box>
        {/* <Box
          display={"flex"}
          alignItems="baseline"
          component="a"
          underline="none"
          href="/"
          title="webbee"
          height={{ xs: 28, md: 32 }}
          width={45}
        >
          logo
        </Box> */}

        <Box
          component="img"
          src={master_crm_logo}
          width={{ xs: "40px", sm: "65px" }}
          onClick={() => navigate(otherRoutes?.LOGIN)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Box>
      <Box>
        {/* navlinks */}
        {!isTablet && (
          <Box display="flex" columnGap={{ sm: 1, md: 1, lg: 2 }}>
            {navItems?.map((item, key) => (
              <NavComponent label={item?.label} link={item?.link} key={key} />
            ))}
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems={"center"} >
        <Box
        display="flex"
        flexDirection="row" // Prevents stacking
        columnGap={0}
        >
          <Button
            variant='outlined'
            color='secondary'
            sx={{
              borderRadius: '10px',
              height: '48px',
              mr:2

            }}
            onClick={() => navigate(otherRoutes?.LOGIN)}
            size='large'
            startIcon={<PersonIcon sx={{ display: { xs: "none", sm: "inline" } }} />}
          >
        Login
          </Button>
          <Button
            variant="contained"
            color="pinkWhite"
            sx={{
              borderRadius: "10px",
              height: { xs: "auto", md: "48px" },
            }}
            onClick={() => navigate(otherRoutes?.SIGNUP)}
            size="large"
          >
            Get Started
          </Button>

        </Box>

      </Box>
    </Box>
  );
};

export default Topbar;
