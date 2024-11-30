import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import useScreenSize from "hooks/useScreenSize";
import SwitchToggle from "common/input/SwitchToggle";

const ColorsForm = ({ formData = {}, isUpdate = false, }) => {
  const { isMobile } = useScreenSize();

  const gridItemSize = {
    xs: 12,
  };

  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="colourName"
          label='Color Name'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle formData={formData} name="isActive" label="Is Active" />
      </Grid>
    </Grid>
  );
};

export default ColorsForm;