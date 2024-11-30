
import format from "date-fns/format";

const commonColumnProps = {
  flex: 1,
  minWidth: 100,
  editable: false,
  headerAlign: 'left',
  align: 'left',
};

const dateCell = {
  // type: 'date',
  // valueGetter: ({ value }) => value && format(new Date(value), "yyyy-MM-dd'T'HH:mm:ss"),
  valueFormatter: cell => cell?.value
  ? format(new Date(cell.value), "MM/dd/yyyy hh:mm a")
  : '',
};

export const timeSheetColumns = (props = {}) => {
  return (
    [
      { field: 'timeSheetId', headerName: 'Time Sheet Id', minWidth: 90, width: 90, editable: false},
      { field: 'startDateTime', headerName: 'Start Date and Time', ...commonColumnProps, ...dateCell },
      { field: 'endDateTime', headerName: 'End Date and Time', ...commonColumnProps, ...dateCell },
      { field: 'slaTarget', headerName: 'SLA Target', ...commonColumnProps },
      { field: 'olaTarget', headerName: 'OLA Target', ...commonColumnProps },
      { field: 'fullName', headerName: 'Full Name', ...commonColumnProps },
      { field: 'vehicle', headerName: 'Vehicle', ...commonColumnProps },
      // { field: 'timeSheetComments', headerName: 'Time Sheet Comments', ...commonColumnProps, flex: 2, },
    ]
  )
}