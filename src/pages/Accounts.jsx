import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ActionPageMain from './components/ActionPageMain';
import { detailColumn } from 'enum/tableColumnEnum';
import createFormEnum from 'enum/createFormEnum';

import { fetchAllAccounts } from 'redux/slices/actionSlice/accountsSlice';

const Accounts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { accounts } = useSelector(state => state.actions);

  useEffect(() => {
    !accounts?.length && dispatch(fetchAllAccounts());
  }, []);

  useEffect(() => {
    setLoading(true);

    const callFetch = async () => {
      await dispatch(fetchAllAccounts());
      setLoading(false);
    }
    callFetch();
  }, []);

  return (
    <ActionPageMain
      formKey={createFormEnum.accounts}
      rows={accounts}
      columns={detailColumn().accounts}
      invisibleColumns={{
        company: false,
        website: false,
      }}
      label='Accounts'
      createLabel='Create Account'
      loading={loading}
    />
  );
}

export default Accounts;
