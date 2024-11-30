import {
    BusinessCenterOutlined,
    TimelineOutlined,
    ShoppingCartOutlined,
    CategoryOutlined,
    Groups3Outlined,
    CalendarMonthOutlined,
    EmailOutlined,
    GridViewOutlined,
    PeopleAltOutlined,
} from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

import { sideBarRoutes, crmRoutes } from './routesEnum';

const drawerListEnum = [
    {
        icon: <BusinessCenterOutlined />,
        text: 'Business Dashboard',
        path: sideBarRoutes.BUSINESS_DASHBOARD_PATH,
        matchPaths: [sideBarRoutes.BUSINESS_DASHBOARD_PATH]
    },
    {
        icon: <InsightsOutlinedIcon />,
        text: 'Analytics Dashboard',
        path: sideBarRoutes.ANALYTICS_DASHBOARD_PATH,
        matchPaths: [sideBarRoutes.ANALYTICS_DASHBOARD_PATH]
    },
    {
        icon: <ShoppingCartOutlined />,
        text: 'Orders',
        path: sideBarRoutes.ORDERS_PATH,
        matchPaths: [
            sideBarRoutes.ORDERS_PATH,
            crmRoutes.SALES_ORDERS_PATH,
            crmRoutes.PURCHASE_ORDERS_PATH,
            crmRoutes.PAYMENT_ORDERS_PATH,
            crmRoutes.DISPATCH_ORDERS_PATH,
            crmRoutes.WORK_ORDERS_PATH,
        ]
    },
    {
        icon: <CategoryOutlined />,
        text: 'Inventory',
        path: sideBarRoutes.INVENTORY_PATH,
        matchPaths: [
            sideBarRoutes.INVENTORY_PATH,
            crmRoutes.LOADS_PATH,
            crmRoutes.ASSETS_PATH,
            crmRoutes.GRA_PATH,
        ]
    },
    {
        icon: <Groups3Outlined />,
        text: 'Customers Relationship',
        path: crmRoutes.CRM_PATH,
        matchPaths: [crmRoutes.CRM_PATH?.substring(1)],
    },
    {
        icon: <CalendarMonthOutlined />,
        text: 'Scheduler',
        path: sideBarRoutes.CALENDAR_EVENTS_PATH,
        matchPaths: [sideBarRoutes.CALENDAR_EVENTS_PATH]
    },
    {
        icon: <SupportAgentRoundedIcon />,
        text: 'Tickets',
        path: crmRoutes.TASKS_PATH,
        matchPaths: [crmRoutes.TASKS_PATH],
    },
    {
        icon: <IntegrationInstructionsOutlinedIcon/>,
        text: 'Product Management',
        path: crmRoutes.PRODUCTS_PATH,
        matchPaths: [crmRoutes.PRODUCTS_PATH]
    },
    {
        icon: <AccountTreeOutlinedIcon/>,
        text: 'Projections',
        path: sideBarRoutes.CALENDAR_EVENTS_PATH,
        matchPaths: []
    },
    {
        icon: <InsertChartOutlinedIcon/>,
        text: 'Reports',
        path: crmRoutes.REPORTS_PATH,
        matchPaths: [
            crmRoutes.REPORTS_PATH,
        ]
    },
];

export default drawerListEnum;