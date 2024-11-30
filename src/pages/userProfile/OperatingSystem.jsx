import React from "react";

import {
  getAllOperatingSystem,
  createOperatingSystem,
  updateOperatingSystem,
  deleteOperatingSystem,
} from "api/profileApis";

import ProfileTable from "./componenets/ProfileTable";
import { operatingsystemColumn } from "./componenets/tableColumns/operatingsystemColumn";
import OperatingSystemForm from "./componenets/forms/OperatingSystemForm";

import { isNil } from "lodash";

const OperatingSystem = () => (
  <>
    <ProfileTable
      getApi={getAllOperatingSystem}
      createApi={createOperatingSystem}
      updateApi={updateOperatingSystem}
      deleteApi={deleteOperatingSystem}

      updateReplaceObjectKey='osid'

      columns={operatingsystemColumn}
      CreateForm={OperatingSystemForm}

      title='Operating Systems'
      buttonLabel='Operating System'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search OS..",
          placeholder: "Operating System",
        }
      ]}
      onlyGlobalFilter

      dialogSize='sm'

      replaceUpdateProperties={(data = {}) => ({
        ...data,
        buildNumber: isNil(data?.buildNumber) ? '' : data?.buildNumber,
      })}
    />
  </>
);

export default OperatingSystem;
