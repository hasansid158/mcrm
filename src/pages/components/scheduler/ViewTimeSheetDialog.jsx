import React, { useEffect, useState } from 'react';

import TimeSheets from 'pages/interactions/TimeSheets';

import { getTimeSheetBookingById } from 'api/interactionsApis';
import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

const ViewTimeSheetDialog = ({
  eventData = {},
  handleClose = () => {},
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState({});

  // useEffect(() => {
  //   if (isEmpty(eventData)) return;

  //   setDialogOpen(true)
  //   setLoading(true);

  //   getTimeSheetBookingById(eventData?.timeSheetId)
  //     ?.then(res => setTimeSheetData(res))
  //     .catch(() => dispatch(setErrorDialogText('Error fetching time sheet data, please try again later.')))
  //     .finally(() => setLoading(false));

  // }, [eventData]);


  return (
    <TimeSheets
      formsOnly
      updateEditRowData={eventData}
      drawerProps={{
        open: !isEmpty(eventData),
        isDialog: true,
      }}
      handleDrawerClose={() => {
        handleClose();
      }}
    />
  );
}

export default ViewTimeSheetDialog;
