import React from "react";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "api/profileApis";
import customersColumn from "../componenets/tableColumns/customerColumn";
import CustomerForm from "../componenets/forms/CustomerForm";
import ProfileTable from "../componenets/ProfileTable";
const Customers = () => (
  <>
    <ProfileTable
      getApi={getCustomer}
      createApi={createCustomer}
      updateApi={updateCustomer}
      deleteApi={deleteCustomer}
      updateReplaceObjectKey='customerId'
      labelObjectKey='customerName'
      columns={customersColumn}
      CreateForm={CustomerForm}
      title='Customers'
      buttonLabel='Customers'
      filterSelectorEnum={[
        {
          name: "global",
          label: "Search Customers..",
          placeholder: "Customers",
        }
      ]}
      onlyGlobalFilter
      dialogSize='md'
      replaceCreateProperties={(data = {}) => ({
        ...data,
        created: new Date(),
        lastUpdated: new Date(),
      })}
      replaceUpdateProperties={(data = {}) => {
        return ({
          ...data,
          lastUpdated: new Date(),
        });
      }}
    />
  </>
);
export default Customers;