import React from 'react';

import { Controller } from 'react-hook-form'

import {Slider, Box, Typography} from '@mui/material';

const SliderSelector = ({
  name = '',
  label,
  formData,
  required,
  onChange = () => {},
  defaultValue = 0, // default range values
  ...rest
}) => {
  return <>
    {label &&
      <Box mb={1}>
        {label}
      </Box>
    }

    {formData
      ?
        <Controller
          name={name}
          control={formData?.control}
          rules={{required}}
          render={({ field }) => (
            <Slider
              {...field}
              value={field.value ?? defaultValue}
              onChange={(e, value) => {
                field?.onChange(value);
                onChange(name, value);
              }}
              valueLabelDisplay="auto"
              {...rest}
            />
          )}
        />
      :
        <Slider
          defaultValue={defaultValue}
          onChange={(e, value) => onChange('', value)}
          {...rest}
        />
    }
  </>;
}

export default SliderSelector;
