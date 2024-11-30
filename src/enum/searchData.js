import { crmRoutes } from './routesEnum';
import { sideBarRoutes } from './routesEnum';
import { otherRoutes } from './routesEnum';

export const searchData = [
  // CRM Routes
  {
    path: crmRoutes.DASHBOARD,
    label: 'Dashboard',
    description: 'View your dashboard',
  },
  {
    path: crmRoutes.CRM_PATH,
    label: 'CRM',
    description: 'Customer Relationship Management',
  },
  {
    path: crmRoutes.HOME_PATH,
    label: 'Home',
    description: 'Return to the homepage',
  },
  {
    path: crmRoutes.LEADS_PATH,
    label: 'Leads',
    description: 'Manage your leads',
  },
  {
    path: crmRoutes.LOADS_PATH,
    label: 'Loads',
    description: 'Manage your loads',
  },
  {
    path: crmRoutes.GRA_PATH,
    label: 'GRA',
    description: 'Manage GRA processes',
  },
  {
    path: crmRoutes.CONTACTS_PATH,
    label: 'Contacts',
    description: 'Manage your contacts',
  },
  {
    path: crmRoutes.ACCOUNTS_PATH,
    label: 'Accounts',
    description: 'Manage your accounts',
  },
  {
    path: crmRoutes.USER_PROFILE_PATH,
    label: 'User Profile',
    description: 'View and edit your profile',
  },
  {
    path: crmRoutes.DEALS_PATH,
    label: 'Deals',
    description: 'Manage your deals',
  },
  {
    path: crmRoutes.TASKS_PATH,
    label: 'Tasks',
    description: 'Manage your tasks',
  },
  {
    path: crmRoutes.MEETINGS_PATH,
    label: 'Meetings',
    description: 'Schedule and manage meetings',
  },
  {
    path: crmRoutes.CALLS_PATH,
    label: 'Calls',
    description: 'Log and manage calls',
  },
  {
    path: crmRoutes.REPORTS_PATH,
    label: 'Reports',
    description: 'Generate and view reports',
  },
  {
    path: crmRoutes.ANALYTICS_PATH,
    label: 'Analytics',
    description: 'Analyze your data',
  },
  {
    path: crmRoutes.PRODUCTS_PATH,
    label: 'Products',
    description: 'Manage your products',
  },
  {
    path: crmRoutes.ASSETS_PATH,
    label: 'Assets',
    description: 'Manage your assets',
  },
  {
    path: crmRoutes.QUOTES_PATH,
    label: 'Quotes',
    description: 'Generate and manage quotes',
  },
  {
    path: crmRoutes.SALES_ORDERS_PATH,
    label: 'Sales Orders',
    description: 'Manage sales orders',
  },
  {
    path: crmRoutes.PURCHASE_ORDERS_PATH,
    label: 'Purchase Orders',
    description: 'Manage purchase orders',
  },
  {
    path: crmRoutes.PAYMENT_ORDERS_PATH,
    label: 'Payment Orders',
    description: 'Manage payment orders',
  },
  {
    path: crmRoutes.DISPATCH_ORDERS_PATH,
    label: 'Dispatch Orders',
    description: 'Manage dispatch orders',
  },
  {
    path: crmRoutes.WORK_ORDERS_PATH,
    label: 'Work Orders',
    description: 'Manage work orders',
  },
  {
    path: crmRoutes.INVOICES_PATH,
    label: 'Invoices',
    description: 'Manage your invoices',
  },
  {
    path: crmRoutes.VENDORS_PATH,
    label: 'Vendors',
    description: 'Manage your vendors',
  },
  {
    path: crmRoutes.SUPPLIERS_PATH,
    label: 'Suppliers',
    description: 'Manage your suppliers',
  },
  // {
  //   path: crmRoutes.PROJECTS_PATH,
  //   label: 'Projects',
  //   description: 'Manage your projects',
  // },

  // Sidebar Routes
  {
    path: sideBarRoutes.BUSINESS_DASHBOARD_PATH,
    label: 'Business Dashboard',
    description: 'Access business analytics',
  },
  {
    path: sideBarRoutes.ANALYTICS_DASHBOARD_PATH,
    label: 'Analytics Dashboard',
    description: 'View and analyze data',
  },
  {
    path: sideBarRoutes.ORDERS_PATH,
    label: 'Orders',
    description: 'Manage your orders',
  },
  {
    path: sideBarRoutes.INVENTORY_PATH,
    label: 'Inventory',
    description: 'Manage your inventory',
  },
  {
    path: sideBarRoutes.CUSTOMERS_PATH,
    label: 'Customers',
    description: 'Manage your customers',
  },
  {
    path: sideBarRoutes.CALENDAR_EVENTS_PATH,
    label: 'Calendar Events',
    description: 'Manage calendar events',
  },

  // Other Routes
  {
    path: otherRoutes.LOGIN,
    label: 'Login',
    description: 'Log in to your account',
  },
  {
    path: otherRoutes.SIGNUP,
    label: 'Sign Up',
    description: 'Create a new account',
  },
  {
    path: otherRoutes.ABOUT_US,
    label: 'About Us',
    description: 'Learn more about us',
  },
  {
    path: otherRoutes.PRIVACY_POLICY,
    label: 'Privacy Policy',
    description: 'Read our privacy policy',
  },
  {
    path: otherRoutes.TERMS,
    label: 'Terms',
    description: 'View our terms of service',
  },
  {
    path: otherRoutes.PRODUCT_PAGE,
    label: 'Product Page',
    description: 'Explore our products',
  },
  {
    path: otherRoutes.PRICING_PAGE,
    label: 'Pricing Page',
    description: 'View our pricing plans',
  },
  {
    path: otherRoutes.PLATFORM_PAGE,
    label: 'Platform Page',
    description: 'Learn about our platform',
  },
  {
    path: otherRoutes.PARTNERS_PAGE,
    label: 'Partners Page',
    description: 'Explore partnership opportunities',
  },
  {
    path: otherRoutes.RESOURCES_PAGE,
    label: 'Resources Page',
    description: 'Access resources',
  },
  {
    path: otherRoutes.COMPANY_PAGE,
    label: 'Company Page',
    description: 'Learn about our company',
  },
  {
    path: otherRoutes.LANDING_PAGE,
    label: 'Landing Page',
    description: 'Return to the landing page',
  },
  {
    path: otherRoutes.CONTACT_US_PAGE,
    label: 'Contact Us Page',
    description: 'Get in touch with us',
  },
];