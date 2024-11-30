import instanceApi from "./instanceApi";

//Contacts
export const createNewContact = async (body) => {
  const res = await instanceApi.post('Leads/CreateContact', body);
  return res;
};
export const createBulkContact = async (body) => {
  const res = await instanceApi.post('Leads/CreateContacts', body);
  return res.data;
};
export const updateContact = async (body) => {
  const res = await instanceApi.post('Leads/UpdateContact', body);
  return res.data;
};
export const getAllContacts = async () => {
  const res = await instanceApi.get('Leads/Contacts');
  return res?.data;
};
export const removeContactById = async (contactId) => {
  const res = await instanceApi.get(`/Leads/DeleteContact/${contactId}`);
  return res?.data;
};
export const getContactById = async (id) => {
  const res = await instanceApi.get(`ListItems/GetContactDetailsById/${id}`);
  return res?.data;
};

//Leads
export const createNewLead = async (body) => {
  const res = await instanceApi.post('Leads/CreateNewLead', body);
  return res?.data;
};
export const updateLead = async (body) => {
  const res = await instanceApi.post('Leads/UpdateLead', body);
  return res;
};
export const getAllLeads = async () => {
  const res = await instanceApi.get('Leads/Leads');
  return res?.data;
};
export const getLeadById = async (id) => {
  const res = await instanceApi.get(`Leads/LeadById/${id}`);
  return res?.data;
};

//Quotes
export const createQuote = async (body) => {
  const res = await instanceApi.post('Quotes/CreateQuote', body);
  return res?.data;
}
export const updateQuote = async (body) => {
  const res = await instanceApi.post('Quotes/UpdateQuote', body);
  return res?.data;
};
export const updateQuoteStatus = async (body) => {
  const payload = {
    quoteID: body?.quoteID,
    quoteStatusId: body?.quoteStatusId,
  };

  const res = await instanceApi.post('Quotes/UpdateQuoteStatus', payload);
  return res?.data;
};
export const getAllQuotes = async () => {
  const res = await instanceApi.get('Quotes/Quotes');
  return res?.data;
};
export const getQuoteById = async (id) => {
  const res = await instanceApi.get(`Quotes/GetQuoteDetailsById/${id}`);
  return res?.data;
};

//Deals
export const createDeal = async (body) => {
  const res = await instanceApi.post('Leads/CreateDeal', body);
  return res?.data;
};
export const getAllDeals = async () => {
  const res = await instanceApi.get('Leads/GetDeals');
  return res?.data;
};
export const updateDeals = async (body) => {
  const res = await instanceApi.post('Leads/UpdateDeals', body);
  return res;
};

//supplier
export const getAllSuppliers = async () => {
  const res = await instanceApi.get('InventoryManagement/GetAllSuppliers');
  return res?.data;
};
export const getSupplierById = async (id) => {
  const res = await instanceApi.get(`InventoryManagement/GetSupplierById?supplierID=${id}`);
  return res?.data;
};
export const createSupplier = async (body) => {
  const res = await instanceApi.post('InventoryManagement/CreateSupplier', body);
  return res;
};
export const updateSupplier = async (body) => {
  const res = await instanceApi.post('InventoryManagement/UpdateSupplier', body);
  return res;
};

//Vendors
export const getAllVendorList = async () => {
  const res = await instanceApi.get('InventoryManagement/GetAllVendorList');
  return res?.data;
};
export const createVendor = async (body) => {
  const res = await instanceApi.post('InventoryManagement/CreateVendor', body);
  return res;
};
export const updateVendor = async (body) => {
  const res = await instanceApi.post('InventoryManagement/UpdateVendor', body);
  return res?.data;
};