import React, { useState, useEffect } from 'react'

import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';

//icons
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import WysiwygRoundedIcon from '@mui/icons-material/WysiwygRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import EditNotificationsRoundedIcon from '@mui/icons-material/EditNotificationsRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import DeviceUnknownRoundedIcon from '@mui/icons-material/DeviceUnknownRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import ScreenshotMonitorRoundedIcon from '@mui/icons-material/ScreenshotMonitorRounded';
import SdCardRoundedIcon from '@mui/icons-material/SdCardRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import AlignHorizontalCenterRoundedIcon from '@mui/icons-material/AlignHorizontalCenterRounded';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import AutoModeRoundedIcon from '@mui/icons-material/AutoModeRounded';
import RuleFolderRoundedIcon from '@mui/icons-material/RuleFolderRounded';

//pages
import Overview from 'pages/userProfile/overview/Overview';
import Notification from 'pages/userProfile/Notification';
import Connections from 'pages/userProfile/Connections';
import Security from 'pages/userProfile/Security';
import Billing from 'pages/userProfile/Billing';
import Statuses from 'pages/userProfile/Statuses';
import UserPermissions from 'pages/userProfile/UserPermissions';
import Warehouse from 'pages/userProfile/Warehouse';
import TestConditions from 'pages/userProfile/TestConditions';
import ItemTypes from 'pages/userProfile/ItemTypes';
import Sku from 'pages/userProfile/Sku';
import ServiceTypes from 'pages/userProfile/ServiceTypes';
import Colors from 'pages/userProfile/Colors';
import OperatingSystem from 'pages/userProfile/OperatingSystem';
import ScreenTypes from 'pages/userProfile/ScreenTypes';
import HDDsMemory from 'pages/userProfile/HDDsMemory';
import Processor from 'pages/userProfile/Processor';

import Box from '@mui/material/Box';

const ProfileSection = () => {
  const [tabMainHeaders, setTabMainHeaders] = useState([]);
  const [subTabHeaders, setSubTabHeaders] = useState([]);

  const [subTabContent, setSubTabContent] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState('');


  const [tabMainValue, setTabMainValue] = useState(0);
  const [tabSubValue, setTabSubValue] = useState(0);

  useEffect(() => {
    setTabMainHeaders(
      [
        <><ManageAccountsRoundedIcon/>General Administration</>,
        <><PeopleAltRoundedIcon/>Users</>,
        <><InventoryRoundedIcon/>Assets and Inventory</>,
        <><WarehouseRoundedIcon/>Warehouse & Logistics</>,
        <><AssuredWorkloadRoundedIcon/>Compliance and Quality Control</>,
        <><GradingRoundedIcon/>Process and Documents</>,
      ]
    );

    setSubTabContent([
      [
        {header: <><WysiwygRoundedIcon />Overview</>, component: <Overview />},
        {header: <><EditNotificationsRoundedIcon />Notifications</>, component: <Notification />},
        {header: <><CreditCardRoundedIcon />Billing & Plan</>, component: <Billing />},
        {header: <><SecurityRoundedIcon />Security</>, component: <Security />},
      ],
      [
        {header: <><BadgeRoundedIcon />User Roles and Permissions</>, component: <UserPermissions />},
        {header: <><IntegrationInstructionsRoundedIcon />Third-Party Integrations</>, component: <Connections />},
      ],
      [
        {header: <><HandymanRoundedIcon />Test Conditions</>, component: <TestConditions />},
        {header: <><DeviceUnknownRoundedIcon />Item Types</>, component: <ItemTypes />},
        {header: <><ListAltRoundedIcon />All Statuses</>, component: <Statuses />},
        {header: <><DevicesOtherRoundedIcon />Makes/Models</>, component: <ItemTypes />},
        {header: <><MemoryRoundedIcon />CPUs/CPUSpeeds/Processors</>, component: <Processor />},
        {header: <><ScreenshotMonitorRoundedIcon />ScreenTypes</>, component: <ScreenTypes />},
        {header: <><SdCardRoundedIcon />HDDs/Memory</>, component: <HDDsMemory />},
        {header: <><TerminalRoundedIcon />Operating Systems</>, component: <OperatingSystem />},
        {header: <><ColorLensRoundedIcon />Colours</>, component: <Colors />},
        {header: <><ListAltRoundedIcon />Service Items</>, component: <ServiceTypes />},
        {header: <><ListAltRoundedIcon />SKUs</>, component: <Sku />},
      ],
      [
        {header: <><WarehouseRoundedIcon />Warehouses</>, component: <Warehouse />},
        {header: <><AssistantDirectionRoundedIcon />Zones</>, component: <Warehouse />},
        {header: <><MyLocationRoundedIcon />Locations</>, component: <Warehouse />},
        {header: <><AlignHorizontalCenterRoundedIcon />Aisles</>, component: <Warehouse />},
        {header: <><AllInboxRoundedIcon />Bins</>, component: <Warehouse />},
        {header: <><Inventory2RoundedIcon />Container</>, component: <Warehouse />},
        {header: <><AllInboxRoundedIcon />Pallets</>, component: <Warehouse />},
        {header: <><LocalShippingRoundedIcon />Shipping Methods</>, component: <Warehouse />},
      ],
      [
        {header: <><BookRoundedIcon />Audit Logs and Compliance Monitoring</>, component: 'Audit Logs and Compliance Monitoring'},
        {header: <><DisplaySettingsRoundedIcon />Asset Grading and Valuation</>, component: <TestConditions />},
        {header: <><HandshakeRoundedIcon />Service Level Agreements (SLAs)</>, component: 'Service Level Agreements (SLAs)'},
        {header: <><CloudSyncRoundedIcon />Backup and Recovery Settings</>, component: 'Backup and Recovery Settings'},
      ],
      [
        {header: <><AutoModeRoundedIcon />Workflow Automation</>, component: 'Workflow Automation'},
        {header: <><RuleFolderRoundedIcon />Document Management</>, component: 'Document Management'},
      ]
    ])
  }, []);

  useEffect(() => {
    if (!subTabContent) return;
    setTabSubValue(0);

    setSubTabHeaders(subTabContent?.[tabMainValue]?.map(subTab => subTab?.header));
    setSelectedComponent(subTabContent?.[tabMainValue]?.[0]?.component);

  }, [tabMainValue, subTabContent]);


  return <>
    <Box mb={1} mt={1.5}>
      <TabsMenu
        tabValue={tabMainValue}
        setTabValue={setTabMainValue}
        tabHeaders={tabMainHeaders}
        // isSmall
      />
    </Box>

    <Box mb={2}>
      <TabsMenu
        tabValue={tabSubValue}
        setTabValue={value => {
          setTabSubValue(value);
          setSelectedComponent(subTabContent?.[tabMainValue]?.[value]?.component);
        }}
        tabHeaders={subTabHeaders}
        isSmall
        backgroundColor='secondary.main'
      />
    </Box>

    <Box>
      {selectedComponent}
    </Box>
  </>
}

export default ProfileSection
