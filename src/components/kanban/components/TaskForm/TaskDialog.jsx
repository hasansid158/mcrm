import React, { useEffect, useState } from 'react';

import useReactForm from 'hooks/useReactForm';

import InputField from 'common/input/InputField';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import TaskDescription from './TaskDescription';
import TaskDetailsForm from './TaskDetailsForm';
import { Grid, Box, Button, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { keys, isEmpty, isNil } from 'lodash';

import PaperBox from 'common/ui/PaperBox';

import { formatISO } from 'date-fns';

import { removeTask } from 'api/masterApi';
import { deleteTaskLocal, fetchAllTasks } from 'redux/slices/actionSlice/taskSlice';

import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';
import { setSnackBar } from 'redux/slices/commonSlice/commonSlice';
import useScreenSize from 'hooks/useScreenSize';

import { getTaskDescriptionById } from 'api/masterApi';

const TaskDialog = ({
  open = true,
  onClose = () => {},
  allData = [],
  itemData = {},
  triggerApiUpdate = () => {},
  triggerApiAdd = () => {},
  updateLocalState = () => {},
  handleUpdate = () => {},
  triggerApiStatusUpdate = () => {},
  isCreate,
}) => {
  const { isMobile } = useScreenSize();

  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCloseConfirm, setOpenCloseConfirm] = useState(false);
  const [taskID, setTaskID] = useState(null);
  // const [description, setDescription] = useState(null);
  const { userAccount } = useSelector(state => state?.userDetails)

  const [descriptionSaved, setDescriptionSaved] = useState(false);

  const {
    formData,
    reset,
    handleSubmit,
    useWatch,
  } = useReactForm({}, { mode: 'onSubmit'});

  const { emailAddress, userFirstName, userLastName } = useSelector(state => state.userDetails);

  useEffect(() => {
    if (isCreate) {
      if (firstRender) {
        setFirstRender(false);
        reset({
          contact: emailAddress,
          taskOwner: `${userFirstName || ''} ${userLastName || ''}`,
          priority: 'Medium',
          createdDate: formatISO(new Date()),
        });
      }
      return;
    }

    if (!open) {
      setFirstRender(true);
      return;
    }

    setFirstRender(false);

    if (itemData?.taskID !== taskID) {
      reset({});
      setTaskID(itemData?.taskID);
    }

  }, [itemData, open]);

  useEffect(() => {
    if (isNil(taskID) || isCreate) return
    setLoading(true);

    getTaskDescriptionById(taskID)
      .then(res => reset(res))
      // .catch(err => {})
      .finally(() => setLoading(false));
  }, [taskID, isCreate]);


  const watchedData = useWatch({control: formData?.control})

  const handleChange = (updatedValue) => {
    (!firstRender && !isCreate) && handleUpdate({
      ...watchedData,
      ...updatedValue,
      accountId: userAccount?.accountId,
    });
  }

  const handleStatusUpdate = (value) => {
    !isCreate &&
    triggerApiStatusUpdate(
      {
        taskId: itemData?.taskID,
        status: value,
      },
      true,
    )
  }

  //CREATE TASK
  const onCreate = async (data) => {
    setLoading(true);
    const resData = await triggerApiAdd({
      ...data,
      accountId: userAccount?.accountId,
    });

    allData?.find(task => (
      task?.status === data?.status && task?.items?.unshift(resData)
    ));
    updateLocalState(allData);
    setLoading(false);
    reset({});
    onClose();
  }

  const handleDelete = async () => {
    await dispatch(deleteTaskLocal(itemData));
    setOpenConfirm(false);
    onClose();

    removeTask(itemData?.taskID)
      .then(() => {
        dispatch(setSnackBar({
          open: true,
          message: 'The task has been deleted successfully!',
        }));
      })
      .catch(async () => {
        await dispatch(fetchAllTasks());
        dispatch(setSnackBar({
          open: true,
          message: 'Server error occurred, please try again later.',
          options: { severity: 'error'},
        }));
      });
  }

  const handleClose = () => {
    descriptionSaved ? onClose() : setOpenCloseConfirm(true);
  }

  return <>
    <ConfirmDialog
      open={openConfirm}
      onCancel={() => setOpenConfirm(false)}
      onConfirm={handleDelete}
      loading={loading}
    >
      <Typography variant="p">
        Are you sure you want to delete task <b>{itemData?.taskID}</b>?
      </Typography>
    </ConfirmDialog>

    <ConfirmDialog
      open={openCloseConfirm}
      onCancel={() => setOpenCloseConfirm(false)}
      onConfirm={() => {
        setDescriptionSaved(true);
        setOpenCloseConfirm(false);
        onClose();
      }}
    >
      <Typography variant="p">
        You have not saved your description.
        Are you sure you want to close?<br/>
        (Your new description will be lost.)
      </Typography>
    </ConfirmDialog>

    <DialogBox
      open={open}
      handleClose={handleClose}
      disableFormFooter={!isEmpty(itemData)}
      footerItems={
        <Button
          variant='contained'
          onClick={() => handleSubmit(onCreate)()}
          sx={{minWidth: '140px'}}
        >
          Create
        </Button>
      }
      title={isEmpty(itemData) ? 'Create Ticket' : `Ticket: ${itemData?.taskID || ''}`}
      maxWidth='lg'
      loading={!openConfirm && loading}
    >
      <Box
        display='flex'
        flexDirection={isMobile ? 'column' : 'row'}
        columnGap={1}
        rowGap={1}
        pb={2}
      >
        <PaperBox
          sx={{
            flex: 1,
            backgroundColor: 'common.backgroundGrey'
          }}
        >
          <Box px={1} pt={1}>
            <InputField
              name='subject'
              placeholder="Subject"
              variant='standard'
              required
              isEditable={!isEmpty(itemData)}
              formData={formData}
              inputProps={{style: {fontSize: 22}}}
              onEditApply={handleChange}
              multiline
            />

            <TaskDescription
              formData={formData}
              isDescriptionSaved={setDescriptionSaved}
              handleChange={handleChange}
              isCreate={isCreate}
              // descriptionData={description}
            />
          </Box>
        </PaperBox>

        <Box>
          <PaperBox
            sx={{
              position: 'sticky',
              top: '0',
              backgroundColor: 'common.backgroundGrey'
            }}
          >
            <TaskDetailsForm
              allData={allData}
              formData={formData}
              isCreate={isCreate}
              handleDelete={() => setOpenConfirm(true)}
              handleStatusUpdate={handleStatusUpdate}
              itemData={itemData}
              handleEditApply={handleChange}
            />
          </PaperBox>
        </Box>
      </Box>
    </DialogBox>
  </>;
}

export default TaskDialog;
