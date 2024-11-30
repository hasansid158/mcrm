import React, { useState, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { isNil, omit } from "lodash";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SearchSelect from "common/input/SearchSelect";
import Selector from "common/input/Selector";
import InputField from "common/input/InputField";
import SwitchToggle from "common/input/SwitchToggle";

import { numberOnly } from "utils/textFormatUtils";

import {
  fetchSaleOrderStatuses,
  fetchSaleOrderTypes,
} from "redux/slices/listSlice/listSlice";
import { useSelector, useDispatch } from "react-redux";

import { getWorkOrderAssociatedDropdowns } from "api/orderApis";

import CustomerProjectSelectors from "components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors";

const SOInfoTab = ({
  formData = {},
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [associatedOrderLists, setAssociatedOrderLists] = useState({});
  const [orderListLoading, setOrderListLoading] = useState(false);

  const {
    saleOrderStatuses,
    saleOrderTypes,
    userList: { list },
    contactList,

  } = useSelector(
    (state) => state.lists
  );

  useEffect(() => {
    !saleOrderStatuses?.length && dispatch(fetchSaleOrderStatuses());
    !saleOrderTypes?.length && dispatch(fetchSaleOrderTypes());
  }, [saleOrderStatuses, saleOrderTypes]);

  const watchedData = useWatch({ control: formData.control });

  useEffect(() => {
    setIsBillingAddress(watchedData["isBillingAddressDifferent"]);
  }, [watchedData]);

  //this not working
  const handleBillingChange = (value) => {
    if (value === false) {
      const newData = omit(watchedData, [
        "billing_AddressLine1",
        "billing_AddressLine2",
        "billing_Suburb",
        "billing_State",
        "billing_Postcode",
      ]);
      formData?.reset({
        ...newData,
        isBillingAddressDifferent: value,
      });
    }
  };

  const gridItemSize = {
    md: 3,
    sm: 4,
    xs: 12,
  };

  const { projectId } = formData?.watch();

  useEffect(() => {
    setAssociatedOrderLists({});
    if (isNil(projectId)) return;

    if (isNil(projectId)) {
      formData?.setValue('assetIDs', null);
      formData?.setValue('leadIds', null);
      formData?.setValue('quoteIds', null);
      formData?.setValue('taskIds', null);
      return;
    };

    setOrderListLoading(true);

    getWorkOrderAssociatedDropdowns(projectId)
      ?.then(res => setAssociatedOrderLists(res))
      ?.finally(() => setOrderListLoading(false));
  }, [projectId]);

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
          {...gridItemSize}
        />

        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name='salesPersonId'
            label='Sales Person'
            searchSelectData={list}
            formData={formData}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name='customerContactId'
            label='Customer Contact'
            searchSelectData={contactList}
            formData={formData}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField required formData={formData} name="orderRef" />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField formData={formData} name="thirdPartyOrderNo" />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name="orderStatus"
            searchSelectData={saleOrderStatuses}
            returnLabel
            formData={formData}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name="orderType"
            searchSelectData={saleOrderTypes}
            returnLabel
            formData={formData}
          />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <InputField formData={formData} name="firstName" required />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField formData={formData} name="lastName" required />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField formData={formData} name="email" required />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name="mobileNumber"
            required
            format={numberOnly}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            formData={formData}
            name="salutation"
            required
            selectorData={[
              { value: "mr", label: "Mr" },
              { value: "miss", label: "Miss" },
              { value: "mrs", label: "Mrs" },
            ]}
          />
        </Grid> */}

        <Grid md={3} xs={0} item sx={{p: '0px !important'}}></Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name="salesOrderTotal"
            type='number'
            format={numberOnly}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name="netTotal"
            type='number'
            format={numberOnly}
          />
        </Grid>

        <Grid md={6} xs={0} item sx={{p: '0px !important'}}></Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='leadIds'
            label='Lead'
            disabled={isNil(associatedOrderLists?.leads)}
            loading={orderListLoading}
            searchSelectData={associatedOrderLists?.leads || []}
            multiple
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='quoteIds'
            label='Quote'
            disabled={isNil(associatedOrderLists?.quotes)}
            loading={orderListLoading}
            searchSelectData={associatedOrderLists?.quotes || []}
            multiple
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='taskIds'
            label='Task'
            disabled={isNil(associatedOrderLists?.tasks)}
            loading={orderListLoading}
            searchSelectData={associatedOrderLists?.tasks || []}
            multiple
          />
        </Grid>
      </Grid>
    </>
  );
}

export default SOInfoTab;
