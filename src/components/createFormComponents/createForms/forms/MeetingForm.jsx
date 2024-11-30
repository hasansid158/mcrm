import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import DatePicker from 'common/input/DatePicker';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import PaperBox from 'common/ui/PaperBox';
import AvatarName from 'common/dataDisplay/AvatarName';
import SearchSelect from 'common/input/SearchSelect';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

import useReactForm from 'hooks/useReactForm';
import useScreenSize from 'hooks/useScreenSize';

import { isAfter, formatISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { addMeeting } from 'redux/slices/actionSlice/interactionsSlice/meetingSlice';
import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

const MeetingForm = ({
  extraFormProps = {},
  open,
  handleClose,
  isUpdate = false
}) => {

  const { isMobile } = useScreenSize();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const {
    userFirstName,
    userLastName,
    userAccount,
  } = useSelector(state => state?.userDetails);

  const { contactList } = useSelector(state => state?.lists);

  const {
    formData,
    formData: { setValue, watch },
    handleSubmit,
    reset,
  } = useReactForm({});

  useEffect(() => {
    if (isEmpty(extraFormProps)) return;

    const { extendedProps = {} } = extraFormProps;

    reset({
      isAllDay: extraFormProps?.allDay,
      meetingStart: extraFormProps?.start,
      meetingEnd: extraFormProps?.end,
      ...extendedProps,
    });
  }, [extraFormProps]);

  const handleToDateChange = () => {
    const toDateAfter = isAfter(fromDate, toDate);
    toDateAfter && setValue('to', '');
  }

  const onSubmit = (data, isReset = false) => {
    setLoading(true);

    const meetingData = {
      ...data,
      meetingStart: formatISO(new Date(data?.meetingStart)),
      meetingEnd: formatISO(new Date(data?.meetingEnd)),
      meetingHost: `${userFirstName} ${userLastName}`,
      accountId: userAccount?.accountId,
    }

    dispatch(addMeeting(meetingData))
    .then((action) => {
      if (action.meta.rejectedWithValue) {
        // This means the promise was rejected
        dispatch(setErrorDialogText('Server error occurred, please try again later'));
      } else {
        // The meeting was created successfully
        dispatch(setSnackBar({
          open: true,
          message: 'Meeting created successfully!'
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

  const fromDate = watch('meetingStart');
  const toDate = watch('meetingEnd');
  const allDay = watch('isAllDay');

  return (
    <DialogBox
      open={open}
      handleFormSubmit={(isReset) => handleSubmit(onSubmit)(isReset)}
      handleClose={handleClose}
      title='Create Meeting'
      maxWidth='xs'
      loading={loading}
      disableSubmitNew={isUpdate}
      submitText={isUpdate ? 'Update' : 'Submit'}
      disableFormFooter={isUpdate && !formData?.isDirty}
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
              name='meetingSubject'
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <InputField
              required
              formData={formData}
              name='meetingAgenda'
              multiline
              maxRows={4}
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <InputField
              formData={formData}
              name='meetingLocation'
            />
          </Grid>

          <CustomerProjectSelectors
            formData={formData}
            sm={12}
            md={12}
            xs={12}
          />

          <Grid sm={12} xs={12} item>
            <SwitchToggle
              formData={formData}
              name='isOnlineMeeting'
              label={<Typography variant='p2'>Make this an online meeting</Typography>}
              labelPlacement='end'
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <SwitchToggle
              formData={formData}
              name='isAllDay'
              label={<Typography variant='p2'>All day</Typography>}
              labelPlacement='end'
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <DatePicker
              formData={formData}
              name='meetingStart'
              isDateTime={allDay !== undefined ? !allDay : !extraFormProps?.isAllDay}
              required
              minDate={new Date()}
              disablePast
              onClose={handleToDateChange}
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <DatePicker
              formData={formData}
              name='meetingEnd'
              isDateTime={allDay !== undefined ? !allDay : !extraFormProps?.isAllDay}
              required
              minTime={fromDate}//CHECK ALL DAY FEATURE ON GOOGLE CALENDAR
              minDate={fromDate}
              disablePast
              onClose={handleToDateChange}
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <SearchSelect
              returnLabel
              formData={formData}
              name='meetingParticipants'
              searchSelectData={contactList}
              required
              // multiple
            />
          </Grid>

          <Grid sm={12} xs={12} item>
            <Box>
              <Typography variant='p3'>Meeting Host</Typography>
              <Box
                display='flex'
                alignItems='center'
                width='100%'
              >
                <AvatarName
                  name={extraFormProps?.extendedProps?.meetingHost || `${userFirstName} ${userLastName}`}
                  sx={{
                    my: .5,
                    mr: 1,
                  }}
                />
                <Typography variant='p2'>{extraFormProps?.extendedProps?.meetingHost || `${userFirstName} ${userLastName}`}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PaperBox>
    </DialogBox>

  );
}

export default MeetingForm;
