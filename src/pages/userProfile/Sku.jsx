import React from "react";

import {
  getAllSkus,
  createSku,
  updateSku,
  deleteSku,
} from "api/profileApis";


import SkuForm from "./componenets/forms/SkuForm";
import { skuColumn } from "./componenets/tableColumns/skuColumn";
import ProfileTable from "./componenets/ProfileTable";

const Sku = () => (
  <>
    <ProfileTable
      getApi={getAllSkus}
      createApi={createSku}
      updateApi={updateSku}
      deleteApi={deleteSku}

      updateReplaceObjectKey='skuid'
      labelObjectKey='sku'

      columns={skuColumn}
      CreateForm={SkuForm}

      title='SKUs'
      buttonLabel='SKU'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search SKU..",
          placeholder: "SKU",
        }
      ]}
      onlyGlobalFilter

      dialogSize='sm'
    />
  </>
);

export default Sku;
