import React, { useState } from 'react';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';

import { Box, Button, Grid, Typography } from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

import { schedulerEnum } from 'enum/schedulerEnum';

import Groups2Icon from '@mui/icons-material/Groups2';
// import CallRoundedIcon from '@mui/icons-material/CallRounded';
// import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
// import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';

import MeetingForm from 'components/createFormComponents/createForms/forms/MeetingForm';
// import Tasks from 'pages/interactions/Tasks';
// import CallForm from 'components/createFormComponents/createForms/forms/CallForm';
// import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';
import TimeSheets from 'pages/interactions/TimeSheets';

// import createFormEnum from 'enum/createFormEnum';

const CreateEvent = ({
  open = false,
  handleClose = () => {},
  selectedDateObj = {},
}) => {

  const [meetingOpen, setMeetingOpen] = useState(false);
  const [timeSheetOpen, setTimeSheetOpen] = useState(false);
  // const [ticketOpen, setTicketOpen] = useState(false);
  // const [callOpen, setCallOpen] = useState(false);
  // const [workOrderOpen, setWorkOrderOpen] = useState(false);

  const {
    allDay,
    start,
    end,
  } = selectedDateObj;

  const buttonEnum = [
    {text: 'Time Sheet', action: () => setTimeSheetOpen(true), icon: PendingActionsRoundedIcon},
    {text: 'Meeting', action: () => setMeetingOpen(true), icon: Groups2Icon},
    // {text: 'Call', action: () => setCallOpen(true), icon: CallRoundedIcon},
    // {text: 'Task', action: () => setTicketOpen(true), icon: TaskRoundedIcon},
    // {text: 'Work Order', action: () => setWorkOrderOpen(true), icon: AssignmentLateRoundedIcon},
  ]

  return <>
    <DialogBox
      title='Create event'
      disableFormFooter
      maxWidth='xs'
      open={open}
      handleClose={handleClose}
    >
      <PaperBox sx={{mb: 2}}>
        <Grid container spacing={1}>
          {buttonEnum?.map((item, key) => (
            <Grid
              item
              sm={6}
              xs={12}
              key={key}
            >
              <Button
                onClick={item?.action}
                variant='outlined'
                fullWidth
                sx={{
                  minHeight: 140,
                  backgroundColor: 'white',
                }}
                // startIcon={}
              >
                <Typography
                  variant='h5'
                  fontWeight={500}
                  color='secondary.main'
                >
                  <item.icon
                    sx={{
                      fontSize: '40px !important',
                      color: 'secondary.main',
                      mb: .5,
                    }}
                  />
                  <br/>
                  {item?.text}
                </Typography>

              </Button>
            </Grid>
          ))}
        </Grid>
      </PaperBox>
    </DialogBox>

    <MeetingForm
      open={meetingOpen}
      handleClose={() => setMeetingOpen(false)}
      extraFormProps={selectedDateObj}
    />

    {/* <Tasks
      hideKanbanBoard={true}
      openCreateDialog={ticketOpen}
      openViewDialog={false}
      handleDialogClose={() => setTicketOpen(false)}
    />

    <CallForm
      open={callOpen}
      handleClose={() => setCallOpen(false)}
      extraFormProps={selectedDateObj}
    /> */}

    {/* <CreateDialog
      isDialogOpen={workOrderOpen}
      handleClose={() => setWorkOrderOpen(false)}
      formKey={createFormEnum.work_orders}
      label='Work Orders'
      createLabel='Create Work Orders'
      // preFillData={preFillData}
    /> */}

    <TimeSheets
      formsOnly
      disableFetchData
      createFormProps={{
        open: timeSheetOpen,
        handleClose: () => setTimeSheetOpen(false),
      }}
      preFillData={{
        startDateTime: start,
        endDateTime: end,
      }}
    />

    {/* <CreateDialog
      isDialogOpen={timeSheetOpen}
      handleClose={() => setTimeSheetOpen(false)}
      formKey={createFormEnum.time_sheets}
      label='Time Sheets'
      title='Create Time Sheet'
      preFillData={{
        startDateTime: start,
        endDateTime: end,
      }}
      // preFillData={preFillData}
    /> */}
  </>;
}

export default CreateEvent;
