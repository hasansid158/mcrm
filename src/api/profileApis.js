import instanceApi from "./instanceApi";

//User
export const uploadUserImage = async (formData) => {
  const res = await instanceApi.post('Login/UploadUserImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const getProfileTestConditions = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAssteTestConditions');
  return res?.data;
};

export const deleteTestCondition = async (obj) => {
  const res = await instanceApi.get(`AssetTesting/DeleteTestConditions/${obj?.conditionID}`);
  return res?.data;
};

export const getProductTypes = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetProductTypes');
  return res?.data;
};

//Warehouse
export const getAllWarehouse = async () => {
  const res = await instanceApi.get('InventoryManagement/GetAllWarehouses');
  return res?.data;
};
export const createWarehouse = async (body) => {
  const res = await instanceApi.post('InventoryManagement/CreateWarehouse', body);
  return res?.data;
};
export const updateWarehouse = async (body) => {
  const res = await instanceApi.post('InventoryManagement/UpdateWarehouse', body);
  return res?.data;
};
//getWarehouseById is not required at this stage
// export const getWarehouseById = async (id) => {
//   try {
//     const response = await fetch(`InventoryManagement/GetWarehouseById?id=${id}`);
//     if (!response.ok) {
//       const error = await response.text();
//       console.error('Fetch error:', error);
//       throw new Error('Failed to fetch warehouse');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching warehouse by ID:', error);
//     throw error;
//   }
// };

//Users
export const getUsers = async () => {
  const res = await instanceApi.get('ConsoleAdministration/Users');
  return res?.data;
};
export const createUser = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateUser', body);
  return res?.data;
};
export const updateUser = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateUser', body);
  return res?.data;
};

//StatusApis
export const createStatus = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateStatus', body);
  return res?.data;
};
export const updateStatus = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateStatus', body);
  return res?.data;
};
export const getStatus = async () => {
  const res = await instanceApi.get('ListItems/GetAllStatuses');
  return res?.data;
};
export const deleteStasus = async (obj = {}) => {
  const {statusType, statusId} = obj;
  const res = await instanceApi.get(`ConsoleAdministration/DeleteStatus/${statusType}/${statusId}`);
  return res?.data;
};

//Customers Apis
export const createCustomer = async (body) => {
  const res = await instanceApi.post('Customers/CreateCustomer', body);
  return res?.data;
};
export const updateCustomer = async (body) => {
  const res = await instanceApi.post('Customers/UpdateCustomer', body);
  return res?.data;
};
export const getCustomer = async () => {
  const res = await instanceApi.get('Customers/Customers');
  return res?.data;
};
export const deleteCustomer = async (obj = {}) => {
  const {customerType, customerId} = obj;
  const res = await instanceApi.get(`Customers/RemoveCustomer/${customerType}/${customerId}`);
  return res?.data;
};

//Color Apis
export const createColors = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateColour', body);
  return res?.data;
};
export const updateColors = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateColour', body);
  return res?.data;
};
export const getColors = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllColours');
  return res?.data;
};
export const deleteColors = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteColour/${obj?.colourID}`);
  return res?.data;
};

//Operating System
export const createOperatingSystem = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateOperatingSystem', body);
  return res?.data;
};
export const updateOperatingSystem = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateOperatingSystem', body);
  return res?.data;
};
export const getAllOperatingSystem = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllOperatingSystems');
  return res?.data;
};
export const deleteOperatingSystem = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteOperatingSystem/${obj?.osid}`);
  return res?.data;
};

//Screen Types
export const createScreenType = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateScreenType', body);
  return res?.data;
};
export const updateScreenType = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateScreenType', body);
  return res?.data;
};
export const getAllScreenType = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllScreenTypes');
  return res?.data;
};
export const deleteScreenType = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteScreenType/${obj?.screenTypeID}`);
  return res?.data;
};

//Hdd
export const createHDD = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateHDDSize', body);
  return res?.data;
};
export const updateHDD = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateHDDSize', body);
  return res?.data;
};
export const getAllHDD = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllHDDSizes');
  return res?.data;
};
export const deleteHDD = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteScreenType/${obj?.hddSizeID}`);
  return res?.data;
};

//Memory
export const createMemory = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateMemory', body);
  return res?.data;
};
export const updateMemory = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateMemory', body);
  return res?.data;
};
export const getAllMemory = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllMemory');
  return res?.data;
};
export const deleteMemory = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteMemory/${obj?.memoryId}`);
  return res?.data;
};





//Service type apis
export const createServiceItems = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/AddServiceItem', body);
  return res?.data;
};
export const updateServiceItems = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateServiceItem', body);
  return res?.data;
};
export const getAllServiceItems = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllServiceItems');
  return res?.data;
};
export const deleteServiceItems = async (obj = {}) => {
  const {serviceType, serviceID} = obj;
  const res = await instanceApi.get(`ConsoleAdministration/deleteServiceItem/${serviceType}/${serviceID}`);
  return res?.data;
};

//Project apis
export const createProject = async (body) => {
  const res = await instanceApi.post('Projects/CreateProject', body);
  return res?.data;
};
// export const updateProject = async (body) => {
//   const res = await instanceApi.post('ConsoleAdministration/UpdateStatus', body);
//   return res?.data;
// };
export const getProjects = async () => {
  const res = await instanceApi.get('Projects/ProjectList');
  return res?.data;
};


//make/model/itemType
export const getAllModels = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllModels');
  return res?.data;
};
export const createModel = async (body) => {
  const res = await instanceApi.post('InventoryManagement/CreateModel', body);
  return res?.data;
};
export const createItemType = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateItemType', body);
  return res?.data;
};

//SKU
export const getAllSkus = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetSKUs');
  return res?.data;
};
export const createSku = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateSKU', body);
  return res?.data;
};
export const updateSku = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateSKU', body);
  return res?.data;
};
export const deleteSku = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteSKU/${obj?.skuid}`);
  return res?.data;
};

//Processor
export const getAllProcessor = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetAllProcessors');
  return res?.data;
};
export const createProcessor = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/CreateProcessor', body);
  return res?.data;
};
export const updateProcessor = async (body) => {
  const res = await instanceApi.post('ConsoleAdministration/UpdateProcessor', body);
  return res?.data;
};
export const deleteProcessor = async (obj) => {
  const res = await instanceApi.get(`ConsoleAdministration/DeleteMemory/${obj?.processorId}`);
  return res?.data;
};