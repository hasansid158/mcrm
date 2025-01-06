import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAdminPermissions } from 'redux/slices/consoleAdministration/permissionSlice';

import {
  fetchAssetStatus,
  fetchMakes,
  // fetchProjects,
  fetchWarehouses,
  fetchItemTypes,
  fetchLocations,
  fetchProductList,
  fetchAccountList,
  fetchContactList,
  fetchWorkOrderList,
  fetchITADServices,
  fetchCustomerDropDownList,
  fetchUserList,
  fetchLeadStatusList,
  fetchQuoteStatusList,
  fetchAllStatusList,
  // fetchAllServiceItems
} from 'redux/slices/listSlice/listSlice';

import { fetchUserDetails } from 'redux/slices/userSlice/userDetailsSlice';
import { fetchAdminUserRolePermissions } from 'redux/slices/consoleAdministration/userRolePermissions';

const ApiInitiator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch user details
    dispatch(fetchUserDetails());

    // console admin
    dispatch(fetchAdminPermissions());
    dispatch(fetchAdminUserRolePermissions());

    //fetch selector lists
    //Need to move this to be only called when we need instead of on load
    dispatch(fetchAssetStatus());
    dispatch(fetchMakes());
    // dispatch(fetchProjects());
    dispatch(fetchWarehouses());
    dispatch(fetchItemTypes());
    dispatch(fetchLocations());
    dispatch(fetchProductList());
    dispatch(fetchAccountList());
    dispatch(fetchContactList());
    dispatch(fetchWorkOrderList());
    dispatch(fetchITADServices());
    dispatch(fetchCustomerDropDownList());
    dispatch(fetchUserList());
    dispatch(fetchLeadStatusList());
    dispatch(fetchQuoteStatusList());
    dispatch(fetchAllStatusList());
    // dispatch(fetchAllServiceItems())
  }, []);
};

export default ApiInitiator;
