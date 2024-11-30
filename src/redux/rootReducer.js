import { combineReducers } from "redux";

import calendarSlice from "./slices/calendarSlice";
import authSlice, { logout } from "./slices/authSlice";
import commonSlice from "./slices/commonSlice/commonSlice";
import leadsSlice from "./slices/actionSlice/leadsSlice";
import contactsSlice from "./slices/actionSlice/contactsSlice";
import accountsSlice from "./slices/actionSlice/accountsSlice";
import productsSlice from "./slices/actionSlice/productsSlice";
import orderSlice from "./slices/actionSlice/orderSlice";
import taskSlice from "./slices/actionSlice/taskSlice";
import LoadsSlice from "./slices/actionSlice/LoadsSlice";
import supplierSlice from "./slices/actionSlice/supplierSlice";
import projectsSlice from "./slices/actionSlice/projectsSlice";

import meetingSlice from "./slices/actionSlice/interactionsSlice/meetingSlice";
import callSlice from "./slices/actionSlice/interactionsSlice/callSlice";
import timeSheetSlice from "./slices/actionSlice/interactionsSlice/timeSheetSlice";

import assetSlice from "./slices/actionSlice/assetSlice";
import assetRecycleReportSlice from "./slices/actionSlice/assetRecycleReportSlice";
import graListSlice from "./slices/detailSlice/graListSlice";
import listSlice from "./slices/listSlice/listSlice";
import vendorsSlice from "./slices/actionSlice/vendorsSlice";
import quotesSlice from "./slices/actionSlice/quotesSlice";
import dealsSlice from "./slices/actionSlice/dealsSlice";
import homeSlice from "./slices/actionSlice/homeSlice";
import userDetailsSlice from "./slices/userSlice/userDetailsSlice";
import adminPermissionsSlice from "./slices/consoleAdministration/permissionSlice";
import adminUserRolePermissionsSlice from "./slices/consoleAdministration/userRolePermissions";

// Combine all slices
const appReducer = combineReducers({
  common: commonSlice,
  userDetails: userDetailsSlice,
  adminPermissions: adminPermissionsSlice,
  adminUserRolePermissions: adminUserRolePermissionsSlice,
  auth: authSlice,
  actions: combineReducers({
    leads: leadsSlice,
    contacts: contactsSlice,
    accounts: accountsSlice,
    products: productsSlice,
    assets: assetSlice,
    assetRecycleReport: assetRecycleReportSlice,
    graList: graListSlice,
    orders: orderSlice,
    vendors: vendorsSlice,
    quotes: quotesSlice,
    deals: dealsSlice,
    tasks: taskSlice,
    loads: LoadsSlice,
    home: homeSlice,
    supplier: supplierSlice,
    projects: projectsSlice,
  }),
  interactions: combineReducers({
    timeSheets: timeSheetSlice,
    meetings: meetingSlice,
    calls: callSlice,
  }),
  lists: listSlice,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    // Reset all state on logout
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
