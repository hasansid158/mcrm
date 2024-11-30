import React, { useState, useEffect, useMemo } from 'react';

import { isEmpty, isNil, concat, sumBy, zipObject, isArray } from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import DataTable from 'common/dataDisplay/table/DataTable';

import { toCurrency } from 'utils/textFormatUtils';

import SearchSelect from 'common/input/SearchSelect';

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';
import { getOrderServiceItems } from 'api/orderApis';
import { getOrderAssociations } from 'api/listApis';

import { calculatePercentage } from 'utils/textFormatUtils';

import CustomerProjectSelectors from './dynamicSelectorFields/CustomerProjectSelectors';

const AssociatedOrderBox = ({
  formData,
  isUpdate = false,
  updateServiceItems = () => {},
  setServiceLoading = () => {},
  setAmountObject = () => {},
  tableData = [],

  projectKey = 'projectId',
  quoteKey = 'fK_QuoteId',
  workOrderKey = 'fK_WorkOrderId',
  salesOrderKey,
  taskKey,
  associatedOrdeListKey = '_listAssociatedOrderDto',
  noDiscount,
  hideTableColumns = [],
}) => {
  const [ordersListData, setOrdersListData] = useState({});

  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    setIsUpdateForm(isUpdate);
  }, []);

  const validKeys = [
    projectKey || 'projectId',
    quoteKey || 'fK_QuoteId',
    workOrderKey || 'fK_WorkOrderId',
    associatedOrdeListKey || '_listAssociatedOrderDto',
    ...(salesOrderKey ? [salesOrderKey] : []),
    ...(taskKey ? [taskKey] : []),
  ];

  const watchDataArray = formData?.watch(validKeys) || {};

  const watchData = useMemo(() => zipObject(
    validKeys,
    watchDataArray.map(value => (isNil(value) ? [] : value))
  ), [formData?.watch(validKeys)]);

  const {
    quoteIds = [],
    salesOrderIds = [],
    workOrderIds = [],
  } = watchData[associatedOrdeListKey] || {};

  useEffect(() => {
    if (
      isEmpty(watchData?.[quoteKey])
      && isEmpty(watchData?.[workOrderKey])
      && (!salesOrderKey || isEmpty(watchData?.[salesOrderKey]))
      && (!taskKey || isEmpty(watchData?.[taskKey]))
    ) {
      updateServiceItems([]);
      setAmountObject({});
      return;
    };
    setServiceLoading(true);

    getOrderServiceItems({
      "workOrderIds": watchData?.[workOrderKey] || [],
      "salesOrderIds": watchData?.[salesOrderKey] || [],
      "dealIds": [],
      "quoteIds": watchData?.[quoteKey] || []
    })
      .then(res => {
        if (isEmpty(res)) return;

        // const {
        //   workOrderItems = [],
        //   salesOrderItems = [],
        //   quoteItems = []
        // } = res;

        const workOrderItems = res?.workOrderItems?.map(item => ({...item, objectKey: 'workOrderItems'}));
        const salesOrderItems = res?.salesOrderItems?.map(item => ({...item, objectKey: 'workOrderItems'}));
        const quoteItems = res?.quoteItems?.map(item => ({...item, objectKey: 'workOrderItems'}));

        const flattenArray = concat(workOrderItems, salesOrderItems, quoteItems);

        const totalExGst = sumBy(flattenArray || [], 'totalAmount');
        const gst = calculatePercentage(totalExGst, 10);
        const grandTotal = gst + totalExGst;

        setAmountObject({
          totalExGst,
          gst,
          grandTotal,
          totalAfterDiscount: grandTotal,
        });
        updateServiceItems(flattenArray);
        !noDiscount && formData?.setValue('discount', 0);
      })
      .catch(() => setErrorDialogText('Error fetching service data, please try again later.'))
      .finally(() => setServiceLoading(false));
  }, [
    JSON.stringify(watchData?.[quoteKey]),
    JSON.stringify(watchData?.[salesOrderKey]),
    JSON.stringify(watchData?.[workOrderKey]),
  ]);

  useEffect(() => {
    if (isEmpty(quoteIds) && isEmpty(workOrderIds) && (!salesOrderKey || isEmpty(salesOrderIds))) return;
    formData?.setValue(quoteKey, quoteIds);
    salesOrderKey && formData?.setValue(salesOrderKey, salesOrderIds);
    // taskKey && formData?.setValue(taskKey, salesOrderIds);
    formData?.setValue(workOrderKey, workOrderIds);
  }, [quoteIds, salesOrderIds, workOrderIds]);

  //load order fields data on project change
  const handleProjectChange = (id) => {
    updateServiceItems([]);
    setAmountObject({});

    if (isUpdateForm) {
      setIsUpdateForm(false);
    } else {
      formData?.setValue(quoteKey, []);
      formData?.setValue(workOrderKey, []);
      salesOrderKey && formData?.setValue(salesOrderKey, []);
      taskKey && formData?.setValue(taskKey, []);
    }

    if (isNil(id)) return;
    setOrderLoading(true);

    getOrderAssociations(id)
      .then(res => setOrdersListData(res))
      .catch(() => setErrorDialogText('Error fetching order data, please try again later.'))
      .finally(() => setOrderLoading(false));
  }

  useEffect(() => {
    if (isNil(watchData?.[projectKey]) || isArray(watchData?.[projectKey])) return;
    handleProjectChange(watchData?.[projectKey]);
  }, [
    JSON.stringify(watchData?.[projectKey]),
  ]);

  const orderFieldData = [
    {
      name: workOrderKey,
      label: 'Work Order',
      searchSelectData: ordersListData?.workOrders || [],
      disabled: isEmpty(ordersListData?.workOrders),
    },
    {
      name: quoteKey,
      label: 'Quote',
      searchSelectData: ordersListData?.quotes || [],
      disabled: isEmpty(ordersListData?.quotes),
    },
    ...(salesOrderKey ? [{
      name: salesOrderKey,
      label: 'Sales Order',
      searchSelectData: ordersListData?.salesOrders || [],
      disabled: isEmpty(ordersListData?.salesOrders),
    }] : []),
    ...(taskKey ? [{
      name: taskKey,
      label: 'Tasks',
      searchSelectData: ordersListData?.tasks || [],
      disabled: isEmpty(ordersListData?.tasks),
    }] : []),
    // {
    //   name: 'fK_DealId',
    //   label: 'Deal',
    //   searchSelectData: ordersData?.deals || [],
    //   disabled: isEmpty(ordersData?.deals)
    // },
  ]


  const commonColumnProps = {
    minWidth: 100,
    editable: false,
    headerAlign: 'left',
    align: 'left',
  };

  const columnCenterProps = {
    flex: .5,
    minWidth: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  };

  const renderCell = (value = 0) => (
    <Typography typography='p3'>
      {toCurrency(value) || ''}
    </Typography>
  )

  const tableColumns = [
    { field: "serviceCategory", headerName: "Service Item", ...commonColumnProps, flex: 2 },
    { field: "serviceDescription", headerName: "Service Description", ...commonColumnProps, flex: 3 },
    { field: "quantity", headerName: "QTY", ...columnCenterProps },
    ...(hideTableColumns?.includes('unitPrice') ? []
      : [{ field: "unitPrice", headerName: "Unit Price", ...columnCenterProps, renderCell: cell => renderCell(cell?.row?.unitPrice) }]
    ),
    ...(hideTableColumns?.includes('totalAmount') ? []
      : [{ field: "totalAmount", headerName: "Total Amount", ...columnCenterProps, renderCell: cell => renderCell(cell?.row?.totalAmount) }]
    ),
  ];

  return <>
    <Box backgroundColor='white' p={2} borderRadius={1} width='100%'>
      <Grid
        container
        spacing={2}
      >
        {!isEmpty(formData) &&
          <CustomerProjectSelectors
            formData={formData}
            loading={orderLoading}
            sm={3}
            md={3}
            xs={12}
          />
        }
        {
          orderFieldData?.map((item, key) => (
            <Grid item sm={3} xs={12} key={key}>
              <SearchSelect
                formData={formData}
                name={item?.name}
                label={item?.label}
                fullWidth
                searchSelectData={item?.searchSelectData}
                multiple
                disabled={item?.disabled}
                loading={orderLoading}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>

    <Box mt={3}>
      <DataTable
        rowData={tableData}
        columns={tableColumns}
        autoHeight
      />
    </Box>
  </>;
}

export default AssociatedOrderBox;
