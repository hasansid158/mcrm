import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { otherRoutes } from "enum/routesEnum";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import master_crm_logo from "components/assets/master-crm-logo.png";

const Footer = ({ handleSidebarClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const pages = [
    { label: "Home", link: otherRoutes.LANDING_PAGE },
    { label: "Login", link: otherRoutes.LOGIN },
    { label: "Signup", link: otherRoutes.SIGNUP },
    { label: "About Us", link: otherRoutes.ABOUT_US },
    { label: "Product", link: otherRoutes.PRODUCT_PAGE },
  ];

  const otherLink = [
    { label: "Privacy Policy", link: otherRoutes.PRIVACY_POLICY },
    { label: "Terms and Conditions", link: otherRoutes.TERMS },
    { label: "Contact Us", link: otherRoutes.LANDING_PAGE },
  ];

  return (
    <Box py={{ xs: 6, md: 12 }} px={{ xs: 1, sm: 2, md: 3 }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            width={"100%"}
            flexDirection={"column"}
          >
            <Typography
              variant="p"
              sx={{ mb: 2 }}
              fontSize={{ xs: "24px", sm: "26px", md: "28px", lg: "30px" }}
              className="poppins-font"
              color={theme.palette.common.textWhite}
            >
              Quick Navigate
            </Typography>

            {pages.map((page, index) => (
              <Link
                key={index}
                onClick={() => {
                  handleSidebarClose();
                  navigate(page.link);
                }}
                sx={{ cursor: "pointer" }}
                hover={"underline"}
                color={"secondary"}
              >
                <Typography
                  // variant="subtitle1"
                  color={"#FFFFFFCC"}
                  className="poppins-font"
                  sx={{
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                >
                  {page.label}
                </Typography>
              </Link>
            ))}

            <Box display="flex" flexWrap={"wrap"} alignItems={"center"}></Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            width={"100%"}
            flexDirection={"column"}
          >
            <Typography
              variant="p"
              sx={{ mb: 2 }}
              fontSize={{ xs: "24px", sm: "26px", md: "28px", lg: "30px" }}
              className="poppins-font"
              color={theme.palette.common.textWhite}
            >
              Other link
            </Typography>

            {otherLink.map((page, index) => (
              <Link
                key={index}
                onClick={() => {
                  navigate(page.link);
                  handleSidebarClose();
                }}
                sx={{ cursor: "pointer" }}
                hover={"underline"}
                color={"secondary"}
              >
                <Typography
                  variant="p"
                  color={"#FFFFFFCC"}
                  className="poppins-font"
                  sx={{
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                >
                  {page.label}
                </Typography>
              </Link>
            ))}

            <Box display="flex" flexWrap={"wrap"} alignItems={"center"}></Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            bgcolor={"#FFFFFF0D"}
            sx={{ borderRadius: "20px", p: 4, width: "100%" }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              gap={8}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                width={"100%"}
                flexDirection={"column"}
              >
                <Typography
                  variant="h3"
                  sx={{ mb: 2 }}
                  fontSize={{ xs: "24px", sm: "26px", md: "28px", lg: "30px" }}
                  className="poppins-font"
                  color={theme.palette.common.textWhite}
                >
                  Other link
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                  color={"#FFFFFFCC"}
                  className="poppins-font"
                  sx={{
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  href="mailto:Basan@MasterCRM.com.au"
                  component={"a"}
                >
                  Basan@MasterCRM.com.au
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                  color={"#FFFFFFCC"}
                  className="poppins-font"
                  sx={{
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  href="tel:(09) 623 4340"
                  component={"a"}
                >
                  (09) 623 4340
                </Typography>
                <Typography
                  variant="p"
                  fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                  color={"#FFFFFFCC"}
                  className="poppins-font"
                  sx={{
                    fontWeight: "500",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  href="tel:​021 261 7332"
                  component={"a"}
                >
                  ​021 261 7332
                </Typography>

                <Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    gap={1}
                    mt={3}
                  >
                    <Box
                      component={"a"}
                      href=""
                      target="_blank"
                      sx={{
                        bgcolor: theme.palette.common.gold,
                        p: 1,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FacebookIcon
                        sx={{
                          color: theme.palette.common.backgroundDarkBlue,
                          fontSize: "24px",
                        }}
                      />
                    </Box>
                    <Box
                      component={"a"}
                      href=""
                      target="_blank"
                      sx={{
                        bgcolor: theme.palette.common.gold,
                        p: 1,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TwitterIcon
                        sx={{
                          color: theme.palette.common.backgroundDarkBlue,
                          fontSize: "24px",
                        }}
                      />
                    </Box>
                    <Box
                      component={"a"}
                      href=""
                      target="_blank"
                      sx={{
                        bgcolor: theme.palette.common.gold,
                        p: 1,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <WhatsAppIcon
                        sx={{
                          color: theme.palette.common.backgroundDarkBlue,
                          fontSize: "24px",
                        }}
                      />
                    </Box>
                    <Box
                      component={"a"}
                      href=""
                      target="_blank"
                      sx={{
                        bgcolor: theme.palette.common.gold,
                        p: 1,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <YouTubeIcon
                        sx={{
                          color: theme.palette.common.backgroundDarkBlue,
                          fontSize: "24px",
                        }}
                      />
                    </Box>
                    <Box
                      component={"a"}
                      href=""
                      target="_blank"
                      sx={{
                        bgcolor: theme.palette.common.gold,
                        p: 1,
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InstagramIcon
                        sx={{
                          color: theme.palette.common.backgroundDarkBlue,
                          fontSize: "24px",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box
                  component="img"
                  src={master_crm_logo}
                  width={{ xs: "100px", md: "140px" }}
                  onClick={() => navigate(otherRoutes?.LOGIN)}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
