import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchSelect from 'common/input/SearchSelect';
import { fetchWarehouses } from 'redux/slices/listSlice/listSlice';
import { isEmpty } from 'lodash';

export default function WarehouseListSelector({ formData, ...rest }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { warehouses = [] } = useSelector((state) => state?.lists);

  useEffect(() => {
    if (!isEmpty(warehouses)) return;

    setLoading(true);
    dispatch(fetchWarehouses())?.finally(() => setLoading(false));
  }, []);

  return (
    <SearchSelect
      formData={formData}
      searchSelectData={warehouses}
      loading={loading}
      name="warehouse"
      {...rest}
    />
  );
}
