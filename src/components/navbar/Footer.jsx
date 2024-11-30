import React from 'react';

import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@mui/material';

import { Link } from 'react-router-dom';

import { otherRoutes } from 'enum/routesEnum';

const Footer = () => {
  const footerEnum = [
    {
      header: 'Quick links',
      links: [
        {
          text: 'Home Page',
          link: '/',
        },
        {
          text: 'Login',
          link: otherRoutes.LOGIN,
        },
        {
          text: 'Signup',
          link: otherRoutes.SIGNUP,
        },
      ]
    },
    {
      header: 'About Us',
      links: [
        {
          text: 'Company Information',
          link: otherRoutes.ABOUT_US,
        },
      ]
    },
    {
      header: 'Site Information',
      links: [
        {
          text: 'Privacy Policy',
          link: otherRoutes.PRIVACY_POLICY,
        },
        {
          text: 'Terms and Conditions',
          link: otherRoutes.TERMS,
        },
      ]
    },
    {
      header: 'Contact Us',
      links: [
        {
          text: 'Basan@MasterCRM.com.au',
          link: '#',
        },
      ]
    },
  ]

  return (
    <Box
      backgroundColor='secondary.main'
      minHeight='220px'
      width="100%"
    >
      <Container  maxWidth="xl">
        <Grid container pt={3}>
          {footerEnum?.map((item, key) => (
            <Grid
              key={key}
              item
              md={3}
              sm={6}
              xs={6}
              color='secondary.contrastText'
            >
              <Typography
                variant='pb'
                component='div'
                maxWidth='180px'
                width='100%'
                m='0 auto'
                pb={1}
              >
                {item?.header}
              </Typography>
              {item?.links?.map((link, key) => (
                <Box
                  key={key}
                  pt={1}
                  maxWidth='180px'
                  width='100%'
                  m='0 auto'
                >
                  <Typography
                    component={Link}
                    to={link?.link}
                    variant='p2'
                    sx={{
                      color: 'secondary.contrastText',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                    onClick={() => {
                      if (link?.link === '#') {
                        window.location.href = `mailto:${link?.text}`;
                      }
                    }}
                  >
                    {link?.text}
                  </Typography>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
