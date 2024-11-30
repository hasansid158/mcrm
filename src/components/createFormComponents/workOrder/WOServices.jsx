import React, { useEffect, useState } from 'react';

import ServicesCreator from 'components/serviceCreator/ServicesCreator';

import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkOrderServices } from 'redux/slices/listSlice/listSlice';

import ServiceItem from 'components/serviceCreator/ServiceItem';

import { isEmpty, keys } from 'lodash';

import TotalValueBox from 'components/serviceCreator/TotalValueBox';

import { Box } from '@mui/material';

const WOServices = ({
  serviceItems = [{component: ServiceItem, id: 0, data: {}}],
  setServiceItems = () => {},
  triggerValidation = () => {},
  calculatedValues = {},
  setCalculatedValues = () => {},
  formData = {},
}) => {
  const dispatch = useDispatch();
  const { workOrderServices } = useSelector(state => state?.lists);

  useEffect(() => {
    if (!isEmpty(workOrderServices)) return;

    dispatch(fetchWorkOrderServices());
  }, [workOrderServices]);

  return <>
    <ServicesCreator
      serviceItems={serviceItems}
      setServiceItems={setServiceItems}
      triggerValidation={triggerValidation}
      serviceList={workOrderServices}
      noDescription
    />
    <Box
      // display='flex'
      // justifyContent='start'
      px={2}
    >
      <TotalValueBox
        serviceItems={serviceItems}
        calculatedValues={calculatedValues}
        setCalculatedValues={setCalculatedValues}
        formData={formData}
      />
    </Box>
  </>;
}

export default WOServices;
