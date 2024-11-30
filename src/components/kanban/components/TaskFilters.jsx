import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { isValid, isBefore, isEqual, parseISO } from 'date-fns';
import { map, filter, isEmpty, cloneDeep, find } from 'lodash';

import { Box, IconButton, Typography, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import SearchSelect from 'common/input/SearchSelect';
import Selector from 'common/input/Selector';
import AvatarName from 'common/dataDisplay/AvatarName';
import DatePicker from 'common/input/DatePicker';
import InputField from 'common/input/InputField';

import { PriorityLabel } from 'enum/kanbanEnum';
import useReactForm from 'hooks/useReactForm';

const TaskFilters = ({
  handleFilterApply = () => {},
}) => {

  const { userList } = useSelector(state => state.lists);
  const { tasks } = useSelector(state => state.actions)


  const initState = {
    byAssignees: [],
    byPriority: '',
    maxDueDate: null,
    search: '',
  }

  const {
    formData,
    reset,
    useWatch,
  } = useReactForm(initState);

  const watchedData = useWatch({control: formData.control})

  useEffect(() => {
    const clonedData = cloneDeep(tasks);

    const {
      byAssignees,
      byPriority,
      maxDueDate,
      search,
    } = watchedData;


    // console.log(tasks, 'called');

    map(clonedData, (item) => {
      item.items = filter(item.items, (subItem) => {
          return (
                  //filter assignees
                  isEmpty(byAssignees) || byAssignees?.includes(subItem.assignee))
                  //filter priority
              && (isEmpty(byPriority) || subItem.priority === byPriority)
                  //filter by due date
              && (!isValid(maxDueDate) ||
                    (isBefore(parseISO(subItem.dueDate), maxDueDate) || isEqual(parseISO(subItem.dueDate), maxDueDate))
                  )
                  //filter by subject
              && (isEmpty(search) ||
                    (subItem?.subject?.toLowerCase()?.includes(search?.toLowerCase()) || String(subItem?.taskID)?.includes(search))
                  );
      });
      return item;
    });

    handleFilterApply(clonedData);

  }, [
    watchedData,
    tasks,
  ]);

  //filter current user on load
  // useEffect(() => {
  //   if (isEmpty(userList) || isEmpty(userDetails)) return;

  //   const { userID } = userDetails;
  //   const { value: userName } = find(userList?.list, { id: userID });
  //   formData?.setValue('byAssignees', userName);

  // }, [userList, userDetails]);

  return <>
    <Typography variant='pb' component='div'>Filters: </Typography>

    {!isEmpty(formData.dirtyFields) &&
      <Box textAlign='end'>
        <IconButton
          size='small'
          onClick={() => reset(initState)}
        >
          <CancelIcon/>
        </IconButton>
      </Box>
    }

    <Grid
      container
      display='flex'
      alignItems='center'
      justifyContent='flex-end'
      columnSpacing={1}
      rowSpacing={2}
      py={.5}
    >
      <Grid item md={2} sm={6} xs={12} minWidth='200px'>
        <InputField
          formData={formData}
          name='search'
          label='Search'
          placeholder='Subject / Tickets'
          size='large'
        />
      </Grid>

      <Grid item md={2} sm={6} xs={12} minWidth='200px'>
        <SearchSelect
          searchSelectData={userList?.list}
          multiple
          disableCloseOnSelect
          name='byAssignees'
          returnLabel
          formData={formData}
          customLabel={(name, props) => {
            if (!name) return;
            if (props['data-tag-index'] >= 3) {
              return props['data-tag-index'] === 3 ? `+${formData?.getValues('byAssignees').length-3}` : '';
            }

            return (
              <IconButton
                key={name}
                onClick={props.onDelete}
                size='small'
                sx={{
                  p: 0,
                  px: '2px',
                }}
              >
                <AvatarName scale={.85} name={name} />
              </IconButton>
            );
          }}
          size='large'
        >
        </SearchSelect>
      </Grid>


      <Grid item md={2} sm={6} xs={12} minWidth='200px'>
        <Selector
          formData={formData}
          name='byPriority'
          selectorData={[
            {value: 'High', label: <PriorityLabel priority='High'/>},
            {value: 'Medium', label: <PriorityLabel priority='Medium'/>},
            {value: 'Low', label: <PriorityLabel priority='Low'/>},
          ]}
          // onChange={(name, val) => setFilterPriority(val)}
          // value={filterPriority}
          size='large'
        />
      </Grid>

      <Grid item md={2} sm={6} xs={12} display='flex' minWidth='200px'>
        <Box flex={1} minWidth='200px'>
          <DatePicker
            formData={formData}
            label='Max DueDate'
            name='maxDueDate'
            size='large'
          />
        </Box>
      </Grid>
    </Grid>
  </>;
}

export default TaskFilters;
