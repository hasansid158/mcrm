import React, { useEffect, useState } from 'react';

import SearchSelect from 'common/input/SearchSelect';
import { getLoadsList } from 'api/listApis';

export default function LoadSelector({
  formData,
  projectKeyName = 'projectId',
  ...rest
}) {
  const [loading, setLoading] = useState(false);
  const [loadList, setLoadList] = useState([]);

  const projectKey = formData?.watch(projectKeyName);

  useEffect(() => {
    if (!projectKey) return;

    setLoading(true);
    setLoadList([]);

    getLoadsList([projectKey])
      ?.then((res) => setLoadList(res))
      ?.finally(() => setLoading(false));
  }, [projectKey]);

  return (
    <SearchSelect
      formData={formData}
      name="load"
      required
      searchSelectData={loadList}
      loading={loading}
      disabled={!projectKey}
      {...rest}
    />
  );
}
