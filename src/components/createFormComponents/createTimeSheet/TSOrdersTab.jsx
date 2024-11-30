import React, { useState } from 'react';

import { Box } from '@mui/material';

import AssociatedOrderBox from '../AssociatedOrderBox';

import RichNoteField from 'common/input/RichNoteField';
import PriceBox from '../PriceBox';

const TSOrdersTab = ({
  formData,
  isUpdate,
}) => {
  const [serviceItemData, setServiceItemData] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState({});

  return <>
    <AssociatedOrderBox
      formData={formData}
      updateServiceItems={data => {
        setServiceItemData(data || []);
        // setEnableUpdate(true);
      }}
      // setServiceLoading = () => {},
      tableData={serviceItemData}
      setAmountObject={setCalculatedValues}
      isUpdate={isUpdate}
      noDiscount

      projectKey='projectId'
      quoteKey='quoteID'
      workOrderKey='workOrderID'
      taskKey='taskID'

      associatedOrdeListKey='_listAssociatedOrderDto'

      hideTableColumns={['unitPrice', 'totalAmount']}
    />

    <Box
      pt={3}
      pb={2}
    >
      <RichNoteField formData={formData} name='timeSheetComments' label='Comment'/>

    </Box>
  </>;
}

export default TSOrdersTab;
