import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { Topbar, Sidebar, Footer } from "./components";
import Container from "common/Container";
import PublicContainer from "common/Container";

const pages = [
  {
    title: "Landing Pages",
    id: "landing-pages",
    pages: [
      {
        title: "Advertisement",
        href: "/landing-advertisement",
      },
      {
        title: "Payment App",
        href: "/landing-payment-app",
      },
      {
        title: "Marketing",
        href: "/landing-marketing",
      },
      {
        title: "Software Company",
        href: "/landing-software-company",
      },
      {
        title: "Course",
        href: "/landing-course",
      },
      {
        title: "Crypto Currency",
        href: "/landing-crypto",
      },
      {
        title: "Design Agency",
        href: "/landing-design-agency",
      },
      {
        title: "Consulting",
        href: "/landing-consulting",
      },
      {
        title: "Application",
        href: "/landing-application",
      },
      {
        title: "Domain Hosting",
        href: "/landing-domain-hosting",
      },
      {
        title: "Travel",
        href: "/landing-travel",
      },
      {
        title: "Event",
        href: "/landing-event",
      },
    ],
  },
  {
    title: "Supporting Pages",
    id: "supporting-pages",
    pages: [
      {
        title: "About",
        href: "/page-about",
      },
      {
        title: "Services",
        href: "/page-services",
      },
      {
        title: "Contact",
        href: "/page-contact",
      },
      {
        title: "Pricing",
        href: "/page-pricing",
      },
      {
        title: "Customers",
        href: "/page-customers",
      },
      {
        title: "Hire Us",
        href: "/page-hire-us",
      },
      {
        title: "FAQ",
        href: "/page-faq",
      },
      {
        title: "Privacy Policy",
        href: "/page-privacy",
      },
      {
        title: "Coming Soon",
        href: "/page-coming-soon",
      },
      {
        title: "Maintenance Mode",
        href: "/page-maintenance-mode",
      },
      {
        title: "Cover",
        href: "/page-cover",
      },
      {
        title: "Not Found",
        href: "/page-not-found",
      },
    ],
  },
  {
    title: "Auth Pages",
    id: "auth-pages",
    pages: [
      {
        title: "Login",
        href: "/page-login",
      },
      {
        title: "Login Simple",
        href: "/page-login-simple",
      },
      {
        title: "Sign Up",
        href: "/page-signup",
      },
      {
        title: "Sign Up Simple",
        href: "/page-signup-simple",
      },
      {
        title: "Forgot Password",
        href: "/page-forgot-password",
      },
      {
        title: "Forgot Password Simple",
        href: "/page-forgot-password-simple",
      },
    ],
  },
];

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Main = ({ children }) => {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div>
      <HideOnScroll>
        <AppBar
          position={"fixed"}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
          elevation={1}
        >
          <Container paddingY={{ xs: 1 / 2, sm: 1 }}>
            <Topbar onSidebarOpen={handleSidebarOpen} />
          </Container>
        </AppBar>
      </HideOnScroll>
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
        pages={pages}
      />
      <main>
        <Box height={{ xs: 72, sm: 88 }} />
        {children}
        <Divider />
      </main>
      <Box
        bgcolor={theme.palette.common.backgroundDarkBlue}
        sx={{ position: "relative" }}
      >
        <PublicContainer paddingY={4}>
          <Footer handleSidebarClose={handleSidebarClose} />
        </PublicContainer>
        <Box sx={{ height: "1px", width: "100%", bgcolor: "#FFFFFF33" }}></Box>
        <Typography
          variant="p"
          component={'p'}
          sx={{ py: 2, textAlign: "center", }}
          fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          className="poppins-font"
          color={theme.palette.common.textWhite}
        >
          All right reserved by master CRM 2024
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: { xs: "none", md: "0px" },
            right: { xs: "0px", md: "none" },
            zIndex: 1,
          }}
        >
          <svg
            style={{ position: "relative" }}
            xmlns="http://www.w3.org/2000/svg"
            width="109.93px"
            height="63.02px"
            viewBox="0 0 175 101"
            fill="none"
          >
            <path
              d="M164.246 65.0965C164.246 62.1044 166.672 59.7188 169.624 59.7188C172.616 59.7188 175.001 62.1449 175.001 65.0965C175.001 68.0887 172.576 70.4742 169.624 70.4742C166.672 70.5147 164.246 68.0887 164.246 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M131.414 65.0965C131.414 62.1044 133.84 59.7188 136.792 59.7188C139.784 59.7188 142.169 62.1449 142.169 65.0965C142.169 68.0887 139.744 70.4742 136.792 70.4742C133.84 70.5147 131.414 68.0887 131.414 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M98.543 65.0965C98.543 62.1044 100.969 59.7188 103.921 59.7188C106.913 59.7188 109.298 62.1449 109.298 65.0965C109.298 68.0887 106.872 70.4742 103.921 70.4742C100.969 70.5147 98.543 68.0887 98.543 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M65.707 65.0965C65.707 62.1044 68.1331 59.7188 71.0848 59.7188C74.077 59.7188 76.4624 62.1449 76.4624 65.0965C76.4624 68.0887 74.0365 70.4742 71.0848 70.4742C68.1331 70.5147 65.707 68.0887 65.707 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M32.8359 65.0965C32.8359 62.1044 35.2621 59.7188 38.2137 59.7188C41.2059 59.7188 43.5913 62.1449 43.5913 65.0965C43.5913 68.0887 41.1654 70.4742 38.2137 70.4742C35.2621 70.5147 32.8359 68.0887 32.8359 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0 65.0965C0 62.1044 2.42611 59.7188 5.3778 59.7188C8.36992 59.7188 10.7554 62.1449 10.7554 65.0965C10.7554 68.0887 8.32949 70.4742 5.3778 70.4742C2.42611 70.5147 0 68.0887 0 65.0965Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M164.246 94.9559C164.246 91.9638 166.672 89.5781 169.624 89.5781C172.616 89.5781 175.001 92.0042 175.001 94.9559C175.001 97.948 172.576 100.334 169.624 100.334C166.672 100.374 164.246 97.948 164.246 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M131.414 94.9559C131.414 91.9638 133.84 89.5781 136.792 89.5781C139.784 89.5781 142.169 92.0042 142.169 94.9559C142.169 97.948 139.744 100.334 136.792 100.334C133.84 100.374 131.414 97.948 131.414 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M98.543 94.9559C98.543 91.9638 100.969 89.5781 103.921 89.5781C106.913 89.5781 109.298 92.0042 109.298 94.9559C109.298 97.948 106.872 100.334 103.921 100.334C100.969 100.374 98.543 97.948 98.543 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M65.707 94.9559C65.707 91.9638 68.1331 89.5781 71.0848 89.5781C74.077 89.5781 76.4624 92.0042 76.4624 94.9559C76.4624 97.948 74.0365 100.334 71.0848 100.334C68.1331 100.374 65.707 97.948 65.707 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M32.8359 94.9559C32.8359 91.9638 35.2621 89.5781 38.2137 89.5781C41.2059 89.5781 43.5913 92.0042 43.5913 94.9559C43.5913 97.948 41.1654 100.334 38.2137 100.334C35.2621 100.374 32.8359 97.948 32.8359 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0 94.9559C0 91.9638 2.42611 89.5781 5.3778 89.5781C8.36992 89.5781 10.7554 92.0042 10.7554 94.9559C10.7554 97.948 8.32949 100.334 5.3778 100.334C2.42611 100.374 0 97.948 0 94.9559Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M164.246 35.2371C164.246 32.2449 166.672 29.8594 169.624 29.8594C172.616 29.8594 175.001 32.2854 175.001 35.2371C175.001 38.1887 172.576 40.6148 169.624 40.6148C166.672 40.6553 164.246 38.2292 164.246 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M131.414 35.2371C131.414 32.2449 133.84 29.8594 136.792 29.8594C139.784 29.8594 142.169 32.2854 142.169 35.2371C142.169 38.1887 139.744 40.6148 136.792 40.6148C133.84 40.6553 131.414 38.2292 131.414 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M98.543 35.2371C98.543 32.2449 100.969 29.8594 103.921 29.8594C106.913 29.8594 109.298 32.2854 109.298 35.2371C109.298 38.1887 106.872 40.6148 103.921 40.6148C100.969 40.6553 98.543 38.2292 98.543 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M65.707 35.2371C65.707 32.2449 68.1331 29.8594 71.0848 29.8594C74.077 29.8594 76.4624 32.2854 76.4624 35.2371C76.4624 38.1887 74.0365 40.6148 71.0848 40.6148C68.1331 40.6553 65.707 38.2292 65.707 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M32.8359 35.2371C32.8359 32.2449 35.2621 29.8594 38.2137 29.8594C41.2059 29.8594 43.5913 32.2854 43.5913 35.2371C43.5913 38.1887 41.1654 40.6148 38.2137 40.6148C35.2621 40.6553 32.8359 38.2292 32.8359 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0 35.2371C0 32.2449 2.42611 29.8594 5.3778 29.8594C8.36992 29.8594 10.7554 32.2854 10.7554 35.2371C10.7554 38.1887 8.32949 40.6148 5.3778 40.6148C2.42611 40.6553 0 38.2292 0 35.2371Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M164.246 5.3778C164.246 2.38568 166.672 0 169.624 0C172.616 0 175.001 2.42611 175.001 5.3778C175.001 8.36992 172.576 10.7555 169.624 10.7555C166.672 10.7555 164.246 8.32948 164.246 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M131.414 5.3778C131.414 2.38568 133.84 0 136.792 0C139.784 0 142.169 2.42611 142.169 5.3778C142.169 8.36992 139.744 10.7555 136.792 10.7555C133.84 10.7555 131.414 8.32948 131.414 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M98.543 5.3778C98.543 2.38568 100.969 0 103.921 0C106.913 0 109.298 2.42611 109.298 5.3778C109.298 8.36992 106.872 10.7555 103.921 10.7555C100.969 10.7555 98.543 8.32948 98.543 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M65.707 5.3778C65.707 2.38568 68.1331 0 71.0848 0C74.077 0 76.4624 2.42611 76.4624 5.3778C76.4624 8.36992 74.0365 10.7555 71.0848 10.7555C68.1331 10.7555 65.707 8.32948 65.707 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M32.8359 5.3778C32.8359 2.38568 35.2621 0 38.2137 0C41.2059 0 43.5913 2.42611 43.5913 5.3778C43.5913 8.36992 41.1654 10.7555 38.2137 10.7555C35.2621 10.7555 32.8359 8.32948 32.8359 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0 5.3778C0 2.38568 2.42611 0 5.3778 0C8.36992 0 10.7554 2.42611 10.7554 5.3778C10.7554 8.36992 8.32949 10.7555 5.3778 10.7555C2.42611 10.7555 0 8.32948 0 5.3778Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </Box>
      </Box>
    </div>
  );
};

export default Main;
