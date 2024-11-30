import React, { useState, useEffect } from 'react';

import InputField from './InputField';
import useScreenSize from '../../hooks/useScreenSize';
import { Controller } from 'react-hook-form'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, MobileDatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { Box, IconButton } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { isValid, format, parseISO } from 'date-fns';

const DatePicker = ({
  formData,
  name = '',
  inputFormat = 'dd/MM/yyyy',
  dateFormat = "yyyy-MM-dd'T'HH:mm:ss",
  openTo = 'year',
  required = false,
  isEditable = false,
  minTime,
  maxTime,
  isDateTime = false,
  onChange = () => {},
  onEditApply = () => {},
  isSmallHeight,
  textFieldProps = {},
  size = 'small',
  actions = ['cancel', 'accept'],
  ...rest
}) => {
  const { isMobile } = useScreenSize();
  const [isError, setIsError] = useState(null);
  const [editedValue, setEditedValue] = useState(null);

  useEffect(() => {
    formData?.getValues(name) === undefined && formData?.setValue(name, null);
    setEditedValue(formData?.getValues(name) || null);
    formData?.getValues(name) && onChange(formData?.getValues(name));
  }, [formData?.watch(name)]);

  // const minYear = minDate?.getFullYear() ?? addYears(new Date(), -100).getFullYear();
  // const maxYear = maxDate?.getFullYear() ?? addYears(new Date(), 100).getFullYear();

  const onChangeHandler = (field, newDate) => {
    setIsError('Invalid Date');

    if(isValid(newDate) || newDate === null) {
      setIsError(null);
      isEditable
        ? setEditedValue(newDate)
        : field?.onChange(format(newDate, dateFormat));
      onChange(format(newDate, dateFormat));
    }
  };

  const onClickApply = () => {

    if(!isValid(editedValue)) {onEditCancel(); return;};
    formData?.setValue(name, format(editedValue, dateFormat));
    onEditApply(formData.getValues(), editedValue);
  }

  const onEditCancel = () => {
    setEditedValue(parseISO(formData?.getValues(name)));
    setIsError(null);
  }

  const isValueEditedSame = () => {
    const value = formData?.getValues(name);
    if (!isEditable || value === undefined) return;

    const formattedDate = format(new Date(value), 'dd/MM/yyyy');
    const formattedEditedDate = format(new Date(editedValue), 'dd/MM/yyyy');
    return (formattedDate !== formattedEditedDate && !!!isError);
  }

  const handleBlur = () => {
    isEditable && !!isError && onEditCancel();
  }

  const datePickerProps = (field) => ({
    inputFormat: `${inputFormat}${isDateTime ? ' hh:mm a' : ''}`,
    openTo: 'day',
    ...(isEditable ? {value: editedValue} : {}),
    onChange: (newDate) => onChangeHandler(field, newDate),
    componentsProps:{
      actionBar: { actions }
    },
    renderInput: (params) => (
      <InputField
        {...params}
        ref={null}
        name={name}
        required={required}
        error={!!isError || !!formData?.errors[name]}
        helperText={isError}
        InputLabelProps={{shrink: true}}
        onBlur={handleBlur}
        isSmallHeight={isSmallHeight}
        size={size}
        placeholder={isDateTime ? 'Click to select' : ''}
        {...textFieldProps}
        />
    ),
    ...rest,
  });

  const EditButtons = () => (
    <>
      <IconButton
        size='small'
        onClick={onClickApply}
      >
        <CheckCircleRoundedIcon color='primary' fontSize='small'/>
      </IconButton>
      <IconButton
        size='small'
        onClick={onEditCancel}
      >
        <CancelOutlinedIcon fontSize='small'/>
      </IconButton>
    </>
  );

  if (!formData) {
    if(isDateTime) return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateTimePicker
          minTime={minTime}
          maxTime={maxTime}
          {...datePickerProps()}
          // value={field.value || null}
        />
      </LocalizationProvider>
    )
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isMobile ?
          <MobileDatePicker
            {...datePickerProps()}
            // value={field.value || null}
          />
        : <DesktopDatePicker
          {...datePickerProps()}
            // value={field.value || null}
          />
        }
      </LocalizationProvider>
    )
  }

  if(isDateTime) return (
    <Box display='flex' alignItems='flex-end'>
      <Controller
        name={name}
        control={formData.control}
        rules={{required}}
        render={
          ({ field }) =>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              minTime={minTime}
              maxTime={maxTime}
              {...field}
              {...datePickerProps(field)}
              // value={field.value || null}

            />
          </LocalizationProvider>
          }
      />
      {isValueEditedSame() && <EditButtons/>}
    </Box>
  )

  return (
    <Box display='flex' alignItems='flex-end'>
      <Controller
        name={name}
        control={formData.control}
        rules={{required}}
        render={
          ({ field }) =>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              {isMobile ?
                <MobileDatePicker
                  {...field}
                  {...datePickerProps(field)}
                  // value={field.value || null}
                  />
              : <DesktopDatePicker
                {...field}
                {...datePickerProps(field)}
                  // value={field.value || null}
                  />
              }
          </LocalizationProvider>
        }
      />
      {isValueEditedSame() && <EditButtons/>}
    </Box>
  );
};

export default DatePicker;