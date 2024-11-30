import React, { useState } from 'react';

import InputField from '../InputField';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import FileImport from './FileImport';

import { Box, IconButton } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { isEmpty } from 'lodash';

import { blobToBase64 } from 'utils/fileHelperFunctions';

const InputFieldImport = ({
  formData = {},
  dialogMaxWidth = 'md',
  dialogTitle = 'Upload file',
  setUploadedFile = () => {},
  returnStringFile = false,
  acceptedFileTypes = null,
  name = '',
  customInput = false,
  openDialog = false,
  handleDialogClose = () => {},
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);

  const {
    getValues,
    setValue
  } = formData;

  return <>
    {!customInput &&
      <InputField
        formData={formData}
        placeholder='Click here to upload..'
        name={name}
        {...rest}
        onClick={() => (isEmpty(file) && !getValues(name)) && setOpen(true)}
        value={file?.[0]?.fileName || getValues(name) || ''}
        endAdornment={<>
          {(!isEmpty(file) || getValues(name)) &&
            <IconButton
              size='small'
              onClick={() => {
                setFile([]);
                setValue(name, '');
              }}
            >
              <CancelRoundedIcon color='secondary'/>
            </IconButton>
          }
        </>}
      />
    }

    <DialogBox
      open={openDialog || open}
      handleClose={() => {setOpen(false); handleDialogClose();}}
      maxWidth={dialogMaxWidth}
      title={dialogTitle}
      disableFormFooter
      disableBackDrop
    >
      <Box mb={2}>
        <FileImport
          maxFiles={1}
          acceptedFileTypes={acceptedFileTypes}
          setAllValidFiles={async (file) => {
            setFile(file);
            const modifiedFile = returnStringFile ? await blobToBase64(file?.[0]?.fileContent) : file;
            (!!formData?.setValue && returnStringFile) && formData?.setValue(name, modifiedFile);
            setUploadedFile(modifiedFile, file);
            setOpen(false);
          }}
        />
      </Box>
    </DialogBox>

  </>;
}

export default InputFieldImport;
