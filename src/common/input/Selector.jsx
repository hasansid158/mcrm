import React, { useEffect, useState } from 'react'
import {
  TextField,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { Controller } from 'react-hook-form'
import {
  camelCaseToSpace,
} from '../../utils/textFormatUtils';

import InputField from './InputField';

export default function Selector({
  selectorData = [],
  customLabel,
  sx,
  required,
  placeholder,
  ...rest
}) {

  return (
    <InputField
      select
      sx={{
        '& .MuiSelect-select' :{
          display: 'flex',
        },
        '& .Mui-disabled': {
          'WebkitTextFillColor': 'rgba(0, 0, 0, 0.55) !important',
        },
        ...sx
      }}
      required={required}
      SelectProps={{
        displayEmpty: true,
        renderValue: (value) => {
          if (value === '' || value === undefined) {
            return <em>{placeholder}</em>;
          }
          const selectedLabel = selectorData.find((data) => data.value === value)?.label;
          return customLabel ? customLabel(value, selectedLabel) : selectedLabel;
        },
      }}
      {...rest}
    >
      {!required &&
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
      }
      {selectorData.map((data, key) => (
        <MenuItem
          key={key}
          value={data?.value}
        >
          {customLabel ? customLabel(data?.value, data?.label) : data?.label}
        </MenuItem>
      ))}
    </InputField>
  )
}