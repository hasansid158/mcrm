import React from 'react';
import { useRoutes } from 'react-router-dom';
import { otherRoutes } from '../../enum/routesEnum';
import CrmMain from 'pages/CrmMain';
import MainPublicRoute from './MainPublicRoute';

import SnackbarNotify from 'common/ui/SnackbarNotify';

const MainRoute = () => {

  const mainRouting = useRoutes([
    // { path: otherRoutes.LOGIN, element: <LoginSignup route={otherRoutes.LOGIN} /> },
    // { path: otherRoutes.SIGNUP, element: <LoginSignup route={otherRoutes.SIGNUP} /> },
    { path: '/crm/*', element: <CrmMain /> },
    { path: '/*', element: <MainPublicRoute /> }
  ]);

  return (
    <>
      <SnackbarNotify />
      {mainRouting}
    </>
  )
};

export default MainRoute;
