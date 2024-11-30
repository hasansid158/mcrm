import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import { Box } from '@mui/material';

import FileImport from 'common/input/fileImport/FileImport';
import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

import {
  uploadAttachmentsPO,
  // removeAttachmentWO
} from 'api/orderApis';

import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

import { getFileFormData } from 'utils/fileHelperFunctions';

const PODocumentsTab = ({
  formData = {},
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fileDeleteObj, setFileDeleteObj] = useState({});

  const watchData = formData?.watch();

  const {
    purchaseOrderFileAttachments,
  } = formData?.watch();

  useEffect(() => {
    if (!isUpdate) return;

    setAcceptedFiles(purchaseOrderFileAttachments);
  }, [purchaseOrderFileAttachments, isUpdate]);

  const handleFileUpload = (allFiles, newFiles = []) => {
    if (isUpdate) {
      uploadAttachmentsPO(getFileFormData(newFiles), watchData?.purchaseOrderId)
        ?.then(res => {
          dispatch(setSnackBar({
            open: true,
            message: `${newFiles?.length} files uploaded to purchase order successfully!`
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


  const removeSelectedFile = (key) => {
    const modifiedFileArray = _.filter(acceptedFiles, (item, index) => index !== key);
    console.log(key, modifiedFileArray, acceptedFiles)
    setAcceptedFiles(modifiedFileArray);
  }

  //delete file handle
  const handleFileDelete = (currentFile = null, currentKey = null) => {
    const file = _.isNil(currentFile) ? fileDeleteObj?.file : currentFile;
    const key = _.isNil(currentKey) ? fileDeleteObj?.key : currentKey;

    // if (isUpdate) {
    //   setLoading(true);
    //   setFileDeleteObj({});

    //   removeAttachmentWO(workOrderId, file?.fileName || '')
    //     ?.then(res => {
    //       removeSelectedFile(key);

    //       dispatch(setSnackBar({
    //         open: true,
    //         message: `Document ${file?.fileName} deleted successfully!`
    //       }));
    //     })
    //     ?.catch(() => dispatch(setErrorDialogText('Error occurred while deleting document, please try again later.')))
    //     ?.finally(() => setLoading(false));
    //   return
    // }
    removeSelectedFile(key);
  }

  return (
    <Box p={2} position='relative'>
      <SpinLoader loading={loading}/>

      <FileImport
        allValidFiles={acceptedFiles}
        setAllValidFiles={handleFileUpload}
        handleFileDelete={(file, key) => {
          setFileDeleteObj({file, key});
          !isUpdate && handleFileDelete(file, key);
        }}
      />

      <ConfirmDialog
        open={!_.isEmpty(fileDeleteObj) && isUpdate}
        onCancel={() => setFileDeleteObj({})}
        onConfirm={() => handleFileDelete()}
      >
        Are you sure you want to delete document {fileDeleteObj?.file?.fileName || ''}?
      </ConfirmDialog>
    </Box>
  );
}

export default PODocumentsTab;
