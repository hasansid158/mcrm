import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import InputField from 'common/input/InputField';

import DividerLine from 'common/ui/DividerLine';

import { toCurrency, numberOnly, calculatePercentage } from 'utils/textFormatUtils';

import _ from 'lodash';

const TotalValueBox = ({
  formData,
  serviceItems = [],
  calculatedValues = {},
  setCalculatedValues = () => {},
}) => {
  useEffect(() => {
    if (_.isEmpty(serviceItems)) return;

    const itemData = serviceItems?.map(item => item?.data);

    if (_.isEmpty(itemData)) return;

    const totalExGst = _.sumBy(itemData || [], 'totalAmount') || calculatedValues?.totalExGst;
    const gst = calculatePercentage(totalExGst || 0, 10);
    const grandTotal = gst + totalExGst;

    setCalculatedValues({
      totalExGst,
      gst,
      grandTotal,
      totalAfterDiscount: grandTotal,
    });
    // updateServiceItems(flattenArray);
    formData?.setValue('discount', 0);
  }, [serviceItems]);

  return (
    <Box
      backgroundColor='white'
      borderRadius={1}
      p={2}
      sx={{ minWidth: {xs: '100%', sm: '300px'} }}
    >
      <Box display='flex' width='100%' justifyContent='space-between' mb={1}>
        <Typography variant='pb' mr={1}>Total Ex GST:</Typography>
        <Typography variant='p'>{toCurrency(calculatedValues?.totalExGst || 0)}</Typography>
      </Box>
      <Box display='flex' width='100%' justifyContent='space-between' mb={2}>
        <Typography variant='pb' mr={1}>GST 10%:</Typography>
        <Typography variant='p'>{toCurrency(calculatedValues?.gst || 0)}</Typography>
      </Box>

      <Box display='flex' width='100%' justifyContent='space-between' mb={2} alignItems='center'>
        <Typography variant='pb' mr={1}>Discount:</Typography>
        <Box maxWidth='100px'>
          <InputField
            formData={formData}
            name='discount'
            endAdornment='%'
            type='number'
            format={value => _.clamp(numberOnly(value), 0, 100)}
            onChange={(name, value) => {
              const total = calculatedValues?.grandTotal;
              if (!total) return;

              const numVal = numberOnly(value);
              const discountVal = calculatePercentage(total, numVal);
              const totalAfterDiscount = total - discountVal;

              setCalculatedValues({
                ...calculatedValues,
                totalAfterDiscount,
              });
            }}
          />
        </Box>
      </Box>
      <DividerLine
        sx={{
          borderColor: 'primary.main',
          my: 1,
        }}
        height='1px'
      />
      <Box display='flex' width='100%' justifyContent='space-between' py={1}>
        <Typography variant='pb' mr={1}>Grand total:</Typography>
        <Typography variant='p'>{toCurrency(calculatedValues?.totalAfterDiscount || 0)}</Typography>
      </Box>
    </Box>
  );
}

export default TotalValueBox;
