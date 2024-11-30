import React, { useEffect, useState } from 'react';

import { Grid, Typography, Box } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import Selector from 'common/input/Selector';
import SearchSelect from 'common/input/SearchSelect';
import InputField from 'common/input/InputField';
import DatePicker from 'common/input/DatePicker';
import TimeRangePicker from 'common/input/TimeRangePicker';

import { numberOnly } from 'utils/textFormatUtils';
import { setDateTimeSame } from 'utils/helperFunctions';

import { addMinutes, isSameDay, isAfter, startOfDay, addDays } from 'date-fns';

import CustomerProjectSelectors from '../dynamicSelectorFields/CustomerProjectSelectors';
import { isEmpty } from 'lodash';

import { fetchTimeSheetStatuses } from 'redux/slices/listSlice/listSlice';

const TSResourceTab = ({ formData }) => {
  const dispatch = useDispatch();
  const [statusLoading, setStatusLoading] = useState(false);

  const {
    warehouses,
    userList,
    timeSheetStatuses,
  } = useSelector(state => state.lists);

  useEffect(() => {
    if (!isEmpty(timeSheetStatuses)) return;

    setStatusLoading(true);
    dispatch(fetchTimeSheetStatuses())
      ?.finally(() => setStatusLoading(false));

  }, [timeSheetStatuses]);

  const gridSizing = {
    sm: 6,
    xs: 12
  };

  const colors = [
    { value: '#6EB5FF', label: 'Blue' },
    { value: '#FF6F85', label: 'Red' },
    { value: '#FFB74D', label: 'Orange' },
    { value: '#E9A3E7', label: 'Pink' },
    { value: '#C2A1E2', label: 'Purple' },
    { value: '#fff578', label: 'Yellow' },
  ];

  return (
    <Grid
      sx={{px: { xs: 1, sm: 2 }}}
      py={2}
      container
      rowSpacing={3}
      columnSpacing={4}
    >
      <CustomerProjectSelectors
        formData={formData}
        {...gridSizing}
        xs={12}
        sm={6}
        md={6}
      />

      <Grid {...gridSizing} item>
        <SearchSelect
          required
          formData={formData}
          name='warehouseID'
          label='Warehouse'
          searchSelectData={warehouses}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          required
          formData={formData}
          name='statusID'
          label='Status'
          searchSelectData={timeSheetStatuses}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          required
          formData={formData}
          name='userID'
          label='User'
          searchSelectData={userList?.list}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='olaTarget'
          label='OLA Target'
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='slaTarget'
          label='SLA Target'
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='vehicle'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <Selector
          formData={formData}
          name='colour'
          required
          selectorData={colors}
          customLabel={(value, label) => (
            <Box display='flex' alignItems='center' columnGap={1}>
              <Box
                width='16px'
                height='16px'
                sx={{
                  backgroundColor: value,
                  borderRadius: '50%',
                }} />
              <Typography variant='p2'>{label}</Typography>
            </Box>
          )}
        />
      </Grid>

      <Grid {...gridSizing} sm={3.5} item>
        <DatePicker
          required
          formData={formData}
          name='startDateTime'
          isDateTime
          minutesStep={30}
          // maxDate={formData?.getValues('endDateTime')}
          // maxTime={subMinutes(new Date(formData?.getValues('endDateTime')), 30)}
          onChange={value => {
            if (
              formData?.getValues('endDateTime') &&
              isAfter(new Date(formData?.getValues('startDateTime')), new Date(formData?.getValues('endDateTime')))
            ) {
              formData?.setValue('endDateTime', addMinutes(new Date(formData?.getValues('startDateTime')), 30));
            } else {
              !formData?.getValues('endDateTime') && formData?.setValue('endDateTime', startOfDay(addDays(new Date(formData?.getValues('startDateTime')), 1)));
            }
          }}
        />
      </Grid>

      <Grid {...gridSizing} sm={3.5} item>
        <DatePicker
          // required
          formData={formData}
          name='endDateTime'
          minDate={addMinutes(new Date(formData?.getValues('startDateTime')), 30)}
          minTime={
            isSameDay(new Date(formData?.getValues('startDateTime')), new Date(formData?.getValues('endDateTime'))) &&
            addMinutes(new Date(formData?.getValues('startDateTime')), 30)
          }
          isDateTime
          minutesStep={30}
        />
      </Grid>

      <Grid {...gridSizing} sm={5} item>
        <TimeRangePicker
          required
          setLabel={(startTime, endTime) => (
            <Typography variant='p2'>Start Time: <Box component='span' fontWeight='600'>{startTime}</Box> - End Time <Box component='span' fontWeight='600'>{endTime}</Box></Typography>
          )}
          onChange={(name, value, start, end) => {
            formData?.getValues('startDateTime') && formData?.setValue('startDateTime', setDateTimeSame(formData?.getValues('startDateTime'), start));
            formData?.getValues('endDateTime') && formData?.setValue('endDateTime', end);
          }}
          receivedStartTime={formData?.getValues('startDateTime')}
          receivedEndTime={formData?.getValues('endDateTime')}
        />
      </Grid>

    </Grid>
  );
}

export default TSResourceTab;
