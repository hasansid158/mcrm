import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import InputField from 'common/input/InputField';
import SwitchToggle from 'common/input/SwitchToggle';
import useScreenSize from 'hooks/useScreenSize';
import Selector from 'common/input/Selector';
import SearchSelect from 'common/input/SearchSelect';

import { useSelector } from 'react-redux';

import { getModels } from 'api/listApis';
import { find, isEmpty, isNil, trim } from 'lodash';

const SkuForm = ({ formData = {} }) => {
  const { isMobile } = useScreenSize();

  const [loadingModels, setLoadingModels] = useState(false);
  const [models, setModels] = useState([]);
  const { itemTypes, makes } = useSelector(state => state.lists)

  const gridItemSize = {
    xs: 12,
    sm: 4,
  };

  const [make] = formData?.watch(['make']);

  useEffect(() => {
    setModels([]);

    if (!make) return;
    setLoadingModels(true);

    const makeId = find(makes, { value: trim(make) })?.id;

    if (isNil(makeId)) {
      setLoadingModels(false);
      return;
    };

    getModels([makeId])
      .then(setModels)
      .finally(() => setLoadingModels(false));
  }, [make]);


  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='sku'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name='deviceType'
          required
          searchSelectData={itemTypes}
          returnLabel
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name='make'
          required
          searchSelectData={makes}
          returnLabel
          onChange={() => formData?.setValue('model', '')}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name='model'
          required
          searchSelectData={models}
          returnLabel
          loading={loadingModels}
          disabled={isEmpty(models)}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='storage'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='memory'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='processor'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='networkCapabilities'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='graphics'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='os'
          label='OS'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='color'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='mobileMonsterURL'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='reebeloURL'
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name='errorMessage'
        />
      </Grid>
    </Grid>
  );
};

export default SkuForm;
