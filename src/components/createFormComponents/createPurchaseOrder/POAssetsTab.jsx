import React from 'react';

import OrderAssetAttach from '../OrderAssetAttach';

import { addAssetsToSalesOrder, removeAssetsFromSalesOrder } from 'api/orderApis';

const POAssetsTab = ({
  formData = {},
  isUpdate = false,
}) => {
  return (
    <OrderAssetAttach
      addAssetsToApi={addAssetsToSalesOrder}
      removeAssetsFromApi={removeAssetsFromSalesOrder}
      isUpdate={isUpdate}
      selectedOrderId={formData?.getValues('salesOrderID')}
      idKey = 'salesOrderId'
      formData={formData}
    />
  );
}

export default POAssetsTab;
