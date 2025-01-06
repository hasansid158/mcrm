import React, { useState, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import FileImport from 'common/input/fileImport/FileImport';
import PaperBox from 'common/ui/PaperBox';

import { Box, Grid, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { parseCsvXlsx } from 'utils/fileHelperFunctions';
import { isEmpty, keys } from 'lodash';

import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';
import DividerLine from 'common/ui/DividerLine';
import SearchSelect from 'common/input/SearchSelect';
import { arrayToValueLabel } from 'utils/helperFunctions';
import InputField from 'common/input/InputField';
import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';
import {
  setErrorDialogText,
  setSnackBar,
} from 'redux/slices/commonSlice/commonSlice';

import useReactForm from 'hooks/useReactForm';
import { updateImportData } from './updateImportData';

export default function CustomImport({
  isOpen = false,
  setIsOpen = () => {},
  internalImportFields = [
    {
      name: 'string',
      label: 'string',
      type: 'string',
      required: true,
    },
  ],
  setMapFields = () => {},
  dispatchApi = () => {},
}) {
  const dispatch = useDispatch();
  const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [parsedFileData, setParsedFileData] = useState([]);
  const [importedColumnList, setImportedColumnList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { userAccount } = useSelector((state) => state?.userDetails);

  const { formData, handleSubmit, reset } = useReactForm({
    accountId: userAccount?.accountId,
  });

  const handleFileUpdate = useCallback((file) => {
    if (!file) return;
    parseCsvXlsx(file, (fileData) => {
      setParsedFileData(fileData || []);
      const convertedToSelectorList = arrayToValueLabel(
        keys(fileData?.[0] || {}) || [],
      );
      console.log(file, convertedToSelectorList);
      setImportedColumnList(convertedToSelectorList || []);
    });
  }, []);

  const onSubmitConfirm = async (data) => {
    //apply data merging here
    setIsConfirmOpen(false);
    setLoading(true);

    const updatedData = await updateImportData(
      parsedFileData,
      data,
      5,
      (progress) => progress < 90 && setLoadingProgress(progress),
    );

    dispatch(dispatchApi(updatedData))
      .unwrap()
      ?.then(() => {
        dispatch(
          setSnackBar({
            open: true,
            message: `${updatedData?.length} items imported successfully!`,
          }),
        );
        setIsOpen(false);
      })
      ?.catch((err) => {
        console.log(err);
        dispatch(
          setErrorDialogText(
            `Error occured while uploading data.<br />
            One or more of the required fields were missing from the imported data, please check your data for required values and try again.`,
          ),
        );
      })
      ?.finally(() => {
        setLoading(false);
        setLoadingProgress(0);
        setParsedFileData([]);
        setImportedColumnList([]);
        reset({});
      });
  };

  const onSubmit = () => setIsConfirmOpen(true);

  const MapField = useCallback(
    ({ fieldData = {} }) => (
      <>
        <Grid item sm={5} xs={12}>
          <SearchSelect
            label={fieldData?.required ? 'Required' : ''}
            noLabel={!fieldData?.required}
            searchSelectData={importedColumnList}
            required={fieldData?.required}
            placeholder="Select column"
            name={fieldData?.name}
            formData={formData}
            helperText="This is required"
            defaultValue=""
          />
        </Grid>

        <Grid item sm={2} xs={12} textAlign="center">
          <ArrowRightAltIcon
            sx={{
              scale: '2',
              fill: (theme) => `${theme.palette.primary.main}`,
            }}
          />
        </Grid>

        <Grid item sm={5} xs={12}>
          <InputField readOnly value={fieldData?.label} />
        </Grid>
      </>
    ),
    [importedColumnList],
  );

  return (
    <>
      <DialogBox
        open={isOpen && isEmpty(parsedFileData)}
        title="Bulk Import"
        handleClose={() => setIsOpen(false)}
        maxWidth="sm"
        disableFormFooter
      >
        <PaperBox>
          <FileImport
            maxFiles={1}
            maxSizeInMBs={20}
            acceptedFileTypes={{
              application: ['.xlsx', '.csv'],
            }}
            setAllValidFiles={(file = []) =>
              handleFileUpdate(file?.[0]?.fileContent)
            }
          />
        </PaperBox>
      </DialogBox>

      <DialogBox
        open={!isEmpty(parsedFileData)}
        title="Import Field Mapping"
        handleClose={() => setIsConfirmCloseOpen(true)}
        disableSubmitNew
        maxWidth="sm"
        handleFormSubmit={() => handleSubmit(onSubmit)()}
      >
        <PaperBox sx={{ pb: 3 }}>
          <Box mb={1}>
            <Typography>
              Map columns from your file to MasterCRM properties.
              <br />
              Fields which are left empty and are not required will be skipped.
            </Typography>
            <DividerLine color="primary.main" height="1px" sx={{ mt: 2 }} />
          </Box>

          <Box px={1}>
            <Grid
              container
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing={2.5}
              mt={0.5}
              mb={1.5}
            >
              {internalImportFields?.map((field, key) => (
                <MapField key={key} fieldData={field} />
              ))}
            </Grid>

            <DividerLine height="1px" sx={{ pt: 1 }} />

            <Box mt={3}>{setMapFields(formData)}</Box>
          </Box>
        </PaperBox>

        <SpinLoader
          loading={loading}
          isProgress
          progressText="We're processing your data. It should only take a few minutes. Hang tight!"
          progressValue={loadingProgress}
        />
      </DialogBox>

      <ConfirmDialog
        open={isConfirmCloseOpen}
        onCancel={() => setIsConfirmCloseOpen(false)}
        onConfirm={() => {
          setIsConfirmCloseOpen(false);
          setIsOpen(true);
          setParsedFileData([]);
        }}
      >
        Are you sure you want to close the mapping dialog?
        <br />
        You&apos;ll have to upload the file again.
      </ConfirmDialog>

      <ConfirmDialog
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => handleSubmit(onSubmitConfirm)()}
      >
        Before we proceed with uploading and processing your data, have you
        verified that all columns are selected correctly?
      </ConfirmDialog>
    </>
  );
}
