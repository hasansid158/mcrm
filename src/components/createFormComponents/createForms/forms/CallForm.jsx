import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputField from 'common/input/InputField';
import DatePicker from 'common/input/DatePicker';

import useReactForm from 'hooks/useReactForm';

import useScreenSize from 'hooks/useScreenSize';
import { formatISO } from 'date-fns';

import { addCall } from 'redux/slices/actionSlice/interactionsSlice/callSlice';
import { useDispatch } from 'react-redux';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import PaperBox from 'common/ui/PaperBox';

import { useSelector } from 'react-redux';
import AvatarName from 'common/dataDisplay/AvatarName';

import SearchSelect from 'common/input/SearchSelect';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

const CallForm = ({
  extraFormProps,
  open,
  handleClose,
}) => {
  const { isMobile } = useScreenSize();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const {
    userFirstName,
    userLastName
  } = useSelector(state => state?.userDetails);

  const { contactList } = useSelector(state => state?.lists);

  const {
    formData,
    formData: { setValue, watch },
    handleSubmit,
    reset,
  } = useReactForm({});

  useEffect(() => {
    reset({
      callStartTime: extraFormProps?.start,
    });
  }, [extraFormProps]);


  const onSubmit = (data, isReset = false) => {
    setLoading(true);

    const callData = {
      ...data,
      callStartTime: formatISO(new Date(data?.callStartTime)),
      callOwner: `${userFirstName} ${userLastName}`,
    }

    dispatch(addCall(callData))
    .then((action) => {
      if (action.meta.rejectedWithValue) {
        // This means the promise was rejected
        dispatch(setErrorDialogText('Server error occurred, please try again later'));
      } else {
        // The meeting was created successfully
        dispatch(setSnackBar({
          open: true,
          message: 'Call created successfully!'
        }));

        if (isReset) {
          reset();
        } else {
          handleClose();
        }
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <DialogBox
      open={open}
      handleFormSubmit={(isReset) => handleSubmit(onSubmit)(isReset)}
      handleClose={handleClose}
      title='Create Call'
      maxWidth='xs'
      loading={loading}
    >
      <PaperBox>
        <Grid
          px={!isMobile && 2}
          py={2}
          container
          rowSpacing={2}
          columnSpacing={4}
        >

          <Grid sm={12} xs={12} item>
            <InputField
              required
              formData={formData}
              name='callSubject'
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <SearchSelect
              returnLabel
              formData={formData}
              name='callTO'
              label='Call To'
              searchSelectData={contactList}
              required
              // multiple
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <DatePicker
              formData={formData}
              name='callStartTime'
              isDateTime
              required
              disablePast
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <InputField
              formData={formData}
              name='relatedTO'
              label='Related To'
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <SearchSelect
              formData={formData}
              name='callType'
              required
              searchSelectData={[
                { value: 'Client Meeting', label: 'Client Meeting' },
                { value: 'Sales Call', label: 'Sales Call' },
                { value: 'Technical Support', label: 'Technical Support' },
                { value: 'Follow-up', label: 'Follow-up' },
                { value: 'Conference Call', label: 'Conference Call' },
                { value: 'Check-in', label: 'Check-in' },
                { value: 'Product Demo', label: 'Product Demo' },
                { value: 'Strategy Session', label: 'Strategy Session' },
                { value: 'Consultation', label: 'Consultation' },
                { value: 'Training Call', label: 'Training Call' },
                { value: 'Cold Call', label: 'Cold Call' },
                { value: 'Customer Feedback', label: 'Customer Feedback' },
                { value: 'Partnership Call', label: 'Partnership Call' },
                { value: 'Billing/Finance Call', label: 'Billing/Finance Call' },
                { value: 'HR Call', label: 'HR Call' }
              ]}
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <InputField
              formData={formData}
              name='callOutGoingStatus'
            />
          </Grid>

          {/* <Grid sm={12} xs={12} item>
            <SwitchToggle
              formData={formData}
              name='callReminder'
              label={<Typography variant='p2'>Call Reminder</Typography>}
              labelPlacement='end'
            />
          </Grid> */}

          <Grid sm={12} xs={12} item>
            <Box>
              <Typography variant='p3'>Call Owner</Typography>
              <Box
                display='flex'
                alignItems='center'
                width='100%'
              >
                <AvatarName
                  name={`${userFirstName} ${userLastName}`}
                  sx={{
                    my: .5,
                    mr: 1,
                  }}
                />
                <Typography variant='p2'>{`${userFirstName} ${userLastName}`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PaperBox>
    </DialogBox>
  );
}

export default CallForm;
