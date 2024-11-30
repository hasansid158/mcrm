import React from "react";

import {
  getAllScreenType,
  createScreenType,
  updateScreenType,
  deleteScreenType,
} from "api/profileApis";

import ProfileTable from "./componenets/ProfileTable";
import { screentypesColumn } from "./componenets/tableColumns/screentypeColumn";
import ScreenTypeForm from "./componenets/forms/ScreenTypeForm";

const ScreenTypes = () => (
  <>
    <ProfileTable
      getApi={getAllScreenType}
      createApi={createScreenType}
      updateApi={updateScreenType}
      deleteApi={deleteScreenType}

      updateReplaceObjectKey='screenTypeID'
      labelObjectKey='screenTypeName'

      columns={screentypesColumn}
      CreateForm={ScreenTypeForm}

      title='Screen Types'
      buttonLabel='Screen Type'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search Screen Types..",
          placeholder: "Screen Types",
        }
      ]}
      onlyGlobalFilter

      dialogSize='sm'

      replaceCreateProperties={(data = {}) => ({
        ...data,
        created: new Date(),
        lastUpdated: new Date(),
      })}

      replaceUpdateProperties={(data = {}) => {
        return ({
          ...data,
          lastUpdated: new Date(),
        });
      }}
    />
  </>
);

export default ScreenTypes;
