import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';
import DatePicker from 'common/input/DatePicker';
import SwitchToggle from 'common/input/SwitchToggle';

import useScreenSize from 'hooks/useScreenSize';
import { useSelector } from 'react-redux';

const TaskForm = ({
  formData,
  isEdit = false,
  handleEditApply = () => {},
}) => {
  const { isMobile } = useScreenSize();

  const {
    accountList,
  } = useSelector(state => state.lists)

  const commonInputProps = {
    formData: formData,
    isEditable: isEdit,
    onEditApply: handleEditApply,
  };

  const gridItemSize = {
    sm: 4,
    xs: 12,
  };

  return (
    <>
      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
      }}>
        <Typography>Task Information</Typography>
      </Box>

      <Grid
        px={!isMobile && 4}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='taskOwner'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='subject'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            {...commonInputProps}
            name='contact'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            name='status'
            searchSelectData={[
              {value: 'open', label: 'Open'},
              {value: 'inProgress', label: 'In progress'},
              {value: 'done', label: 'Done'},
            ]}
            {...commonInputProps}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            name='priority'
            searchSelectData={[
              {value: 'high', label: 'High'},
              {value: 'medium', label: 'Medium'},
              {value: 'low', label: 'Low'},
            ]}
            {...commonInputProps}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            name='accountId'
            label='account'
            searchSelectData={accountList}
            {...commonInputProps}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <DatePicker
            {...commonInputProps}
            name='dueDate'
            required
            minDate={new Date()}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SwitchToggle
            {...commonInputProps}
            name='reminder'
            label={<Typography variant='p'>Reminder</Typography>}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SwitchToggle
            {...commonInputProps}
            name='repeat'
            label={<Typography variant='p'>Repeat</Typography>}
          />
        </Grid>

        <Grid {...gridItemSize} sm={12} item>
          <InputField
            {...commonInputProps}
            name='description'
          />
        </Grid>

      </Grid>
    </>
  );
}

export default TaskForm;
