import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { useSelector } from 'react-redux';
import { isNil } from 'lodash';

import SearchSelect from 'common/input/SearchSelect';
import InputField from 'common/input/InputField';
import DatePicker from 'common/input/DatePicker';
import RichTextfield from 'common/input/richTextField/RichTextfield';

import useScreenSize from 'hooks/useScreenSize';

import { getWorkOrderAssociatedDropdowns } from 'api/orderApis';

import CustomerProjectSelectors from '../dynamicSelectorFields/CustomerProjectSelectors';

const WOInfo = ({
  formData,
}) => {
  const { isMobile } = useScreenSize();
  const [associatedOrderLists, setAssociatedOrderLists] = useState({});
  const [orderListLoading, setOrderListLoading] = useState(false);

  const { userList, workOrderStatus, contactList } = useSelector(state => state.lists);
  const { userAccount } = useSelector(state => state?.userDetails)

  useEffect(() => {
    formData?.setValue('accountId', userAccount?.accountId);
  }, [userAccount]);

  const gridSizing = {
    md: 3,
    sm: 4,
    xs: 12
  };

  const { projectId } = formData?.watch();

  useEffect(() => {
    setAssociatedOrderLists({});
    if (isNil(projectId)) return;

    if (isNil(projectId)) {
      formData?.setValue('fK_DealId', null);
      formData?.setValue('fK_LeadId', null);
      formData?.setValue('fK_QuoteId', null);
      formData?.setValue('fK_TaskId', null);
      return;
    };

    setOrderListLoading(true);

    getWorkOrderAssociatedDropdowns(projectId)
      ?.then(res => setAssociatedOrderLists(res))
      ?.finally(() => setOrderListLoading(false));
  }, [projectId]);

  return (
    <Grid
      py={2}
      sx={{ px: 1 }}
      container
      spacing={2}
    >

      <CustomerProjectSelectors
        formData={formData}
        {...gridSizing}
      />

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='workOrderType'
          required
          searchSelectData={[
            {value: 'Collection', label: 'Collection'},
            {value: 'On Site Job', label: 'On Site Job'},
            {value: 'Delivery', label: 'Delivery'},
            {value: 'Technical Issue Help', label: 'Technical Issue Help'},
          ]}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='assignedUser'
          searchSelectData={userList?.list || []}
          returnLabel
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='clientRef'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='clientPO'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='orderSource'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='department'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='building'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='floor'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='customerName'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='contactPerson'
          returnLabel
          searchSelectData={contactList}
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='mobileNumber'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='phone'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <InputField
          formData={formData}
          name='email'
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='severity'
          searchSelectData={[
            {value: 'Low', label: 'Low'},
            {value: 'Medium', label: 'Medium'},
            {value: 'High', label: 'High'},
          ]}
        />
      </Grid>

      <Grid md={3} xs={0} item sx={{p: '0px !important'}}></Grid>

      <Grid {...gridSizing} item>
        <DatePicker
          formData={formData}
          name='workOrderStartDate'
          minDate={new Date()}
          required
        />
      </Grid>

      <Grid {...gridSizing} item>
        <DatePicker
          formData={formData}
          name='workOrderEndDate'
          disablePast
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='workOrderStatus'
          searchSelectData={workOrderStatus}
        />
      </Grid>

      <Grid md={3} xs={0} item sx={{p: '0px !important'}}></Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='fK_DealId'
          label='Deal'
          disabled={isNil(associatedOrderLists?.deals)}
          loading={orderListLoading}
          searchSelectData={associatedOrderLists?.deals || []}
          multiple
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='fK_LeadId'
          label='Lead'
          disabled={isNil(associatedOrderLists?.leads)}
          loading={orderListLoading}
          searchSelectData={associatedOrderLists?.leads || []}
          multiple
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='fK_QuoteId'
          label='Quote'
          disabled={isNil(associatedOrderLists?.quotes)}
          loading={orderListLoading}
          searchSelectData={associatedOrderLists?.quotes || []}
          multiple
        />
      </Grid>

      <Grid {...gridSizing} item>
        <SearchSelect
          formData={formData}
          name='fK_TaskId'
          label='Task'
          disabled={isNil(associatedOrderLists?.tasks)}
          loading={orderListLoading}
          searchSelectData={associatedOrderLists?.tasks || []}
          multiple
        />
      </Grid>

      <Grid xs={12} item>
        <RichTextfield
          formData={formData}
          name='workOrderInstructions'
          placeholder="Work Order Instructions"
        />
      </Grid>
    </Grid>
  );
}

export default WOInfo;