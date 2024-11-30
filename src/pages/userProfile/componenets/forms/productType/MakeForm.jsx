import { React } from "react";
import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import { useSelector } from "react-redux";
import SearchSelect from "common/input/SearchSelect";

const MakeForm = ({ formData = {}, isUpdate = false, }) => {

  const { userProjects = [] } = useSelector(state => state?.userDetails);

  const gridItemSize = {
    xs: 12,
  };


  return (
    <Grid py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="make"
          required
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
    </Grid>
  );
};

export default MakeForm;