import React from "react";

import { getColors, createColors, updateColors, deleteColors } from "api/profileApis";
import ProfileTable from "./componenets/ProfileTable";
import { colorsColumn } from "./componenets/tableColumns/colorsColumn";
import ColorsForm from "./componenets/forms/ColorsForm";

const Colors = () => (
  <>
    <ProfileTable
      getApi={getColors}
      createApi={createColors}
      updateApi={updateColors}
      deleteApi={deleteColors}

      columns={colorsColumn}
      CreateForm={ColorsForm}

      title='Colors'
      buttonLabel='Color'
      updateReplaceObjectKey='colourID'

      labelObjectKey='colourName'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "Colors",
        }
      ]}
      onlyGlobalFilter

      dialogSize='xs'
    />
  </>
);

export default Colors;
