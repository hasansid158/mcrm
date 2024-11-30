import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Selector from 'common/input/Selector';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';

import { lettersOnly, numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';

import DatePicker from 'common/input/DatePicker';
import { addYears } from 'date-fns';

const PaymentOrderForm = ({
  formData,
  isEdit = false,
  handleEditApply = () => {},
}) => {
  const { isMobile } = useScreenSize();

  const commonInputProps = {
    formData: formData,
    isEditable: isEdit,
    onEditApply: handleEditApply,
  };

  return (
    <>
      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
      }}>
        <Typography>Payment Order Information</Typography>
      </Box>

      <Grid
        px={!isMobile && 4}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >

        <Grid sm={6} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='purchaseOrderNo'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='dateApproved'
            required
            maxDate={addYears(new Date(), -10)}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <SwitchToggle
            {...commonInputProps}
            name='isSelected'
            label={<Typography>Is selected?&nbsp;</Typography>}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <SwitchToggle
            {...commonInputProps}
            name='isExported'
            label={<Typography>Is exported?</Typography>}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <SwitchToggle
            {...commonInputProps}
            name='isInactive'
            label={<Typography>Is inactive?&nbsp;&nbsp;</Typography>}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='poTotal'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='requestorID'
            format={numberOnly}
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='supplierID'
            format={numberOnly}
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='purchaseID'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='lastUpdated'
            maxDate={addYears(new Date(), -10)}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='lastUpdateUser'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='costCentreID'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='poType'
            required
            selectorData={[
              {value: 'name1', label: 'Name 1'},
              {value: 'name2', label: 'Name 2'},
              {value: 'name3', label: 'Name 3'},
            ]}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='poStatus'
            required
            selectorData={[
              {value: 'name1', label: 'Name 1'},
              {value: 'name2', label: 'Name 2'},
              {value: 'name3', label: 'Name 3'},
            ]}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='requestorComments'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='approverComments'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='lastActionedDate'
            required
            maxDate={addYears(new Date(), -10)}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='supplierInvoiceNo'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='purchaseOrder_Invoice'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='purchaseOrder_POAppover'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='purchaseOrder_Project'
          />
        </Grid>

      </Grid>
    </>
  );
}

export default PaymentOrderForm;
