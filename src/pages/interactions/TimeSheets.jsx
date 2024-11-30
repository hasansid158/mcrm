import React from 'react';

import ActionPageMain from 'pages/components/ActionPageMain';

import { timeSheetColumns } from 'components/tableColumns/timeSheetColumns';
import { fetchAllTimeSheets } from 'redux/slices/actionSlice/interactionsSlice/timeSheetSlice';
import { getTimeSheetBookingById } from 'api/interactionsApis';
import { uploadTimeSheetFiles } from 'api/interactionsApis';

import { useDispatch, useSelector } from 'react-redux';
import createFormEnum from 'enum/createFormEnum';

import { crmRoutes } from 'enum/routesEnum';

import { setSnackBar, setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';
import { getFileFormData } from 'utils/fileHelperFunctions';

const TimeSheets = ({
  createFormProps = {},
  ...props
}) => {
  const dispatch = useDispatch();
  const { timeSheets } = useSelector(state => state?.interactions);

  const handleUploadFile = async (returnData = {}, passedData = {}) => {
    const { timeSheetId } = returnData;
    if (!timeSheetId || !passedData?.files) return

    await uploadTimeSheetFiles(timeSheetId, getFileFormData(passedData?.files))
      ?.then(res => {
        // dispatch(setSnackBar({
        //   open: true,
        //   message: `${passedData?.files?.length} files uploaded to time sheet successfully!`
        // }));
        // setAcceptedFiles(allFiles);
      })
      ?.catch(() => dispatch(setErrorDialogText('Error occurred while uploading documents, please try again later.')))
      // ?.finally(() => setLoading(false));
  }

  return (
    <ActionPageMain
      formKey={createFormEnum.time_sheets}
      rows={timeSheets}
      columns={timeSheetColumns()}
      label='Time Sheets'
      createLabel='Create Time Sheet'
      fetchApi={fetchAllTimeSheets}
      createFormProps={{
        disableSubmitNew: true,
        // loading: true,
        callback: handleUploadFile,
        ...createFormProps,
      }}
      drawerLabelKey='timeSheetId'
      fetchByIdApi={getTimeSheetBookingById}
      detailDataFetchIdKey='timeSheetId'
      pagePath={crmRoutes.TIME_SHEET_PATH}
      drawerProps={{
        // drawerLoading: true,
      }}
      {...props}
    />
  );
}

export default TimeSheets;
