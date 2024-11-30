import React from 'react';

import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';

import { lettersOnly } from 'utils/textFormatUtils';
import { useSelector } from 'react-redux';

import { countryList, StateField } from 'enum/addressEnum';

import RichNoteField from 'common/input/RichNoteField';
import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const VendorsForm = ({
  formData,
}) => {

  const gridItemSize = {
    md: 3,
    sm: 4,
    xs: 12,
  };

  return (
    <>
      {/* <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
      }}>
        <Typography>Vendors Information</Typography>
      </Box> */}

      <Grid
        sx={{ px: 1 }}
        py={2}
        container
        rowSpacing={3}
        columnSpacing={2}
      >
        <CustomerProjectSelectors
          formData={formData}
          sm={4}
          md={3}
          xs={12}
        />

        <Grid {...gridItemSize} item>
          <InputField
            required
            formData={formData}
            name='vendorName'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='productOrServiceOffered'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='contactNumber' label='Contact'
            // format={numberOnly}
            required
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='email'
            type='email'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='suburb'
          />
        </Grid>
        <Grid {...gridItemSize} item>
            <SearchSelect
            formData={formData}
            name='country'
            searchSelectData={countryList}
          />
        </Grid>
        <Grid {...gridItemSize} item>
          <StateField
            formData={formData}
            selectedCountry={formData?.watch('country')}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='postcode'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='abn'
            // format={numberOnly}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='bankName'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='bankAccountNumber'
            // format={numberOnly}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='paymentTerms'
          />
        </Grid>

        <Grid xs={12} item>
          <RichNoteField
            formData={formData}
            name='notes'
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VendorsForm;
