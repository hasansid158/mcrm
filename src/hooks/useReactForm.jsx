import { useForm, useWatch, useFormState } from 'react-hook-form';
import { useEffect } from 'react';

const useReactForm = (
  initialValues,
  options,
) => {
  const {
    control,
    formState: {
      errors,
      submitCount,
      isValid,
      isDirty,
      dirtyFields,
      defaultValues,
      isSubmitting,
    },
    getValues,
    setValue,
    watch,
    reset,
    clearErrors,
    ...rest
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
    shouldFocusError: true,
    ...options,
  });

  //Scroll to error
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys?.length) {
      const errorEl = document.getElementsByName(errorKeys[0]);
      errorEl[errorEl.length - 1]?.scrollIntoView({ behavior: `smooth`, block: 'center'});
    };
  }, [submitCount]);

  const formData = {
    control,
    errors,
    getValues,
    setValue,
    watch,
    clearErrors,
    isValid,
    isDirty,
    dirtyFields,
    reset,
    defaultValues,
    isSubmitting,
  }

  return {
    formData,
    useWatch,
    useFormState,
    reset,
    ...rest,
  }
};

export default useReactForm;