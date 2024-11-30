import React from "react";

import {
  getAllProcessor,
  createProcessor,
  updateProcessor,
  deleteProcessor
} from "api/profileApis";

import ProfileTable from "./componenets/ProfileTable";
import { processorColumn } from "./componenets/tableColumns/processorColumn";
import ProcessorForm from "./componenets/forms/ProcessorForm";

const Processor = () => (
  <>
    <ProfileTable
      getApi={getAllProcessor}
      createApi={createProcessor}
      updateApi={updateProcessor}
      deleteApi={deleteProcessor}

      updateReplaceObjectKey='processorId'
      labelObjectKey='processorName'

      columns={processorColumn}
      CreateForm={ProcessorForm}

      title='Processors'
      buttonLabel='Processor'

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search Processors..",
          placeholder: "Processor",
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

export default Processor;
