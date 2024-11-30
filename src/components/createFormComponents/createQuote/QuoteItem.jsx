import React, { useState, useEffect, useMemo } from 'react';

import {
  IconButton,
  Typography,
  Grid,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';
import PaperBox from 'common/ui/PaperBox';

import { numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';
import useReactForm from 'hooks/useReactForm';
import { useSelector } from 'react-redux';

import { toCurrency } from 'utils/textFormatUtils';

import { isEmpty } from 'lodash';

const QuoteItem = ({
  handleRemove = () => {},
  triggerSubmit = 0,
  setQuoteItemData = () => {},
  itemError = () => {},
  itemId = 0,
  preFillData,
  handleValueChange,
}) => {
  const { itadServices } = useSelector(state => state.lists)
  const { isMobile } = useScreenSize();

  const [finalPrice, setFinalPrice] = useState(0);

  const {
    formData,
    formData: {
      setValue,
      control,
      errors,
    },
    reset,
    useWatch,
    handleSubmit,
  } = useReactForm({discount: 0});

  useEffect(() => {
    itemError({itemId, error: true});
  }, []);

  useEffect(() => {
    triggerSubmit !== 0 && handleSubmit(() => {})();
  }, [triggerSubmit]);

  const watchedData = useWatch({control})

  const setData = ({unitPrice, quantity, discount}) => {
    const multiplyPrice = unitPrice * quantity;
    const discountAmount = (multiplyPrice * (discount / 100));
    const discountApplied = multiplyPrice - discountAmount;
    setFinalPrice(discountApplied);

    setQuoteItemData({
      ...watchedData,
      totalAmount: discountApplied,
      discountAmount,
      discount: watchedData?.discount || 0,
      itemId,
    });
  }

  useEffect(() => {
    if (isEmpty(preFillData)) return;

    reset({
      ...preFillData,
      discount: preFillData?.discount || 0,
    });
  }, [preFillData]);


  useEffect(() => {
    const {
      unitPrice,
      quantity,
      discount,
      serviceId,
    } = watchedData;

    setData({unitPrice, quantity, discount});

    const isError = (!!serviceId && !!unitPrice && !!quantity);
    itemError({itemId, error: !isError});

  }, [watchedData, preFillData])

  const handleServiceChange = (serviceValue) => {
    const serviceDescription = itadServices?.find(service => service?.id === serviceValue)?.description;
    setValue('serviceDescription', serviceDescription);
    handleValueChange();
  }


  return (
    <PaperBox
      sx={{
        mt: isMobile ? 3 : itemId === 0 ? 3 : 6,
        pb: isMobile ? 3 : 1,
        pt: isMobile ? 6 : 3,
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <Grid container columnSpacing={2} rowGap={3}>
        <Grid item sm={6} xs={12}>
          <Box mb={isMobile ? 3 : 2}>
            <SearchSelect
              name='serviceId'
              label='Service Item'
              required
              formData={formData}
              onChange={(name, value) => handleServiceChange(value)}
              searchSelectData={itadServices}
            />
          </Box>
          <Box mb={2}>
            <InputField
              name='serviceDescription'
              label='description'
              formData={formData}
              multiline
              rows={2}
              onChange={handleValueChange}
            />
          </Box>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Grid
            container
            columnSpacing={2}
            rowGap={2}
          >
            <Grid item sm={6} xs={12}>
              <Box>
                <InputField
                  name='unitPrice'
                  label='Unit Price'
                  required
                  formData={formData}
                  format={numberOnly}
                  startAdornment='$'
                  onChange={handleValueChange}
                />
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <InputField
                name='quantity'
                label='Quantity'
                required
                formData={formData}
                format={numberOnly}
                onChange={handleValueChange}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <Box>
                <InputField
                  name='discount'
                  label='Discount'
                  formData={formData}
                  format={numberOnly}
                  type='number'
                  endAdornment='%'
                  min={0}
                  onChange={handleValueChange}
                />
              </Box>
            </Grid>

            <Grid
              item
              sm={8}
              xs={12}
              textAlign='right'
              mt={isMobile ? 0 : '6px'}
              sx={{wordWrap: 'break-word'}}
            >
              <Typography
                textAlign='right'
                variant='pb'
              >
                Cost:&nbsp;{toCurrency(finalPrice || 0)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {itemId !== 0 &&
        <Box
          p='3px'
          position='absolute'
          top={isMobile ? 0 : -40}
          right={0}
        >
          <IconButton
            sx={{ border: theme => `1px solid ${theme.palette.primary.main}` }}
            color='primary'
            onClick={handleRemove}
            size='small'
          >
            <CloseIcon sx={{fontSize: '16px'}}/>
          </IconButton>
        </Box>
      }
    </PaperBox>
  );
}

export default QuoteItem;
