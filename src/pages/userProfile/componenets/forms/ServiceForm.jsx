import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import useScreenSize from "hooks/useScreenSize";
import { useSelector } from "react-redux";
import SearchSelect from "common/input/SearchSelect";
import SwitchToggle from "common/input/SwitchToggle";

import { camelCaseToSpace, numberOnly } from "utils/textFormatUtils";
import { arrayToValueLabel } from "utils/helperFunctions";
import { isEmpty, keys } from "lodash";

const ServiceFrom = ({ formData = {}, isUpdate = false, listData = {},}) => {
  const { isMobile } = useScreenSize();
  const [serviceList, setServiceList] = useState([]);

  const gridItemSize = {
    xs: 12,
  };

  useEffect(() => {
    if (isEmpty(listData)) return;

    const selectorData = arrayToValueLabel(keys(listData) || []);
    setServiceList(selectorData);

  }, [listData]);

  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="serviceCategory"
          label='Service Category'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="serviceDescription"
          label='Service Description'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="serviceType"
          label="Service Type"
          required
          searchSelectData={serviceList}
          disabled={isUpdate}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="unitPrice"
          label="Unit Price"
          required
          format={numberOnly}
          type='number'
          startAdornment='$'
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="gst"
          label="GST"
          required
          format={numberOnly}
        />
      </Grid>
    </Grid>
  );
};

export default ServiceFrom;