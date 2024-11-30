import React from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';

import { numberOnly } from 'utils/textFormatUtils';

const ScreenTypeForm = ({ formData = {} }) => {
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
          name='screenTypeName'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='technology'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='screenSize'
          format={numberOnly}
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='resolution'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='refreshRate'
          required
          format={numberOnly}
        />
      </Grid>


      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='brightness'
          required
          format={numberOnly}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='aspectRatio'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='contrastRatio'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='colorGamut'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='viewingAngle'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='responseTime'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='panelType'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='ports'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='backlight'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='hdrSupport'
          label="HDR Support"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='touchSupport'
          label="Touch Support"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='curved'
          label="Curved"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='speakerSupport'
          label="Speaker Support"
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name='vesaMountSupport'
          label="VESA Mount Support"
        />
      </Grid>

      {/* <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='created'
          type='date'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='lastUpdated'
          type='date'
          required
        />
      </Grid> */}
    </Grid>
  );
};

export default ScreenTypeForm;