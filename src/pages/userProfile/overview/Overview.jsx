import React, { useState } from 'react';

import AccountDetail from './AccountDetail';
import Projects from './Projects';

import { Box, Tabs, Tab } from '@mui/material';
import Customers from './Customers';

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Account details" />
          <Tab label="Projects" />
          <Tab label="Customers" />
        </Tabs>
      </Box>

      {activeTab === 0 && <AccountDetail />}
      {activeTab === 1 && <Projects />}
      {activeTab === 2 && <Customers />}
    </>
  );
};

export default Overview;