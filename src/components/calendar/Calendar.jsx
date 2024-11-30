import React, { useRef } from 'react';

import { Box, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import useScreenSize from 'hooks/useScreenSize';
import HeaderToolbar from './HeaderToolbar';
import { eventTypes } from 'enum/schedulerEnum';

import format from 'date-fns/format';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

const Calendar = ({
  eventData = [],
  filteredData = [],
  isList = false,
  onEventClick = () => {},
  onDateClick = () => {},
  onEventDrop = () => {},
  onEventResize = () => {},
  loading = false,
  handleTypeFilter = () => {},
  setFilterData = () => {},
  ...rest
}) => {
  const { isMobile, isTablet } = useScreenSize();
  const calendarRef = useRef();

  const renderEventContent = (info = {}) => {
    const {
      borderColor,
      event: { extendedProps, end, start },
      timeText,
      view,
    } = info;

    return (
      <Box
        px={.5}
        py='2px'
        height='100%'
        overflow='hidden'
      >
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transform: 'translateY(-1px)',
          }}
        >
          {view?.type !== 'listYear' && extendedProps?.type === eventTypes.meeting &&
            <Typography
              variant='textLink'
              backgroundColor={borderColor}
              sx={{
                display: 'inline-block',
                px: .5,
                mr: .5,
                borderRadius: '5px',
                minWidth: '10px',
                minHeight: '10px',
                // fontWeight: '600',
                '& svg': {
                  fontSize: '14px',
                  transform: 'translateY(2px)',
                  mr: .2,
                }
              }}
            >
              {/* {extendedProps?.icon} */}
              {/* {schedulerEnum?.[extendedProps?.type || '']?.name || ''} */}
            </Typography>
          }
          <Typography
            variant='p3'
            sx={{ lineHeight: '13px'}}
          >
            {info?.event?.title}
            {timeText ? ' - '+timeText : (start && end) ? ` - ${format(start, 'LLL dd')}/${format(end, 'LLL dd')}` : ''}
          </Typography>
        </Box>
      </Box>
    );
  }


  return <>
    <HeaderToolbar
      calendarRef={calendarRef}
      handleTypeFilter={handleTypeFilter}
      data={eventData}
      setFilterData={setFilterData}
    />
    <Box
      sx={{
        position: 'relative',
        background: 'white',
        borderRadius: '20px',
        '& .fc-scrollgrid': {
          borderCollapse: 'separate',
          borderSpacing: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #E1E2E3',
        },
        '& .fc-event': {
          borderWidth: '1px',
          borderRadius: '8px',
        },
        '& .fc-scroller-liquid-absolute': {
          overflow: 'auto !important',
        },
        '& .fc, .fc-button': {
          fontSize: theme => (
            isMobile ? theme.typography.description.fontSize
                    : theme.typography.p2.fontSize
            ),
        },
        '& .fc-toolbar-title': {
          fontSize: theme => (
            isMobile ? theme.typography.p.fontSize
                    : theme.typography.h4.fontSize
            ),
        },
        '& .fc-toolbar': {
          flexWrap: 'wrap',
          rowGap: '8px',

          '& .fc-toolbar-chunk:last-child':
          isMobile && !isList && {
            flexGrow: 1,
            width: '100%',
          }
        },
        '& .fc-day-today': {
          backgroundColor: theme => `${theme.palette.primary.main}10 !important`,
        },
        '& .fc-list-day': {
          position: 'relative',
          zIndex: 2,
        },
        '& .fc-col-header-cell': {
          backgroundColor: theme => theme?.palette.common.backgroundGrey,
        },
        '& .fc-direction-ltr .fc-timegrid-slot-label-frame': {
          textAlign: 'center',
        }
      }}
    >
      <FullCalendar
        ref={calendarRef}
        events={filteredData}
        eventClick={onEventClick}
        dateClick={onDateClick}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
        ]}
        dayMaxEventRows={6}
        initialView={isList ? 'listYear' : "timeGridWeek"}
        height='calc(100dvh - 135px)'
        // headerToolbar={!isList ? {
        //   left: 'listYear,dayGridMonth,timeGridWeek,timeGridDay',
        //   center: isMobile ? 'today prev,next' : 'title',
        //   right: isMobile ? 'title' : 'today prev,next',
        // } : {
        //   left: 'title',
        //   center: '',
        //   right: 'prev,next',
        // }}
        headerToolbar={false}
        editable={true}
        droppable={true}
        eventResize={onEventResize}
        eventDrop={onEventDrop}
        eventContent={(info) => renderEventContent(info)} // Custom event tile rendering
        dayHeaderContent={(info) => {
          const isYear = info?.view?.type === 'listYear';

          return (
            <Box
              height={isYear ? '24px' : '48px'}
              display='flex'
              alignItems='center'
            >
              <Typography variant='p' fontWeight={600}>
                {info?.text || ''}
              </Typography>
            </Box>
          )
        }}
        dayCellContent={info => (
          <Typography variant='p2' fontWeight={info?.isToday ? '600' : '500'}>
            {info?.dayNumberText || ''}
          </Typography>
        )}
        allDayContent={<Typography variant='description' fontWeight='600'>All Day</Typography>}
        slotLabelContent={info => <Typography variant='description' fontWeight='500'>{info?.text || ''}</Typography>}
        nowIndicator={true}
        scrollTime="00:00:00"
        datesSet={(info) => {
          const calendarApi = info.view.calendar;
          const currentTime = new Date();
          calendarApi.scrollToTime(currentTime);
        }}
        {...rest}
      />

      <SpinLoader loading={loading}/>
    </Box>
  </>;
};

export default Calendar;
