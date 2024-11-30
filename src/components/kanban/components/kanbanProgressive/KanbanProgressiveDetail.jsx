import React, { useEffect, useState } from 'react';

import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';

import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';
import ProgressSteps from './ProgressSteps';

import { stageOrder } from 'enum/kanbanEnum';

import { map } from 'lodash';

const KanbanProgressiveDetail = ({
  open = false,
  onClose = () => {},
  allData = [],
  itemData = {},
  selectedItemStatus,
  formKey = '',
  label = '',
  statusKey = '',
  // idKey = '',
  // triggerApiUpdate,
  // triggerApiAdd,
  // updateLocalState,
  isCreate,
  handleUpdate = () => {},
  createDialogProps = {},
}) => {
  // const [currentData, setCurrentData] = useState({});

  // useEffect(() => {
  //   setCurrentData(itemData);
  //   console.log(itemData, 'itemData');
  // }, [itemData]);

  if (isCreate) return (
    <CreateDialog
      isDialogOpen={open}
      handleClose={onClose}
      formKey={formKey}
      title={`Create ${label}`}
      label={label}
      {...createDialogProps}
    />
  )

  // console.log(itemData, allData)

  const statusNames = map(allData, statusKey);

  const DetailDrawerContent = () => (
    <ProgressSteps
      labels={stageOrder?.[label] || statusNames}
      selected={selectedItemStatus || itemData?.[statusKey]}
    />
  );

  return (
    <DetailsDrawer
      open={open}
      onClose={onClose}
      data={{
        ...itemData,
        [statusKey]: itemData?.[statusKey] || selectedItemStatus,
      }}
      // subName={''}
      formKey={formKey}
      // createLabel={`${label} ${itemData?.[idKey]}`}
      replaceUpdate={async (updateData) => {
        // setCurrentData(updateData);
        await handleUpdate(updateData);
      }}
      handleUpdate={async (res) => await handleUpdate(res)}
    >
      <DetailDrawerContent />
    </DetailsDrawer>
  );
}

export default KanbanProgressiveDetail;
