import React from 'react';

import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';
import SwitchToggle from 'common/input/SwitchToggle';

import { lettersOnly, numberOnly } from 'utils/textFormatUtils';
import { useSelector } from 'react-redux';

import { countryList, StateField } from 'enum/addressEnum';

import RichNoteField from 'common/input/RichNoteField';
import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';
import DatePicker from 'common/input/DatePicker';

const SupplierForm = ({
  formData,
  isUpdate,
}) => {

  const gridItemSize = {
    md: 3,
    sm: 4,
    xs: 12,
  };

  return (
    <>
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
            name='supplierName'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            format={lettersOnly}
            formData={formData}
            name='contactPerson'
            required
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='contactEmail'
            type='email'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='contactPhone'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='address'
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
            selectedCountry={formData?.watch('country')}
            formData={formData}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='city'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='zipCode'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='taxIdentificationNumber'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='vendorCode'
          />
        </Grid>

        {isUpdate && <>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name='paymentTerms'
            />
          </Grid>

          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name='paymentMethod'
            />
          </Grid>
        </>}

        <Grid {...gridItemSize} item>
          <DatePicker
            formData={formData}
            name='lastOrderDate'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <DatePicker
            formData={formData}
            name='contractEndDate'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='supplierWebsite'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='averageLeadTime'
            format={numberOnly}
            type='number'
          />
        </Grid>

        {isUpdate &&
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name='qualityRating'
            />
          </Grid>
        }

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='abn'
            // format={numberOnly}
          />
        </Grid>

        {isUpdate && <>
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
            <SwitchToggle
              formData={formData}
              name='isActive'
            />
          </Grid>
        </>}

        <Grid {...gridItemSize} item>
          <SwitchToggle
            formData={formData}
            name='isPreferredSupplier'
          />
        </Grid>

        {isUpdate && <>
          <Grid {...gridItemSize} item>
            <SwitchToggle
              formData={formData}
              name='isCertifiedSupplier'
            />
          </Grid>

          <Grid {...gridItemSize} item>
            <SwitchToggle
              formData={formData}
              name='isBlacklisted'
            />
          </Grid>

          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name='blacklistReason'
            />
          </Grid>
        </>}

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

export default SupplierForm;
