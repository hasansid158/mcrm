import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { detailColumn } from 'enum/tableColumnEnum';
import { invoiceorderColumns } from "components/tableColumns/invoiceorderColumn";
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';

import { fetchInvoices } from "redux/slices/actionSlice/orderSlice";
import { getInvoiceOrderById } from "api/masterApi";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";

import { isEmpty } from "lodash";

const Products = () => {
  const { invoice } = useSelector(state => state.actions.orders);

  const [selectedRowData, setSelectedRowData] = useState({});
  const [fetchByIdData, setFetchByIdData] = useState(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const columns = invoiceorderColumns();

  useEffect(() => {
    if (isEmpty(selectedRowData)) return;
    setDrawerLoading(true);

    getInvoiceOrderById(selectedRowData)
      .then(res => setFetchByIdData(res))
      .catch(() => setErrorDialogText('Error fetching data, please try again later.'))
      .finally(() => setDrawerLoading(false));

  }, [selectedRowData]);

  return (
    <ActionPageMain
      formKey={createFormEnum.invoices}
      rows={invoice}
      columns={columns}
      label='Invoices'
      createLabel='Create Invoice'
      fetchApi={fetchInvoices}
      createFormProps={{
        disableFormFooter: true,
      }}
      clickRowData={rowData => {
        if (isEmpty(rowData)) return;
        setSelectedRowData(rowData)
      }}
      preFillUpdateData={fetchByIdData}
      drawerProps={{
        drawerLoading,
      }}
    />
  );
}

export default Products;
