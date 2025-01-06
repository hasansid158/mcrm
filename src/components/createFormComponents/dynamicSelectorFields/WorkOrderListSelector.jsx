import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchSelect from 'common/input/SearchSelect';
import { fetchWorkOrderList } from 'redux/slices/listSlice/listSlice';
import { isEmpty } from 'lodash';

export default function WorkOrderListSelector({ formData, ...rest }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { workOrderList = [] } = useSelector((state) => state?.lists);

  useEffect(() => {
    if (!isEmpty(workOrderList)) return;

    setLoading(true);
    dispatch(fetchWorkOrderList())?.finally(() => setLoading(false));
  }, []);

  return (
    <SearchSelect
      formData={formData}
      searchSelectData={workOrderList}
      loading={loading}
      name="workOrder"
      {...rest}
    />
  );
}
