import React from "react";

import { warehouseTableColumns } from "./componenets/tableColumns/warehouseTableColumns";
import WarehouseForm from "./componenets/forms/WarehouseForm";

import {
  getAllWarehouse,
  createWarehouse,
  updateWarehouse,
} from "api/profileApis";

import ProfileTable from "./componenets/ProfileTable";

const Warehouse = () => (
  <ProfileTable
    getApi={getAllWarehouse}
    createApi={createWarehouse}
    updateApi={updateWarehouse}
    columns={warehouseTableColumns}

    title='Warehouses'
    buttonLabel='Warehouse'

    CreateForm={WarehouseForm}

    filterSelectorEnum={[
      {
        name: "global",
        label: "Search Warehouses",
        placeholder: "Search here...",
      }
    ]}
    onlyGlobalFilter

    dialogSize='sm'

    updateReplaceObjectKey='warehouseId'
  />
);

export default Warehouse;
