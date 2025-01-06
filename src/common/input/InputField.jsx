import React, { useEffect, useState, useCallback } from 'react'
import { TextField, InputAdornment, Box, IconButton, InputLabel, Typography } from '@mui/material'

import { useWatch, Controller } from 'react-hook-form';

import {
  camelCaseToSpace,
  trimText
} from '../../utils/textFormatUtils';

import { isEmpty } from 'lodash';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function InputField({
  formData,
  name = '',
  label,
  noLabel = false,
  placeholder,
  onChange = () => { },
  onBlur = () => { },
  onEditApply = () => { },
  disableTrim = false,
  disableStar = false,
  variant = 'outlined',
  format = null,
  required = false,
  fullWidth = true,
  size = 'small',
  helperText = null,
  error = false,
  InputProp,
  inputProp,
  endAdornment,
  startAdornment,
  rules,
  isEditable = false,
  isSmallHeight = false,
  sx = {},
  type,
  isLabelOutside = false,
  multiline,
  readOnly = false,
  ...rest
}) {
  const [editedValue, setEditedValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const watch = useWatch;
  const watchedData = formData?.control && watch({control: formData?.control})[name];

  useEffect(() => {
    (isEditable && editedValue) && onEditApply(name, editedValue);

    setEditedValue(watchedData || '');
    watchedData === undefined && formData?.setValue(name, type === 'number' ? 0 : '');
  }, [watchedData]);

  const trimOnBlur = () => {
    if (type === 'number') return;

    if (isEditable) {
      setEditedValue(trimText(editedValue) || trimText(watchedData));
    } else {
      formData?.setValue(name, trimText(editedValue));
    }
  }

  const formatOnChange = (value) => {
    return format ? format(value) : value;
  }

  const onClickApply = () => {
    if (editedValue === '') { onEditCancel(); return; };
    formData?.setValue(name, editedValue);
  }

  const onEditCancel = () => {
    setEditedValue(watchedData);
  }

  const isValueEditedSame = () => {
    const value = watchedData;
    return isEditable && editedValue !== '' && editedValue !== value;
  }

  const renderLabel = useCallback(
    () => {
      if (isLabelOutside || noLabel) return;

      const hasStar = (required && !disableStar);  
      const labelText = label || camelCaseToSpace(name) || '';

      const labelWithStar = <>
        {labelText}&nbsp; 
        <Typography 
          variant='h5' 
          color='crimson'
          component='span'
        >
          *
        </Typography>
      </>;
  
      if (!!hasStar) return labelWithStar;
      return labelText;
      
    }, [isLabelOutside, noLabel, label, name, required, disableStar],
  );
  
  const inputProps = (field) => ({
    label: renderLabel(),
    placeholder: placeholder && (placeholder || camelCaseToSpace(name)),
    onBlur: (e) => {
      !disableTrim && trimOnBlur();
      onBlur(e, e.target.value);
      field?.onBlur(formatOnChange(e.target.value));
    },
    onChange: (e) => {
      if (isEditable) {
        setEditedValue(formatOnChange(e.target.value));
      } else {
        e.target.value = formatOnChange(e.target.value);
        field?.onChange(formatOnChange(e.target.value));
      }
      onChange(name, e.target.value);
    },
    variant: variant,
    fullWidth: fullWidth,
    size: size,
    sx: {
      ...(multiline ? {
        '& .MuiInputBase-root': {
          height: 'auto',
        }
      } : {}),
      ...(isSmallHeight ? {
        '& .MuiInputBase-input': {
          py: '4.5px !important',
          fontSize: '13px',
        }
      } : {}),
      ...sx,
    },
    multiline: multiline,
    ...rest,
  });

  const getEmailValidationRules = () => ({
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Invalid email format',
    },
  });

  const ShowPasswordButton = () => (
    <IconButton
      size='small'
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  )

  if (formData) return (
    <Box display='flex' alignItems='flex-start'>
      <Controller
        control={formData?.control}
        name={name}
        rules={{
          required: required,
          ...(type === 'email' ? getEmailValidationRules() : {}),
          ...rules
        }}
        render={({ field }) => (
          <Box width={'100%'} display={'flex'} gap={2} flexDirection={'column'}>
            {isLabelOutside && (
              <InputLabel>
                <Typography color={'#000000'} variant='p' fontSize={{ xs: "12px", sm: "14px", md: "16px" }}>
                  {label || camelCaseToSpace(name)}
                </Typography>
              </InputLabel>
            )}
            <TextField
              {...field}
              error={!!formData?.errors[name]}
              helperText={!!formData?.errors[name] &&
                (formData?.errors[name]?.message || helperText || `${label || placeholder || camelCaseToSpace(name)} is required`)
              }
              inputProps={inputProp}
              InputProps={{
                endAdornment:
                  <InputAdornment position={'end'}>
                    {type === 'password' ? <ShowPasswordButton /> : endAdornment}
                  </InputAdornment>,
                startAdornment:
                  <InputAdornment position={'start'}>
                    {startAdornment}
                  </InputAdornment>,
                type: showPassword ? '' : type,
                readOnly: readOnly,
                sx: readOnly ? {
                  userSelect: 'none',
                  pointerEvents: 'none',
                } : {},
                ...InputProp,
              }}
              value={isEditable ? editedValue : field?.value !== undefined ? field?.value : ''}
              {...inputProps(field)}
            />
          </Box>
        )}
      />
      {isValueEditedSame() &&
        <Box
          display='flex'
          sx={{
            transform: 'translateY(12px)'
          }}
        >
          <IconButton
            size='small'
            onClick={onClickApply}
          >
            <CheckCircleRoundedIcon color='primary' fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={onEditCancel}
          >
            <CancelOutlinedIcon fontSize='small' />
          </IconButton>
        </Box>
      }
    </Box>
  )

  return (
    <TextField
      helperText={error &&
        (helperText || `${camelCaseToSpace(name)} is required`)
      }
      error={error}
      name={name}
      inputProps={inputProp}
      InputProps={{
        endAdornment: <InputAdornment position={'end'}>
          {endAdornment}
        </InputAdornment>,
        startAdornment: <InputAdornment position={'start'}>
          {startAdornment}
        </InputAdornment>,
        type: showPassword ? '' : type,
        readOnly: readOnly,
        sx: readOnly ? {
          userSelect: 'none',
          pointerEvents: 'none',
        } : {},
        ...InputProp,
      }}
      {...inputProps()}
    />
  )
}
