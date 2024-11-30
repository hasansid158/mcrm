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
import DatePicker from 'common/input/DatePicker';
import { addYears } from 'date-fns';
import { useSelector } from 'react-redux';

import RichNoteField from 'common/input/RichNoteField';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

import { zipObject } from 'lodash';
import { objToValueLabel } from 'utils/helperFunctions';
import { stageOrder } from 'enum/kanbanEnum';

export default function DealForm({
  formData,
  // isEdit = false,
  // handleEditApply = () => {},
  notrequired = false,
}) {
  const { isMobile } = useScreenSize();

  const commonInputProps = {
    formData: formData,
    // isEditable: isEdit,
    // onEditApply: handleEditApply,
    required: !notrequired,
  };

  const {
    accountList,
    contactList,
    userList,
  } = useSelector(state => state.lists);

  return (
    <>
      <Grid
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >
        <Grid sm={4} xs={12} item>
          <SearchSelect
            {...commonInputProps}
            returnLabel
            name='dealOwner'
            label='Deal Owner'
            searchSelectData={userList?.list}
          />

        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            format={lettersOnly}
            {...commonInputProps}
            name='dealName'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <Selector
            {...commonInputProps}
            name='dealType'
            selectorData={[
              {value: 'Asset Recovery Services', label: 'Asset Recovery Service Deal'},
              {value: 'Data Destruction Deals', label: 'Data Destruction Deal'},
              {value: 'Recycling Agreement Deal', label: 'Recycling Agreement Deal'},
              {value: 'Refurbishment and Resale Deal', label: 'Refurbishment and Resale Deal'},
              {value: 'Lease Return Management', label: 'Lease Return Management'},
              {value: 'Direct Resale', label: 'Direct Resale'},
              {value: 'Online Auction Deal', label: 'Online Auction Deal'},
              {value: 'Brokerage Service', label: 'Brokerage Service'},
              {value: 'Software Licensing Deal', label: 'Software Licensing Deal'},
              {value: 'Data Migration Service', label: 'Data Migration Service'},
              {value: 'Cloud-based CRM Solutions', label: 'Cloud-based CRM Solutions'},
              {value: 'Other', label: 'Other'},

            ]}
          />
        </Grid>



        <Grid sm={4} xs={12} item>
          {/* <InputField
            {...commonInputProps}
            name='leadSource'
          /> */}

            <Selector
            {...commonInputProps}
            name='leadSource'
            selectorData={[
              {value: 'Website', label: 'Website'},
              {value: 'Social Media', label: 'Social Media'},
              {value: 'Email Marketing', label: 'Email Marketing'},
              {value: 'Referrals', label: 'Referrals'},
              {value: 'Events and Trade Shows', label: 'Events and Trade Shows'},
              {value: 'Networking', label: 'Networking'},
              {value: 'Webinars and Online Workshops', label: 'Webinars and Online Workshops'},
              {value: 'Cold Calling', label: 'Cold Calling'},
              {value: 'Paid Advertising', label: 'Paid Advertising'},
              {value: 'Content Marketing', label: 'Content Marketing'},
              {value: 'Direct Mail', label: 'Direct Mail'},
              {value: 'Third-party Lead Generation Services', label: 'Third-party Lead Generation Services'},
              {value: 'Other', label: 'Other'},

            ]}
          />

        </Grid>

        <Grid sm={4} xs={12} item>
          <SearchSelect
            {...commonInputProps}
            name='contactName'
            label='Contact Name'
            returnLabel
            searchSelectData={contactList}
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='email'
          />
        </Grid> */}
        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='amount'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='expectedRevenue'
            format={numberOnly}
            required={false}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            required={false}
            name='closingDate'
            maxDate={addYears(new Date(), 1)}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          {/* <InputField
            {...commonInputProps}
            name='probability'
          /> */}
           <Selector
            {...commonInputProps}
            required={false}
            name='probability'
            selectorData={[
              {value: '10', label: '10%'},
              {value: '20', label: '20%'},
              {value: '30', label: '30%'},
              {value: '40', label: '40%'},
              {value: '50', label: '50%'},
              {value: '60', label: '60%'},
              {value: '70', label: '70%'},
              {value: '80', label: '80%'},
              {value: '90', label: '90%'},
              {value: '100', label: '100%'},
            ]}
          />

        </Grid>


        <Grid sm={4} xs={12} item>
          <Selector
            {...commonInputProps}
            name='stage'
            selectorData={objToValueLabel(zipObject(stageOrder.Deal, stageOrder.Deal))}
            required
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='compaignSource'
          />
        </Grid> */}

        {/* <Grid sm={4} xs={12} item>
          <SearchSelect
            {...commonInputProps}
            returnLabel
            name='accountName' label='Account'
            searchSelectData={accountList}
          />
        </Grid> */}

        <CustomerProjectSelectors
          formData={formData}
          sm={4}
          md={4}
          xs={12}
        />

        <Grid sm={12} xs={12} item>
          <RichNoteField
            formData={formData}
            name='description'
            label='Description'
            placeholder='Detailed description...'
          />
        </Grid>
      </Grid>
    </>
  );
}