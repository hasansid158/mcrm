import React, { useEffect } from 'react';

import { eventTypes } from 'enum/schedulerEnum';

import ViewMeetingDialog from './ViewMeetingDialog';
import ViewTimeSheetDialog from './ViewTimeSheetDialog';


const ViewEvent = ({
  eventData = {},
  handleClose = () => {},
}) => {

  const {
    extendedProps = {},
    extendedProps: { type } = {} ,
  } = eventData;

  return <>
    <ViewMeetingDialog
      open={type === eventTypes.meeting}
      handleClose={handleClose}
      eventData={eventData}
    />

    <ViewTimeSheetDialog
      eventData={type === eventTypes.timeSheet ? extendedProps : {}}
      handleClose={handleClose}
    />
  </>;
}

export default ViewEvent;
