import React, { useEffect, useState } from "react";

import { getProfileTestConditions , deleteTestCondition } from "api/profileApis";
import {
  createTestConditions,
  updateTestConditions,
  getTestConditionTypes,
} from "api/masterApi";
import { testTableColumn } from "./componenets/tableColumns/testTableColumn";
import TestConditionForm from "./componenets/forms/TestConditionForm";

import ProfileTable from "./componenets/ProfileTable";


const TestConditions = (isMultiSelectFilters = true) => {
  const [conditionTypes, setConditionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  <>
    <ProfileTable
      getApi={getProfileTestConditions}
      createApi={createTestConditions}
      updateApi={updateTestConditions}
      deleteApi={deleteTestCondition}

      columns={testTableColumn}
      CreateForm={TestConditionForm}

      title='Test Conditions'
      buttonLabel='Test Condition'

      replaceUpdateProperties={(data) => (
        {
          testConditionID: data?.conditionID,
          conditionName: data?.conditionName,
          conditionType: data?.conditionType,
          byPassBlanccoTest: data?.byPassBlanccoTest,
          conditionTestingExplanation: data?.conditionTestingExplanation,
          grade: data?.grade,
          numericGrade: data?.numericGrade,
          projectId: data?.projectId,
          accountId: data?.accountId,
          isActive: data?.isActive,
        }
      )}

      filterSelectorEnum={[
        {
          name: "global",
          label: "Search",
          placeholder: "Test Condition",
        },
        {
          name:"grade",
          label:"Grade",
          data: [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" },
          ],
          multiple: isMultiSelectFilters,
        },
        {
          name:"numericGrade",
          label:"Numeric Grade",
          data: [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
          ],
          multiple: isMultiSelectFilters,
        },
        {
          name: "conditionType",
          label: "Condition Type",
          data: conditionTypes,
          multiple: isMultiSelectFilters,
        },
        {
          name: "conditionName",
          label: "Condition Name",
          isInput: true,
        },
      ]}

      updateReplaceObjectKey='conditionID'

      dialogSize='xs' />
  </>
  );
};

export default TestConditions;
