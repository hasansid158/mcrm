import React from 'react';
import { useDispatch } from 'react-redux';

import { useDropzone } from 'react-dropzone';

import _, { isEmpty } from 'lodash';

import { Box, Typography, Grid } from '@mui/material';
import PaperBox from 'common/ui/PaperBox';

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import FileItem from './FileItem';

const FileImport = ({
  acceptedFileTypes = {
    image: ['.jpg', '.jpeg', '.png'],
    application: ['.xlsx', '.csv', '.pdf', '.docx'],
  },
  maxFiles = 5,
  maxSizeInMBs = 5,
  allValidFiles = [],
  setAllValidFiles = () => {},
  handleFileDelete = () => {},
}) => {
  const dispatch = useDispatch();
  // const [allInvalidFiles, setAllInvalidFiles] = useState([]);

  const fileTypeArray = _.flatMap(acceptedFileTypes || {});

  const errorMap = (fileName = '') => ({
    'file-invalid-type': `${fileName} - invalid file type, please select only accepted file type (Accepted formats: ${fileTypeArray?.join(' ')?.toUpperCase()})`,
    'file-too-large': `${fileName} - size is too large, only ${maxSizeInMBs}MB or less is accepted.`,
    'too-many-files': `Too many files selected, maximum of ${maxFiles} can be uploaded.`,
  });

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (!_.isEmpty(acceptedFiles)) {
      if (acceptedFiles?.length + allValidFiles?.length > 5) {
        dispatch(setErrorDialogText(errorMap()?.['too-many-files']));
        return;
      }

      const uploadedFiles = acceptedFiles?.map((file) => ({
        fileContent: file,
        contentType: file?.type || '',
        fileName: file?.name || '',
      }));

      setAllValidFiles([...allValidFiles, ...uploadedFiles], uploadedFiles);

      // const validFiles = [];
      // const invalidFiles = [];

      // acceptedFiles.forEach(async (file) => {
      //   const fileTypeExtension =  '.' + _.last(file?.path?.split('.'));

      //   !_.includes(fileTypeArray, fileTypeExtension) ? invalidFiles.push(file) : validFiles.push(file);
      // })

      // setAllInvalidFiles([...allInvalidFiles, ...invalidFiles]);
      // setAllValidFiles([...allValidFiles, ...validFiles]);
    }

    if (!_.isEmpty(rejectedFiles)) {
      const firstFile = rejectedFiles?.[0];
      const errorCode = firstFile?.errors?.[0]?.code;
      errorCode &&
        dispatch(
          setErrorDialogText(
            errorMap(firstFile?.file?.name)?.[errorCode] ||
              'Error while uploading file.',
          ),
        );
    }
  };

  // Use react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    disabled: allValidFiles?.length >= maxFiles,
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
    maxSize: maxSizeInMBs * 1024 * 1024,
  });

  return (
    <>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          backgroundColor: 'white',
          border: (theme) => `2px dashed ${theme.palette.primary.main}`,
          borderRadius: 2,
          padding: 4,
          width: '100%',
          textAlign: 'center',
          cursor: allValidFiles?.length >= maxFiles ? 'default' : 'pointer',
        }}
      >
        <input {...getInputProps()} />

        <Box pb={isEmpty(allValidFiles) ? 0 : 3}>
          <Typography>
            Drag & drop {maxFiles > 1 ? 'files' : 'file'} here, or click to
            select {maxFiles > 1 ? 'files' : 'file'}
          </Typography>
          <Typography>
            (Accepted formats: {fileTypeArray?.join(' ')?.toUpperCase()})
          </Typography>
          {allValidFiles?.length >= 5 && (
            <Typography color="red" variant="p2">
              File upload limit exceeded (Max {maxFiles} uploads)
            </Typography>
          )}
        </Box>

        {!isEmpty(allValidFiles) && (
          <PaperBox>
            <Grid container columnGap={3} rowGap={5}>
              {allValidFiles?.map((file, key) => (
                <Grid item sm={3} xs={6} key={key}>
                  <FileItem
                    file={file?.fileContent}
                    fileName={file?.fileName}
                    fileType={file?.contentType}
                    onClickRemove={() => {
                      handleFileDelete(file, key);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </PaperBox>
        )}
      </Box>
    </>
  );
};

export default FileImport;
