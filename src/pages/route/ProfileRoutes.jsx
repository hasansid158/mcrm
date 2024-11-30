import React from 'react';
import { Navigate } from 'react-router-dom';
import Overview from 'pages/components/userProfile/DetailsList/Overview';
import UserActivityTimeLine from 'pages/components/userProfile/DetailsList/UserActivityTimeLine';
import InvoiceList from 'pages/components/userProfile/DetailsList/InvoiceList';
import Notification from 'pages/components/userProfile/DetailsList/Notification';
import Connections from 'pages/components/userProfile/DetailsList/Connections';
import Security from 'pages/components/userProfile/DetailsList/Security';
import Billing from 'pages/components/userProfile/DetailsList/Billing';
import Statuses from 'pages/components/userProfile/DetailsList/Statuses';
import UserPermissions from 'pages/components/userProfile/DetailsList/UserPermissions';
import Warehouse from 'pages/components/userProfile/DetailsList/Warehouse';
import TestConditions from 'pages/components/userProfile/DetailsList/TestConditions';
import ItemTypes from 'pages/components/userProfile/DetailsList/ItemTypes';

import { useRoutes } from 'react-router-dom';

export const ProfileRoutes = () => useRoutes([
  { path: '/profile', element: <Navigate to="/profile/overview" /> },

  { path: '/profile/overview', element: <Overview /> },
  { path: '/profile/general/security', element: <Security /> },
  { path: '/profile/general/notifications', element: <Notification /> },
  { path: '/profile/general/billing', element: <Billing /> },

  { path: '/profile/users', element: <UserPermissions /> },
  { path: '/profile/users/integrations', element: <Connections /> },

  { path: '/profile/assets', element: <TestConditions /> },
  { path: '/profile/assets/test-conditions', element: <TestConditions /> },
  { path: '/profile/assets/item-types', element: <ItemTypes /> },
  { path: '/profile/assets/statuses', element: <Statuses /> },

  { path: '/profile/warehouse', element: <Warehouse /> },
  { path: '/profile/warehouse/zones', element: <Warehouse /> },
  { path: '/profile/warehouse/locations', element: <Warehouse /> },
  { path: '/profile/warehouse/aisles', element: <Warehouse /> },
  { path: '/profile/warehouse/bins', element: <Warehouse /> },
  { path: '/profile/warehouse/container', element: <Warehouse /> },
  { path: '/profile/warehouse/shipping-methods', element: <Warehouse /> },

  { path: '/profile/compliance', element: <TestConditions /> },
  { path: '/profile/compliance/audit-logs', element: 'Audit Logs and Compliance Monitoring' },
  { path: '/profile/compliance/asset-grading', element: <TestConditions /> },
  { path: '/profile/compliance/slas', element: 'Service Level Agreements (SLAs)' },
  { path: '/profile/compliance/backup-recovery', element: 'Backup and Recovery Settings' },

  { path: '/profile/process', element: 'Workflow Automation' },
  { path: '/profile/process/workflow-automation', element: 'Workflow Automation' },
  { path: '/profile/process/document-management', element: 'Document Management' },
]);