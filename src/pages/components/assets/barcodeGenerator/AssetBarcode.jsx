import React, { useState, useCallback } from 'react';

import { downloadPdf, printPdf } from 'utils/pdfUtils';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';

import { barcodeSizes, defaultSize } from './barcodeSizes';
import { generateBarcodes } from './generateBarcodes';
import BarcodePdf from 'components/pdfTemplates/BarcodePdf';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import SearchSelect from 'common/input/SearchSelect';
import PaperBox from 'common/ui/PaperBox';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';

const MAX_BARCODES = 200;

const AssetBarcode = ({ selectedAssets = [] }) => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const [loading, setLoading] = useState(false);

  //make each function to receive the template instead of the usePdf and also update everywhere

  const handleOpenDialog = useCallback(() => {
    if (isEmpty(selectedAssets)) {
      dispatch(
        setErrorDialogText(
          `Please select at least one asset and no more than ${MAX_BARCODES} assets to proceed.`,
        ),
      );
      return;
    }

    if (selectedAssets.length > MAX_BARCODES) {
      dispatch(
        setErrorDialogText(
          `You've selected too many assets. Please limit your selection to ${MAX_BARCODES} assets to generate barcodes.`,
        ),
      );
      return;
    }

    setOpenDialog(true);
  }, [selectedAssets]);

  const handleClick = useCallback(
    async (action) => {
      const barcodeData = generateBarcodes(selectedAssets, 'ssn', selectedSize);

      console.log(barcodeData);

      const newTemplate = (
        <BarcodePdf barcodeData={barcodeData} labelSize={selectedSize} />
      );

      setLoading(true);
      if (action === 'download') {
        await downloadPdf(newTemplate, 'barcodes.pdf');
      } else {
        await printPdf(newTemplate);
      }
      setLoading(false);
    },
    [selectedAssets, selectedSize],
  );

  return (
    <>
      <DialogBox
        open={openDialog}
        title="Generate Barcode"
        handleClose={() => setOpenDialog(false)}
        disableFormFooter
        maxWidth="xs"
      >
        <PaperBox>
          <Box mt={1}>
            <SearchSelect
              searchSelectData={barcodeSizes}
              value={selectedSize}
              onChange={(name, value) => setSelectedSize(value)}
              label="Barcode Label Size"
              disableClearable
            />
          </Box>

          <Box display="flex" gap={1} mt={3}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={loading}
              loadingPosition="start"
              startIcon={<DownloadRoundedIcon />}
              onClick={() => handleClick('download')}
            >
              {loading ? 'Preparing Barcodes' : 'Download Barcodes'}
            </LoadingButton>

            <LoadingButton
              fullWidth
              variant="contained"
              loading={loading}
              loadingPosition="start"
              startIcon={<PrintRoundedIcon />}
              onClick={() => handleClick('print')}
            >
              {loading ? 'Preparing Barcodes' : 'Print Barcodes'}
            </LoadingButton>
          </Box>
        </PaperBox>
      </DialogBox>

      <Box onClick={handleOpenDialog}>
        <FormatAlignCenterIcon sx={{ transform: 'rotateZ(90deg)' }} />
        Asset Barcode
      </Box>
    </>
  );
};

export default AssetBarcode;
