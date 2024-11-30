import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Selector from 'common/input/Selector';
import InputField from 'common/input/InputField';
import DatePicker from 'common/input/DatePicker';
import SearchSelect from 'common/input/SearchSelect';
import AvatarName from 'common/dataDisplay/AvatarName';

import StatusButton from './StatusButton';

import { PriorityLabel } from 'enum/kanbanEnum';
import { transitions } from 'core/animations';
import { objToValueLabel } from 'utils/helperFunctions';

import { fetchTaskCategoryList } from 'redux/slices/listSlice/listSlice';

import { formatISO } from 'date-fns';
import { isNil, isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

const TaskDetailsForm = ({
  formData = {},
  handleEditApply = () => {},
  isCreate = false,
  handleDelete = () => {},
  handleStatusUpdate = () => {},
  itemData = [],
  allData,
}) => {

  const dispatch = useDispatch();
  const { userList, taskCategoryList } = useSelector(state => state.lists);
  const { userProjects = [], userCustomers = [] } = useSelector(state => state?.userDetails);
  const [categoriesValues, setCategoryValues] = useState([])

  const { userFirstName, userLastName } = useSelector(state => state?.userDetails);
  const currentUserName = `${userFirstName || ''} ${userLastName || ''}`.trim();
  const reporterName = formData?.getValues('taskOwner');

  useEffect(() => {
    if (userCustomers?.length <= 1) {
      formData?.setValue('customerId', userCustomers?.[0]?.id || null);
    }
    if (userProjects?.length <= 1) {
      formData?.setValue('projectId', userProjects?.[0]?.id || null);
    }
  }, [userProjects, userCustomers]);

  const userListData = userList?.detail?.map(({ userFirstName, userLastName }) => ({
    id: `${userFirstName || ''} ${userLastName || ''}`.trim(),
    value: `${userFirstName || ''} ${userLastName || ''}`.trim(),
  }));

  useEffect(() => {
    isEmpty(taskCategoryList) && dispatch(fetchTaskCategoryList());
  }, []);

  const commonInputProps = (name = '') => {
    const isValueEmpty = isNil(formData.getValues(name)) || formData.getValues(name) === '';

    return ({
      formData: formData,
      isEditable: !isCreate,
      onEditApply: (name, value) => handleEditApply({[name]: value}),
      variant: 'standard',
      name,
      InputProps: {
        disableUnderline: true,
      },
      InputLabelProps: {
        shrink: true,
      },
      sx: {
        '& .MuiInputBase-input': {
          pl: '4px !important',
          transition: transitions().shortest,
          backgroundColor: theme => isValueEmpty && theme.palette.common.hoverGrey + '85',
          '&:hover': {
            backgroundColor: theme => theme.palette.common.hoverGrey + '85',
          }
        },
        '& .MuiFormLabel-root': {
          zIndex: 1,
        }
      },
    });
  };

  const categoryTypeValue = formData.getValues('categoryType');
  useEffect(() => {
    categoryTypeValue && setCategoryValues(taskCategoryList?.categories[categoryTypeValue]);
  }, [categoryTypeValue]);



  return <>
    <Box
      sx={{
        borderBottom: '4px solid white',
        display: 'flex',
        justifyContent: 'space-between',
        // flexWrap: 'wrap',
        rowGap: 1,
        columnGap: 2,
        pb: 1,
      }}
    >
      <StatusButton
        formData={formData}
        name='status'
        handleChange={handleStatusUpdate}
        currentValue={itemData?.status}
        allData={allData}
      />

      {!isCreate && currentUserName === reporterName && (
        <Box display='flex' alignItems='center' justifyContent='center'>
          <IconButton
            color="error"
            size="small"
            // sx={{ minWidth: '0px', px: .5 }}
            onClick={handleDelete}
          >
            <DeleteIcon  />
          </IconButton>
        </Box>
      )}

    </Box>

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 1,
        pt: 2, px: 1,
      }}
    >
      <SearchSelect
        {...commonInputProps('assignee')}
        searchSelectData={userListData}
        returnLabel
        InputProps={{
          startAdornment: (
            <AvatarName
              name={formData?.getValues('assignee')}
              sx={{
                my: .5,
                mr: 1,
              }}
            />
          ),
          disableUnderline: true,
        }}
      />

      <Box>
        <Typography variant='p3'>Reporter</Typography>
        <Box
          display='flex'
          alignItems='center'
          width='100%'
        >
          <AvatarName
            name={formData?.getValues('taskOwner')}
            sx={{
              my: .5,
              mr: 1,
            }}
          />
          <Typography variant='p2'>{formData.getValues('taskOwner')}</Typography>
        </Box>
      </Box>

      <Selector
        {...commonInputProps('priority')}
        required
        disableStar
        selectorData={[
          {value: 'High', label: <PriorityLabel priority='High'/>},
          {value: 'Medium', label: <PriorityLabel priority='Medium'/>},
          {value: 'Low', label: <PriorityLabel priority='Low'/>},
        ]}
      />
      {userCustomers?.length > 1 &&
        <SearchSelect
          {...commonInputProps('customerId')}
          searchSelectData={userCustomers}
          label='Customer'
          required
          disableStar
        />
      }
      {userProjects?.length > 1 &&
        <SearchSelect
          {...commonInputProps('projectId')}
          searchSelectData={userProjects}
          label='Project'
          required
          disableStar
        />
      }

      <SearchSelect
        {...commonInputProps('categoryType')}
        searchSelectData={objToValueLabel(taskCategoryList?.categoryTypes)}
        returnLabel
        isEditable={false}
      />
      <SearchSelect
        {...commonInputProps('category')}
        searchSelectData={categoriesValues}
        returnLabel
        disabled={!categoriesValues.length}
      />

      <InputField
        {...commonInputProps('location')}
      />
      <InputField
        {...commonInputProps('contact')}
      />
      <DatePicker
        {...commonInputProps('dueDate')}
        textFieldProps={{
          variant: commonInputProps('dueDate').variant,
          sx: {...commonInputProps('dueDate').sx},
        }}
        required
      />
      <DatePicker
        {...commonInputProps('createdDate')}
        textFieldProps={{
          variant: commonInputProps('createdDate').variant,
          sx: {...commonInputProps('createdDate').sx},
        }}
        value={formData.getValues('createdDate') || formatISO(new Date())}
        disabled
      />
    </Box>
  </>;
}

export default TaskDetailsForm;
