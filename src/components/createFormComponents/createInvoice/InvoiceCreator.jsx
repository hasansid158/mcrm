import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _, { isEmpty } from 'lodash';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useReactForm from 'hooks/useReactForm';
import useScreenSize from 'hooks/useScreenSize';

import DatePicker from 'common/input/DatePicker';
import SearchSelect from 'common/input/SearchSelect';
import PaperBox from 'common/ui/PaperBox';
import RichNoteField from 'common/input/RichNoteField';

import master_crm_logo from 'components/assets/master-crm-logo.png'

import { addInvoice, updateInvoiceValue } from 'redux/slices/actionSlice/orderSlice';

import {
  setErrorDialogText,
  setSnackBar
} from 'redux/slices/commonSlice/commonSlice';
import { fetchAllContacts } from 'redux/slices/actionSlice/contactsSlice';

import AssociatedOrderBox from '../AssociatedOrderBox';
import PriceBox from '../PriceBox';

import ViewPdfDialog from "pages/components/gra/ViewPdfDialog";
import InvoicePdf from 'components/pdfTemplates/InvoicePdf';
import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

import { useWatch } from 'react-hook-form';
import InputField from 'common/input/InputField';

const InvoiceCreator = ({
  handleClose = () => {},
  formData: preFillFormData,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const { contactList } = useSelector(state=> state.lists)
  const { contacts } = useSelector(state => state.actions);
  const { userFirstName, userLastName, userAccount } = useSelector(state => state.userDetails);

  const [serviceItemData, setServiceItemData] = useState([]);

  const { isMobile } = useScreenSize();

  const [loading, setLoading] = useState(false);
  const [calculatedValues, setCalculatedValues] = useState({});
  const [pdfData, setPdfData] = useState(null);

  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerWeb, setCustomerWeb] = useState('');
  const [customerName, setCustomerName] = useState('');

  const [enableUpdate, setEnableUpdate] = useState(false);

  const watchedData = useWatch({control: preFillFormData.control})

  useEffect(() => {
    if (contacts?.length) return;

    setLoading(true);
    _.isEmpty(contacts) ? dispatch(fetchAllContacts()).finally(() => setLoading(false)) : setLoading(false);
  }, []);

  const handleCustomerChange = (value) => {
    const selectedContact = contacts?.find(contact => contact?.contactId === value);

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
    {label: 'Total Due :', value: customerCompany},
    {label: 'Bank name:', value: customerAddress},
    {label: 'Country:', value: customerWeb},
    {label: 'IBAN:', value: customerName},
    {label: 'SWIFT:', value: customerName},
  ]

  const {
    formData,
    reset,
    handleSubmit,
  } = useReactForm();

  useEffect(() => {
    if (!isUpdate) {
      reset({accountName: isUpdate ? '' : `${userFirstName || ''} ${userLastName || ''}`})
      return
    };

    const fetchedValues = preFillFormData?.getValues();

    reset(fetchedValues);
    !isEmpty(fetchedValues?.lineItems) && setServiceItemData(fetchedValues?.lineItems);
  }, [preFillFormData]);

  const onSubmit = async (data) => {
    console.log(data)
    const {
      fK_QuoteId,
      fK_SalesOrderId,
      fK_WorkOrderId,
    } = data;

    if (isEmpty(fK_QuoteId) && isEmpty(fK_SalesOrderId) && isEmpty(fK_WorkOrderId)) {
      dispatch(setErrorDialogText('Please select at least one item from work order OR sale order OR quote.'));
      return;
    };

    setLoading(true);

    const workOrderItems =  serviceItemData?.filter(item => item?.objectKey === 'workOrderItems') || [];
    const salesOrderItems =  serviceItemData?.filter(item => item?.objectKey === 'salesOrderItems') || [];
    const quoteItems =  serviceItemData?.filter(item => item?.objectKey === 'quoteItems') || [];

    const {
      grandTotal,
      totalAfterDiscount,
      ...allAmountValues
    } = calculatedValues;

    const payloadData = {
      ...data,
      ...allAmountValues,
      invoiceTotal: totalAfterDiscount,
      totalExDiscount: grandTotal,
      workOrderItems,
      salesOrderItems,
      quoteItems,
      accountName: `${userFirstName} ${userLastName}`,
      accountId: userAccount?.accountId,
    }

    const res = await dispatch(isUpdate ? updateInvoiceValue(payloadData) : addInvoice(payloadData));
    setLoading(false);

    if (res?.error) {
      dispatch(setErrorDialogText(
        `Server error occured while ${isUpdate ? 'updating' : 'creating'} quote.
        Please try again later.`
      ));
      return;
    }

    dispatch(setSnackBar({
      open: true,
      message: `Quote has been ${isUpdate ? 'updat ed' : 'created'} Successfully!`
    }));

    setPdfData(res?.payload || payloadData)
  }


  return (
    <>
      <SpinLoader loading={loading}/>
      <ViewPdfDialog
        open={!!pdfData}
        handleClose={() => {
          setPdfData(null);
          handleClose();
        }}
        pdfTemplate={<InvoicePdf data={pdfData}/>}
        pdfTitle='GRA-Invoice'
      />
      <Box sx={{px: 2, py: 1}}>
        <PaperBox sx={{
            border: 'none',
            backgroundColor: '#faf5f4',
            p: 3,
          }}
        >
          <Grid
            container
            columnSpacing={2}
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
              <Box backgroundColor='white' p={2} borderRadius={1}>
                <Typography color='primary.main' variant='pb'>Bill To:</Typography>
                <Box mt={2} mb={1} display='flex' flexDirection='column' rowGap={1.5}>
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
                    <Typography variant='pO' color='secondary.main'>Invoice Number</Typography>
                    <Typography variant='h6' color='secondary.main'>{watchedData?.invoiceNo}</Typography>
                  </Box>
                }
                <SearchSelect
                  fullWidth
                  formData={formData}
                  name='invoiceTo'
                  required
                  label='Invoice To'
                  searchSelectData={contactList}
                  onChange={(name, value) => {
                    handleCustomerChange(value);
                    setEnableUpdate(true);
                  }}
                />
                <DatePicker
                  formData={formData}
                  name='invoiceDate'
                  label='Invoice Date'
                  required
                  onChange={() => setEnableUpdate(true)}
                />
                <DatePicker
                  formData={formData}
                  name='invoiceExpiryDate'
                  label='Invoice Expiry Date'
                  minDate={new Date()}
                  required
                  onChange={() => setEnableUpdate(true)}
                />
              </Box>
            </Grid>
          </Grid>
        </PaperBox>

        <Box
          sx={{ borderTop: theme => `1px dashed ${theme.palette.primary.main}` }}
          pt={2} mb={3}
        >
          <AssociatedOrderBox
            formData={formData}
            updateServiceItems={data => {
              setServiceItemData(data || []);
              setEnableUpdate(true);
            }}
            // setServiceLoading = () => {},
            tableData={serviceItemData}
            setAmountObject={setCalculatedValues}
            isUpdate={isUpdate}
            salesOrderKey='fK_SalesOrderId'
          />
        </Box>

        <Box pt={3} pb={2} sx={{borderTop: theme => `1px dashed ${theme.palette.primary.main}`}}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='flex-start'
            flexWrap='wrap'
            gap={2}
          >
            <RichNoteField formData={formData}/>
            <PriceBox
              formData={formData}
              setCalculatedValues={setCalculatedValues}
              calculatedValues={calculatedValues}
            />
          </Box>
        </Box>

        <Box
          display='flex'
          justifyContent='space-between'
          flexWrap='wrap'
          gap={2}
          alignItems='center'
          backgroundColor='white'
          borderRadius={1}
          p={2}
        >
          <Box>
            <InputField
              label='Salesperson'
              formData={formData}
              name='accountName'
              readOnly
            />
          </Box>

          <Box
            display='flex'
            justifyContent='flex-end'
            gap={1}
            flexWrap='wrap'
          >
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
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>

      </Box>
    </>
  );
}

export default InvoiceCreator;
