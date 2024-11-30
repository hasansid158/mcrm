import React, { useState, useEffect } from 'react';

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

import { toCurrency } from 'utils/textFormatUtils';

import { isEmpty } from 'lodash';

const ServiceItem = ({
  handleRemove = () => {},
  triggerSubmit = 0,
  setServiceItemData = () => {},
  itemError = () => {},
  itemId = 0,
  preFillData = {},
  serviceList = [],
  noDescription = false,
}) => {
  const [isInitRender, setIsInitRender] = useState(true);

  const [serviceListData, setServiceListData] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (isEmpty(serviceList)) return;
    const modifiedData = serviceList?.map(item => ({id: item?.serviceID, value: noDescription ? item?.serviceDescription : item?.serviceCategory}));

    setServiceListData(modifiedData || []);
  }, [serviceList]);

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
  } = useReactForm();

  useEffect(() => {
    itemError({itemId, error: true});
  }, []);

  useEffect(() => {
    triggerSubmit !== 0 && handleSubmit(() => {})();
  }, [triggerSubmit]);

  const watchedData = useWatch({control})

  const setData = () => {
    const {
      unitPrice,
      quantity,
      discount = 0,
      serviceID,
    } = watchedData;

    const multiplyPrice = unitPrice * quantity;
    const discountApplied = multiplyPrice - (multiplyPrice * (discount / 100));
    setFinalPrice(discountApplied);

    setServiceItemData({
      ...watchedData,
      totalAmount: discountApplied,
      itemId,
    });

    const isError = (!!serviceID && !!unitPrice && !!quantity);
    itemError({itemId, error: !isError});
  }

  // useEffect(() => {


  //   // setData({unitPrice, quantity, discount});
  //   setData({unitPrice, quantity});



  // }, [watchedData])

  useEffect(() => {
    if (isEmpty(preFillData) || !isInitRender) return;
    setIsInitRender(false);
    reset(preFillData);
    // reset({
    //   ...preFillData,
    //   discount: preFillData?.discount || 0,
    // });
  }, [preFillData]);


  const handleServiceChange = (serviceID) => {
    if (isEmpty(serviceList)) return;

    const selectedServiceItem = serviceList?.find(service => service?.serviceID === serviceID);
    reset({
      ...selectedServiceItem,
      quantity: 0,
    });
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
              name='serviceID'
              label='Service Item'
              required
              formData={formData}
              onChange={(name, value) => handleServiceChange(value)}
              searchSelectData={serviceListData}
            />
          </Box>
          {!noDescription && <Box mb={2}>
            <InputField
              name='serviceDescription'
              label='description'
              required
              formData={formData}
              multiline
              rows={2}
            />
          </Box>}
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
                  formData={formData}
                  format={numberOnly}
                  type='number'
                  startAdornment='$'
                  required
                  // readOnly
                  InputLabelProps={{shrink: true}}
                  onChange={setData}
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
                type='number'
                onChange={setData}
              />
            </Grid>

            {/* <Grid item sm={4} xs={12}>
              <Box>
                <InputField
                  name='discount'
                  label='Discount'
                  formData={formData}
                  format={numberOnly}
                  type='number'
                  endAdornment='%'
                  readOnly
                  InputLabelProps={{shrink: true}}
                />
              </Box>
            </Grid> */}

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

export default ServiceItem;
