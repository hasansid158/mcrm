import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';

import DatePicker from 'common/input/DatePicker';

import { numberOnly } from 'utils/textFormatUtils';

const OperatingSystemForm = ({ formData = {} }) => {
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
          name='osName'
          label='OS Name'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='installationSizeMB'
          required
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='osVersion'
          label='OS Version'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='osType'
          label='OS Type'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='architecture'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='licenseType'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <DatePicker
          formData={formData}
          name='releaseDate'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <DatePicker
          formData={formData}
          name='eolSupportDate'
          label='EOL Support Date'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='vendor'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='kernelVersion'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='buildNumber'
          label='Build Number'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='defaultBrowser'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='isSupported'
          label='Is Supported'
        />
      </Grid>
    </Grid>
  );
};

export default OperatingSystemForm;