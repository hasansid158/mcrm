import React from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import useScreenSize from 'hooks/useScreenSize';

import { useDispatch } from 'react-redux';
// import { setLogin } from 'redux/slices/authSlice';

import { useNavigate } from "react-router-dom";

const SideHero = () => {
  const { isMobile } = useScreenSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    // dispatch(setLogin('test token'));
    navigate('/');
  }

  return (


    <Box sx={{
      bgcolor: '#30344E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      py: 8,
      px: { xs: 2, md: 8 , lg: 8, xl: 14},
    }}>
      <Box sx={{
        p: { xs: 4, sm: 4, md: 6, xl: 8 },
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2.5,
        bgcolor: '#FFFFFF05',
        borderRadius: '30px',
        height: 'fit-content',
        width: 'fit-content',

      }}>

        <Typography variant='h3'
          sx={{ color: 'white', lineHeight: { xs: 'normal', md: '78px' }, fontSize: { xs: '38px', sm: '42px', md: '48px', lg: '54px', xl: '60px' } }}
        >
          Boost Your Success
        </Typography>
        <Typography
          component={'p'}
          variant="h4"
          fontWeight={600}
          lineHeight={'32px'}
          fontFamily={'"Poppins", sans-serif'}
          color={'#FFFFFFCC'}
          fontSize={{ xs: '20px', sm: '22px', md: '24px', lg: '24px' }}
        >
          Try Our Advanced CRM for Free! No Credit Card, No Hassle!
        </Typography>
        <Box display={'flex'} flexDirection={'row'} gap={2} >
          <Box sx={{ width: '5px', borderRadius: '5px', bgcolor: '#52C5B6' }} />
          <Box height={'100%'} display={'flex'} flexDirection={'column'} sx={{ rowGap: 2.5, }}>
            <Typography sx={{ color: '#FFFFFFCC' }} className='font-popins' fontSize={{ xs: '14px', sm: '16px', md: '18px', lg: '18px' }}>
              Seamless Data Integration: Start with preloaded data or effortlessly upload your own to hit the ground running. Our platform is designed to make your transition smooth and hassle-free.
            </Typography>

            <Typography sx={{ color: '#FFFFFFCC' }} className='font-popins' fontSize={{ xs: '14px', sm: '16px', md: '18px', lg: '18px' }}>
              Customizable Solutions: Dive into preconfigured processes, reports, and dashboards tailored to your business needs. Our flexible system adapts to you, providing valuable insights to drive growth.
            </Typography>

            <Typography sx={{ color: '#FFFFFFCC' }} className='font-popins' fontSize={{ xs: '14px', sm: '16px', md: '18px', lg: '18px' }}>
              Personalized User Experiences: Navigate through our CRM with ease and confidence, maximizing productivity.
            </Typography>

            <Typography sx={{ color: '#FFFFFFCC' }} className='font-popins' fontSize={{ xs: '14px', sm: '16px', md: '18px', lg: '18px' }}>
              Comprehensive Support and Learning:  We're committed to your success and provide continuous support and learning opportunities to enhance your skills.
            </Typography>

            {/* <Typography display='flex' variant='p2'>
              Innovative Features: Explore advanced tools such as AI-driven analytics, automated workflow customization. Stay ahead of the curve with technologies that redefine CRM.
            </Typography>


            <Typography display='flex' variant='p2'>
              Scalable Solutions: Grow with a CRM that scales alongside your business. From startups to enterprises, we support your journey with scalable features and flexible pricing.
            </Typography>

            <Typography display='flex' variant='p2'>
              Data Security and Compliance: Rest assured with top-tier data protection and compliance standards. We prioritize your data's security, ensuring peace of mind for you and your customers.
            </Typography> */}
          </Box>
        </Box>
        <Button
          onClick={handleClick}
          variant='contained'
          sx={{
            maxWidth: '320px',
            mt: 2, py: 1,
            height: { xs: 'auto', md: '56px' }
          }}
          fullWidth={true}
          color={'blueWhite'}
        >
          <Typography color='white'>START MY FREE TRIAL</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default SideHero;
