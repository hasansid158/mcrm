import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Selector from 'common/input/Selector';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import SearchSelect from 'common/input/SearchSelect';
import { lettersOnly, numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';

import { useSelector, useDispatch } from 'react-redux';
import { fetchLeadTypes } from 'redux/slices/listSlice/listSlice';

import RichTextfield from 'common/input/richTextField/RichTextfield';
import { isEmpty } from 'lodash';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const LeadsForm = ({
  formData,
  // isEdit = false,
  // handleEditApply = () => {},
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();
  const {
    accountList,
    leadStatusList,
    leadTypes,
    contactList
  } = useSelector(state => state.lists)

  useEffect(() => {
    if (!isEmpty(leadTypes)) return

    dispatch(fetchLeadTypes());
  }, []);

  return (
    <>
      <Box sx={{
        backgroundColor: 'white',
        px: 2,
        py: 1,
      }}>
         <Typography>Lead Information</Typography>
      </Box>
      <Grid
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        {/* <Grid sm={6} xs={12} item>
          <Box mb={.8}>
            <Typography variant='p2'> `
              Lead Owner
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <AccountCircle sx={{mr: .2}} />
            <Typography variant='p'>
              Name Here
            </Typography>
          </Box>
        </Grid> */}

        {/* <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            required
            name='leadOwner' label='Lead Owner'
            // selectorData={[
            //   {value: 'hasanSid', label: 'hasanSid'},
            //   {value: 'Basan Patil', label: 'Basan Patil'},
            //   {value: 'BP', label: 'BP'},
            // ]}
          />
        </Grid> */}
        <Grid sm={3} xs={12} item>
        <SearchSelect
            required
            name='leadOwner' label='Lead Owner'
            searchSelectData={contactList}
            formData={formData}
            returnLabel
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            name='Job title'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            required name='leadTitle'
          />
        </Grid>

        {/* <Grid sm={3} xs={12} item>
          <SearchSelect
            required
            name='leadStatus'
            searchSelectData={leadStatusList}
            formData={formData}
            returnLabel
          />
        </Grid> */}

        <Grid sm={3} xs={12} item>
          <Selector
            formData={formData}
            name='salutation'
            required
            selectorData={[
              {value: 'MR', label: 'MR'},
              {value: 'MS', label: 'MS'},
              {value: 'MRS', label: 'MRS'},
            ]}
          />
        </Grid>

        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            format={lettersOnly}
            required
            name='firstName'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            format={lettersOnly}
            required
            name='lastName'
          />
        </Grid>

        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            type='phone'
            required
            name='phone'
          />
        </Grid>

        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            required
            name='company'
          />
        </Grid>

        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            type='email'
            required
            name='email'
          />
        </Grid>

        <CustomerProjectSelectors
          formData={formData}
          sm={3}
          md={3}
          xs={12}
          projectName='projectId'
        />

        {/* <Grid sm={3} xs={12} item>
        <SearchSelect
            required
            name='accountId' label='Account'
            searchSelectData={accountList}
            formData={formData}
          />
        </Grid> */}


        <Grid sm={6} xs={12} item>
          <InputField
            formData={formData}
            required name='street'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            name='suburb'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            required name='city'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
        <SearchSelect
            formData={formData}
            required name='State'
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
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            required
            name='postcode'
          />
        </Grid>

        <Grid sm={3} xs={12} item>
            <SearchSelect
            formData={formData}
            name='country' label='Country'
            searchSelectData={[
              {value: 'Australia', label: 'Australia'},
              {value: 'New Zealand', label: 'New Zealand'},
              {value: 'USA', label: 'USA'},
              {value: 'India', label: 'India'}
            ]}
          />
        </Grid>
        <Grid sm={3} xs={12} item>
          <InputField
            formData={formData}
            name='website'
          />
        </Grid>
        <Grid sm={3} xs={12} item>
        <SearchSelect
            required
            name='leadtype' label='Lead Type'
            searchSelectData={leadTypes}
            loading={isEmpty(leadTypes)}
            formData={formData}
            returnLabel
          />
        </Grid>
        <Grid sm={12} xs={12} item>
          <Typography
            component='div'
            variant='p3'
            fontWeight='500'
            mb={1}
          >
            Description
          </Typography>
          <RichTextfield
            formData={formData}
            name='description'
            placeholder="description..."
            disableImage
          />
        </Grid>

      </Grid>
    </>
  );
}
export default LeadsForm;
