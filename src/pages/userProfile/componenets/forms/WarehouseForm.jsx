import React from "react";

import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import SwitchToggle from "common/input/SwitchToggle";
import { formRegex, numberOnly } from 'utils/textFormatUtils';
import useScreenSize from "hooks/useScreenSize";

const WarehouseForm = ({
  formData = {},
}) => {
  const { isMobile } = useScreenSize();

  const gridItemSize = {
    sm: 6,
    xs: 12,
  };

  return (
    <Grid
      px={!isMobile && 2}
      py={2}
      container
      rowSpacing={2}
      columnSpacing={2}
    >
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="warehouseName"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="warehouseNo"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="suburb"
          required
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="addressLine"
          required
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="state"
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="postCode"
          format={numberOnly}
          required
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="phoneNo"
          variant="outlined"
          required
          rules={{
            pattern: {
              value: formRegex.mobile,
              message: "Invalid mobile number",
            },
          }}
        />
      </Grid>

      <Grid {...gridItemSize} item></Grid>

      <Grid sm={4} xs={12} item>
        <SwitchToggle
          formData={formData}
          name="isActive"
          label="Status"
        />
      </Grid>
      <Grid sm={4} xs={12} item>
        <SwitchToggle
          formData={formData}
          name="ePostActive"
          label="ePost"
        />
      </Grid>
    </Grid>
  );
};
export default WarehouseForm;
