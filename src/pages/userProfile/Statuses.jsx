import React, { useState, useEffect } from "react";
import { createStatus, updateStatus , deleteStasus } from "api/profileApis";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllStatusList } from "redux/slices/listSlice/listSlice";

import StatusForm from "./componenets/forms/StatusForm";
import { statusColumn } from "./componenets/tableColumns/statusColumn";
import ProfileTable from "./componenets/ProfileTable";

import Selector from "common/input/Selector";

import { keys, isEmpty, mapValues, map, assign } from "lodash";

import { arrayToValueLabel } from "utils/helperFunctions";

const Statuses = () => {
  const dispatch = useDispatch();
  const { allStatusList } = useSelector((state) => state.lists);

  const [statusData, setStatusData] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    if (isEmpty(allStatusList)) return;

    const modifiedStatuses = mapValues(allStatusList, (statuses, key) =>
      map(statuses, (status) =>
        assign({}, status, { statusType: key })
      )
    );

    setStatusData(modifiedStatuses);

    const statusKeys = keys(allStatusList || {}) || [];
    setStatusList(statusKeys);
    setSelectedStatus(isEmpty(selectedStatus) ? keys(allStatusList || {})?.[0] : selectedStatus);

  }, [allStatusList]);

  return (
    <ProfileTable
      fetchedData={statusData?.[selectedStatus] || []}
      fetchOnUpdate={async () => { await dispatch(fetchAllStatusList()) }}

      createApi={createStatus}
      updateApi={updateStatus}
      columns={statusColumn}
      deleteApi={deleteStasus}

      title='Statuses'
      buttonLabel='Status'

      CreateForm={StatusForm}

      replaceUpdateProperties={(rowData) => ({
        isActive: !!rowData?.isActive,
        statusName: rowData?.status || '',
        statusId: rowData?.statusId,
        statusType: rowData?.statusType,
      })}
      replaceCreateProperties={(rowData) => ({
        isActive: !!rowData?.isActive,
        statusName: rowData?.status || '',
        statusType: rowData?.statusType,
      })}

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "Search status...",
        }
      ]}
      onlyGlobalFilter
      dialogSize='xs'

      actionComponents={
        <Box width='200px'>
          <Selector
            label='Status Type'
            selectorData={arrayToValueLabel(statusList)}
            size='large'
            required
            disableStar
            value={selectedStatus}
            onChange={(name, value) => {
              setSelectedStatus(value)
            }}
          />
        </Box>
      }

      defaultCreateValues={{statusType: selectedStatus, isActive: true}}
    />
  );
};

export default Statuses;
