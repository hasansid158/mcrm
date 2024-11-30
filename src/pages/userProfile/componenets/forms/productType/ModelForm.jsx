import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import { useSelector } from "react-redux";
import SearchSelect from "common/input/SearchSelect";


const ModelForm = ({ formData = {}, isUpdate = false, }) => {

  const gridItemSize = {
    xs: 12,
  };

  const { itemTypes, makes } = useSelector((state) => state.lists);

  return (
    <Grid py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="makeId"
          label="Make"
          required
          searchSelectData={makes}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="modelName"
          label='Model'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="itemTypeId"
          label='Product Type'
          required
          searchSelectData={itemTypes}
        />
      </Grid>
    </Grid>
  );
};

export default ModelForm;