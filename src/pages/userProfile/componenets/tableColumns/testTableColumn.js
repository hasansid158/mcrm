
const commonColumnProps = {
  minWidth: 80,
  editable: false,
  headerAlign: "left",
  align: "left",
};

export const testTableColumn = [
  {
    field: "conditionName",
    headerName: "Condition Name",
    ...commonColumnProps,
    flex: 2,
  },
  {
    field:"conditionType",
    headerName:"Condition Type",
    ...commonColumnProps,
    flex: 2,
  },
  {
    field: "conditionTestingExplanation",
    headerName: "Condition Testing Explanation",
    ...commonColumnProps,
    flex: 3,
  },
  {
    field: "grade",
    headerName: "Grade",
    ...commonColumnProps,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "numericGrade",
    headerName: "Numeric Grade",
    ...commonColumnProps,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "combinedGrade",
    headerName: "Combined Grade",
    ...commonColumnProps,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "isActive",
    headerName: "Is Active",
    ...commonColumnProps,
    type: "boolean",
    headerAlign: "center",
    align: "center",
    isToggle: true,
  },
];
