import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import DashboardCard01 from 'components/DashboardPage/components/Cards/DashboardCard01';
import DashboardCard02 from 'components/DashboardPage/components/Cards/DashboardCard02';
import DashboardCard03 from 'components/DashboardPage/components/Cards/DashboardCard03';
import DashboardCard04 from 'components/DashboardPage/components/Cards/DashboardCard04';
import DashboardCard05 from 'components/DashboardPage/components/Cards/DashboardCard05';


function Dashboard() {
  return (


    <Box mt={2}>

      {/* Cards */}
      <Grid container spacing={3}>
        {/* Line chart (Acme Plus) */}
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard01
            backgroundColor={'#FFCB5B'}
            borderColor={'#FFFFFF'}
            title='Sales of the Year'
            increment='+5.0%'
            amount='$18000'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard01
            backgroundColor={'#FFFFFF'}
            borderColor={'#3B9CAD'}
            title='Sales of the Year'
            increment='+5.0%'
            amount='$18000'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard01
            backgroundColor={'#FFFFFF'}
            borderColor={'#F76A63'}
            title='Sales of the Year'
            increment='+5.0%'
            amount='$18000'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <DashboardCard01
            backgroundColor={'#FFFFFF'}
            borderColor={'#07CCD2'}
            title='Sales of the Year'
            increment='+5.0%'
            amount='$18000'
          />
        </Grid>
        <Grid item xs={12} md={7} >
          <DashboardCard05
            title={'Income and Expenses'}
            amount={'5.987,37'}
            borderColor={[
              '#3B9CAD',
              '#FFCB5B',
              '#F76A63'
            ]}
          />
        </Grid>
        <Grid item xs={12} md={5} >
          <DashboardCard02
            title={'Current Users '}
            amount={'5.987,34'}
            backgroundColor={'#FFFFFF'}
            borderColor={'#FFCB5B'}
          />
        </Grid>
        <Grid item xs={12} lg={5} >
          <DashboardCard04
            title={'Current Users'}
            amount={'5.987,34'}
            backgroundColor={'#FFFFFF'}
            borderColor={'#FFCB5B'}
          />
        </Grid>
        <Grid item xs={12} lg={7} >
          <DashboardCard03
            title={'Employee info'}
            backgroundColor={'#FFFFFF'}
            borderColor={'#52C5B6'}
          />
        </Grid>
      </Grid>

    </Box>

  );
}

export default Dashboard;