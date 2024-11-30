import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import SwitchToggle from "common/input/SwitchToggle";
import { formRegex, numberOnly } from "utils/textFormatUtils";
import useScreenSize from "hooks/useScreenSize";
import Selector from "common/input/Selector";
import { useSelector } from "react-redux";
import SearchSelect from "common/input/SearchSelect";
import { getTestConditionTypes } from "api/masterApi";

const TestConditionForm = ({ formData = {} }) => {
  const { isMobile } = useScreenSize();
  const [conditionTypes, setConditionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const gridItemSize = {
    xs: 12,
  };

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    accountList,
  } = useSelector(state => state.lists)

  useEffect(() => {
    setLoading(true);

    getTestConditionTypes()
      .then(res => {
        setConditionTypes(res);
      })
      .catch(err => {
        console.error("Error fetching test condition types:", err);
      })
      .finally(() => setLoading(false));

  }, []);



  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="conditionName" required />
      </Grid>

      <Grid {...gridItemSize} item>
        <SearchSelect
          formData={formData}
          name="conditionType"
          label="Condition Type"
          required
          searchSelectData={conditionTypes}
          returnLabel
          loading={loading}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="byPassBlanccoTest"
          label="ByPass Blancco Test"
          isCheckBox
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="conditionTestingExplanation"
          multiline
          minRows={3}
          maxRows={5}
        />
      </Grid>

      <Grid {...gridItemSize} item>
        <Selector
          formData={formData}
          name="grade"
          required
          selectorData={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" },
          ]}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="numericGrade"
          required
          format={numberOnly}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SearchSelect
        formData={formData}
        name="projectId"
        label="Project"
        required
        searchSelectData={userProjects}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SearchSelect
        formData={formData}
        name="accountId"
        label="Account"
        required
        searchSelectData={accountList}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isActive"
          label="Is Active"
          isCheckBox
        />
      </Grid>
    </Grid>
  );
};
export default TestConditionForm;
