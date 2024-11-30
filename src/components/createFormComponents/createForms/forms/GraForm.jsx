import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';
import useScreenSize from 'hooks/useScreenSize';
import { useSelector } from 'react-redux';

import DatePicker from 'common/input/DatePicker';

export default function GraForm({
  formData,
}) {
  const { isMobile } = useScreenSize();

  const commonInputProps = {
    formData: formData,
  };

  const gridItemSize = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  return (
    <>
      <Grid
        px={!isMobile && 2}
        py={2}
        container
        rowSpacing={3}
        columnSpacing={2}
      >
        <Grid {...gridItemSize} item>
          <DatePicker
            required
            {...commonInputProps}
            name='graDate'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='sender'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='receiver'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='qualityInspection'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='shippingInformation'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='warehouseInformation'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='authorisedSignature'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='projectId'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='load'
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <InputField
            required
            {...commonInputProps}
            name='workOrder'
          />
        </Grid>

        <Grid xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='graComments'
            multiline
            minRows={2}
            maxRows={6}
          />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <SearchSelect
            {...commonInputProps}
            name='customer'
            searchSelectData={customerList}
            required
            {...commonInputProps}
          />
        </Grid> */}

      </Grid>
    </>
  );
}