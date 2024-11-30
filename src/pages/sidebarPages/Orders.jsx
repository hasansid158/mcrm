import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import PaperBox from 'common/ui/PaperBox';
import DataTable from 'common/dataDisplay/table/DataTable';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';

import { orderColumns } from 'components/tableColumns/orderColumns';
import createFormEnum from 'enum/createFormEnum';

import {
  fetchDispatchOrder,
  fetchWorkOrder,
  fetchSalesOrder,
  fetchPurchaseOrder,
  // fetchPaymentOrder,
} from 'redux/slices/actionSlice/orderSlice';

import { isEmpty } from 'lodash';

const Orders = () => {
  const {
    purchase,
    // payment,
    dispatchOrder,
    sales,
    work,
  } = useSelector(state => state.actions.orders);

  const dispatch = useDispatch();

  const [formKey, setFormKey] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [primaryName, setPrimaryName] = useState('');
  const [subName, setSubName] = useState('');
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  const callFetch = async () => {
    await Promise.all([
      isEmpty(dispatchOrder) && dispatch(fetchDispatchOrder()),
      isEmpty(work) && dispatch(fetchWorkOrder()),
      isEmpty(sales) && dispatch(fetchSalesOrder()),
      isEmpty(purchase) && dispatch(fetchPurchaseOrder()),
      // dispatch(fetchPaymentOrder()),
    ])
    setLoading(false);
  }
  callFetch();

}, []);


  const handleRowClick = (data, key) => {
    setDetailData(data.row)
    setFormKey(key);
    //check for selected table to pass name
    setPrimaryName(data?.leadTitle)
    setSubName(data?.company)
  }

  return (
    <Box>
      <DetailsDrawer
        open={!!formKey}
        onClose={() => setFormKey(null)}
        data={detailData}
        formKey={formKey}
        primaryName={primaryName}
        subName={subName}
        createLabel={`Create ${formKey}`}
      />

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
            <PaperBox
              label="Work Orders"
              sx={{backgroundColor: 'white'}}
            >
              <DataTable
                rowData={work || []}
                columns={orderColumns.work}
                onRowClick={(data) => handleRowClick(data, createFormEnum.work_orders)}
                loading={loading}
                autoHeight
              />
            </PaperBox>
        </Grid>
        <Grid item md={6} xs={12}>
            <PaperBox
              label="Sales Orders"
              sx={{backgroundColor: 'white'}}
            >
              <DataTable
                rowData={sales || []}
                columns={orderColumns.sales}
                onRowClick={(data) => handleRowClick(data, createFormEnum.sales_orders)}
                loading={loading}
                autoHeight
              />
            </PaperBox>
        </Grid>
        <Grid item md={6} xs={12}>
            <PaperBox
              label="Purchase Orders"
              sx={{backgroundColor: 'white'}}
            >
              <DataTable
                rowData={purchase || []}
                columns={orderColumns.purchase}
                onRowClick={(data) => handleRowClick(data, createFormEnum.purchase_orders)}
                loading={loading}
                autoHeight
              />
            </PaperBox>
        </Grid>
        <Grid item md={6} xs={12}>
            <PaperBox
              label="Dispatch Orders"
              sx={{backgroundColor: 'white'}}
            >
              <DataTable
                rowData={dispatchOrder || []}
                columns={orderColumns.dispatch}
                onRowClick={(data) => handleRowClick(data, createFormEnum.dispatch_orders)}
                loading={loading}
                autoHeight
              />
            </PaperBox>
        </Grid>
        {/* <Grid item md={6} xs={12}>
            <PaperBox
              label="Payment Orders"
              sx={{backgroundColor: 'white'}}
            >
              <DataTable
                rows={payment || []}
                columns={orderColumns.payment}
                onRowClick={(data) => handleRowClick(data, createFormEnum.payment_orders)}
                loading={loading}
              />
            </PaperBox>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default Orders;
