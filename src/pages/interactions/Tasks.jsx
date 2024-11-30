
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import KanbanContainer from 'components/kanban/KanbanContainer';
import TaskDialog from 'components/kanban/components/TaskForm/TaskDialog';
import TaskFilters from 'components/kanban/components/TaskFilters';
import TaskCard from 'components/kanban/components/KanbanCards/TaskCard';

import { updateTasks, createTask, updateTaskStatus } from 'api/masterApi';
import { updateTaskCard } from 'redux/slices/actionSlice/taskSlice';
import { fetchAllTasks } from 'redux/slices/actionSlice/taskSlice';

import { isEmpty } from 'lodash';

const Tasks = ({
  hideKanbanBoard = false,
  openCreateDialog = false,
  openViewDialog = false,
  handleDialogClose = () => {},
}) => {
  const dispatch = useDispatch();

  const { tasks } = useSelector(state => state.actions);

  useEffect(() => {
    if (hideKanbanBoard) return;
    isEmpty(tasks) && dispatch(fetchAllTasks());
  }, [tasks]);

  return <>
    <KanbanContainer
      boardData={tasks}
      updateApi={updateTasks}
      updateStatusApi={updateTaskStatus}
      addApi={createTask}
      fetchApi={fetchAllTasks}
      updateLocalState={data => dispatch(updateTaskCard(data))}
      CardComponent={TaskCard}
      idKey='taskID'
      statusKey='status'
      listKey='items'
      ItemDialogComponent={TaskDialog}
      FiltersComponent={TaskFilters}
      label='Ticket'
      hideKanbanBoard={hideKanbanBoard}
      openCreateDialog={openCreateDialog}
      openViewDialog={openViewDialog}
      handleDialogClose={handleDialogClose}
    />
  </>
}

export default Tasks;