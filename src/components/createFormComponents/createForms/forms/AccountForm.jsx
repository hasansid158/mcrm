import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Selector from 'common/input/Selector';
import InputField from 'common/input/InputField';

import { lettersOnly, numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';

const AccountForm = ({
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
        <Typography>Account Information</Typography>
      </Box>

      <Grid
        px={!isMobile && 4}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='accountOwner'
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
            format={lettersOnly}
            required
            {...commonInputProps}
            name='accountName'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='accountNumber'
            format={numberOnly}
            required
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='accountType'
            required
            selectorData={[
              {value: 'admin', label: 'Admin'},
              {value: 'user', label: 'User'},
              {value: 'developer', label: 'Developer'},
            ]}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='parentAccount'
            required
            selectorData={[
              {value: 'account 1', label: 'account 1'},
              {value: 'account 2', label: 'account 2'},
              {value: 'account 3', label: 'account 3'},
            ]}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            required
            name='email'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='phone'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='website'
          />
        </Grid>


        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='industry'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <Selector
            {...commonInputProps}
            name='rating'
            selectorData={[
              {value: '1', label: '1'},
              {value: '3', label: '3'},
              {value: '5', label: '5'},
            ]}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='employees'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='sicCode'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='fax'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='tickerSymbol'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='ownerShip'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='annualRevenue'
            format={numberOnly}
          />
        </Grid>
      </Grid>

      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
        mt: 1,
      }}>
        <Typography>Address Information</Typography>
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
            {...commonInputProps}
            name='billingStreet'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='billingCity'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='billingState'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='billingSuburb'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='billingPostcode'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='billingCountry'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingStreet'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingCity'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingState'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingSuburb'
          />
        </Grid>

        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingPostcode'
          />
        </Grid>
        <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='shippingCountry'
          />
        </Grid>
      </Grid>

      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
        mt: 1,
      }}>
        <Typography>Description Information</Typography>
      </Box>

      <Grid
        px={!isMobile && 4}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid sm={12} xs={12} item>
          <InputField
            {...commonInputProps}
            name='description'
            multiline
            maxRows={6}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AccountForm;
