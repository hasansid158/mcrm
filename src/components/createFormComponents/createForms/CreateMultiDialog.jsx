import React, { useState, useEffect } from "react";
import useReactForm from "hooks/useReactForm";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isArray } from "lodash";

import DialogBox from "common/dataDisplay/dialogBox/DialogBox";
import PaperBox from "common/ui/PaperBox";

import { setErrorDialogText } from "redux/slices/commonSlice/commonSlice";
import { setSnackBar } from "redux/slices/commonSlice/commonSlice";

import formComponentsEnum from "enum/formComponentsEnum";
import createFormEnum from "enum/createFormEnum";

import { Button, Box, Typography, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateMultiDialog = ({
  isDialogOpen,
  handleClose,
  title = 'Create',
  preFillData = null,
  formKey = '',
  label = '',
  loading = false,
  createFormProps,
}) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formItems, setFormItems] = useState([]);
  const [multiFormData, setMultiFormData] = useState([]);
  const [triggerItemSubmit, setTriggerItemSubmit] = useState(0);
  const [itemErrors, setItemErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const { userAccount } = useSelector(state => state?.userDetails)

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(loading);
  }, [loading]);

  // const {
  //   formData,
  //   handleSubmit,
  //   reset
  // } = useReactForm(preFillData ?? {});

  const updateFormItemData = (data) => {
    setMultiFormData(prevItems => {
      const existingItemIndex = prevItems?.findIndex(item => item?.itemId === data?.itemId);

      // Object exists, replace it
      if (existingItemIndex !== -1) {
        const updatedData = [...(prevItems || [])];
        updatedData[existingItemIndex] = { ...data };

        return updatedData;
      }
      // Object doesn't exist, add a new one
      return [...prevItems, data];
    });
  }

  const updateMultiError = (id, isValid) => {
    setItemErrors(prev => {
      const errorIndex = prev.indexOf(id);
      if (errorIndex === -1 && !isValid) {
        return [...prev, id];
      } else if (errorIndex !== -1 && isValid) {
        return prev.filter(errorId => errorId !== id);
      }
      return prev;
    });
  }

  const handleRemoveForm = (id) => {
    setFormItems(prev => {
      return prev?.filter(form => form?.id !== id);
    });
    updateMultiError(id, true);
  }

  const MultiAddForm = ({
    itemId,
    labelKey,
    triggerSubmit,
    allFormData = [],
  }) => {
    const {
      formData,
      useWatch,
      handleSubmit,
      reset,
      useFormState,
    } = useReactForm({});

    useEffect(() => {
      formData?.setValue('accountId', userAccount?.accountId);
    }, [userAccount]);

    const watchedData = useWatch({control: formData.control});
    const { isValid } = useFormState({control: formData.control});

    useEffect(() => {
      if (isEmpty(watchedData)) {
        const currentFormData = allFormData?.filter(data => data?.itemId === itemId);
        !isEmpty(currentFormData) && reset(currentFormData?.[0] || {});
        return;
      }
      updateFormItemData({ ...watchedData, itemId });
      updateMultiError(itemId, formData.isValid);
    }, [watchedData, isValid])

    useEffect(() => {
      updateMultiError(itemId, false);
    }, []);

    useEffect(() => {
      triggerSubmit !== 0 && handleSubmit(() => {})();
    }, [triggerSubmit]);

    return (
      <PaperBox
        sx={{
          px: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: 24,
              p: '2px',
              border: '2px solid #b3b2b2',
              borderRadius: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='p2'
              fontWeight='500'
              color='#b3b2b2'
            >
              {itemId+1}
            </Typography>
          </Box>
          {!!itemId &&
            <IconButton
              color='error'
              size='small'
              onClick={() => handleRemoveForm(itemId)}
            >
              <RemoveCircleOutlineIcon/>
            </IconButton>
          }
        </Box>
        {formComponentsEnum(
          {
            formData: formData,
            watchedData: watchedData,
            handleClose,
            setIsLoading,
            ...createFormProps,
          }
        )?.[formKey]?.createForm
        }
      </PaperBox>
    )
  }



  useEffect(() => {
    setFormItems([{component: MultiAddForm, id: 0}]);
  }, []);

  const handleAddForm = () => {
    setTriggerItemSubmit(0);
    const newId = formItems[formItems.length - 1]?.id + 1 || 0;
    const newItem = {component: MultiAddForm, id: newId};
    setFormItems([...formItems, newItem]);
  }

  const onSubmit = async () => {
    setTriggerItemSubmit(triggerItemSubmit+1);
    if (!!itemErrors?.length) {
      setErrorMsg('Please fill all the required fields.');
      return;
    };
    if (!!!formItems.length) {
      dispatch(setErrorDialogText('Please add at least one item.'));
      return;
    }
    setErrorMsg('');
    setIsLoading(true);


    let updatedFormsData = multiFormData?.map(({itemId, ...rest}) => rest);
    updatedFormsData = preFillData ? updatedFormsData.map(item => ({...preFillData, ...item})) : updatedFormsData;
    const res = await dispatch(formComponentsEnum()?.[formKey]?.createBulkApi(updatedFormsData));

    setIsLoading(false);
    if (res?.error) {
      const errorMsg = res?.payload?.title || 'Server error occurred, please try again.';
      dispatch(setErrorDialogText(errorMsg));
      return;
    }

    dispatch(setSnackBar({
      open: true,
      message: `${updatedFormsData?.length} ${updatedFormsData?.length > 1 ? formKey+' have' : formKey?.slice(0, -1)+' has'} been created sucessfully`,
    }));

    const {payload} = res;
    createFormProps?.callback && createFormProps?.callback(isArray(payload) ? payload : updatedFormsData);

    handleClose();

    setTriggerItemSubmit(0);
    setFormItems([{component: MultiAddForm, id: 0}]);
    setMultiFormData([]);
    setItemErrors([]);
  };


  return (
    <DialogBox
      open={isDialogOpen}
      handleFormSubmit={(isReset) => onSubmit(isReset)}
      title={title}
      handleClose={handleClose}
      loading={isLoading}
      disableFormFooter={formKey === createFormEnum.quotes}
      disableSubmitNew
    >
      {createFormProps?.subLabel}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 1,
        }}
      >
        {formItems?.map((item, key) => (
          <item.component
            key={item.id}
            labelKey={key+1}
            itemId={item.id}
            triggerSubmit={triggerItemSubmit}
            allFormData={multiFormData}
            // setItemData={updateFormItemData}
            // handleRemove={() => handleRemoveItem(item.id)}
          />
        ))}


        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='p2' color='error'>
            {errorMsg}
          </Typography>
          {formItems?.length < 10 &&
            <Button
              variant='contained'
              size='small'
              onClick={handleAddForm}
              endIcon={<AddCircleOutlineIcon/>}
            >
              Add New
            </Button>
          }
        </Box>

      </Box>
    </DialogBox>
  );
};

export default CreateMultiDialog;
