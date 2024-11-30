import React, { useState, useEffect } from 'react';

import PaperBox from 'common/ui/PaperBox';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import useScreenSize from 'hooks/useScreenSize';

import { eventTypes } from 'enum/schedulerEnum';

import TableFilters from 'pages/components/TableFilters';

import useReactForm from 'hooks/useReactForm';

import { useSelector } from 'react-redux';

const HeaderToolbar = ({
  calendarRef,
  handleTypeFilter = () => {},
  data = [],
  setFilterData = () => {},
}) => {
  const {isMobile, isTablet} = useScreenSize();

  const [viewKey, setViewKey] = useState(2);
  const [tempViewKey, setTempViewKey] = useState(2);
  const [typeKey, setTypeKey] = useState(0);
  const [currentDateLabel, setCurrentDateLabel] = useState('');

  const {
    userCustomers = [],
    userProjects = [],
  } = useSelector(state => state?.userDetails);
  const {
    workOrderList,
    userList,
    warehouses,
  } = useSelector(state => state?.lists);

  const calendarAPI = calendarRef?.current?.getApi();

  const CustomButton = ({children, sx, ...rest}) => (
    <Button color='secondary' {...rest} sx={{height: '35px', ...sx}}>
      {children}
    </Button>
  );

  const viewEnum = [
    {
      label: 'Year',
      action: () => {
        calendarAPI?.changeView('listYear');
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
    {
      label: 'Month',
      action: () => {
        calendarAPI?.changeView('dayGridMonth');
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
    {
      label: 'Week',
      action: () => {
        calendarAPI?.changeView('timeGridWeek');
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
    {
      label: 'Day',
      action: () => {
        calendarAPI?.changeView('timeGridDay');
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
  ];

  const typeEnum = [
    {
      type: 'all',
      label: 'All',
      action: () => {},
    },
    {
      type: eventTypes.timeSheet,
      label: 'Time Sheets',
      action: () => {},
    },
    // {
    //   label: 'Calls',
    //   action: () => {},
    // },
    {
      type: eventTypes.meeting,
      label: 'Meetings',
      action: () => {},
    },
    // {
    //   label: 'Work',
    //   action: () => {},
    // },
  ];

  const moverEnum = [
    {
      label: <ArrowLeftIcon/>,
      action: () => {
        calendarAPI?.prev();
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
    {
      label: 'Today',
      action: () => {
        calendarAPI?.today();
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
    {
      label: <ArrowRightIcon/>,
      action: () => {
        calendarAPI?.next();
        setCurrentDateLabel(calendarAPI?.getCurrentData()?.viewTitle);
      },
    },
  ];

  const { formData, reset } = useReactForm();

  const filterSelectorEnum = [
    {
      name: 'global',
      label: 'Global search',
      placeholder: 'Search work order...',
      isInput: true,
    },
    {
      name: "projectId",
      label: "Project",
      data: userProjects,
      multiple: true,
    },
    {
      name: "customerId",
      label: "Customer",
      data: userCustomers,
      multiple: true,
    },
    {
      name: "workOrderID",
      label: "Work Order",
      data: workOrderList,
      multiple: true,
    },
    {
      name: "warehouseID",
      label: "Warehouse",
      data: warehouses,
      multiple: true,
    },
    {
      name: "userID",
      label: "User",
      data: userList?.list,
      multiple: true,
    },
    {
      name: "startDateTime",
      label: "Start Date",
      startDate: true,
    },
    {
      name: "endDateTime",
      label: "End Date",
      endDate: true,
    },
  ];

  return (
    <PaperBox sx={{ backgroundColor: 'white', mb: .5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', lg: 'space-between' },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          // justifyContent='space-between'
          justifyContent={isTablet ? 'space-between' : 'flex-start'}
          flexDirection={isMobile ? 'column-reverse' : 'row'}
          gap={2}
          minWidth={isMobile ? '100%' : '350px'}
        >
          <ButtonGroup size='small' disableElevation>
            {moverEnum?.map((item, key) => (
              <CustomButton
                variant={item?.label === 'Today' ? 'contained' : 'outlined'}
                onClick={item?.action}
                key={key}
              >
                {item?.label}
              </CustomButton>
            ))}
          </ButtonGroup>
          <Typography variant='h4'>
            {currentDateLabel || calendarAPI?.getCurrentData()?.viewTitle || ''}
          </Typography>
        </Box>

        <Box
          display='flex'
          rowGap={2}
          sx={{
            columnGap: { xs: 2, lg: 4 },
          }}
          justifyContent='center'
          alignItems='center'
          flexWrap='wrap'
        >
          <ButtonGroup size='small' disableElevation>
            {viewEnum?.map((view, key) => (
              <CustomButton
                variant={viewKey === key ? 'contained' : 'outlined'}
                onClick={() => {
                  view?.action();
                  setViewKey(key);
                  setTempViewKey(key);
                }}
                key={key}
              >
                {view?.label}
              </CustomButton>
            ))}
          </ButtonGroup>

          <ButtonGroup
            size='small'
            disableElevation
            // sx={{flex: 1}}
          >
            {typeEnum?.map((type, key) => (
              <CustomButton
                variant={typeKey === key ? 'contained' : 'outlined'}
                onClick={() => {
                  type?.action();
                  setTypeKey(key);
                  handleTypeFilter(type?.type);
                }}
                key={key}
              >
                {type?.label}
              </CustomButton>
            ))}
          </ButtonGroup>
        </Box>

        <TableFilters
          filterSelectorEnum={filterSelectorEnum}
          data={data}
          formData={formData}
          resetFields={() => reset({})}
          handleChange={(filteredData, values) => {
            setFilterData(filteredData);
          }}
          hasFilteredData={hasFiltered => {
            if (hasFiltered) {
              setViewKey(0);
              viewEnum?.[0]?.action();
            } else {
              setViewKey(tempViewKey);
              viewEnum?.[tempViewKey]?.action();
            }
          }}
          isSmall
          returnValue
          isCalendarData
        />
      </Box>
    </PaperBox>
  );
}

export default HeaderToolbar;
