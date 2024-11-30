import React, { useState, useEffect } from 'react';

import formComponentsEnum from 'enum/formComponentsEnum';
import useReactForm from 'hooks/useReactForm';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import SpinLoader from 'common/dataDisplay/spinLoader/SpinLoader';

const UpdateForm = ({
  formKey = "",
  data = {},
  handleUpdate = () => {},
  replaceUpdate,
  isUpdate = false,
}) => {
  const { userAccount } = useSelector(state => state?.userDetails)

  const [currentData, setCurrentData] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    formData,
    reset,
  } = useReactForm();

  useEffect(() => {
    formData?.setValue('accountId', userAccount?.accountId);
  }, [userAccount]);

  const formProps = {
    formData: formData,
    notrequired: true,
    isUpdate: isUpdate,
    handleUpdate,
  };

  useEffect(() => {
    if (isEmpty(data)) return;

    reset({
      accountId: userAccount?.accountId,
      ...data,
    });
    setCurrentData({
      accountId: userAccount?.accountId,
      ...data,
    });
  }, [data]);

  const handleClickUpdate = () => {
    if (replaceUpdate) {
      replaceUpdate(formData?.getValues());
      return;
    }

    setLoading(true);

    dispatch(formComponentsEnum()?.[formKey]?.updateApi(formData.watch()))
      .then(() => {
        handleUpdate(formData.watch());
        setCurrentData(formData.watch());
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return <>
    <Box>
      {formComponentsEnum(formProps)?.[formKey]?.createForm}
    </Box>

    {formData?.isDirty &&
      <Box
        display='flex'
        justifyContent='flex-end'
        columnGap={1}
        mt={1}
      >
        <LoadingButton
          variant='outlined'
          color='secondary'
          sx={{
            flex: {xs: 1, sm: 0},
            minWidth: 120,
          }}
          onClick={() => {
            reset(currentData);
          }}
          loading={loading}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant='contained'
          color='primary'
          sx={{
            flex: {xs: 1, sm: 0},
            minWidth: 120,
          }}
          onClick={handleClickUpdate}
          loading={loading}
        >
          Update
        </LoadingButton>
      </Box>
    }

    <SpinLoader loading={loading}/>
  </>;
}

export default UpdateForm;
