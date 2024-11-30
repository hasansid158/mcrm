import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import HeroSection from './components/HeroSection';
import DetailSection from './components/detailSection/DetailSection';

import { useNavigate } from 'react-router-dom';
import HomePage from 'components/HomePage';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('');
  }, []);

  return (
    <>
      {/* <Container maxWidth='xl'>
        <HeroSection />
        <DetailSection />
      </Container> */}
      <HomePage />
    </>
  );
}

export default LandingPage;
