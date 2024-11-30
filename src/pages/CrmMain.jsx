import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/material';

import RouterPages from 'pages/route/RouterPages';
import SideDrawer from 'components/sideDrawer/SideDrawer';
import Navbar from 'components/navbar/Navbar';

import ApiInitiator from 'api/ApiInitiator';
import ErrorDialog from 'common/dataDisplay/dialogBox/ErrorDialog';

import { otherRoutes } from 'enum/routesEnum';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CrmMain() {
  const navigate = useNavigate();
  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    !!!isLogin && navigate(otherRoutes.LOGIN);
  }, [isLogin]);

  return (
    <>
      <ApiInitiator/>
      <ErrorDialog/>

      <Box sx={{
        display: 'flex',
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        minHeight: '100dvh',
        pb: 2,
      }}>
        <SideDrawer />
        <Navbar />
        <Box component='main' sx={{flex: 1, width: 0}}>
          <Box height={48}></Box>
          <Container maxWidth={false} sx={{mt: 1}}>
            <RouterPages />
          </Container>
        </Box>
      </Box>
    </>
  )
}
