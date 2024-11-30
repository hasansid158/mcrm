import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import { cloneDeep, isEmpty, times, map, findIndex, } from 'lodash';

import { Box, Skeleton, Button } from '@mui/material';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import KanbanColumn from './components/KanbanColumn';
import KanbanToolbar from './components/KanbanToolbar';

import { kanbanDataToList } from 'utils/helperFunctions';

import PaperBox from 'common/ui/PaperBox';

const KanbanContainer = ({
  boardData = [],
  updateApi = () => {},
  addApi = () => {},
  updateStatusApi = null,
  fetchApi = () => {},
  updateLocalState = () => {},
  CardComponent,
  ItemDialogComponent,
  FiltersComponent,
  idKey = '',
  statusKey = '',
  statusIdKey,
  listKey ='',
  formKey = '',
  label = '',
  filters = [],
  isProgressive,
  columnMinWidth,
  toolbarItems = [],
  getListData = () => {},
  hideKanbanBoard = false,
  openCreateDialog = false,
  openViewDialog = false,
  handleDialogClose = () => {},
  createDialogProps = {},
}) => {
  const dispatch = useDispatch();

  const [dragLock, setDragLock] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState({});
  const [clonedData, setClonedData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  //for using only create and view popup outside of tickets page
  useEffect(() => {
    if (!hideKanbanBoard) return;
    setOpenDialog(openCreateDialog || openViewDialog);
    setCreateDialog(openCreateDialog);
  }, [openCreateDialog, openViewDialog]);


  useEffect(() => {
    if(!isEmpty(boardData) && isEmpty(clonedData)) {
      setClonedData(cloneDeep(boardData));
    };
    getListData(kanbanDataToList(boardData, listKey));
  }, [boardData]);


  //Update Api
  const triggerApiUpdate = async (item) => {
    await updateApi(item)
      .then(() => {
        dispatch(setSnackBar({
          open: true,
          message: `${label} ${item?.[idKey]} updated successfully!`
        }));
      })
      .catch(err => {
        dispatch(fetchApi()).then(() => {
          dispatch(setSnackBar({
            open: true,
            message:`Server error occured while updating ${label} ${item?.[idKey] || ''}`,
            options: {
              severity: 'error',
            }
          }));
        })
      });
  }


  //Kanban Local Update Logic (can be improved)
  const handleUpdate = async (formValues, isStatusOnly) => {
    if (selectedItemData?.[statusIdKey || statusKey] === formValues?.[statusIdKey || statusKey]) {
      const updatedData = map(boardData, (item) => {
        if (item?.[statusIdKey || statusKey] === formValues?.[statusIdKey || statusKey]) {
            const updatedItems = map(item?.[listKey], (subItem) => {
                return subItem?.[idKey] === formValues?.[idKey] ? formValues : subItem;
            });
            return { ...item, [listKey]: updatedItems };
        }
        return item;
      });
      updateLocalState(updatedData);

    } else {
      const clonedBoardData = cloneDeep(boardData);

      const prevColIdx = findIndex(clonedBoardData, { [statusIdKey || statusKey]: selectedItemData?.[statusIdKey || statusKey] });
      const previousItems = clonedBoardData[prevColIdx]?.[listKey];

      if (prevColIdx === -1) return;

      const itemIndex = findIndex(previousItems, { [idKey]: selectedItemData?.[idKey] });
      clonedBoardData[prevColIdx]?.[listKey].splice(itemIndex, 1);

      const nextColIdx = findIndex(clonedBoardData, { [statusIdKey || statusKey]: formValues?.[statusIdKey || statusKey] });
      clonedBoardData?.[nextColIdx]?.[listKey]?.unshift(formValues);

      updateLocalState(clonedBoardData);
    }

    setSelectedStatus(formValues?.[statusKey]);
    setSelectedItemData(formValues);
    !isStatusOnly && await triggerApiUpdate(formValues);
  }

  //Update Api
  const triggerApiStatusUpdate = (statusApiPayload, isSelectorChange) => {
    if (statusApiPayload?.[statusIdKey || statusKey] === selectedItemData?.[statusIdKey || statusKey]) return;

    updateStatusApi(statusApiPayload || selectedItemData)
      .then(() => {
        dispatch(setSnackBar({
          open: true,
          message: `${label} ${selectedItemData?.[idKey] || statusApiPayload?.[idKey]} updated successfully!`
        }));

        isSelectorChange && handleUpdate({
          ...selectedItemData,
          [statusKey]: statusApiPayload?.[statusKey],
          ...statusIdKey ? {[statusIdKey]: statusApiPayload?.[statusIdKey]} : {},
        }, true)

      }).catch(err => {
        console.log(err);

        dispatch(fetchApi()).then(() => {
          dispatch(setSnackBar({
            open: true,
            message:`Server error occured while updating ${label} ${selectedItemData?.[idKey] || ''}`,
            options: {
              severity: 'error',
            }
          }));
        })
      });
  }

  //Add Api
  const triggerApiAdd = async (item) => {
    return addApi(item).then(res => {
      dispatch(setSnackBar({
        open: true,
        message: `Successfully created ${label} as ${res?.data?.[statusKey] || 'open'}`
      }));
      return res?.data;

    }).catch(err => {
      console.error(err.response, 'ERROR');
      dispatch(fetchApi()).then(() => {
        dispatch(setSnackBar({
          open: true,
          message:`Server error occured while creating new task`,
          options: {
            severity: 'error',
          }
        }));
      })
    });
  }


  //Kanban Move Card Logic
  const handleDragEnd = (
    result,
    data,
    itemId,
    previousItemId,
  ) => {
    const { source, destination } = result;

    const updatedData = cloneDeep(data);

    const sourceColumn = updatedData[source.droppableId];
    const destColumn = updatedData[destination.droppableId];

    const sourceItems = [...sourceColumn?.[listKey]];
    const destItems = [...destColumn?.[listKey]];

    let aboveItemId;
    let aboveItemIndex;


    const itemIndex = itemId !== undefined ? findIndex(sourceItems, { [idKey]: itemId }) : null;
    const [movedItem] = sourceItems.splice(itemIndex || source.index, 1); // Remove from source

    if (source.droppableId !== destination.droppableId) {

      if (destination.index !== 0) {
        if (previousItemId === undefined) {
          aboveItemId = destItems[destination.index - 1]?.[idKey];
        } else {
          aboveItemIndex = findIndex(destItems, { [idKey]: previousItemId });

        }
      }

      movedItem[statusIdKey || statusKey] = destColumn?.[statusIdKey || statusKey] || '';
      destItems.splice(previousItemId !== undefined ? aboveItemIndex + 1 : destination?.index, 0, movedItem); // Insert into destination

      sourceColumn[listKey] = sourceItems;
      destColumn[listKey] = destItems;

      //prepare item data
      const currentItem = updatedData[destination.droppableId]?.[listKey]?.find((item) => String(item?.[idKey]) === result.draggableId);
      const updatedItem = {
        ...currentItem,
        [statusKey]: destColumn?.[statusKey],
        ...statusIdKey ? {[statusIdKey]: destColumn?.[statusIdKey]} : {},
        itemIndex: destination?.index,
      }

      return {
        updatedData,
        updatedItem,
        moveItemId: movedItem?.[idKey],
        previousItemId: aboveItemId,
      };

    } else {

      if (destination.index !== 0) {
        if (previousItemId === undefined) {
          aboveItemId = destItems[destination.index]?.[idKey];
        } else {
          aboveItemIndex = findIndex(destItems, { [idKey]: previousItemId });
        }
      }

      sourceItems.splice(previousItemId !== undefined ? aboveItemIndex : destination?.index, 0, movedItem);
      sourceColumn[listKey] = sourceItems;

      return {
        updatedData,
        moveItemId: movedItem?.[idKey],
        previousItemId: aboveItemId,
      };
    }
  };

  const handleCardMove = (result) => {
    if (!result.destination) return; // No destination, no move

    setDragLock(true);
    setTimeout(() => {
      setDragLock(false);
    }, 250);

    const moveLocalData = handleDragEnd(result, clonedData);
    const moveGlobalData = handleDragEnd(
      result,
      boardData,
      moveLocalData?.moveItemId,
      moveLocalData?.previousItemId,
    );

    //trigger local update
    setClonedData(moveLocalData?.updatedData);
    updateLocalState(moveGlobalData?.updatedData);

    // triggerApi update
    if (!isEmpty(moveLocalData?.updatedItem)) {
      updateStatusApi ? triggerApiStatusUpdate(moveLocalData?.updatedItem) : triggerApiUpdate(moveLocalData?.updatedItem);
    }
  }


  const LoadingSkeletons = () => (
    <Skeleton
      variant="rounded"
      // animation='wave'
      sx={{
        height: 'calc(100dvh - 205px)',
        width: '100%',
        minWidth: '140px',
      }}
    />
  )

  const handleOpenCreate = () => {
    !createDialog && setSelectedItemData({});
    setOpenDialog(true);
    setCreateDialog(true);
  }

  return <>
    <ItemDialogComponent
      open={openDialog}
      onClose={() =>  {
        setOpenDialog(false);
        handleDialogClose();
      }}
      allData={clonedData}
      itemData={selectedItemData}
      triggerApiUpdate={triggerApiUpdate}
      triggerApiAdd={triggerApiAdd}
      updateLocalState={updateLocalState}
      isCreate={createDialog}
      formKey={formKey}
      statusKey={statusKey}
      idKey={idKey}
      label={label}
      handleUpdate={handleUpdate}
      selectedItemStatus={selectedStatus}
      triggerApiStatusUpdate={triggerApiStatusUpdate}
      createDialogProps={createDialogProps}
    />

    {!hideKanbanBoard &&
      <>
        <KanbanToolbar
          openCreateDialog={handleOpenCreate}
          label={label}
          filterComponent={
            FiltersComponent ?
              <FiltersComponent
                handleFilterApply={(data) => {
                  setClonedData(data);
                  getListData(kanbanDataToList(data, listKey));
                }}
                filters={filters}
                filterData={boardData}
                listKey={listKey}
              />
              : ''
          }
          toolbarItems={toolbarItems}
        />

        <PaperBox
          fullHeight
          heightDiff={160}
          sx={{
            background: 'unset',
            border: 'unset',
            overflow: 'auto',
            px: 0,
            pt: 0,
            mt: 1,
          }}
        >

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              columnGap: 1,
              width: '100%',
              // maxHeight: '100dvh',
            }}
          >

            {!clonedData?.length
              ?
              times(6, (index) => (
                <LoadingSkeletons key={index}/>
              ))
              :
              <DragDropContext onDragEnd={handleCardMove}>
                {clonedData?.map((data, index) => (
                  <Droppable
                    key={index}
                    droppableId={String(index)}
                    isDropDisabled={dragLock}
                  >
                    {(provided) => (
                      <KanbanColumn
                        columnData={data}
                        statusKey={statusKey}
                        listKey={listKey}
                        isProgressive={isProgressive}
                        columnMinWidth={columnMinWidth}
                        sx={{
                          '&:hover': {
                            '& .createButton': {
                              display: 'block',
                            }
                          }
                        }}
                      >
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        display='flex'
                        flexDirection='column'
                      >
                        {data?.[listKey]?.map((item, index) => (
                          <Draggable
                            key={item?.[idKey] || index}
                            draggableId={String(item?.[idKey])}
                            index={index}
                            isDragDisabled={dragLock}
                          >
                            {(provided, snapshot) => (
                              <Box
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Box
                                  sx={{
                                    borderRadius: "8px",
                                    ...(snapshot?.isDragging ? {
                                      transform: 'rotateZ(3deg)',
                                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                                      scale: '1.05',
                                    } : {}),
                                  }}
                                >
                                  <CardComponent
                                    key={index}
                                    cardData={item}
                                    provided={provided}
                                    //add in a separate object and also check for getById api
                                    onClick={() => {
                                      setSelectedItemData(item);
                                      setOpenDialog(true);
                                      setCreateDialog(false);
                                      setSelectedStatus(data?.[statusKey]);
                                    } } />
                                </Box>
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        <Box
                          my={.5}
                          className='createButton'
                          display='none'
                          sx={{
                            position: 'sticky',
                            top: 62,
                            opacity: .7,
                            '&:hover': {
                              opacity: 1,
                            }
                          }}
                        >
                          <Button
                            color='secondary'
                            fullWidth
                            onClick={handleOpenCreate}
                          >
                            + Create
                          </Button>
                        </Box>
                      </Box>
                    </KanbanColumn>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            }
          </Box>
        </PaperBox>
      </>
    }
  </>;
}

export default KanbanContainer;
