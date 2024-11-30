import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SearchSelect from 'common/input/SearchSelect';
import Selector from 'common/input/Selector';
import InputField from 'common/input/InputField';
import { lettersOnly, numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';
import { useSelector } from 'react-redux';

import RichTextfield from 'common/input/richTextField/RichTextfield';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const ContactsForm = ({
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

  const {
    accountList,
  } = useSelector(state => state.lists)

  return (
    <>
      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
      }}>
        <Typography>Contact Information</Typography>
      </Box>
      <Grid
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {/* <Grid sm={4} xs={12} item>
          <Selector
            {...commonInputProps}
            name='contactOwner' label='Contact Owner'
            required
            selectorData={[
              {value: 'name1', label: 'Name 1'},
              {value: 'name2', label: 'Name 2'},
              {value: 'name3', label: 'Name 3'},
            ]}
          />
        </Grid> */}

        <Grid sm={4} xs={12} item>
          <Selector
            {...commonInputProps}
            name='salutation' label='Salutation'
            required
            selectorData={[
              {value: 'mr', label: 'Mr'},
              {value: 'miss', label: 'Miss'},
              {value: 'mrs', label: 'Mrs'},
            ]}
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <InputField
            format={lettersOnly}
            required
            {...commonInputProps}
            name='firstName' label='First Name'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            format={lettersOnly}
            required
            {...commonInputProps}
            name='lastName' label='Last Name'
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <SearchSelect
            required
            {...commonInputProps}
            name='accountId' label='Account'
            searchSelectData={accountList}
          />
        </Grid> */}

        <CustomerProjectSelectors
          formData={formData}
          sm={4}
          md={4}
          xs={12}
        />

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='title'
            label='Job title'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='email'
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='phone'
            required
          />
        </Grid> */}

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='mobile'
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='dateOfBirth'
            required
            maxDate={addYears(new Date(), -18)}
          />
        </Grid> */}

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='company'
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='webSite'
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
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='street'
            required
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='city'
            required
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <SearchSelect
            {...commonInputProps}
            name='state'
            required
            searchSelectData={[
              {value: 'NSW', label: 'NSW'},
              {value: 'VIC', label: 'VIC'},
              {value: 'QLD', label: 'QLD'},
              {value: 'TAS', label: 'TAS'},
              {value: 'WA', label: 'WA'},
              {value: 'SA', label: 'SA'},
              {value: 'ACT', label: 'ACT'},
              {value: 'NT', label: 'NT'}
            ]}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='suburb'
            required
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='postcode'
            required
          />
        </Grid>


        <Grid sm={4} xs={12} item>
          <SearchSelect
            {...commonInputProps}
            name='country'
            required
            searchSelectData={[
              {value: 'Australia', label: 'Australia'},
              {value: 'New Zealand', label: 'New Zealand'},
              {value: 'USA', label: 'USA'},
              {value: 'India', label: 'India'}
            ]}
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
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid xs={12} item>
          <RichTextfield
            formData={formData}
            name='description'
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ContactsForm;
