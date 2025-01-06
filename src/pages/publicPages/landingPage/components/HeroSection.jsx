import React, { useState } from 'react';

import { Box, Grid, Typography, Button } from '@mui/material';

import { Helmet } from 'react-helmet';
import heroImage from 'components/assets/heroImage.jpeg';

import { useNavigate } from 'react-router-dom';
import { otherRoutes } from 'enum/routesEnum';

// import ContactFormDialog from '../../../../components/HomePage/components/ContactFormDialog';

const HeroSection = () => {
  const navigate = useNavigate();
  const [contactFormOpen, setContactFormOpen] = useState(false);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* <ContactFormDialog
        open={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
      /> */}

      <Box mt={2}>
        <Grid container justifyContent="center">
          <Grid item md={5}>
            <Box
              backgroundColor={(theme) =>
                `${theme.palette.secondary.contrastText}80`
              }
              pt={2}
              pb={3}
              px={4}
            >
              <Typography variant="p2" fontWeight="bold">
                NEW! MasterCRM CUSTOMER PLATFORM
              </Typography>

              <Typography
                variant="h1"
                fontWeight="normal"
                fontFamily={(theme) =>
                  `DM Serif Display,${theme.typography.fontFamily}`
                }
              >
                Grow better with MasterCRM
              </Typography>

              <Box pr={8} mt={2}>
                <Typography variant="p">
                  Software that's powerful, not overpowering. Seamlessly connect
                  your data, teams, and customers on one CRM platform that grows
                  with your business
                </Typography>
              </Box>

              <Grid
                container
                width="100%"
                columnSpacing={1}
                rowSpacing={1}
                pt={3}
                pb={2}
              >
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      boxShadow: 'none',
                      borderRadius: 0.5,
                      height: '70px',
                      maxWidth: '260px',
                      width: '100%',
                    }}
                    // onClick={() => navigate(otherRoutes.LOGIN)}
                    onClick={() => setContactFormOpen(true)}
                  >
                    <Typography width="120px" variant="p" fontWeight="bold">
                      Get a demo
                    </Typography>
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="whiteGold"
                    sx={{
                      boxShadow: 'none',
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 0.5,
                      height: '70px',
                      maxWidth: '260px',
                      width: '100%',
                    }}
                    onClick={() => navigate(otherRoutes.LOGIN)}
                  >
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      whiteSpace="nowrap"
                      width="120px"
                    >
                      Get started free
                    </Typography>
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="p">
                Get a demo of our premium software, or get started with free
                tools.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={7}>
            <Box component="img" src={heroImage} width="100%" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HeroSection;
