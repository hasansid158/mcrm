import React from "react";
import { useSelector } from "react-redux";

import { detailColumn } from 'enum/tableColumnEnum';
import { productsColumns } from "components/tableColumns/productsColumns";
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';

import { fetchAllProducts } from 'redux/slices/actionSlice/productsSlice';

const Products = () => {
  const { products } = useSelector(state => state.actions);
  const columns = productsColumns();


  return (
    <ActionPageMain
      formKey={createFormEnum.products}
      rows={products}
      columns={columns}
      label='Products'
      createLabel='Create Product'
      fetchApi={fetchAllProducts}
    />
  );
}

export default Products;
