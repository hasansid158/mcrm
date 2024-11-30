import React, { useEffect, useState } from 'react';

import InputFieldImport from './InputFieldImport';

import { IconButton, Box, Typography } from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { base64ToImgSrc } from 'utils/fileHelperFunctions';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

const AvatarImport = ({
  formData,
  name = '',
  dialogTitle = '',
  label = 'LOGO',
  labelComponent,
  size = '90px',
  noCancel,
  handleFileUpload = () => {},
  file,
  loading = false,
  enableBorder,
  ...rest
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    formData && setCurrentFile(formData?.watch(name) || null);
    file && setCurrentFile(file);
  }, [file]);

  useEffect(() => {
    console.log(formData?.watch(name), currentFile)

    formData && formData?.setValue(name, currentFile);
  }, [currentFile]);

  return <>
    <InputFieldImport
      customInput
      name={name}
      dialogTitle={dialogTitle}
      {...rest}
      dialogMaxWidth='xs'
      returnStringFile
      acceptedFileTypes={{'image': ['.jpg', '.jpeg', '.png']}}
      openDialog={openDialog}
      handleDialogClose={() => setOpenDialog(false)}
      setUploadedFile={(base64File, fileObject) => {
        setCurrentFile(base64File);
        setOpenDialog(false);
        handleFileUpload(fileObject);
      }}
    />

    <Box position='relative'>
      <IconButton
        color='secondary'
        sx={{
          width: size,
          height: size,
          zIndex: '10',

          border: enableBorder ? '1px solid' : 'unset',
          borderColor: 'secondary.main',

          '&:hover': {
            '& svg': { display: 'block' },
            '& .MuiTypography-root': { display: 'none' },
            backgroundColor: 'rgba(0,0,0,.3)',
          },
          '& svg': { display: 'none' },

          backgroundImage: `url(${base64ToImgSrc(currentFile || '')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}

        onClick={() => {
          (!currentFile || noCancel) ? setOpenDialog(true) : setCurrentFile(null);
        }}
      >
        {(!currentFile || noCancel) ?
          <FileUploadRoundedIcon sx={{scale: '1.5', color: 'primary.main', zIndex: '10' }}/> :
          <CloseRoundedIcon sx={{scale: '2', color: 'crimson', zIndex: '10'}}/>
        }

        {(!currentFile && !labelComponent) && <Typography Typography variant='pb'>{label}</Typography>}
      </IconButton>

      {!currentFile && labelComponent &&
        <Box position='absolute' top='0' left='0' zIndex={5}>
          {labelComponent}
        </Box>
      }

      <SpinLoader loading={loading} noBlur sx={{backgroundColor: 'transparent'}} />
    </Box>
  </>;
}

export default AvatarImport;
