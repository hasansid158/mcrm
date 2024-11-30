
import LeadsForm from "components/createFormComponents/createForms/forms/LeadsForm";
import ContactsForm from "components/createFormComponents/createForms/forms/ContactsForm";
import ProductForm from "components/createFormComponents/createForms/forms/productForm/ProductForm";
import AccountForm from "components/createFormComponents/createForms/forms/AccountForm";
import DealForm from "components/createFormComponents/createForms/forms/DealForm";
import PaymentOrderForm from "components/createFormComponents/createForms/forms/PaymentOrderForm";
import AssetsForm from "components/createFormComponents/createForms/forms/AssetsForm";
// import SalesOrderForm from "components/createFormComponents/createForms/forms/SalesOrderForm";
import SalesOrderForm from "components/createFormComponents/createSalesOrder/SalesOrderForm";
import PurchaseOrderForm from "components/createFormComponents/createPurchaseOrder/PurchaseOrderForm";
import DispatchOrderForm from "components/createFormComponents/createDispatchOrder/DispatchOrderForm";
import VendorsForm from "components/createFormComponents/createForms/forms/VendorsForm";
import SupplierForm from "components/createFormComponents/createForms/forms/SupplierForm";
import ProjectForm from "components/createFormComponents/createForms/forms/ProjectForm";
import TaskForm from "components/createFormComponents/createForms/forms/TaskForm";
import QuoteCreator from "components/createFormComponents/createQuote/QuoteCreator";
import InvoiceCreator from "components/createFormComponents/createInvoice/InvoiceCreator";
import LoadsForm from "components/createFormComponents/createForms/forms/LoadsForm";
import GraForm from "components/createFormComponents/createForms/forms/GraForm";

import TimeSheetForm from "components/createFormComponents/createTimeSheet/TimeSheetForm";

import { addLead, updateLeadValue } from "redux/slices/actionSlice/leadsSlice";
import { addLoad } from "redux/slices/actionSlice/LoadsSlice";
import { addProduct } from "redux/slices/actionSlice/productsSlice";
import {
  addAsset,
  updateAssetValue,
  addBulkAssets,
} from "redux/slices/actionSlice/assetSlice";
import { addVendor, updateVendorValue } from "redux/slices/actionSlice/vendorsSlice";
import { addSupplier, updateSupplierValue } from "redux/slices/actionSlice/supplierSlice";
import { addProject } from "redux/slices/actionSlice/projectsSlice";
import { addTask } from "redux/slices/actionSlice/taskSlice";
import {
  addDispatchOrder,
  addWorkOrder,
  // addPaymentOrder,
  addPurchaseOrder,
  addSalesOrder,
  addInvoice,

  updateDispatchValue,
  updateSalesValue,
  updatePurchaseValue,
  updateInvoiceValue,
} from "redux/slices/actionSlice/orderSlice";
import { addNewContact , addBulkContacts, updateContactsValue } from "redux/slices/actionSlice/contactsSlice";
import {
  addDeal,
  updateDealsValue,
} from "redux/slices/actionSlice/dealsSlice";

import { addTimeSheet, updateTimeSheetValue } from "redux/slices/actionSlice/interactionsSlice/timeSheetSlice";

const formComponentsEnum = (formProps) => ({
  leads: {
    createForm: <LeadsForm {...formProps} />,
    createApi: addLead,
    updateApi: () => {},
  },
  loads: {
    createForm: <LoadsForm {...formProps} />,
    createApi: addLoad,
    updateApi: () => {},
  },
  contacts: {
    createForm: <ContactsForm {...formProps} />,
    createApi: addNewContact,
    createBulkApi: addBulkContacts,
    updateApi: updateContactsValue,
  },
  accounts: {
    createForm: <AccountForm {...formProps} />,
    updateApi: () => {},
    // createApi: () => dispatch(createLead(formData.getValues())),
  },
  deals: {
    createForm: <DealForm {...formProps} />,
    createApi: addDeal,
    updateApi: updateDealsValue,
  },
  products: {
    createForm: <ProductForm {...formProps} />,
    createApi: addProduct,
    updateApi: () => {},
  },
  assets: {
    createForm: <AssetsForm {...formProps} />,
    createApi: addAsset,
    createBulkApi: addBulkAssets,
    updateApi: updateAssetValue,
  },
  tasks: {
    createForm: <TaskForm {...formProps} />,
    createApi: addTask,
    updateApi: () => {},
  },
  calls: "",
  reports: "",
  analytics: "",
  quotes: {
    createForm: <QuoteCreator {...formProps} />,
    updateApi: () => {},
    // createApi: addSalesOrder,
  },
  sales_orders: {
    createForm: <SalesOrderForm {...formProps} />,
    createApi: addSalesOrder,
    updateApi: updateSalesValue,
  },
  // payment_orders: {
  //   createForm: <PaymentOrderForm {...formProps} />,
  //   createApi: addPaymentOrder,
  //   updateApi: () => {},
  // },
  purchase_orders: {
    createForm: <PurchaseOrderForm {...formProps} />,
    createApi: addPurchaseOrder,
    updateApi: updatePurchaseValue,
  },
  // work_orders: {
  //   createForm: <WOInfo {...formProps} />,
  //   createApi: addWorkOrder,
  //   updateApi: () => {},
  // },
  dispatch_orders: {
    createForm: <DispatchOrderForm {...formProps} />,
    createApi: addDispatchOrder,
    updateApi: updateDispatchValue,
  },
  vendors: {
    createForm: <VendorsForm {...formProps} />,
    createApi: addVendor,
    updateApi: updateVendorValue,
  },
  supplier: {
    createForm: <SupplierForm {...formProps} />,
    createApi: addSupplier,
    updateApi: updateSupplierValue,
  },
  // projects: {
  //   createForm: <ProjectForm {...formProps} />,
  //   createApi: addProject,
  //   updateApi: () => {},
  // },
  invoices: {
    createForm: <InvoiceCreator {...formProps} />,
    updateApi: updateInvoiceValue,
    createApi: addInvoice,
  },
  gras: {
    createForm: <GraForm {...formProps}/>,
    updateApi: () => {},
    createApi: () => {},
  },
  time_sheets: {
    createForm: <TimeSheetForm {...formProps}/>,
    updateApi: updateTimeSheetValue,
    createApi: addTimeSheet,
  },
});

export default formComponentsEnum;