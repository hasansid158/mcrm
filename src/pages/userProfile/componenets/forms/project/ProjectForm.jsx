import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';
import useScreenSize from 'hooks/useScreenSize';
import { useSelector } from 'react-redux';

import AvatarImport from 'common/input/fileImport/AvatarImport';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

export default function ProjectForm({
  formData,
}) {
  const { isMobile } = useScreenSize();

  const {
    userList: { list },
  } = useSelector(state => state.lists);

  const {
    userFirstName,
    userLastName,
    userAccount,
  } = useSelector(state => state.userDetails);

  const gridItemSize = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  useEffect(() => {
    formData?.setValue('createdBy', `${userFirstName || ''} ${userLastName || ''}`)
    formData?.setValue('accountId', userAccount?.accountId);
  }, [userAccount]);

  return (
    <>
      <Box display='flex' justifyContent='center' my={2}>
        <AvatarImport
          formData={formData}
          name='logo'
          dialogTitle='Upload logo'
          label='LOGO'
          enableBorder
          size='120px'
        />
      </Box>

      <Grid
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={3}
        columnSpacing={2}
      >
        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='projectType'
            searchSelectData={[
              { "value": "Asset Recovery & Resale", "label": "Asset Recovery & Resale" },
              { "value": "Cloud Migration & Data Center Decommissioning", "label": "Cloud Migration & Data Center Decommissioning" },
              { "value": "Data Sanitization / Data Destruction", "label": "Data Sanitization / Data Destruction" },
              { "value": "E-Waste Recycling", "label": "E-Waste Recycling" },
              { "value": "IT Asset Auditing & Inventory", "label": "IT Asset Auditing & Inventory" },
              { "value": "Decommissioning", "label": "Decommissioning" },
              { "value": "Certified Asset Disposal & Compliance", "label": "Certified Asset Disposal & Compliance" },
              { "value": "Lease Return Management", "label": "Lease Return Management" },
              { "value": "IT Assets Lifecycle Management", "label": "IT Assets Lifecycle Management" },
              { "value": "Hard Drive Shredding (On-site or Off-site)", "label": "Hard Drive Shredding (On-site or Off-site)" },
              { "value": "Device Buyback Program", "label": "Device Buyback Program" },
            ]}
            required
          />

        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            formData={formData}
            name='projectName'
          />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='customer'
            searchSelectData={customerList}
            required
          />
        </Grid> */}
        <CustomerProjectSelectors
          formData={formData}
          noProject
          {...gridItemSize}
        />

        {/* <Grid {...gridItemSize} item>
          <SearchSelect
            name='fk_AccountID'
            label='Account'
            required
            searchSelectData={accountList}
            formData={formData}
          />
        </Grid> */}

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='clientRef'
          />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            required
            name='costCentreID' label='cost Centre'
          />
        </Grid> */}

        <Grid {...gridItemSize} item>
          <SearchSelect
            name='salesManager'
            searchSelectData={list}
            formData={formData}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            name='accountManager'
            searchSelectData={list}
            formData={formData}
          />
        </Grid>
{/*
        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='supplierID' label='Supplier'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SwitchToggle
            formData={formData}
            name='sendJEmailNotifications'
            label={<Typography variant='p2'>Send Email Notifications</Typography>}
            labelPlacement='end'
          />
        </Grid> */}
{/*
        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='billingType'
          />
        </Grid> */}

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='websiteLink'
          />
        </Grid>
{/*
        <Grid {...gridItemSize} item>
          <SwitchToggle
            formData={formData}
            name='isInactive'
            label={<Typography variant='p2'>Is Inactive</Typography>}
            labelPlacement='end'
          />
        </Grid>  */}

        {/* <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='docsOnlineFolder'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='welcomeMessage'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SwitchToggle
            formData={formData}
            name='useNetInvoicing'
            label={<Typography variant='p2'>Use Net Invoicing</Typography>}
            labelPlacement='end'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SwitchToggle
            formData={formData}
            name='includeClientRefInCafFilename'
            label={<Typography variant='p2'>Include Client Ref In Caf Filename</Typography>}
            labelPlacement='end'
          />
        </Grid> */}
      </Grid>
    </>
  );
}