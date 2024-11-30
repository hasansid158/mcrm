import React, { useState } from 'react';

import useReactForm from 'hooks/useReactForm';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBar, setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import PaperBox from 'common/ui/PaperBox';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import InputField from 'common/input/InputField';

import { Grid } from '@mui/material';
import { submitGenerateGRA } from 'api/masterApi';

import { addGraItem } from 'redux/slices/detailSlice/graListSlice';
import GraPdf from 'components/pdfTemplates/GraPdf';
import ViewPdfDialog from './ViewPdfDialog';

import { isEmpty } from 'lodash';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const GraInfoForm = ({
  open = false,
  handleClose = () => {},
  graInfoData={}
}) => {
  const dispatch = useDispatch();

  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { formData, handleSubmit, reset } = useReactForm();
  const { userAccount } = useSelector(state => state?.userDetails)

  const onSubmit = (data) => {
    if (isEmpty(data)) return;

    setLoading(true);

    submitGenerateGRA({
      ...graInfoData,
      ...data,
      'accountId': userAccount?.accountId,
    }).then(res => {
      //add snackbar and open gra pdf and view gra
      dispatch(setSnackBar({
        open: true,
        message: `GRA created for ${graInfoData?.assetIDs?.length || 0} assets.`,
      }));

      setPdfData(res);
      dispatch(addGraItem(res));
      reset();
      handleClose();
    }).catch(err => {
      console.log(err);
      dispatch(setErrorDialogText('Error submitting gra, please try again later.'));
    }).finally(() => {
      setLoading(false);
    });
  }

  return <>
    <ViewPdfDialog
      open={!!pdfData}
      handleClose={() => setPdfData(null)}
      pdfTemplate={<GraPdf data={pdfData}/>}
      pdfTitle='GRA-Invoice'
    />
    <DialogBox
      open={open}
      handleClose={handleClose}
      disableSubmitNew
      submitText='Submit GRA'
      title='GRA Info'
      maxWidth='sm'
      handleFormSubmit={() => handleSubmit(onSubmit)()}
      loading={loading}
    >
      <PaperBox sx={{py: 2}}>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
        >
          <CustomerProjectSelectors
            formData={formData}
            sm={6}
            md={6}
            xs={12}
            noProject
          />

          <Grid item xs={12} sm={6}>
            <InputField
              name='receiver'
              formData={formData}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='sender'
              formData={formData}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='warehouseInformation'
              formData={formData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='shippingInformation'
              formData={formData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='qualityInspection'
              formData={formData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name='authorisedSignature'
              formData={formData}
            />
          </Grid>
        </Grid>
      </PaperBox>

    </DialogBox>
  </>;
}

export default GraInfoForm;
