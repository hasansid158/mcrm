import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import useReactForm from 'hooks/useReactForm';
import useScreenSize from 'hooks/useScreenSize';

import DatePicker from 'common/input/DatePicker';
import SearchSelect from 'common/input/SearchSelect';
import PaperBox from 'common/ui/PaperBox';
import DividerLine from 'common/ui/DividerLine';
import master_crm_logo from 'components/assets/master-crm-logo.png'

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

import { addQuote, updateQuoteValue } from 'redux/slices/actionSlice/quotesSlice';
import { getContactById, getQuoteById } from 'api/crmApis';

import {
  setErrorDialogText,
  setSnackBar
} from 'redux/slices/commonSlice/commonSlice';

import { calculatePercentage, toCurrency } from 'utils/textFormatUtils';
import QuoteItem from './QuoteItem';

import ViewPdfDialog from "pages/components/gra/ViewPdfDialog";
import QuotePdf from 'components/pdfTemplates/QuotePdf';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

import { useWatch } from 'react-hook-form';

const QuoteCreator = ({
  handleClose = () => {},
  formData: preFillFormData,
  isUpdate,
  handleUpdate = () => {},
}) => {
  const dispatch = useDispatch();

  // GetContactDetailsById(int contactId, int userId)

  const { contactList } = useSelector(state=> state.lists)
  const { userAccount } = useSelector(state => state?.userDetails);

  const { isMobile } = useScreenSize();

  const [loading, setLoading] = useState(false);
  const [quoteItems, setQuoteItems] = useState([{component: QuoteItem, id: 0}]);
  const [quoteData, setQuoteData] = useState({});
  const [triggerItem, setTriggerItem] = useState(0);
  const [itemErrors, setItemErrors] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState({});
  const [pdfData, setPdfData] = useState(null);

  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerWeb, setCustomerWeb] = useState('');
  const [customerName, setCustomerName] = useState('');

  const [enableUpdate, setEnableUpdate] = useState(false);
  const [preFilFetched, setPreFilFetched] = useState(false);

  const {
    formData,
    reset,
    handleSubmit,
  } = useReactForm();

  const preFilWatchedData = useWatch({control: preFillFormData?.control})
  const watchedData = useWatch({control: formData?.control})

  //reset current formData to the fetched formData
  useEffect(() => {
    if (!isUpdate || preFilFetched) return;

    const quoteID = preFilWatchedData?.quoteID;

    if (!quoteID) return;

    setLoading(true);

    getQuoteById(quoteID)
      ?.then(res => {
        reset(res);

        const {
          quoteItems: items,
          contactId
        } = res || {};

        const fetchedItems = items?.map((itemData, key) => (
          { component: QuoteItem, id: key, data: itemData }
        ));

        setQuoteItems(fetchedItems);
        handleCustomerChange(contactId);
      })
      ?.catch(() => dispatch(setErrorDialogText('Error loading complete data, please try again later')))
      ?.finally(() => {
        setLoading(false);
        setPreFilFetched(true);
      });
  }, [isUpdate, preFilWatchedData]);

  const handleCustomerChange = async (value) => {
    if (!value) return;

    const selectedContact = await getContactById(value);

    // contacts?.find(contact => contact?.contactId === value);

    const {
      street,
      suburb,
      city,
      state,
      postcode,
      country,

      company,
      webSite,

      firstName,
      lastName,
    } = selectedContact || {};

    setCustomerAddress(`${street || ''} ${suburb || ''} ${city || ''} ${state || ''} ${postcode || ''} ${country || ''}`);
    setCustomerCompany(company || '');
    setCustomerWeb(webSite || '');
    setCustomerName(`${firstName || ''} ${lastName || ''}`);
  }

  const billToText = [
    {label: 'To :', value: customerCompany},
    {label: 'Address:', value: customerAddress},
    {label: 'Website:', value: customerWeb},
    {label: 'Marked TO:', value: customerName},
  ]


  const onSubmit = async (data) => {
    setTriggerItem(triggerItem+1);
    if (!!itemErrors?.length) return;
    if (!!!quoteItems.length) {
      dispatch(setErrorDialogText('Please add at least one item.'));
      return;
    }
    setLoading(true);

    const payloadData = {
      ...data,
      customerId: data?.customerId,
      projectId: data?.projectId,
      accountId: userAccount?.accountId,
      contactId: data?.contactId,
      quoteDate: data?.quoteDate,
      quoteExpiryDate: data?.quoteExpiryDate,
      quantity: String(quoteItems?.length),
      taxes: calculatedValues?.gst10,
      totalAmount: calculatedValues?.grandTotal,
      discount: calculatedValues?.discount,
      quoteItems: quoteData?.quoteItems,
      ...(isUpdate ? {quoteNO: watchedData?.quoteNO} : {}),
    }


    const res = await isUpdate ? handleUpdate(payloadData) : dispatch(addQuote(payloadData));
    setLoading(false);

    if (res?.error) {
      dispatch(setErrorDialogText(
        `Server error occured while ${isUpdate ? 'updating' : 'creating'} quote.
        Please try again later.`
      ));
      return;
    }

    console.log(payloadData, 'payloadData')


    dispatch(setSnackBar({
      open: true,
      message: `Quote has been ${isUpdate ? 'updated' : 'created'} Successfully!`
    }));

    setPdfData(res?.payload || payloadData)
  }

  const handleRemoveItem = (id) => {
    // Remove corresponding item,data,error
    setQuoteItems(prevItems => prevItems?.filter(item => item?.id !== id));
    setQuoteData(prevData => {
      const updatedData = {
        quoteItems: prevData?.quoteItems?.filter(item => item?.itemId !== id),
      };
      return updatedData;
    });
    setItemErrors(prevErrors => prevErrors?.filter(item => item?.itemId !== id));
  }
  const handleAddItem = () => {
    const newId = quoteItems[quoteItems?.length - 1]?.id + 1 || 0;
    const newItem = {component: QuoteItem, id: newId};
    setQuoteItems([...quoteItems, newItem]);
  }

  const updateQuoteItemData = (data) => {
    setQuoteData(prevItems => {

      const existingItemIndex = prevItems?.quoteItems?.findIndex(item => item?.itemId === data?.itemId);

      // Object exists, replace it
      if (existingItemIndex !== -1) {
        const updatedData = [...(prevItems?.quoteItems || [])];
        updatedData[existingItemIndex] = { ...data };
        return { quoteItems: updatedData };
      }

      // Object doesn't exist, add a new one
      const updatedData = { quoteItems: [...prevItems?.quoteItems, data] };
      return updatedData;
    });
  }

  const handleError = (errorData) => {
    setItemErrors((prevErrors) => {
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

  useEffect(() => {
    // Function to calculate the sum of totalAmount in quoteItems
    const calculateTotalAmount = (valueName = 'totalAmount') => {
      return _.sumBy(quoteData?.quoteItems, valueName) || 0;
    };
    const totalExGst = Math.round(calculateTotalAmount() || 0);
    const gst10 = Math.round(calculatePercentage(totalExGst, 10) || 0);
    const grandTotal = Math.round(gst10 + totalExGst || 0);
    const totalItemDiscount = calculateTotalAmount('discountAmount');
    const discount = calculateTotalAmount('discount');

    setCalculatedValues({
      totalExGst,
      gst10,
      grandTotal,
      discount,
      totalDiscountAmount: totalItemDiscount,
    });
  }, [quoteData]);

  return (
    <>
      <SpinLoader loading={loading}/>
      <ViewPdfDialog
        open={!!pdfData}
        handleClose={() => {
          setPdfData(null);
          handleClose();
        }}
        pdfTemplate={<QuotePdf data={pdfData}/>}
        pdfTitle='GRA-Invoice'
      />
      <Box sx={{px: isMobile ? 2 : 4, py: 2}}>
        <PaperBox sx={{
            border: 'none',
            backgroundColor: '#faf5f4',
            p: 3,
          }}
        >
          <Grid
            container
            columnSpacing={4}
            rowGap={2}
          >
            <Grid item sm={4} xs={12}>
              <Box
                display='flex'
                alignItems='center'
              >
                <Box
                  component='img'
                  src={master_crm_logo}
                  width={isMobile ? '40px' : '50px'}
                  mr={1}
                />
                <Typography
                  color='primary.main'
                  variant='h5'
                  fontFamily='"Lora", sans-serif'
                >
                  MASTER CRM
                </Typography>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                my={2}
              >
                <Typography variant='pb'>Sydney, Australia</Typography>
              </Box>
            </Grid>

            <Grid item sm={4} xs={12} mb={isMobile ? 2 : 0}>
              <Typography color='primary.main' variant='pb'>Quote Customer</Typography>
              <Box mt={1} display='flex' flexDirection='column' rowGap={1}>
                {billToText?.map((item, key) => (
                  <Box display='flex' key={key}>
                    <Typography
                      component='div'
                      minWidth='100px'
                      variant='p2'
                      fontWeight='bold'
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant='p2'
                      maxWidth='135px'
                      width='100%'
                      sx={{wordWrap: 'break-word'}}
                    >
                      {item?.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item sm={4} xs={12}>
              <Box
                display='flex'
                flexDirection='column'
                rowGap={2}
              >
                {isUpdate &&
                  <Box>
                    <Typography variant='pO' color='secondary.main'>Quote Number</Typography>
                    <Typography variant='h6' color='secondary.main'>{watchedData?.quoteNO}</Typography>
                  </Box>
                }

                <SearchSelect
                  fullWidth
                  formData={formData}
                  name='contactId'
                  required
                  label='Contact'
                  searchSelectData={contactList}
                  onChange={(name, value) => {
                    handleCustomerChange(value);
                    setEnableUpdate(true);
                  }}
                />

                <CustomerProjectSelectors
                  formData={formData}
                  onCustomerChange={(name, value) => {
                    handleCustomerChange(value);
                    setEnableUpdate(true);
                  }}
                  noGrid
                />
                <DatePicker
                  formData={formData}
                  name='quoteDate'
                  label='Quote Date'
                  required
                  onChange={() => setEnableUpdate(true)}
                />
                <DatePicker
                  formData={formData}
                  name='quoteExpiryDate'
                  label='Quote Expiry Date'
                  minDate={new Date()}
                  required
                  onChange={() => setEnableUpdate(true)}
                />
              </Box>
            </Grid>
          </Grid>
        </PaperBox>


        <Box
          sx={{
            borderBottom: theme => `1px dashed ${theme.palette.primary.main}`,
            borderTop: theme => `1px dashed ${theme.palette.primary.main}`,
            pb: 2,
          }}
        >
          {quoteItems?.map((item, key) => (
            <item.component
              key={item.id}
              itemId={item.id}
              handleRemove={() => handleRemoveItem(item.id)}
              triggerSubmit={triggerItem}
              setQuoteItemData={updateQuoteItemData}
              itemError={handleError}
              preFillData={item?.data}
              handleValueChange={() => setEnableUpdate(true)}
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

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
          flexWrap='wrap'
          rowGap={3}
          my={2}
        >
          <Box>
            <Box display='flex' minWidth='200px' justifyContent='space-between'>
              <Typography variant='pb' mr={1}>Total Ex GST:</Typography>
              <Typography variant='p'>{toCurrency(calculatedValues?.totalExGst)}</Typography>
            </Box>
            <Box display='flex' minWidth='200px' justifyContent='space-between'>
              <Typography variant='pb' mr={1}>GST 10%:</Typography>
              <Typography variant='p'>{toCurrency(calculatedValues?.gst10)}</Typography>
            </Box>
            <DividerLine
              sx={{
                borderColor: 'primary.main',
                my: 1,
              }}
              height='1px'
            />
            <Box display='flex' minWidth='200px' justifyContent='space-between'>
              <Typography variant='pb' mr={1}>Grand total:</Typography>
              <Typography variant='p'>{toCurrency(calculatedValues?.grandTotal)}</Typography>
            </Box>
          </Box>

          <Box display='flex' gap={1} flexWrap='wrap'>
            {isUpdate &&
              <Button
                variant='outlined'
                color='secondary'
                sx={{minWidth: '140px'}}
                onClick={() => setPdfData(watchedData)}
              >
                View PDF
              </Button>
            }
            <Button
              variant='contained'
              sx={{minWidth: '140px'}}
              onClick={() => handleSubmit(onSubmit)()}
              disabled={isUpdate && !enableUpdate}
            >
              {isUpdate ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default QuoteCreator;
