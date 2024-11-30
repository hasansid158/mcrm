import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { navItems } from "components/Layout/Main/navigation";
import { otherRoutes } from "enum/routesEnum";
import { useNavigate, NavLink } from "react-router-dom";
import useScreenSize from "hooks/useScreenSize";

const SidebarNav = ({ pages, onClose }) => {
  const { isTablet } = useScreenSize();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : "");
  }, []);

  const NavComponent = ({ label = "", link = "" }) => (
    // <NavLink
    //   to={`/${link}`}
    //   className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
    // >
    <Link
      onClick={() => {
        navigate(link);
        onClose();
      }}
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
        variant="h4"
        className="poppins-font"
        sx={{
          fontWeight: "500",
          ":hover": { textDecoration: "underline", color: "primary.main" },
          color: activeLink === link ? "primary.main" : "none",
          textDecoration: activeLink === link ? "underline" : "none",
          py: 3,
          borderBottom: "1px solid black",
        }}
      >
        {label}
      </Typography>
    </Link>
    // </NavLink>
  );

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        onClick={() => onClose()}
      >
        <IconButton>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box paddingX={2} paddingBottom={2} marginTop={2}>
        <Box>
          {/* {pages.map((item, i) => (
            <Box key={i} marginBottom={4}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: 1,
                  display: 'block',
                }}
              >
                {item.title}
              </Typography>
              <Grid container spacing={1}>
                {item.pages.map((p, i) => (
                  <Grid item xs={6} key={i}>
                    <Link
                      variant="body2"
                      component={'a'}
                      href={p.href}
                      color={activeLink === p.href ? 'primary' : 'textPrimary'}
                      underline={'none'}
                      sx={{
                        fontWeight: activeLink === p.href ? 600 : 400,
                        '&:hover': {
                          textDecoration: 'none',
                          color: theme.palette.primary.dark,
                        },
                      }}
                      onClick={() => onClose()}
                    >
                      {p.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))} */}

          <Box
            display="flex"
            flexDirection={"column"}
            gap={2}
            columnGap={{ sm: 1, md: 1, lg: 2 }}
          >
            {navItems?.map((item, key) => (
              <NavComponent label={item?.label} link={item?.link} key={key} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
