import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';
import { numberOnly } from 'utils/textFormatUtils';

import { useSelector } from 'react-redux';
import SearchSelect from 'common/input/SearchSelect';

const CustomerForm = ({ formData = {} }) => {

  const { userList = [] } = useSelector(state => state?.lists);

  const { isMobile } = useScreenSize();
  const gridItemSize = {
    xs: 12,
    sm: 4,
    md: 3,
  };
  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="customerName"
          required
          label="Customer Name"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="customerType"
          required
          label="Customer Type"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="clientRef"
          label="Client Reference"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="customerPO"
          label="Customer PO"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="salesPersonID"
          label="Sales Person ID"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="projectManagerID"
          label="Project Manager ID"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="sendEmailNotifications"
          label="Send Email Notifications"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="welcomeMessage"
          label="Welcome Message"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="billingType"
          label="Billing Type"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="useNetInvoicing"
          label="Use Net Invoicing"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isInactive"
          label="Inactive"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="includeClientRefInCafFilename"
          label="Include Client Ref in CAF Filename"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="urlSegment"
          label="URL Segment"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="phone"
          label="Phone"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="email"
          label="Email"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="street"
          label="Street"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="city"
          label="City"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="state"
          label="State"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="country"
          label="Country"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="postcode"
          label="Postcode"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="paymentMethod"
          label="Payment Method"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="shippingMethod"
          label="Shipping Method"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="currency"
          label="Currency"
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="accountId"
          required
          label="Account"
          searchSelectData={userList?.list || []}
        />
      </Grid>
    </Grid>
  );
};
export default CustomerForm;