import React, { useState, useEffect } from 'react';
import { format, addMinutes, startOfDay, differenceInMinutes, isAfter, addDays, differenceInCalendarDays } from 'date-fns';
import SliderSelector from './SliderSelector';
import { isEmpty } from 'lodash';

const TimeRangePicker = ({
  setLabel = () => {},
  onChange = () => {},
  name = '',
  formData,
  receivedStartTime,
  receivedEndTime,
  ...rest
}) => {
  const [value, setValue] = useState([0, 48]);
  const [selectedTimes, setSelectedTimes] = useState({startTime: '12:00 AM', endTime: '12:00 AM'});
  const [customLabel, setCustomLabel] = useState('');
  const [disabled, setDisabled] = useState(false);

  const convertTimeToRange = (time) => {
    const minutesDifference = differenceInMinutes(time, startOfDay(time));
    return Math.floor(minutesDifference / 30);
  };

  const handleTimeChange = (name, value, timeValues = {}) => {
    let [start, end] = value;

    if (start > 47) return;

    if (end - start < 1) {
      end = start + 1;
    }

    formData ? formData?.setValue(name, [start, end]) : setValue([start, end]);

    const startTime = addMinutes(startOfDay(new Date()), start * 30);
    const currentDate = receivedStartTime ? new Date(receivedStartTime) : new Date();
    const endTime = addMinutes(startOfDay(currentDate), end * 30);

    const formattedTime = !isEmpty(timeValues) ? timeValues : { startTime: format(startTime, 'p'), endTime:  format(endTime, 'p') };

    setSelectedTimes(formattedTime);

    if (!isEmpty(timeValues)) return;

    const formatString = "yyyy-MM-dd'T'HH:mm:ss";
    onChange(name, value, format(startTime, formatString), format(endTime, formatString));
  };

  useEffect(() => {
    setDisabled(false);

    const startDateTime = new Date(receivedStartTime);
    const endDateTime = new Date(receivedEndTime);

    const nextDayAfterStart = addDays(startOfDay(startDateTime), 1);

    if (isAfter(endDateTime, nextDayAfterStart)) {
      handleTimeChange(name, [0, 48], { startTime: format(startDateTime, 'p'), endTime:  format(endDateTime, 'p') });
      setDisabled(true);
      return;
    };

    const start = receivedStartTime ? convertTimeToRange(startDateTime) : 0;
    const end = receivedEndTime ? differenceInCalendarDays(endDateTime, startDateTime) === 1 ? 48 : convertTimeToRange(endDateTime) : 48;

    handleTimeChange('', [start, end], true);
  }, [receivedStartTime, receivedEndTime]);

  useEffect(() => {
    setCustomLabel(setLabel(selectedTimes?.startTime || '', selectedTimes?.endTime || ''));
  }, [selectedTimes]);

  const formatTimeLabel = (value) => {
    const time = addMinutes(startOfDay(new Date()), value * 30);
    return format(time, 'h:mm a');
  };

  if (formData) return (
    <>
      <SliderSelector
        name={name}
        formData={formData}
        min={0}
        max={48}
        step={1}
        onChange={handleTimeChange}
        valueLabelFormat={formatTimeLabel}
        label={customLabel}
        disableSwap
        disabled={disabled}
        {...rest}
      />
    </>
  );

  return (
    <>
      <SliderSelector
        name={name}
        value={value}
        min={0}
        max={48}
        step={1}
        onChange={handleTimeChange}
        valueLabelFormat={formatTimeLabel}
        label={customLabel}
        disableSwap
        disabled={disabled}
        {...rest}
      />
    </>
  );
};

export default TimeRangePicker;
