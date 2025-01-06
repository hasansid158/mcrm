import React, { useState, useEffect } from 'react';
import useReactForm from 'hooks/useReactForm';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import PaperBox from 'common/ui/PaperBox';

import { useDispatch, useSelector } from 'react-redux';
import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';
import { setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import formComponentsEnum from 'enum/formComponentsEnum';

const CreateDialog = ({
  isDialogOpen,
  handleClose,
  title = 'Create',
  preFillData = null,
  formKey = '',
  label = '',
  createFormProps,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { userAccount } = useSelector((state) => state?.userDetails);
  const [isLoading, setIsLoading] = useState(false);

  const { formData, handleSubmit, reset } = useReactForm(preFillData ?? {});

  // useEffect(() => {
  //   formData?.setValue('accountId', userAccount?.accountId);
  // }, [userAccount]);

  useEffect(() => {
    if (!preFillData) return;
    reset(preFillData);
  }, [preFillData, userAccount]);

  const onSubmit = async (data, isReset = false) => {
    setIsLoading(true);

    let updatedData = preFillData ? { ...preFillData, ...data } : data;
    updatedData = { ...updatedData, accountId: userAccount?.accountId };

    const res = await dispatch(
      formComponentsEnum()?.[formKey]?.createApi(updatedData),
    );

    if (res?.error) {
      const errorMsg =
        res?.payload?.title || 'Server error occurred, please try again.';
      dispatch(setErrorDialogText(errorMsg));
      setIsLoading(false);
      return;
    }

    createFormProps?.callback &&
      (await createFormProps?.callback(res?.payload, data));

    dispatch(
      setSnackBar({
        open: true,
        message: `${label} has been created sucessfully`,
      }),
    );

    setIsLoading(false);

    reset({
      accountId: userAccount?.accountId,
    });
    !isReset && handleClose();
  };

  return (
    <DialogBox
      open={isDialogOpen}
      handleFormSubmit={(isReset) => handleSubmit(onSubmit)(isReset)}
      disableSubmitNew
      title={title}
      handleClose={() => {
        // reset({});
        handleClose();
      }}
      loading={isLoading}
      maxWidth="md"
      {...createFormProps}
      {...rest}
    >
      <PaperBox sx={{ px: 1 }}>
        {
          formComponentsEnum({ formData: formData }, handleClose)?.[formKey]
            ?.createForm
        }
      </PaperBox>
    </DialogBox>
  );
};

export default CreateDialog;
