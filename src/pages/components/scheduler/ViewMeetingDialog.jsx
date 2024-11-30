import React, { useState } from 'react';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import { Grid, Box, Typography, Button, IconButton } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { removeEvent } from 'redux/slices/calendarSlice';
import { useDispatch } from 'react-redux';

import MeetingForm from 'components/createFormComponents/createForms/forms/MeetingForm';

const ViewMeetingDialog = ({
  eventData = null,
  open = false,
  handleClose = () => {},
}) => {
  const dispatch = useDispatch();

  const [openUpdate, setOpenUpdate] = useState(false);

  const InfoItem = ({children}) => (
    <Grid
      item
      sm={12}
      xs={12}
      display='flex'
      alignItems='center'
      flexDirection='row'
      columnGap='12px'
    >
      {children}
    </Grid>
  );

  const DialogFooter = (
    <Box
      width='100%'
      display='flex'
      justifyContent='flex-end'
      columnGap={1.5}
    >
        {/* <Button
          onClick={() => {
            dispatch(removeEvent(eventData?.id));
            handleClose();
          }}
          variant='outlined'
          size='small'
          fullWidth
          color='secondary'
        >
          Delete
        </Button> */}


        {/* <Button
          variant='contained'
          size='small'
          fullWidth
          onClick={() => setOpenUpdate(true)}
        >
          Modify
        </Button> */}
        <IconButton
          color='primary'
          onClick={() => setOpenUpdate(true)}
        >
          <EditRoundedIcon sx={{scale: '1.1'}}/>
        </IconButton>
        <IconButton
          color='secondary'
          onClick={() => {
            dispatch(removeEvent(eventData?.id));
            handleClose();
          }}
        >
          <DeleteForeverRoundedIcon sx={{scale: '1.1'}}/>
        </IconButton>
    </Box>
  )

  return <>
    <DialogBox
      open={open}
      handleClose={handleClose}
      title='Meeting'
      maxWidth='xs'
      footerItems={DialogFooter}
    >
      <Grid
        container
        rowGap={2}
        // px={!isMobile && 4}
        py={3}
        // rowSpacing={2}
        // columnSpacing={4}
      >
        <InfoItem>
          <ChatOutlinedIcon/>
          <Typography>{eventData?.title}</Typography>
        </InfoItem>

        <InfoItem>
          <AccessTimeOutlinedIcon/>
          <Box>
            <Typography>From: {new Date(eventData?.start).toDateString()}</Typography>
            <Typography>To: {new Date(eventData?.end).toDateString()}</Typography>
          </Box>
        </InfoItem>

        <InfoItem>
          <LocationOnIcon/>
          <Typography>{eventData?.extendedProps?.meetingLocation}</Typography>
        </InfoItem>

        <InfoItem>
          <PeopleAltOutlinedIcon/>
          <Box>
            <Typography>Host: {eventData?.extendedProps?.meetingHost}</Typography>
            <Typography>Participants: {eventData?.extendedProps?.meetingParticipants}</Typography>
          </Box>
        </InfoItem>
      </Grid>
    </DialogBox>

    <MeetingForm
      extraFormProps={eventData}
      open={openUpdate}
      handleClose={() => setOpenUpdate(false)}
      isUpdate
    />
  </>;
}

export default ViewMeetingDialog;
