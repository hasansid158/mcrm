import React, { useEffect } from 'react';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import PaperBox from 'common/ui/PaperBox';
import useScreenSize from 'hooks/useScreenSize';

import usePdf from 'hooks/usePdf';

import { Button } from '@mui/material';

const ViewPdfDialog = ({
  open = false,
  handleClose = () => {},
  pdfTemplate,
  pdfTitle = '',
}) => {
  const { isTablet } = useScreenSize();
  const { downloadPdf, ViewPdf, openPdf } = usePdf(pdfTemplate);

  useEffect(() => {
    if(isTablet && open) {
      openPdf();
      handleClose();
    }
  }, [open]);

  return (
    <DialogBox
      open={open}
      handleClose={handleClose}
      maxWidth='md'
      sx={{
        '& .MuiDialogContent-root': {
          overflowY: 'unset',
        }
      }}
      footerItems={
        <Button
          variant='contained'
          size='small'
          onClick={() => downloadPdf(pdfTitle)}
        >
          Download
        </Button>
      }
    >
      <PaperBox
        sx={{
          height: '700px',
          my: 1,
        }}
      >
        <ViewPdf/>
      </PaperBox>
    </DialogBox>
  );
}

export default ViewPdfDialog;
