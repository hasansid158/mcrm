import React from 'react';

import OrderAssetAttach from '../OrderAssetAttach';

import { addAssetsToDO, removeAssetsFromDO } from 'api/orderApis';

const DOAssetsTab = ({
  formData = {},
  isUpdate = false,
}) => {
  return (
    <OrderAssetAttach
      addAssetsToApi={addAssetsToDO}
      removeAssetsFromApi={removeAssetsFromDO}
      isUpdate={isUpdate}
      selectedOrderId={formData?.getValues('dispatchId')}
      idKey = 'dispatchId'
      formData={formData}
      assetIdsKey='assetIds'
    />
  );
}

export default DOAssetsTab;
