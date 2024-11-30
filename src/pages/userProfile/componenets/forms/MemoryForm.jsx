import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';

import { numberOnly } from 'utils/textFormatUtils';
import DatePicker from 'common/input/DatePicker';

const MemoryForm = ({ formData = {} }) => {
  const { isMobile } = useScreenSize();

  const gridItemSize = {
    xs: 12,
    sm: 4,
  };

  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="memorySize"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="capacity"
          format={numberOnly}
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="formFactor"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="hz"
          format={numberOnly}
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="serial"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="type"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="speed"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="voltage"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="latency"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="eccSupport"
          label="ECC Support"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="vendor"
          required
        />
      </Grid>

      {/* <Grid {...gridItemSize} item>
        <DatePicker
          formData={formData}
          name="createdDate"
          required
        />
      </Grid> */}
    </Grid>
  );
};

export default MemoryForm;