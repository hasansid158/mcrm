import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';

import SOInfoTab from './SOInfoTab';
import SOAssetsTab from './SOAssetsTab';
import SODocumentsTab from './SODocumentsTab';


const SalesOrderForm = ({
  formData,
  isUpdate,
}) => {
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (formData?.isSubmitting && !formData?.isValid && tabValue !== 0) {
      setTabValue(0);
    }
  }, [formData?.isSubmitting]);

  const tabSx = {
    position: 'absolute',
    visibility: 'hidden',
    top: 0,
    width: 0,
    overflow: 'hidden',
  };

  return (
    <Box px={1}>
      <Box mb={2}>
        <TabsMenu
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabHeaders={[ 'Sale Order Info', 'Assets', 'Documents' ]}
        />
      </Box>

      <Box
        sx={tabValue !== 0 ? tabSx : {}}
      >
        <SOInfoTab
          formData={formData}
          isUpdate={isUpdate}
        />
      </Box>

      <Box
        sx={tabValue !== 1 ? tabSx : {}}
      >
        <SOAssetsTab
          formData={formData}
          isUpdate={isUpdate}
        />
      </Box>

      <Box
        sx={tabValue !== 2 ? tabSx : {}}
      >
        <SODocumentsTab
          formData={formData}
          isUpdate={isUpdate}
        />
      </Box>
    </Box>
  );
}

export default SalesOrderForm;
