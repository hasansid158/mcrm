import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';

import TSResourceTab from './TSResourceTab';
import TSOrdersTab from './TSOrdersTab';
import TSDocumentsTab from './TSDocumentsTab';

import { useSelector, useDispatch } from 'react-redux';
import { find, isEmpty } from 'lodash';

import { fetchAllProjects } from 'redux/slices/actionSlice/projectsSlice';

const TimeSheetForm = ({
  formData,
  isUpdate,
}) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  const {
    userList: { list },
    warehouses,
  } = useSelector(state => state.lists);
  const {
    projects
  } = useSelector(state => state.actions);

  useEffect(() => {
    if (!isEmpty(projects)) return

    dispatch(fetchAllProjects());
  }, [projects]);

  useEffect(() => {
    if (formData?.isSubmitting && !formData?.isValid && tabValue !== 0) {
      setTabValue(0);
    }
  }, [formData?.isSubmitting]);

  const tabSx = {
    position: 'absolute',
    visibility: 'hidden',
    top: 0,
    width: 0,
    overflow: 'hidden',
  };

  const {
    projectId,
    warehouseID,
    userID
  } = formData?.watch();

  useEffect(() => {
    if (isUpdate) return;

    const projectObj = find(projects, { 'projectId': projectId });
    const projectName = projectObj ? projectObj.projectName : '';

    const warehouseObj = find(warehouses, { 'id': warehouseID });
    const warehouseName = warehouseObj ? warehouseObj.value : '';

    const userObj = find(list, { 'id': userID });
    const userName = userObj ? userObj.value : '';

    formData?.setValue('TimeSheetTitle', `${projectName} - ${warehouseName} - ${userName}`)
  }, [
    projectId,
    warehouseID,
    userID,
    projects
  ]);

  return (
    <Box px={1}>
      <Box mb={2}>
        <TabsMenu
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabHeaders={[ 'Book Resource', 'Associated Orders', 'Documents' ]}
        />
      </Box>

      <Box
        sx={tabValue !== 0 ? tabSx : {}}
      >
        <TSResourceTab formData={formData} />
      </Box>

      <Box
        sx={tabValue !== 1 ? tabSx : {}}
      >
        <TSOrdersTab
          formData={formData}
          isUpdate={isUpdate}
        />
      </Box>

      <Box
        sx={tabValue !== 2 ? tabSx : {}}
      >
        <TSDocumentsTab
          formData={formData}
          isUpdate={isUpdate}
        />
      </Box>
    </Box>
  );
}

export default TimeSheetForm;
