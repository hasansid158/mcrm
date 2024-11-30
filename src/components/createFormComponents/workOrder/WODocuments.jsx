import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import { Box, Grid } from '@mui/material';

import FileImport from 'common/input/fileImport/FileImport';
import PaperBox from 'common/ui/PaperBox';
import FileItem from 'common/input/fileImport/FileItem';
import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

import {
  getWorkOrderFiles,
  uploadAttachmentsWO,
  removeAttachmentWO
} from 'api/orderApis';

import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

const WODocuments = ({
  acceptedFiles = [],
  setAcceptedFiles = () => {},
  selectedOrderNumber = null,
  docsFetched = false,
  onDocsFetch = () => {},
  isUpdate = false,
  workOrderId = null,
  setFileApiFormData = () => {},
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [fileDeleteObj, setFileDeleteObj] = useState({});

  const getFileFormData = (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('attachments', file?.fileContent);
    });
    return formData;
  }

  useEffect(() => {
    workOrderId && setFileApiFormData(getFileFormData(acceptedFiles));
  }, [workOrderId, acceptedFiles]);

  useEffect(() => {
    if (_.isNil(selectedOrderNumber) || !isUpdate || docsFetched) return;

    setLoading(true);

    getWorkOrderFiles(workOrderId)
      ?.then(res => {
        setAcceptedFiles(res);
        onDocsFetch();
      })
      ?.catch(() => dispatch(setErrorDialogText('Error occurred while fetching documents, please try again later.')))
      ?.finally(() => setLoading(false));

  }, [selectedOrderNumber, docsFetched]);


  const handleFileUpload = (allFiles, newFiles = []) => {
    if (isUpdate) {
      uploadAttachmentsWO(getFileFormData(newFiles), workOrderId)
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

    if (isUpdate) {
      setLoading(true);
      setFileDeleteObj({});

      removeAttachmentWO(workOrderId, file?.fileName || '')
        ?.then(res => {
          removeSelectedFile(key);

          dispatch(setSnackBar({
            open: true,
            message: `Document ${file?.fileName} deleted successfully!`
          }));
        })
        ?.catch(() => dispatch(setErrorDialogText('Error occurred while deleting document, please try again later.')))
        ?.finally(() => setLoading(false));
      return
    }
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

      {/* {!_.isEmpty(acceptedFiles) &&
        <PaperBox white sx={{mt: 2, py: 2}}>
          <Grid container gap={3}>
            {acceptedFiles?.map((file, key) => (
              <Grid item sm={2} xs={6} key={key}>
                <FileItem
                  file={file?.fileContent}
                  fileName={file?.fileName}
                  fileType={file?.contentType}
                  fileIsBase64={isUpdate}

                  onClickRemove={() => {
                    setFileDeleteObj({file, key});
                    !isUpdate && handleFileDelete(file, key);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </PaperBox>
      } */}

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

export default WODocuments;
