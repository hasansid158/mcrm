import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import SearchSelect from "common/input/SearchSelect";
import InputField from "common/input/InputField";
import DatePicker from "common/input/DatePicker";

import { numberOnly } from "utils/textFormatUtils";

import {
  fetchPOStatuses,
  fetchPOTypes,
  fetchSupplierList,
} from "redux/slices/listSlice/listSlice";
import { useSelector, useDispatch } from "react-redux";

import CustomerProjectSelectors from "components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors";

import RichNoteField from "common/input/RichNoteField";
import { isEmpty } from "lodash";

import { getOrderAssociations } from "api/listApis";

const POInfoTab = ({
  formData = {},
  isUpdate = false,
}) => {
  const dispatch = useDispatch();

  const [woList, setWoList] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const {
    pOStatus,
    pOTypes,
    userList,
    supplierList,
  } = useSelector(state => state?.lists)

  const gridItemSize = {
    md: 3,
    sm: 4,
    xs: 12,
  };

  useEffect(() => {
    isEmpty(pOStatus) && dispatch(fetchPOStatuses());
    isEmpty(pOTypes) && dispatch(fetchPOTypes());
    isEmpty(supplierList) && dispatch(fetchSupplierList());
  }, [pOStatus, pOTypes]);

  const {
    projectId,
  } = formData?.watch();

  useEffect(() => {
    if (!projectId) return;

    setListLoading(true);

    getOrderAssociations(projectId)
      .then(res => {
        setWoList(res?.workOrders);
        setQuoteList(res?.quotes);
      })
      .finally(() => setListLoading(false));
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
          md={3}
          sm={4}
          xs={12}
        />

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='poAppoverId'
            label='PO Approver'
            required
            searchSelectData={userList?.list || []}
            loading={isEmpty(userList?.list)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            format={numberOnly}
            formData={formData}
            name='poTotal'
            type='number'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='poTypeId'
            label='Purchase Order Type'
            required
            searchSelectData={pOTypes || []}
            loading={isEmpty(pOTypes)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='poStatusId'
            label='Purchase Order Status'
            required
            searchSelectData={pOStatus || []}
            loading={isEmpty(pOStatus)}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            formData={formData}
            name='SupplierID'
            label='Supplier'
            searchSelectData={supplierList}
            disabled={isEmpty(supplierList)}
            required
          />
        </Grid>

        <Grid
          xs={12}
          md={6}
          sm={8}
          item
          display='flex'
          rowGap={3}
          columnGap={2}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <SearchSelect
            formData={formData}
            name='workOrderIds'
            label='Work Order Number'
            searchSelectData={woList}
            disabled={isEmpty(woList)}
            loading={listLoading}
            fullWidth
            multiple
          />

          <SearchSelect
            formData={formData}
            name='quoteIds'
            label='Quote Number'
            searchSelectData={quoteList}
            disabled={isEmpty(quoteList)}
            loading={listLoading}
            fullWidth
            multiple
          />
        </Grid>

        <Grid xs={12} item>
          <RichNoteField
            formData={formData}
            name='requestorComments'
            label='Comments'
            placeholder='Detailed Comments...'
            disableImage
          />
        </Grid>

      </Grid>
    </>
  );
}

export default POInfoTab;
