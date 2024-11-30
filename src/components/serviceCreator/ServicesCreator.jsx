import React from 'react';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ServiceItem from './ServiceItem';

import _ from 'lodash';

const ServicesCreator = ({
  triggerValidation = 0,
  serviceItems = [{component: ServiceItem, id: 0, data: {}}],
  setServiceItems = () => {},
  setServiceErrors = () => {},
  serviceList = [],
  noDescription = false,
}) => {
  const handleRemoveItem = (id) => {
    // Remove corresponding item,data,error
    setServiceItems(prevItems => prevItems?.filter(item => item?.id !== id));
    setServiceErrors(prevErrors => prevErrors?.filter(item => item?.itemId !== id));
  }
  const handleAddItem = () => {
    const newId = serviceItems[serviceItems?.length - 1]?.id + 1 || 0;
    const newItem = {component: ServiceItem, id: newId};
    setServiceItems([...serviceItems, newItem]);
  }

  const updateServiceItemData = (data) => {
    setServiceItems(prevItems => {

      const existingItemIndex = prevItems?.findIndex(item => item?.id === data?.itemId);
      // Object exists, replace it
      if (existingItemIndex !== -1) {
        const updatedData = [...(prevItems || [])];
        updatedData[existingItemIndex].data = { ...data };
        return updatedData;
      }

      // Object doesn't exist, add a new one
      const updatedData = [...prevItems, { component: ServiceItem, id: data?.itemId, data }];
      return updatedData;
    });
  }

  const handleError = (errorData) => {
    setServiceErrors((prevErrors) => {
      const existingIndex = prevErrors?.findIndex((item) => item?.itemId === errorData?.itemId);
      // If the id doesn't exist and error is true, add it to the setItemErrors
      if (existingIndex === -1 && errorData?.error) {
        return [...(prevErrors || []), errorData];
      }
      // If the id exists and error is false, remove the object that matches the id
      if (existingIndex !== -1 && !errorData?.error) {
        const updatedErrors = [...(prevErrors || [])];
        updatedErrors?.splice(existingIndex, 1);
        return updatedErrors;
      }
      // Otherwise, return the existing errors as is
      return prevErrors;
    });
  };

  return (
    <Box
      sx={{
        // borderTop: theme => `1px dashed ${theme.palette.primary.main}`,
        // borderBottom: theme => `1px dashed ${theme.palette.primary.main}`,
        mb: 2,
      }}
    >
      {serviceItems?.map((item, key) => (
        <item.component
          key={item.id}
          itemId={item.id}
          handleRemove={() => handleRemoveItem(item.id)}
          triggerSubmit={triggerValidation}
          setServiceItemData={updateServiceItemData}
          itemError={handleError}
          preFillData={item?.data}
          serviceList={serviceList}
          noDescription={noDescription}
        />
      ))}

      <Box mt={2} textAlign='right'>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleAddItem}
          startIcon={<AddIcon/>}
        >
          Add Service Item
        </Button>
      </Box>
    </Box>
  );
}

export default ServicesCreator;
