import React, { useState, useEffect } from 'react';

import { useWatch } from 'react-hook-form';

import { Box, Typography, Button, } from '@mui/material';
import RichTextfield from 'common/input/richTextField/RichTextfield';

import { transitions } from 'core/animations';
import isEmpty from 'lodash/isEmpty';

const TaskDescription = ({
  formData = {},
  isDescriptionSaved = () => {},
  isCreate = false,
  handleChange = () => {},
}) => {
  const [localValue, setLocalValue] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike','code-block'],
    ['link', 'image',],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
  ];

  const {
    setValue,
    control,
    getValues,
  } = formData;

  const watchedData = useWatch({control});
  const { description } = watchedData;

  useEffect(() => {
    localValue === description && handleChange();

    setLocalValue(description);
  }, [description]);

  useEffect(() => {
    isDescriptionSaved(localValue === description);
  }, [localValue]);

  const handleCancel = () => {
    setShowToolbar(false);
    setLocalValue(description);
  }

  const handleSave = (value) => {
    setValue('description', value || localValue);
    isDescriptionSaved(true);
    setShowToolbar(isCreate);
  }

  return (
    <Box sx={{
      '& .ql-toolbar': {
        border: 'none',
        borderTop: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        display: showToolbar ? 'block' : 'none',
      },
      '& .ql-container': {
        border: 'none',
        borderBottom: showToolbar ? '1px solid #ccc' : 'unset',
        '& .ql-editor': {
          py: 2,
          px: 1,
          transition: transitions().shortest,
          backgroundColor: theme => (isEmpty(description) && !showToolbar) && theme.palette.common.hoverGrey+'85',
          '&:hover': {
            backgroundColor: theme => theme.palette.common.hoverGrey+'85',
          },
          wordBreak: 'break-word !important',
        }
      }
    }}>
      <Typography variant='p2' fontWeight='600' sx={{mb: .5, mt: 2.5}} component='div'>
        Description
      </Typography>
      <RichTextfield
        value={localValue}
        onChange={val => {
          if (!showToolbar) return;
          setLocalValue(val);
          isCreate && handleSave(val);
        }}

        placeholder="Add a description..."
        toolbar={toolbarOptions}
        onClick={() => setShowToolbar(true)}
      />

      {(localValue !== description && showToolbar && !isCreate) &&
        <Box display='flex' columnGap={1} mt={1}>
          <Button
            variant='contained'
            size='small'
            disableElevation
            onClick={() => handleSave()}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      }
    </Box>
  );
}

export default TaskDescription;
