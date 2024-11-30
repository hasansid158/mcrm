import React, { useState, useEffect } from 'react';

import { Grid, Box, IconButton } from '@mui/material';
import InputField from 'common/input/InputField';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { lettersOnly } from 'utils/textFormatUtils';

import useReactForm from 'hooks/useReactForm';
import { values, keys } from 'lodash';

import DividerLine from 'common/ui/DividerLine';

const SpecForm = ({
  handleSpecChange = () => {},
}) => {
  const [specsFields, setSpecsFields] = useState([]);

  const {
    formData,
    handleSubmit,
    reset,
  } = useReactForm({}, { mode: 'onSubmit' });

  const {
    formData: fieldData,
    useWatch,
  } = useReactForm({}, { mode: 'onSubmit' });

  const onSubmit = (data) => {
    setSpecsFields(prev => ([
      ...prev,
      {
        name: data.fieldName,
      }
    ]));
    reset({});
  }

  const handleFieldRemove = (key) => {
    const fields = [...specsFields];
    fields.splice(key, 1);

    setSpecsFields(fields);
  }

  const watchedData = useWatch({control: fieldData.control})

  useEffect(() => {
    const fieldList = values(specsFields);
    const currentFields = fieldList?.map(field => ({
      [values(field)]: watchedData[values(field)]
    }));

    //need to fix issue here
    console.log(currentFields)
    // handleSpecChange(currentFields, fieldData?.isValid);
  }, [watchedData, specsFields])

  return (
    <Box mt={.5}>
      <Box
        display='flex'
        alignItems='center'
        columnGap={1}
        rowGap={1}
      >
        <InputField
          name='fieldName'
          isSmallHeight
          fullWidth={false}
          format={lettersOnly}
          formData={formData}
          required
        />
        <IconButton
          size='small'
          color='primary'
          onClick={() => handleSubmit(onSubmit)()}
          // sx={{ transform: 'translateY(-3px)' }}
        >
          <AddCircleRoundedIcon/>
        </IconButton>
      </Box>

      {!!specsFields?.length &&
        <DividerLine
          height='1px'
          sx={{ mt: 1, mb: 2.5 }}
        />
      }

      <Grid
        container
        rowSpacing={{sm: 2, xs: 1}}
        columnSpacing={2}
      >
        {specsFields?.map((field, key) => (
          <Grid
            item
            key={key}
            md={3}
            sm={4}
            xs={12}
            display='flex'
            alignItems='center'
            columnGap={.5}
          >
            <InputField
              formData={fieldData}
              name={field?.name}
              isSmallHeight
              required
            />
            <IconButton
              size='small'
              color='error'
              onClick={() => handleFieldRemove(key)}
            >
              <HighlightOffIcon sx={{fontSize: '20px'}}/>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SpecForm;
