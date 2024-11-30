import React from "react";

import Grid from "@mui/material/Grid";
import InputField from "common/input/InputField";
import SwitchToggle from "common/input/SwitchToggle";
import { formRegex, numberOnly } from "utils/textFormatUtils";
import useScreenSize from "hooks/useScreenSize";
import DatePicker from "common/input/DatePicker";
import Selector from "common/input/Selector";

const UserForm = ({ formData = {} }) => {
  const { isMobile } = useScreenSize();

  const gridItemSize = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  const validatePasswordMatch = (confirmPass, password) => password === confirmPass || "Passwords do not match";

  return (
    <Grid px={!isMobile && 2} py={2} container rowSpacing={2} columnSpacing={2}>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="userFirstName" required />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="userLastName" required />
      </Grid>

      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="title" required />
      </Grid>
      <Grid {...gridItemSize} item>
        <DatePicker formData={formData} name="dob" required maxDate={new Date()} />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="mobile"
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
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="emailAddress" required type="email" />
      </Grid>

      <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="password"
              type="password"
              label="Password"
              rules={{
                pattern: {
                  value: formRegex.password,
                  message:
                    "Password must contain at least one capital letter, a number, and be 8 characters long",
                },
              }}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              rules={{
                validate: (value) =>
                  validatePasswordMatch(value, formData.getValues("password")),
              }}
            />
          </Grid>

      <Grid {...gridItemSize} item>
        <Selector
          formData={formData}
          name="gender"
          required
          selectorData={[
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
          ]}
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isAdmin"
          label="Is Admin"
          isCheckBox
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <SwitchToggle
          formData={formData}
          name="isUserAgreedToTnC"
          label="Is User Agreed"
          isCheckBox
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="trialPeriodNoOfDays" required />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="streetName" required />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="suburb" required />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="state" required />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField
          formData={formData}
          name="postcode"
          required
        />
      </Grid>
      <Grid {...gridItemSize} item>
        <InputField formData={formData} name="country" required />
      </Grid>
    </Grid>
  );
};
export default UserForm;
