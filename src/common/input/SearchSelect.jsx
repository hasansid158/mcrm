import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import {
  Autocomplete,
  FormControl,
  Box,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';

import { isArray, isEmpty, findIndex, isEqual, isString } from 'lodash';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { Controller } from 'react-hook-form';
import { camelCaseToSpace } from '../../utils/textFormatUtils';
import InputField from './InputField';

const LoadingSpinner = () => (
  <Box
    sx={{
      position: 'absolute',
      top: '55%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 5,
    }}
  >
    <CircularProgress size={25} />
  </Box>
);

const SearchSelect = ({
  formData = {},
  searchSelectData,
  name = '',
  label,
  noLabel = false,
  placeholder,
  onChange = () => {},
  onEditApply = () => {},
  disableStar = false,
  variant = 'outlined',
  required = false,
  fullWidth = true,
  helperText = null,
  size = 'small',
  rules,
  sx,
  isEditable = false,
  InputLabelProps = {},
  InputProps = {},
  inputProps = {},
  returnLabel = false,
  value,
  multiple = false,
  customLabel,
  inputFieldProps = {},
  loading = false,
  disabled = false,
  animateShrink = false,
  onBlur = () => {},
  defaultValue = null,
  ...rest
}) => {
  const [editedValue, setEditedValue] = useState(multiple ? [] : null);
  const [optionValues, setOptionValues] = useState([]);
  const [optionLabels, setOptionLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isEmptyData = !searchSelectData?.length && !disabled && loading;
    setIsLoading(isEmptyData);
  }, [searchSelectData, loading]);

  const {
    watch = () => {},
    getValues = () => {},
    setValue = () => {},
    control,
    errors,
  } = formData;

  useEffect(() => {
    setEditedValue(
      getValues(name) ? getValues(name) : multiple ? [] : defaultValue,
    );
    getValues(name) === undefined &&
      setValue(name, multiple ? [] : defaultValue);
  }, [watch(name)]);

  useEffect(() => {
    const optionsArr = searchSelectData?.map((item) => ({
      value: item?.id !== undefined ? item?.id : item?.value || null,
      label: item?.label !== undefined ? item?.label : item?.value || null,
    }));
    setOptionLabels(optionsArr?.map((option) => option?.label));
    setOptionValues(optionsArr?.map((option) => option?.value));
  }, [searchSelectData]);

  const onClickApply = useCallback(() => {
    if (editedValue === '') {
      onEditCancel();
      return;
    }
    setValue(name, editedValue);
    onEditApply(name, editedValue);
  }, []);

  const onEditCancel = useCallback(() => {
    setEditedValue(getValues(name));
  }, []);

  const isValueEditedSame = useCallback(() => {
    const value = getValues(name) || '';
    return isEditable && editedValue !== null && editedValue !== value;
  }, []);

  const handleBlur = useCallback((item) => {
    editedValue === null && onEditCancel();
    onBlur(name, item);
  }, []);

  const valueToLabel = useCallback(
    (value) => {
      if (returnLabel) return value;

      const indexOfValue = findIndex(optionValues, (opt) =>
        isEqual(value, opt),
      );

      if (indexOfValue < 0) return isString(value) ? value : '';

      return optionLabels?.[indexOfValue] || '';
    },
    [optionLabels, optionValues],
  );

  const labelToValue = useCallback(
    (value) => {
      if (!multiple) {
        const indexOfLabel = findIndex(optionLabels, (opt) =>
          isEqual(value, opt),
        );
        if (indexOfLabel < 0) return !isString(value) ? value : '';
        return optionValues?.[indexOfLabel] || '';
      } else {
        return !isArray(value) ? [value] : value || undefined;
      }
    },
    [optionValues, optionLabels],
  );

  const handleChange = useCallback((value, field) => {
    isEditable ? setEditedValue(value) : field?.onChange(value);
    onChange(name, labelToValue(value));
  }, []);

  const formControlSx = useMemo(
    () => ({
      '& .MuiAutocomplete-endAdornment': {
        top: 'auto',
        '& .MuiButtonBase-root': {
          width: '14px',
          '& svg': {
            fontSize: '16px',
          },
        },
      },
      ...(multiple
        ? {
            '& .MuiButtonBase-root': {
              height: 1,
              fontSize: '12px',
              '& svg': {
                fontSize: '16px',
              },
            },
          }
        : {}),
      '& .Mui-disabled': {
        WebkitTextFillColor: 'rgba(0, 0, 0, 0.55) !important',
      },
      '& .MuiInputBase-root': {
        ...(multiple ? { height: 'auto' } : {}),
        pr: '30px !important',
        fontSize: '13px',
        flexWrap: multiple ? 'wrap' : 'nowrap',
        overflow: multiple ? 'auto' : 'hidden !important',
      },
      ...sx,
    }),
    [],
  );

  if (isEmpty(formData))
    return (
      <Box position="relative" width={fullWidth ? '100%' : ''}>
        {!disabled && (loading || isLoading) && <LoadingSpinner />}
        {/*
      {isLabelOutside && (
        <InputLabel>
          <Typography color={'#000000'} variant='p' fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>
            {label || camelCaseToSpace(name)}
          </Typography>
        </InputLabel>
      )} */}

        <FormControl fullWidth={fullWidth} sx={formControlSx}>
          <Autocomplete
            size={size}
            loading={isLoading}
            options={returnLabel ? optionLabels || [] : optionValues || []}
            multiple={multiple}
            disableCloseOnSelect={multiple}
            disabled={disabled || loading || isLoading}
            onBlur={(e) => onBlur(name, e.target.value)}
            onChange={(e, val) => onChange(name, val)}
            value={value || (multiple ? [] : '')} // Ensure value is always defined
            // getOptionLabel={option => isString(option) ? option : valueToLabel(option)}
            getOptionLabel={(option) => valueToLabel(option)}
            renderOption={(props, option, item) => (
              <Box component="li" {...props} key={item?.index}>
                {/* {isString(option) ? option : valueToLabel(option)} */}
                {valueToLabel(option)}
              </Box>
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) =>
                customLabel ? (
                  customLabel(option, { ...getTagProps({ index }) })
                ) : (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={valueToLabel(option)}
                  />
                ),
              )
            }
            renderInput={(params) => (
              <InputField
                {...params}
                InputProp={{
                  ...params?.InputProps,
                  ...InputProps,
                }}
                inputProp={{ ...params?.inputProps, ...inputProps }}
                variant={variant}
                label={label}
                noLabel={noLabel}
                placeholder={placeholder}
                name={name}
                required={required}
                disableStar={disableStar}
                InputLabelProps={{
                  ...(!animateShrink ? { shrink: true } : {}),
                  ...InputLabelProps,
                }}
                {...inputFieldProps}
              />
            )}
            // componentsProps={{ popper: { style: { minWidth: 'fit-content' } } }}
            {...rest}
          />
        </FormControl>
      </Box>
    );

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      position="relative"
      width={fullWidth ? '100%' : ''}
    >
      {(loading || isLoading) && <LoadingSpinner />}

      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
          ...rules,
        }}
        render={({ field }) => (
          <FormControl fullWidth={fullWidth} sx={formControlSx}>
            <Autocomplete
              {...field}
              loading={isLoading}
              size={size}
              multiple={multiple}
              disableCloseOnSelect={multiple}
              disabled={disabled || loading || isLoading}
              options={returnLabel ? optionLabels || [] : optionValues || []}
              onBlur={(e) => handleBlur(e.target.value, field)}
              onChange={(e, item) => handleChange(item, field)}
              value={
                isEditable
                  ? returnLabel
                    ? valueToLabel(editedValue)
                    : labelToValue(editedValue)
                  : multiple
                    ? field.value
                      ? isArray(field.value)
                        ? field.value
                        : [field.value]
                      : []
                    : field.value !== undefined
                      ? field.value
                      : ''
              }
              // getOptionLabel={option => isString(option) ? option : valueToLabel(option)}
              getOptionLabel={(option) => valueToLabel(option)}
              renderOption={(props, option, item) => (
                <Box component="li" {...props} key={item?.index}>
                  {valueToLabel(option)}
                  {/* {isString(option) ? option : valueToLabel(option)} */}
                </Box>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) =>
                  customLabel ? (
                    customLabel(option, { ...getTagProps({ index }) })
                  ) : (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={valueToLabel(option)}
                    />
                  ),
                )
              }
              renderInput={(params) => (
                <InputField
                  {...params}
                  InputProps={{
                    ...params?.InputProps,
                    ...InputProps,
                  }}
                  error={!!errors[name]}
                  helperText={
                    !!errors[name] &&
                    (helperText ||
                      `${label || camelCaseToSpace(name)} is required`)
                  }
                  inputProps={{
                    ...params?.inputProps,
                    ...inputProps,
                    value: params?.inputProps?.value || '',
                  }}
                  variant={variant}
                  label={label}
                  noLabel={noLabel}
                  placeholder={placeholder}
                  name={name}
                  required={required}
                  disableStar={disableStar}
                  InputLabelProps={{
                    ...(!animateShrink ? { shrink: true } : {}),
                    ...InputLabelProps,
                  }}
                  {...inputFieldProps}
                />
              )}
              // componentsProps={{ popper: { style: { minWidth: 'fit-content' } } }}
              {...rest}
            />
          </FormControl>
        )}
      />
      {isValueEditedSame() && (
        <Box
          display="flex"
          sx={{
            transform: 'translateY(-8px)',
          }}
        >
          <IconButton size="small" onClick={onClickApply}>
            <CheckCircleRoundedIcon color="primary" fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onEditCancel}>
            <CancelOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default memo(SearchSelect);
