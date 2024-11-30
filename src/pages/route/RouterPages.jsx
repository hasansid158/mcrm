import { useRoutes } from 'react-router-dom';
import { sideBarRoutes, crmRoutes, accountRoutes } from 'enum/routesEnum';
import React, { Suspense } from 'react';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

// Lazy-loaded pages
const Home = React.lazy(() => import('pages/Home'));
const Accounts = React.lazy(() => import('pages/Accounts'));

// CRM pages
const Leads = React.lazy(() => import('pages/actionPages/crm/Leads'));
const Contacts = React.lazy(() => import('pages/actionPages/crm/Contacts'));
const Deals = React.lazy(() => import('pages/actionPages/crm/Deals'));
const Quotes = React.lazy(() => import('pages/actionPages/crm/Quotes'));
const Vendors = React.lazy(() => import('pages/actionPages/crm/Vendors'));
const Supplier = React.lazy(() => import('pages/actionPages/crm/Supplier'));
// const Projects = React.lazy(() => import('pages/actionPages/crm/Projects'));
const ProfileSection = React.lazy(() => import('pages/account/ProfileSection'));

// Interactions pages
const Tasks = React.lazy(() => import('pages/interactions/Tasks'));
const CalendarEvents = React.lazy(() => import('pages/interactions/CalendarEvents'));
const TimeSheets = React.lazy(() => import('pages/interactions/TimeSheets'));

// Reports pages
const Reports = React.lazy(() => import('pages/actionPages/reports/Reports'));

// Inventory pages
const Assets = React.lazy(() => import('pages/actionPages/inventory/Assets'));
const Products = React.lazy(() => import('pages/actionPages/inventory/Products'));
const Loads = React.lazy(() => import('pages/actionPages/inventory/Loads'));
const Gra = React.lazy(() => import('pages/actionPages/inventory/Gra'));

// Order pages
const DispatchOrders = React.lazy(() => import('pages/actionPages/orders/DispatchOrders'));
const PaymentOrders = React.lazy(() => import('pages/actionPages/orders/PaymentOrders'));
const PurchaseOrders = React.lazy(() => import('pages/actionPages/orders/PurchaseOrders'));
const SalesOrders = React.lazy(() => import('pages/actionPages/orders/SalesOrders'));
const WorkOrders = React.lazy(() => import('pages/actionPages/orders/WorkOrders'));

// Invoice pages
const Invoices = React.lazy(() => import('pages/actionPages/invoice/Invoices'));

// Sidebar pages
const Analytics = React.lazy(() => import('pages/sidebarPages/Analytics'));
const AnalyticsDashboard = React.lazy(() => import('pages/sidebarPages/AnalyticsDashboard'));
const BusinessDashboard = React.lazy(() => import('pages/sidebarPages/BusinessDashboard'));
const Customers = React.lazy(() => import('pages/sidebarPages/Customers'));
const Orders = React.lazy(() => import('pages/sidebarPages/Orders'));
const Inventory = React.lazy(() => import('pages/actionPages/inventory/Inventory'));



const RouterPages = () => {
  return (
    <Suspense fallback={<SpinLoader loading noBlur/>}>
      {useRoutes([
        { path: `${crmRoutes.HOME_PATH}/:id?`, element: <Home /> },
        { path: `${crmRoutes.ACCOUNTS_PATH}/:id?`, element: <Accounts /> },

        // CRM pages
        { path: `${crmRoutes.LEADS_PATH}/:id?`, element: <Leads /> },
        { path: `${crmRoutes.CONTACTS_PATH}/:id?`, element: <Contacts /> },
        { path: `${crmRoutes.DEALS_PATH}/:id?`, element: <Deals /> },
        { path: `${crmRoutes.QUOTES_PATH}/:id?`, element: <Quotes /> },
        { path: `${crmRoutes.VENDORS_PATH}/:id?`, element: <Vendors /> },
        { path: `${crmRoutes.SUPPLIERS_PATH}/:id?`, element: <Supplier /> },
        // { path: `${crmRoutes.PROJECTS_PATH}/:id?`, element: <Projects /> },
        { path: `${crmRoutes.USER_PROFILE_PATH}/:id?`, element: <ProfileSection /> },

        // Interactions pages
        { path: `${crmRoutes.TASKS_PATH}/:id?`, element: <Tasks /> },
        { path: `${crmRoutes.TIME_SHEET_PATH}/:id?`, element: <TimeSheets /> },
        { path: `${sideBarRoutes.CALENDAR_EVENTS_PATH}/:id?`, element: <CalendarEvents /> },

        // Reports pages
        { path: `${crmRoutes.REPORTS_PATH}/:id?`, element: <Reports /> },

        // Sidebar pages
        { path: `${crmRoutes.ANALYTICS_PATH}/:id?`, element: <Analytics /> },
        { path: `${sideBarRoutes.ANALYTICS_DASHBOARD_PATH}/:id?`, element: <AnalyticsDashboard /> },
        { path: `${sideBarRoutes.BUSINESS_DASHBOARD_PATH}/:id?`, element: <BusinessDashboard /> },
        { path: `${sideBarRoutes.CUSTOMERS_PATH}/:id?`, element: <Customers /> },
        { path: `${sideBarRoutes.ORDERS_PATH}/:id?`, element: <Orders /> },
        { path: `${sideBarRoutes.INVENTORY_PATH}/:id?`, element: <Inventory /> },

        // Inventory pages
        { path: `${crmRoutes.ASSETS_PATH}/:id?`, element: <Assets /> },
        { path: `${crmRoutes.PRODUCTS_PATH}/:id?`, element: <Products /> },
        { path: `${crmRoutes.LOADS_PATH}/:id?`, element: <Loads /> },
        { path: `${crmRoutes.GRA_PATH}/:id?`, element: <Gra /> },

        // Order pages
        { path: `${crmRoutes.DISPATCH_ORDERS_PATH}/:id?`, element: <DispatchOrders /> },
        { path: `${crmRoutes.PAYMENT_ORDERS_PATH}/:id?`, element: <PaymentOrders /> },
        { path: `${crmRoutes.PURCHASE_ORDERS_PATH}/:id?`, element: <PurchaseOrders /> },
        { path: `${crmRoutes.SALES_ORDERS_PATH}/:id?`, element: <SalesOrders /> },
        { path: `${crmRoutes.WORK_ORDERS_PATH}/:id?`, element: <WorkOrders /> },

        // Invoice pages
        { path: `${crmRoutes.INVOICES_PATH}/:id?`, element: <Invoices /> },


        // 404 page
        { path: '/*', element: '404 Page Not Found' },
      ])}
    </Suspense>
  );
};

export default RouterPages;
