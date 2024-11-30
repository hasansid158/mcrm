import React from 'react'
import Papa from 'papaparse';
import { CSVLink } from "react-csv";
import { useDispatch } from 'react-redux';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox'
import PaperBox from 'common/ui/PaperBox';
import useScreenSize from 'hooks/useScreenSize'

import { Typography, Box, Button } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';

import { setErrorDialogText , setSnackBar } from 'redux/slices/commonSlice/commonSlice';

export default function BulkImportDialog({
  open = false,
  handleClose = () => {},
  sampleFileName = 'sample-file.csv',
  sampleFileHeaders = [],
  onDataDownload = () => {},
}) {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();

  const handleUpload = (event) => {
    if (event.target.files?.[0]?.type === 'text/csv') {
      Papa.parse(event.target.files?.[0], {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          onDataDownload(res?.data);
          handleClose(); // Close dialog after successful upload
        },
      })
    } else {
      //show file type error dialog here
      console.log('wrong file type');
      dispatch(setErrorDialogText('Wrong file type uploaded, please upload the sample csv file provided.'))
    }

    event.target.value = null;
  }

  return (
    <>
      <DialogBox
        title='Import'
        disableFormFooter
        open={open}
        handleClose={handleClose}
        maxWidth='sm'
        py={2}
      >
        <PaperBox
          sx={{backgroundColor: 'common.backgroundGrey'}}
        >
          <Typography variant='h6'>
            Instructions to bulk import data:
          </Typography>

          <Box
            component='ol'
            mt={1}
            display='flex'
            flexDirection='column'
            rowGap={1}
          >
            <li>Download the preformatted sample csv file from the button below.</li>
            <li>Once downloaded, please add your data to the each column and update the file.</li>
            <li>After updating the file with correct data please click the upload button to upload the file.</li>
          </Box>

          <Box
            display='flex'
            columnGap={2}
            rowGap={2}
            flexWrap='wrap'
            justifyContent={isMobile ? 'center' : 'left'}
            mt={4}
          >
              <CSVLink
                data={[sampleFileHeaders]}
                filename={sampleFileName}
              >
                <Button
                  variant='outlined'
                  endIcon={<DownloadIcon sx={{fontSize: '18px'}}/>}
                >
                  Download Sample CSV
                </Button>
              </CSVLink>

              <Button
                variant='contained'
                component="label"
                endIcon={<FileUploadIcon sx={{fontSize: '18px'}}/>}
              >
                Upload CSV
                <input
                  styles={{display:"none"}}
                  type="file"
                  accept=".csv"
                  hidden
                  onChange={handleUpload}
                />
              </Button>

              <Button
                variant='outlined'
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
          </Box>
        </PaperBox>
      </DialogBox>
    </>
  )
}
