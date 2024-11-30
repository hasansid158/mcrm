import React, { useState } from 'react';

import useReactForm from 'hooks/useReactForm';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import { Grid } from '@mui/material';

import InputField from 'common/input/InputField';
import PaperBox from 'common/ui/PaperBox';
import { formRegex } from 'utils/textFormatUtils';

import { submitEnquiryRequest } from 'api/masterApi';

import { setSnackBar } from 'redux/slices/commonSlice/commonSlice';
import { useDispatch } from 'react-redux';

const ContactFormDialog = ({
  open = false,
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    formData,
    handleSubmit,
  } = useReactForm({}, { mode: 'onChange' });

  // "enquiryRequestId": 0,
  // "requestType": "string",
  // "firstName": "string",
  // "lastName": "string",
  // "description": "string",
  // "emailAddress": "string",
  // "mobileNumber": "string"

  const onSubmit = (data) => {
    setLoading(true);

    const dataObj = {
      ...data,
      enquiryRequestId: 0,
      requestType: 'enquiry',
    }

    //add api here
    submitEnquiryRequest(dataObj)
      .then(res => {
        dispatch(setSnackBar({
          open: true,
          message: 'Enquiry request sent successfully!',
        }));
      })
      .catch(err => {
        dispatch(setSnackBar({
          open: true,
          message: 'Server error occurred, please try again later.',
          options: { severity: 'error'},
        }));
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  }

  return (
    <DialogBox
      open={open}
      title='Contact us'
      maxWidth='xs'
      disableSubmitNew
      actionDisabled={!!!formData?.isValid}
      handleFormSubmit={() => handleSubmit(onSubmit)()}
      loading={loading}
      handleClose={onClose}
    >
      <PaperBox
        sx={{ my: .5, py: 2.5}}
      >
        <Grid
          container
          rowSpacing={2.5}
          columnSpacing={1.5}
        >
          <Grid item sm={6} xs={12}>
            <InputField
              formData={formData}
              required
              name='firstName'
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputField
              formData={formData}
              required
              name='lastName'
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputField
              formData={formData}
              required
              name='emailAddress'
              type='email'
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <InputField
              formData={formData}
              required
              name='mobileNumber'
              rules={{
                pattern: {
                  value: formRegex.mobile,
                  message: 'Invalid mobile number',
                },
              }}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <InputField
              formData={formData}
              name='description'
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </PaperBox>
    </DialogBox>
  );
}

export default ContactFormDialog;
