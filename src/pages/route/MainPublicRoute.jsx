import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import PublicNavbar from 'components/navbar/PublicNavbar';
import Footer from 'components/navbar/Footer';

import { otherRoutes } from 'enum/routesEnum';

import LandingPage from 'pages/publicPages/landingPage/LandingPage';
import AboutUs from 'pages/publicPages/aboutUs/AboutUs';
import Terms from 'pages/publicPages/terms/Terms';
// import Product from 'pages/publicPages/productPage/Product';
import Product from 'pages/publicPages/productPage/ProductPage';
import PrivacyPolicy from 'pages/publicPages/privacyPolicy/PrivacyPolicy';
import Pricing from 'pages/publicPages/pricingPage/PricingPage';
import Platform from 'pages/publicPages/platformPage/Platform';
import Partners from 'pages/publicPages/partnersPage/Partners';
import Resources from 'pages/publicPages/ResourcesPage/ResourcePage';
import Company from 'pages/publicPages/companyPage/Company';
import Main from 'components/Layout/Main';
import LoginSignup from 'pages/loginSignup/LoginSignup';
import Login from 'pages/loginSignup/LoginPage';
import Signup from 'pages/loginSignup/SignupPage';
import ContactUs from 'pages/publicPages/contactUs/ContactUs';

const MainPublicRoute = () => {
  return (
    <Box
    // minHeight='100dvh'
    // display='flex'
    // flexDirection='column'
    // justifyContent='space-between'
    >
      {/* <PublicNavbar/> */}
      <Main>
        <Box m={0} p={0}>
          <Routes>

            <Route path={otherRoutes.LOGIN} element={<Login />} />
            <Route path={otherRoutes.SIGNUP} element={<Signup />} />
            <Route path={otherRoutes.LANDING_PAGE} element={<LandingPage />} />
            <Route path={otherRoutes.ABOUT_US} element={<AboutUs />} />
            <Route path={otherRoutes.TERMS} element={<Terms />} />
            <Route path={otherRoutes.PRODUCT_PAGE} element={<Product />} />
            <Route path={otherRoutes.PRIVACY_POLICY} element={<PrivacyPolicy />} />
            <Route path={otherRoutes.PRICING_PAGE} element={<Pricing />} />
            <Route path={otherRoutes.PLATFORM_PAGE} element={<Platform />} />
            <Route path={otherRoutes.PARTNERS_PAGE} element={<Partners />} />
            <Route path={otherRoutes.RESOURCES_PAGE} element={<Resources />} />
            <Route path={otherRoutes.COMPANY_PAGE} element={<Company />} />
            <Route path={otherRoutes.CONTACT_US_PAGE} element={<ContactUs />} />
          </Routes>
        </Box>
      </Main>
      {/* <Footer /> */}
    </Box>
  );
}

export default MainPublicRoute;
