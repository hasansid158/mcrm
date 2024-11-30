import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';

import { numberOnly } from 'utils/textFormatUtils';
import DatePicker from 'common/input/DatePicker';

const HddsForm = ({ formData = {} }) => {
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
          name="diskSize"
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
          name="interfaceType"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="rpm"
          format={numberOnly}
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="cacheSizeMB"
          format={numberOnly}
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isSSD"
          label="SSD"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="manufacturer"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="model"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isActive"
          label="Active"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <DatePicker
          formData={formData}
          name="manufacturerDate"
          required
        />
      </Grid>
    </Grid>
  );
};

export default HddsForm;