import instanceApi from './instanceApi';

import { isArray } from 'lodash';

//AUTH
export const loginApi = async (body) => {
  const res = await instanceApi.post('Login/Authenticate', body);
  return res;
};
export const signUpApi = async (body) => {
  const res = await instanceApi.post('Login/RegisterTrailUser', body);
  return res;
};
export const getUserDetails = async () => {
  const res = await instanceApi.get('Login/GetUserDetails');
  return res?.data;
};
export const UpdateUserDetail = async (body) => {
  const res = await instanceApi.post('Scheduler/CreateMeeting', body);
  return res;
};

//Console Administration
export const getAdminPermissions = async () => {
  const res = await instanceApi.get('ConsoleAdministration/GetPermissions');
  return res?.data;
};
export const getAdminUserRolePermissions = async () => {
  const res = await instanceApi.get(
    'ConsoleAdministration/GetUsersRolePermissions',
  );
  return res?.data;
};

//Projects
export const getAllProjects = async () => {
  const res = await instanceApi.get('Projects/ProjectList');
  return res?.data;
};
export const createNewProject = async (body) => {
  const res = await instanceApi.post('Projects/CreateProject', body);
  return res;
};

//Loads
export const getAllLoads = async () => {
  const res = await instanceApi.get('Loads/Loads');
  return res?.data;
};
export const createLoad = async (body) => {
  const res = await instanceApi.post('Loads/CreateLoad', body);
  return res;
};
export const getLoadById = async (loadId) => {
  const res = await instanceApi.get(
    `Loads/GetLoadDetailsById?LoadId=${loadId}`,
  );
  return res?.data;
};
export const removeLoadById = async (loadId) => {
  const res = await instanceApi.get(`Loads/RemoveLoad?LeadId=${loadId}`);
  return res?.data;
};
export const getGraByLoadId = async (loadId) => {
  const res = await instanceApi.get(`Loads/GetGRAsByLoadId/${loadId}`);
  return res?.data;
};

//Products
export const getAllProducts = async () => {
  const res = await instanceApi.get('Products/Products');
  return res?.data;
};
export const createProduct = async (body) => {
  const res = await instanceApi.post('Products/CreateProduct', body);
  return res;
};
export const updateProduct = async (body) => {
  const res = await instanceApi.put('Products/UpdateProduct', body);
  return res;
};

//Assets
export const getAllAssets = async () => {
  const res = await instanceApi.get('Asset/Assets');
  return res?.data;
};
export const getAssetDetails = async (id) => {
  const res = await instanceApi.get(`Asset/GetAssetDetails/${id}`);
  return res?.data;
};
export const createAsset = async (body) => {
  const res = await instanceApi.post('Asset/CreateAsset', body);
  return res;
};
export const updateAssets = async (body) => {
  const res = await instanceApi.post('Asset/UpdateAssets', body);
  return res;
};
export const createBulkAsset = async (body) => {
  const res = await instanceApi.post('Asset/CreateAssets', body);
  return res?.data;
};
export const assetImport = async (body) => {
  const res = await instanceApi.post('Asset/ImportAssets', body);
  return res?.data;
};
//Asset attach
export const attachAssetToLoad = async (body) => {
  const res = await instanceApi.post('Asset/AssignAssetsToLoad', body);
  return res;
};
//Asset Testing api
export const getAssetTestConditions = async (assetID) => {
  const res = await instanceApi.get(
    `AssetTesting/AssetTestConditions/${assetID}`,
  );
  return res?.data;
};
export const submitAssetTestConditions = async (body) => {
  const res = await instanceApi.post(
    'AssetTesting/SubmitAssetTestConditions',
    body,
  );
  return res;
};
export const submitBulkAssetTestConditions = async (body) => {
  const res = await instanceApi.post(
    'AssetTesting/SubmitBulkAssetTestConditions',
    body,
  );
  return res;
};
export const createTestConditions = async (body) => {
  const res = await instanceApi.post('AssetTesting/CreateTestConditions', body);
  return res?.data;
};
export const updateTestConditions = async (body) => {
  const res = await instanceApi.post('AssetTesting/UpdateTestConditions', body);
  return res?.data;
};
export const getTestConditionTypes = async () => {
  const res = await instanceApi.get('AssetTesting/TestConditionTypes');
  return res?.data;
};

//Asset recycling report
export const getAssetRecycleReport = async () => {
  const res = await instanceApi.get('Reports/AssetRecyclingReport');
  return res?.data;
};
//Asset Transfer
export const getAssetTransferLocations = async () => {
  const res = await instanceApi.get('Asset/TransferLocations');
  return res?.data;
};
export const submitAssetTransferLocation = async (body) => {
  const res = await instanceApi.post('Asset/TransferAssetsLocation', body);
  return res;
};

//Reorts
export const getGRAreport = async () => {
  const res = await instanceApi.get('Reports/AssetGRAReport');
  return res?.data;
};
export const getProcessedreport = async () => {
  const res = await instanceApi.get('Reports/AssetProcessedReport');
  return res?.data;
};
export const getStockOnHandReport = async () => {
  const res = await instanceApi.get('Reports/AssetStockOnHandReport');
  return res?.data;
};
export const getReceivedReport = async () => {
  const res = await instanceApi.get('Reports/AssetReceivedReport');
  return res?.data;
};
export const getReadyforsaleReport = async () => {
  const res = await instanceApi.get('Reports/AssetReadyForSaleReport');
  return res?.data;
};
export const getDispatchReport = async () => {
  const res = await instanceApi.get('Reports/AssetDispatchReport');
  return res?.data;
};

//GRA
export const submitGenerateGRA = async (body) => {
  const res = await instanceApi.post('Loads/GenerateGRA', body);
  return res?.data;
};
export const getGraList = async () => {
  const res = await instanceApi.get('Loads/GetGRAlist');
  return res?.data;
};

//Accounts
export const getAllAccounts = async () => {
  const res = await instanceApi.get('Leads/Accounts');
  return res?.data;
};
export const updateAccounts = async (body) => {
  const res = await instanceApi.put('Leads/UpdateAccount', body);
  return res;
};

//Tasks
export const getAllTasks = async () => {
  const res = await instanceApi.get('Scheduler/Tasks');
  return res?.data;
};
export const updateTasks = async (body) => {
  const res = await instanceApi.post('Scheduler/UpdateTask', body);
  return res;
};
export const createTask = async (body) => {
  const res = await instanceApi.post('Scheduler/CreateTask', body);
  return res;
};
export const removeTask = async (taskID) => {
  const res = await instanceApi.get(`Scheduler/RemoveTask?TaskId=${taskID}`);
  return res?.data;
};
export const getTaskDescriptionById = async (taskID) => {
  const res = await instanceApi.get(`/Scheduler/GetTaskDetailsById/${taskID}`);
  return res?.data;
};
export const updateTaskStatus = async (body) => {
  const res = await instanceApi.post('Scheduler/UpdateTaskStatus', body);
  return res;
};

//Blancoo
export const blancooSync = async (body) => {
  const res = await instanceApi.post('Asset/BlanccoAssetSync', body);
  return res;
};

//SubmitEnquiryRequest
export const submitEnquiryRequest = async (body) => {
  const res = await instanceApi.post('Users/SubmitEnquiryRequest', body);
  return res;
};

//home
export const getHomepageData = async () => {
  const res = await instanceApi.get('CRMDashBoard/CRMDashBoardData');
  return res?.data;
};

//invoices
export const getInvoiceOrderById = async (obj = null) => {
  if (!obj) return;

  const res = await instanceApi.get(
    `InvoiceOrder/InvoiceOrderById/${obj?.invoiceOrderID}`,
  );
  return res?.data;
};
