import instanceApi from "./instanceApi";


export const getAssetStatus = async () => {
  const res = await instanceApi.get('ListItems/AssetStatus');
  return res?.data;
};

export const getAccountList = async () => {
  const res = await instanceApi.get('ListItems/AccountList');
  return res?.data;
};

export const getContactList = async () => {
  const res = await instanceApi.get('ListItems/ContactList');
  return res?.data;
};

export const getMakes = async () => {
  const res = await instanceApi.get('ListItems/Makes');
  return res?.data;
};

export const getModels = async ( makeIds = [] ) => {
  const res = await instanceApi.post(`ListItems/DeviceModels`, {listOfIds: makeIds});
  return res?.data;
};

export const getWarehouses = async () => {
  const res = await instanceApi.get('ListItems/Warehouses');
  return res?.data;
};

export const getInventories = async () => {
  const res = await instanceApi.get('ListItems/Inventories');
  return res?.data;
};

export const getColours = async () => {
  const res = await instanceApi.get('ListItems/Colours');
  return res?.data;
};

export const getCPUS = async () => {
  const res = await instanceApi.get('ListItems/CPUs');
  return res?.data;
};

export const getCPUSpeeds = async () => {
  const res = await instanceApi.get('ListItems/CPUSpeeds');
  return res?.data;
};

export const getHDDs = async () => {
  const res = await instanceApi.get('ListItems/HDDs');
  return res?.data;
};

export const getItemTypes= async () => {
  const res = await instanceApi.get('ListItems/ItemTypes');
  return res?.data;
};

export const getLocations = async () => {
  const res = await instanceApi.get('ListItems/Locations');
  return res?.data;
};

export const getLoadsList = async (projectIds = []) => {
  const res = await instanceApi.post(`Loads/ProjectLoads`, {listOfIds: projectIds});
  return res?.data;
};

export const getProductList = async () => {
  const res = await instanceApi.get('ListItems/ProductList');
  return res?.data;
};

export const getWorkOrderList = async () => {
  const res = await instanceApi.get('ListItems/WorkOrderList');
  return res?.data;
};

export const getCustomerDropDownList = async () => {
  const res = await instanceApi.get('Customers/CustomerDropDownList');
  return res?.data;
};

//Users
export const getUsers = async () => {
  const res = await instanceApi.get('Users');
  return res?.data;
};

export const getLeadStatusList = async () => {
  const res = await instanceApi.get('ListItems/LeadStatuses');
  return res?.data;
};

export const getQuoteStatusList = async () => {
  const res = await instanceApi.get('ListItems/QuoteStatuses');
  return res?.data;
};

export const getAllStatusList = async () => {
  const res = await instanceApi.get('ListItems/GetAllStatuses');
  return res?.data;
};

export const getTaskCategoryList = async () => {
  const res = await instanceApi.get('Scheduler/GetTaskCategories');
  return res?.data;
};

// sale order apis
export const getSaleOrderStatuses = async () => {
  const res = await instanceApi.get('SalesOrders/SaleOrderStatuses');
  return res?.data;
};
export const getSaleOrderTypes = async () => {
  const res = await instanceApi.get('SalesOrders/SaleOrderTypes');
  return res?.data;
};

export const getOrderAssociations = async (id) => {
  const res = await instanceApi.get(`/InvoiceOrder/GetInvoiceOrderAssociations/${id}`);
  return res?.data;
};

//ListTypes
export const getLeadsType = async () => {
  const res = await instanceApi.get('Leads/getLeadTypes');
  return res?.data;
};

//service lists
export const getITADServices = async () => {
  const res = await instanceApi.get('Quotes/ITADServices');
  return res?.data;
};
export const getWorkOrderServices = async () => {
  const res = await instanceApi.get('ListItems/WorkOrderServices');
  return res?.data;

  // const modifiedData = res?.data?.map(item => (
    //   {
      //     id: item?.serviceID,
      //     value: item?.serviceCategory,
      //     description: item?.serviceDescription,
  //   }
  // ))

  // return modifiedData;
};

export const getWorkOrderStatus = async () => {
  const res = await instanceApi.get('WorkOrder/WorkOrderStatuslist');
  return res?.data;
};

export const getSupplierList = async () => {
  const res = await instanceApi.get('InventoryManagement/SupplierList');
  return res?.data;
};
