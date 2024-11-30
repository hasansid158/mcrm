import { crmRoutes } from './routesEnum';
import { sideBarRoutes } from './routesEnum';

const actionBarEnum = [
  {
    label: 'Home',
    action: 'home',
    path: crmRoutes.HOME_PATH,
  },
  {
    label: 'CRM',
    action: '',
    path: crmRoutes.HOME_PATH,
    list: [
      // {
      //   label: 'Account',
      //   action: 'accounts',
      //   path: crmRoutes.ACCOUNTS_PATH,
      // },
      {
        label: 'Lead',
        action: 'leads',
        path: crmRoutes.LEADS_PATH,
      },
      {
        label: 'Contact',
        action: 'contacts',
        path: crmRoutes.CONTACTS_PATH,
      },
      {
        label: 'Vendors',
        action: 'vendors',
        path: crmRoutes.VENDORS_PATH,
      },
      {
        label: 'Suppliers',
        action: 'supplier',
        path: crmRoutes.SUPPLIERS_PATH,
      },
      {
        label: 'Quote',
        action: 'quotes',
        path: crmRoutes.QUOTES_PATH,
      },
      {
        label: 'Contracts',
        action: 'quotes',
        path: crmRoutes.QUOTES_PATH,
      },
      {
        label: 'Deal',
        action: 'deals',
        path: crmRoutes.DEALS_PATH,
      },
      // {
      //   label: 'Projects',
      //   action: 'projects',
      //   path: crmRoutes.PROJECTS_PATH,
      // },
    ],
  },
  {
    label: 'Interactions',
    action: '',
    path: crmRoutes.HOME_PATH,
    list: [
  {
    label: 'Tickets',
    action: 'tasks',
    path: crmRoutes.TASKS_PATH,
  },
  {
    label: 'Time Sheets',
    action: 'timeSheet',
    path: crmRoutes.TIME_SHEET_PATH,
  },
  // {
  //   label: 'Meeting',
  //   action: 'meetings',
  //   path: crmRoutes.MEETINGS_PATH,
  // },
  // {
  //   label: 'Call',
  //   action: 'calls',
  //   path: crmRoutes.CALLS_PATH,
  // },
  {
    label: 'Scheduler',
    action: 'calls',
    path: sideBarRoutes.CALENDAR_EVENTS_PATH,
  },
    ],
  },
  {
    label: 'Inventory',
    action: 'inventory',
    path: sideBarRoutes.INVENTORY_PATH,
    list: [
      {
        label: 'Assets',
        action: 'assets',
        path: crmRoutes.ASSETS_PATH,
      },
      {
        label: 'Accessories',
        action: 'inventory',
        path: sideBarRoutes.INVENTORY_PATH,
      },
      {
        label: 'Loads',
        action: 'loads',
        path: crmRoutes.LOADS_PATH,
      },
      {
        label: 'GRA',
        action: 'gra',
        path: crmRoutes.GRA_PATH,
      },
      {
        label: 'Products',
        action: 'products',
        path: crmRoutes.PRODUCTS_PATH,
      },
      //Accessories
    ],
  },
  {
    label: 'Orders',
    action: 'orders',
    path: sideBarRoutes.ORDERS_PATH,
    list: [
      {
        label: 'Work Orders',
        action: 'work_orders',
        path: crmRoutes.WORK_ORDERS_PATH,
      },
      {
        label: 'Sales Order',
        action: 'sales_orders',
        path: crmRoutes.SALES_ORDERS_PATH,
      },
      {
        label: 'Purchase Order',
        action: 'purchase_orders',
        path: crmRoutes.PURCHASE_ORDERS_PATH,
      },
      // {
      //   label: 'Payment Order',
      //   action: 'payment_orders',
      //   path: crmRoutes.PAYMENT_ORDERS_PATH,
      // },
      {
        label: 'Dispatch Orders',
        action: 'dispatch_orders',
        path: crmRoutes.DISPATCH_ORDERS_PATH,
      },
      {
        label: 'Invoices',
        action: 'invoices',
        path: crmRoutes.INVOICES_PATH,
      },
    ],
  },

  {
    label: 'Reports',
    action: '',
    path: crmRoutes.REPORTS_PATH,
    list: [
      {
        label: 'Filtered Reports',
        action: 'reports',
        path: crmRoutes.REPORTS_PATH,
      },
      {
        label: 'Custom Reports',
        action: 'analytics',
        path: crmRoutes.ANALYTICS_PATH,
      },
    ],
  },


];

export default actionBarEnum;