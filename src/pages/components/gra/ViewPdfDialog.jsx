import React, { useEffect } from 'react';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import PaperBox from 'common/ui/PaperBox';
import useScreenSize from 'hooks/useScreenSize';

import { downloadPdf, ViewPdf, openPdf } from 'utils/pdfUtils';

import { Button } from '@mui/material';

const ViewPdfDialog = ({
  open = false,
  handleClose = () => {},
  pdfTemplate,
  pdfTitle = '',
}) => {
  const { isTablet } = useScreenSize();

  useEffect(() => {
    if (isTablet && open) {
      openPdf(pdfTemplate);
      handleClose();
    }
  }, [open]);

  return (
    <DialogBox
      open={open}
      handleClose={handleClose}
      maxWidth="md"
      sx={{
        '& .MuiDialogContent-root': {
          overflowY: 'unset',
        },
      }}
      footerItems={
        <Button
          variant="contained"
          size="small"
          onClick={() => downloadPdf(pdfTemplate, pdfTitle)}
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
        <ViewPdf template={pdfTemplate} />
      </PaperBox>
    </DialogBox>
  );
};

export default ViewPdfDialog;
