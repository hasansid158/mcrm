import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import InputField from "common/input/InputField";
import SwitchToggle from "common/input/SwitchToggle";
import DatePicker from "common/input/DatePicker";
import Selector from "common/input/Selector";
import { useWatch } from "react-hook-form";
import { omit } from "lodash";
import useScreenSize from "hooks/useScreenSize";
import { formRegex, numberOnly } from "utils/textFormatUtils";
import TabsMenu from "common/dataDisplay/Tabs/TabsMenu";

const UserUpdateForm = ({ formData }) => {
  const { isMobile } = useScreenSize();
  const [tabIndex, setTabIndex] = useState(0);
  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const watchedData = useWatch({ control: formData.control });

  const handleTabChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    setIsBillingAddress(watchedData["isBillingAddressDifferent"]);
  }, [watchedData]);

  const handleBillingChange = (value) => {
    if (value === false) {
      const newData = omit(watchedData, [
        "billingUnitNo",
        "billingStreetNo",
        "billingStreetName",
        "billingLocationID",
        "billingSuburb",
        "billingPostcode",
        "billingState",
        "billingCountry",
      ]);
      formData?.reset({
        ...newData,
        isBillingAddressDifferent: value,
      });
    }
  };

  const gridItemSize = {
    lg: 3,
    md: 4,
    sm: 6,
    xs: 12,
  };

  const validatePasswordMatch = (confirmPass, password) => password === confirmPass || "Passwords do not match";

  return (
    <Box>
      <TabsMenu
        setTabValue={handleTabChange}
        tabHeaders={["Personal Information", "Address Details", "Security Details"]}
        tabValue={tabIndex}
      />

      {tabIndex === 0 && (
        <Grid
          px={!isMobile && 2}
          py={2}
          container
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="userFirstName" required/>
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="userMiddleName" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="userLastName" required/>
          </Grid>
          <Grid {...gridItemSize} item>
            <Selector
              formData={formData}
              required
              name="gender"
              selectorData={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="title" required/>
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="emailAddress" type="email" required/>
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="mobile"
              variant="outlined"
              rules={{
                pattern: {
                  value: formRegex.mobile,
                  message: "Invalid mobile number",
                },
              }}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="homePhone"
              variant="outlined"
              rules={{
                pattern: {
                  value: formRegex.mobile,
                  message: "Invalid phone number",
                },
              }}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="workPhone"
              variant="outlined"
              rules={{
                pattern: {
                  value: formRegex.mobile,
                  message: "Invalid phone number",
                },
              }}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="emergencyNo"
              variant="outlined"
              rules={{
                pattern: {
                  value: formRegex.mobile,
                  message: "Invalid phone number",
                },
              }}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <DatePicker formData={formData} name="dob" maxDate={new Date()} />
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid
          px={!isMobile && 2}
          py={2}
          container
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="unitNo" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="streetNo" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="streetName" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="suburb" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField
              formData={formData}
              name="postcode"
              format={numberOnly}
            />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="state" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="country" />
          </Grid>
          <Grid {...gridItemSize} item>
            <SwitchToggle
              formData={formData}
              name="isBillingAddressDifferent"
              label={
                <Typography variant="p3">
                  Is billing address different
                </Typography>
              }
              onChange={(name, val) => handleBillingChange(val)}
            />
          </Grid>
          {isBillingAddress && (
            <>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingUnitNo" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingStreetNo" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingStreetName" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingLocationID" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingSuburb" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingPostcode" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingState" />
              </Grid>
              <Grid {...gridItemSize} item>
                <InputField formData={formData} name="billingCountry" />
              </Grid>
            </>
          )}
        </Grid>
      )}

      {tabIndex === 2 && (
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
            <InputField formData={formData} name="securityQuestion" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="securityAnswer" />
          </Grid>
          <Grid {...gridItemSize} item>
            <InputField formData={formData} name="loginType" />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserUpdateForm;