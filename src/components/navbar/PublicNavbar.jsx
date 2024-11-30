import React from 'react';

import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Link
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useScreenSize from 'hooks/useScreenSize';
import master_crm_logo from 'components/assets/master-crm-logo.png'
import { otherRoutes } from 'enum/routesEnum';
import { useNavigate, NavLink } from "react-router-dom";

const PublicNavbar = () => {
  const { isTablet } = useScreenSize();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', link: otherRoutes.LANDING_PAGE },
    { label: 'Products', link: otherRoutes.PRODUCT_PAGE },
    { label: 'Platform', link: otherRoutes.PLATFORM_PAGE },
    { label: 'Partners', link: otherRoutes.PARTNERS_PAGE },
    { label: 'Resources', link: otherRoutes.RESOURCES_PAGE },
    { label: 'Pricing', link: otherRoutes.PRICING_PAGE },
    { label: 'Company', link: otherRoutes.COMPANY_PAGE },
    { label: 'Contact Us', link: otherRoutes.CONTACT_US_PAGE },

  ]

  const NavComponent = ({ label = '', link = '' }) => (
    // <NavLink
    //   to={`/${link}`}
    //   className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
    // >
    <Link
      onClick={() => navigate(link)}
      sx={{
        textDecoration: 'none',
        px: { md: 1, lg: 2 },
        '&:hover': {
          cursor: 'pointer',

          // outline: theme => `1px solid ${theme.palette.secondary.light}`
        },
        // color: 'primary.light',
      }}
      color={'secondary'}
    >
      <Typography variant='p' className='poppins-font' sx={{ fontWeight: '500' }}>
        {label}
      </Typography>
    </Link>
    // </NavLink>
  );

  return (
    <>
      <Box height={{ md: '88px' }} />
      <Box
        width='100%'
        backgroundColor='#fff'
        // backgroundColor='red'
        position='fixed'
        top={0}
        left={0}
        zIndex={9999}

      >
        <Container maxWidth='xl'>
          <Box
            py={0}
            display='flex'
            alignItems='center'
            justifyContent={'space-between'}
            width='100%'
            columnGap={6}
            height={{ md: '88px' }}
          >

            {/* logo */}
            <Box
              component='img'
              src={master_crm_logo}
              width="65px"
              onClick={() => navigate(otherRoutes?.LOGIN)}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                }
              }}
            />

            {/* navlinks */}
            {!isTablet &&
              <Box
                display='flex'
                columnGap={{ sm: 1, md: 1, lg: 2 }}

              >
                {navItems?.map((item, key) => (
                  <NavComponent
                    label={item?.label}
                    link={item?.link}
                    key={key}
                  />
                ))}
              </Box>
            }

            {/* buttons */}

            <Box
              // ml='auto'
              display='flex'
              alignItems='center'
              columnGap={3}
            >
              <Button
                variant='contained'
                color='pinkWhite'
                sx={{
                  borderRadius: '10px',
                  height: '48px',
                  mr:2

                }}
                onClick={() => navigate(otherRoutes?.LOGIN)}
                size='large'
              >
                Login
        </Button>
              <Button
                variant='contained'
                color='pinkWhite'
                sx={{
                  borderRadius: '10px',
                  height: '48px'
                }}
                onClick={() => navigate(otherRoutes?.SIGNUP)}
                size='large'
              >
                Get Started Free
              </Button>
              {/* <IconButton
                sx={{color: 'secondary.light'}}
                // onClick={() => setDrawerState(true)}
                edge='end'
              >
                <SearchIcon sx={{fontSize: 25}}/>
              </IconButton> */}
              {/* <IconButton
                sx={{color: 'secondary.light'}}
                // onClick={() => setDrawerState(true)}
                edge='end'
              >
                <PublicOutlinedIcon sx={{fontSize: 25}}/>
              </IconButton> */}
              {/* <IconButton
                sx={{ color: 'secondary.light' }}
                onClick={() => navigate(otherRoutes?.LOGIN)}
                edge='end'
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
              </IconButton> */}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default PublicNavbar;
