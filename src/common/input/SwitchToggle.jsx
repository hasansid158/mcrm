import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form'

import { FormControlLabel, IconButton, Box, Switch, Checkbox } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { camelCaseToSpace } from 'utils/textFormatUtils';

const SwitchToggle = ({
  formData,
  name = '',
  labelPlacement = 'start',
  size = 'small',
  onEditApply = () => {},
  isEditable = false,
  switchProps,
  isCheckBox = false,
  onChange = () => {},
  disableStar,
  label,
  ...rest
}) => {
  const [editedValue, setEditedValue] = useState(false);

  const watch = useWatch;
  const watchedData = formData?.control ? watch({control: formData?.control}) : [];

  useEffect(() => {
    formData?.setValue(name, !!watchedData[name]);
  }, []);

  useEffect(() => {
    setEditedValue(!!watchedData[name]);
  }, [watchedData]);

  const onClickApply = () => {
    formData?.setValue(name, editedValue);
    onEditApply(watchedData, editedValue);
  }

  const onEditCancel = () => {
    setEditedValue(!!watchedData[name]);
  }

  const containerSx = {
    width: '100%',
    background: 'white',
    minHeight: '40px',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    px: .5,
    '&:hover': {
      borderColor: 'primary.main',
      cursor: 'pointer',
    },
    '& .MuiFormControlLabel-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 0, m: 0,

      '& .MuiTypography-root': {
        px: 1, py: .5,
      }
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
      background: (name || label) ? 'white' : 'transparent',
      // py: .5,
    }
  }

  if(!formData) return (
    <Box
      sx={{
        width: '100%',
        background: 'white',
        ...containerSx
      }}
    >
      <FormControlLabel
        control={
          <Box
            component={isCheckBox ? Checkbox : Switch}
            {...switchProps}
            size={size}
            onChange={(e, val) => onChange(name, val)}
          />
        }
        labelPlacement={labelPlacement}
        label={label || camelCaseToSpace(name || '')}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...containerSx
      }}
      onClick={e => {
        e.stopPropagation();
        if (!formData) return;
        formData?.setValue(name, !formData?.getValues(name));
      }}
    >
      <FormControlLabel
        control={
          <Controller
            name={name}
            control={formData?.control}
            render={({ field }) => (
              <Box
                {...field}
                component={isCheckBox ? Checkbox : Switch}
                value={!!field?.value}
                onChange={(e) => {
                  isEditable
                    ? setEditedValue(e.target.checked)
                    : field?.onChange(e.target.checked);
                  onChange(name, e.target.checked);
                } }
                size={size}
                checked={isEditable ? editedValue : !!field?.value}
              />
            )}
          />
        }
        labelPlacement={labelPlacement}
        label={label || camelCaseToSpace(name || '')}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      />

      {isEditable && editedValue !== !!formData?.getValues(name) &&
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
      }
    </Box>
  );
}

export default SwitchToggle;
