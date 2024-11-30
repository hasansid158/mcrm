import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import {
  getAllHDD,
  createHDD,
  updateHDD,
  deleteHDD,
  getAllMemory,
  createMemory,
  updateMemory,
  deleteMemory
} from "api/profileApis";

import ProfileTable from "./componenets/ProfileTable";
import { hddsColumn } from "./componenets/tableColumns/hddsColumn";
import HddsForm from "./componenets/forms/HddsForm";
import { memoryColumn } from "./componenets/tableColumns/memoryColumn";
import MemoryForm from "./componenets/forms/MemoryForm";

const HDDsMemory = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="HDDs and Memory Tabs">
          <Tab label="HDDs" />
          <Tab label="Memory" />
        </Tabs>
      </Box>

      <Box>
        {tabValue === 0 && (
          <ProfileTable
            getApi={getAllHDD}
            createApi={createHDD}
            updateApi={updateHDD}
            deleteApi={deleteHDD}

            updateReplaceObjectKey="hddSizeID"
            deleteObjectKey="hddSizeID"
            labelObjectKey="diskSize"

            columns={hddsColumn}
            CreateForm={HddsForm}

            title="HDD Size"
            buttonLabel="HDD Size"

            filterSelectorEnum={[
              {
                name: "global",
                label: "Search HDDs..",
                placeholder: "HDDs",
              },
            ]}
            onlyGlobalFilter

            dialogSize="sm"

            replaceCreateProperties={(data = {}) => ({
              ...data,
              created: new Date(),
              lastUpdated: new Date(),
            })}

            replaceUpdateProperties={(data = {}) => ({
              ...data,
              lastUpdated: new Date(),
            })}
          />
        )}
        {tabValue === 1 && (
          <ProfileTable
            getApi={getAllMemory}
            createApi={createMemory}
            updateApi={updateMemory}
            deleteApi={deleteMemory}

            updateReplaceObjectKey="memoryId"
            deleteObjectKey="memoryId"
            labelObjectKey="memorySize"

            columns={memoryColumn}
            CreateForm={MemoryForm}

            title="Memory"
            buttonLabel="Memory"

            filterSelectorEnum={[
              {
                name: "global",
                label: "Search Memory..",
                placeholder: "Memory",
              },
            ]}
            onlyGlobalFilter

            dialogSize="sm"

            replaceCreateProperties={(data = {}) => ({
              ...data,
              created: new Date(),
              lastUpdated: new Date(),
            })}

            replaceUpdateProperties={(data = {}) => ({
              ...data,
              lastUpdated: new Date(),
            })}
          />
        )}
      </Box>
    </>
  );
};

export default HDDsMemory;