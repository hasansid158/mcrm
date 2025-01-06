import React from 'react';

import { Grid } from '@mui/material';

import CustomImport from 'components/customImport/CustomImport';
import { assetImportFields } from 'components/customImport/importFields/assetImportFields';
import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

import LoadSelector from 'components/createFormComponents/dynamicSelectorFields/LoadSelector';
import WorkOrderListSelector from 'components/createFormComponents/dynamicSelectorFields/WorkOrderListSelector';

import { importAssets } from 'redux/slices/actionSlice/assetSlice';

export default function AssetsBulkImport({
  isOpen = false,
  setIsOpen = () => {},
}) {
  return (
    <CustomImport
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dispatchApi={importAssets}
      internalImportFields={assetImportFields}
      setMapFields={(formData) => (
        <Grid container spacing={2.5}>
          <CustomerProjectSelectors formData={formData} md={4} sm={4} xs={12} />
          <Grid item md={4} sm={4} xs={12}>
            <LoadSelector
              formData={formData}
              name="loadNo"
              label="Load"
              returnLabel
            />
          </Grid>
          <Grid item md={4} sm={4} xs={12}>
            <WorkOrderListSelector
              formData={formData}
              name="workOrderNo"
              label="Work Order"
              returnLabel
            />
          </Grid>
        </Grid>
      )}
    />
  );
}
