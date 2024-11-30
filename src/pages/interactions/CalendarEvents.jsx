import React, { useState, useEffect } from 'react';
import Calendar from 'components/calendar/Calendar';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import { formatISO, isSameHour, startOfDay, parseISO, addDays, addMinutes } from 'date-fns';

import { fetchAllMeetings, changeMeeting } from 'redux/slices/actionSlice/interactionsSlice/meetingSlice';
import { updateTimeSheetValue } from 'redux/slices/actionSlice/interactionsSlice/timeSheetSlice';
// import { fetchAllTasks } from 'redux/slices/actionSlice/taskSlice';
// import { fetchAllCalls } from 'redux/slices/actionSlice/interactionsSlice/callSlice';
// import { fetchWorkOrder } from 'redux/slices/actionSlice/orderSlice';
// import { fetchAllTimeSheets } from 'redux/slices/actionSlice/interactionsSlice/timeSheetSlice';

import CreateEvent from 'pages/components/scheduler/CreateEvent';
// import ViewMeetingDialog from 'pages/components/scheduler/ViewMeetingDialog';
import ViewEvent from 'pages/components/scheduler/ViewEvent';

import { isEmpty, isNil } from 'lodash';
import { schedulerEnum, eventTypes } from 'enum/schedulerEnum';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

const CalendarEvents = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedDateObj, setSelectedDateObj] = useState({});

  const [allMeetinsgData, setAllMeetingsData] = useState([]);
  const [allTimeSheetsData, setAllTimeSheetsData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [clickedEventData, setClickedEventData] = useState({});

  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');


  // const {
  //   tasks,
  //   orders: { work },
  // } = useSelector(state => state.actions);
  const { userAccount } = useSelector(state => state?.userDetails)
  const {
    meetings,
    timeSheets,
    // calls,
  } = useSelector(state => state.interactions);

  // useEffect(() => {
  //   !meetings?.length && dispatch(fetchAllMeetings());
  // }, [meetings]);

  useEffect(() => {
    if (!isEmpty(meetings) && !isEmpty(timeSheets)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [meetings, timeSheets]);

  useEffect(() => {
    isEmpty(meetings) && dispatch(fetchAllMeetings());
    // isEmpty(timeSheets) && dispatch(fetchAllTimeSheets());
    // isEmpty(calls) && dispatch(fetchAllCalls());
    // isEmpty(work) && dispatch(fetchWorkOrder());
  }, []);

  useEffect(() => {
    setAllData([
      ...selectedTypeFilter === eventTypes.meeting || selectedTypeFilter === 'all' ? allMeetinsgData : [] ,
      ...selectedTypeFilter === eventTypes.timeSheet || selectedTypeFilter === 'all' ? allTimeSheetsData : [] ,
    ]);
  }, [allMeetinsgData, allTimeSheetsData, selectedTypeFilter]);

  //meeting events
  useEffect(() => {
    if (isEmpty(meetings)) return;

    const events = meetings?.map((meeting, id) =>
      ({
        backgroundColor: schedulerEnum.meeting.bgColor,
        borderColor: schedulerEnum.meeting.color,
        textColor: 'black',
        id: isNil(meeting?.meetingId) ? meetings?.length + 1 : meeting?.meetingId,
        title: meeting?.meetingSubject,
        allDay: meeting?.isAllDay,
        start: formatISO(new Date(meeting?.meetingStart)),
        end: formatISO(new Date(meeting?.meetingEnd)),
        // daysOfWeek: meeting?.reOccuring && [getDay(new Date(meeting?.meetingStart))],
        extendedProps: {
          type: eventTypes.meeting,
          color: schedulerEnum.meeting.color,
          // icon: schedulerEnum.meeting.icon,
          ...meeting,
        }
      })
    );
    setAllMeetingsData(events);
  }, [meetings]);

  //time Sheet events
  useEffect(() => {
    if (isEmpty(timeSheets)) return;

    const events = timeSheets?.map((timesheet, id) =>
      ({
        backgroundColor: timesheet?.colour || schedulerEnum.timeSheet.bgColor,
        borderColor: timesheet?.colour || schedulerEnum.timeSheet.color,
        textColor: 'black',
        id: isNil(timesheet.timeSheetId) ? timeSheets?.length + 1 : timesheet.timeSheetId,
        title: timesheet?.timeSheetTitle || '',
        allDay: (isSameHour(new Date(timesheet?.startDateTime), startOfDay(new Date(timesheet?.startDateTime)))) &&
                (isSameHour(new Date(timesheet?.endDateTime), startOfDay(new Date(timesheet?.endDateTime)))),
        start: formatISO(new Date(timesheet?.startDateTime)),
        end: formatISO(new Date(timesheet?.endDateTime)),
        extendedProps: {
          type: eventTypes.timeSheet,
          color: timesheet?.colour || schedulerEnum.timeSheet.color,
          ...timesheet,
        }
      })
    );
    setAllTimeSheetsData(events);
  }, [timeSheets]);

  // //task events
  // useEffect(() => {
  //   if (isEmpty(tasks)) return;

  //   const taskItems = flatMap(tasks, 'items');
  //   const events = taskItems?.map((task, id) =>
  //     ({
  //       backgroundColor: schedulerEnum.task.bgColor,
  //       borderColor: schedulerEnum.task.color,
  //       textColor: 'black',
  //       id: isNil(task?.taskID) ? tasks?.length + 1 : task?.taskID,
  //       title: task?.subject,
  //       allDay: true,
  //       start: formatISO(new Date(task?.dueDate)),
  //       extendedProps: {
  //         type: eventTypes.task,
  //         color: schedulerEnum.task.color,
  //         icon: schedulerEnum.task.icon,
  //         ...task,
  //       }
  //     })
  //   );
  //   setEventData(prev => [...prev, ...events]);
  // }, [tasks]);


  // //work order events
  // useEffect(() => {
  //   if (isEmpty(work)) return;

  //   const events = work?.map((workEvent, id) =>
  //     ({
  //       backgroundColor: schedulerEnum.workOrder.bgColor,
  //       borderColor: schedulerEnum.workOrder.color,
  //       textColor: 'black',
  //       id: isNil(workEvent.workOrderID) ? work?.length + 1 : workEvent.workOrderID,
  //       title: workEvent?.workOrderInstructions,
  //       allDay: false,
  //       start: formatISO(new Date(workEvent?.created)),
  //       end: formatISO(new Date(workEvent?.created)),
  //       extendedProps: {
  //         type: eventTypes.workOrder,
  //         color: schedulerEnum.workOrder.color,
  //         icon: schedulerEnum.workOrder.icon,
  //         ...workEvent,
  //       }
  //     })
  //   );
  //   setEventData(prev => [...prev, ...events]);
  // }, [work]);


  const handleEventClick = (e) => {
    setClickedEventData(e.event);
  };

  const handleDateClick = (date) => {
    // const end = date?.allDay ? subDays(date?.end, 1) : subMinutes(date?.end, 30);
    // let end = !date?.allDay ? subDays(date?.end, 1) : date?.end;

    // if (isEqual(date?.start, end)) {
    //   end = addMinutes(end, 30);
    // }

    // console.log(date?.start, end)

    setSelectedDateObj({
      ...date,
      // end,
    })
  };

  const handleDropResize = (info = {}) => {
    const { start, end, allDay, extendedProps = {} } = info?.event;

    const startDate = formatISO(start);
    const endDate = formatISO(end ? end : allDay ? addDays(start, 1) : addMinutes(start, 30));

    setLoading(true);

    const {
      color,
      type,
      ...payloadData
    } = extendedProps;

    if (extendedProps?.type === eventTypes.timeSheet) {
      dispatch(updateTimeSheetValue({
        ...payloadData,
        startDateTime: startDate,
        endDateTime: endDate,
        accountId: userAccount?.accountId,
      }))
        ?.then(() => dispatch(setSnackBar({
          open: true,
          message: 'Time Sheet schedule has been successfully updated',
        })))
        ?.catch(() => dispatch(setErrorDialogText('Error updating time sheet, please try again later.')))
        ?.finally(() => setLoading(false));

      return;
    }

    if (extendedProps?.type === eventTypes.meeting) {
      dispatch(changeMeeting({
        ...payloadData,
        meetingStart: startDate,
        meetingEnd: endDate,
        accountId: userAccount?.accountId,
        isAllDay: allDay,
      }))
        ?.then(() => dispatch(setSnackBar({
          open: true,
          message: 'Meeting schedule has been successfully updated',
        })))
        ?.catch(() => dispatch(setErrorDialogText('Error updating time sheet, please try again later.')))
        ?.finally(() => setLoading(false));

      return;
    }
  }

  return (
  <>
    <Box>
      <Calendar
        onEventClick={handleEventClick}
        // onDateClick={handleDateClick}
        eventData={allData}
        filteredData={filteredData}
        selectable
        select={handleDateClick}
        onEventDrop={handleDropResize}
        onEventResize={handleDropResize}
        loading={loading}
        // to unselect
        // info.view.calendar.unselect();
        handleTypeFilter={setSelectedTypeFilter}
        setFilterData={setFilteredData}
      />
    </Box>

    <CreateEvent
      open={!isEmpty(selectedDateObj)}
      handleClose={() => setSelectedDateObj({})}
      selectedDateObj={selectedDateObj}
    />

    {/* <MeetingForm
      isDialogOpen={isDialogOpen}
      handleClose={() => setIsDialogOpen(false)}
      extraFormProps={{
        isAllDay,
        selectedDate,
        endDate,
      }}
    /> */}

    <ViewEvent
      eventData={clickedEventData}
      handleClose={() => setClickedEventData({})}
    />
  </>
  );
}

export default CalendarEvents;
