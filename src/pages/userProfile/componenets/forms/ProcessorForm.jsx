import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import useScreenSize from 'hooks/useScreenSize';
import { numberOnly } from 'utils/textFormatUtils';
import DatePicker from 'common/input/DatePicker';

const ProcessorForm = ({ formData = {} }) => {
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
          name="processorName"
          required
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
        <InputField
          formData={formData}
          name="serial"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="assetTag"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="dmiSpeed"
          required
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="externalClock"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="frequency"
          required
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="maxCores"
          required
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="physID"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="voltage"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="siblings"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="size"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="stepping"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="vendor"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="threads"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="cacheSizeMB"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="cores"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="baseSpeedGHz"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="maxSpeedGHz"
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <DatePicker
          formData={formData}
          name="releaseDate"
          required
        />
      </Grid>
    </Grid>
  );
};

export default ProcessorForm;