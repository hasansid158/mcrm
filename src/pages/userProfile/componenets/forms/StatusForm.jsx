import { React, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import useScreenSize from "hooks/useScreenSize";
import { useSelector } from "react-redux";
import SearchSelect from "common/input/SearchSelect";
import SwitchToggle from "common/input/SwitchToggle";

import { camelCaseToSpace } from "utils/textFormatUtils";
import { arrayToValueLabel } from "utils/helperFunctions";
import { isEmpty, keys } from "lodash";

const StatusForm = ({ formData = {}, isUpdate = false, }) => {
  const { isMobile } = useScreenSize();
  const [statusTypesList, setStatusTypesList] = useState([]);

  const gridItemSize = {
    xs: 12,
  };

  const { allStatusList } = useSelector((state) => state.lists);

  useEffect(() => {
    if (isEmpty(allStatusList)) return;

    const selectorData = arrayToValueLabel(keys(allStatusList) || []);
    setStatusTypesList(selectorData);

  }, [allStatusList]);

  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="status"
          label='Status Name'
          required
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="statusType"
          label="Status Type"
          required
          searchSelectData={statusTypesList}
          disabled={isUpdate}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <SwitchToggle formData={formData} name="isActive" label="Is Active" />
      </Grid>
    </Grid>
  );
};

export default StatusForm;