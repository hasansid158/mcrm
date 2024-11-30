import React, { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';
import FileImport from 'common/input/fileImport/FileImport';
import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';
import PaperBox from 'common/ui/PaperBox';
import { uploadTimeSheetFiles } from 'api/interactionsApis';

import { setSnackBar, setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';
import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import FileItem from 'common/input/fileImport/FileItem';

import { getFileFormData } from 'utils/fileHelperFunctions';

const TSDocumentsTab = ({
  formData = {},
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const watchedData = formData?.watch();

  useEffect(() => {
    if (isEmpty(watchedData?.associatedFiles) || !isEmpty(acceptedFiles)) return;
    setAcceptedFiles(watchedData?.associatedFiles);
  }, [watchedData]);

  const handleFileUpload = (allFiles, newFiles = []) => {

    if (isUpdate) {
      setLoading(true);

      uploadTimeSheetFiles(formData?.getValues('timeSheetId'), getFileFormData(newFiles))
        ?.then(res => {
          dispatch(setSnackBar({
            open: true,
            message: `${newFiles?.length} files uploaded to work order successfully!`
          }));
          setAcceptedFiles(allFiles);
        })
        ?.catch(() => dispatch(setErrorDialogText('Error occurred while uploading documents, please try again later.')))
        ?.finally(() => setLoading(false));

      return;
    }
    setAcceptedFiles(allFiles);
    formData?.setValue('files', allFiles);
  }

  return (
    <Box p={2} position='relative'>
      <SpinLoader loading={loading}/>

      <FileImport
        allValidFiles={acceptedFiles}
        setAllValidFiles={handleFileUpload}
      />
{/*
      <ConfirmDialog
        open={!_.isEmpty(fileDeleteObj) && isUpdate}
        onCancel={() => setFileDeleteObj({})}
        onConfirm={() => handleFileDelete()}
      >
        Are you sure you want to delete document {fileDeleteObj?.file?.fileName || ''}?
      </ConfirmDialog> */}
    </Box>
  );
}

export default TSDocumentsTab;
