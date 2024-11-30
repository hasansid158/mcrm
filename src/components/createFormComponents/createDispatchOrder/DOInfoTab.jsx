import React, { useState, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { isNil, isEmpty } from "lodash";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SearchSelect from "common/input/SearchSelect";
import InputField from "common/input/InputField";
import DatePicker from "common/input/DatePicker";

import addYears from "date-fns/addYears";

import { numberOnly } from "utils/textFormatUtils";

import RichTextfield from "common/input/richTextField/RichTextfield";

import { useSelector, useDispatch } from "react-redux";


import CustomerProjectSelectors from "components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors";

import { getOrderAssociations } from "api/listApis";

import {
  fetchDispatchMethods,
  fetchDispatchStatuses,
  fetchDispatchTypes
} from "redux/slices/listSlice/listSlice";

const DOInfoTab = ({
  formData = {},
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const [woList, setWoList] = useState([]);
  const [soList, setSoList] = useState([]);
  const [quoteList, setQuoteList] = useState([]);

  const [listLoading, setListLoading] = useState(false);

  const {
    projectId,
  } = formData?.watch();

  const {
    userList,
    dOStatus,
    dOMethods,
    dOTypes,
  } = useSelector(state => state.lists)
  const {
    userFirstName,
    userLastName,
  } = useSelector(state => state.userDetails)

  useEffect(() => {
    isEmpty(dOStatus) && dispatch(fetchDispatchStatuses());
    isEmpty(dOMethods) && dispatch(fetchDispatchMethods());
    isEmpty(dOTypes) && dispatch(fetchDispatchTypes());
  }, [dOStatus]);

  useEffect(() => {
    if (!formData) return;
    formData?.setValue('createdBy', `${userFirstName} ${userLastName}`);
  }, [userFirstName, userLastName]);

  useEffect(() => {
    if (!projectId) return;

    setListLoading(true);

    getOrderAssociations(projectId)
      .then(res => {
        setWoList(res?.workOrders);
        setSoList(res?.salesOrders);
        setQuoteList(res?.quotes);
      })
      .finally(() => setListLoading(false));
  }, [projectId]);


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
          md={3}
          sm={4}
          xs={12}
        />

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='dispatchType'
            required
            searchSelectData={dOTypes || []}
            loading={isEmpty(dOTypes)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='dispatchMethod'
            required
            searchSelectData={dOMethods || []}
            loading={isEmpty(dOMethods)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='dispatchStatusId '
            required
            searchSelectData={dOStatus || []}
            loading={isEmpty(dOStatus)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='consignmentNo'
            label='Consignment Number'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='containerNo'
            label='Container Number'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='sealNo'
            label='Seal Number'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='totalWeight'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='totalCubicMetres'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='carrier'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <DatePicker
            formData={formData}
            name='dispatchedDate'
            required
            maxDate={new Date()}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='weight'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='height'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='length'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            formData={formData}
            name='width'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='salesOrderIds'
            label='Sales Order Number'
            searchSelectData={soList}
            disabled={isEmpty(soList)}
            loading={listLoading}
            multiple
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='workOrderIds'
            label='Work Order Number'
            searchSelectData={woList}
            disabled={isEmpty(woList)}
            loading={listLoading}
            multiple
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='quoteIds'
            label='Quote Number'
            searchSelectData={quoteList}
            disabled={isEmpty(quoteList)}
            loading={listLoading}
            multiple
          />
        </Grid>

        <Grid sm={12} xs={12} item>
          <Typography
            component='div'
            variant='p3'
            fontWeight='500'
            mb={1}
          >
            Comment
          </Typography>
          <RichTextfield
            formData={formData}
            name='comments'
            placeholder="Comments..."
            disableImage
          />
        </Grid>

      </Grid>
    </>
  );
}

export default DOInfoTab;
