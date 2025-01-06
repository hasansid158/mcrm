import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import DataTable from 'common/dataDisplay/table/DataTable';
import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

import formComponentsEnum from 'enum/formComponentsEnum';

import {
  setErrorDialogText,
  setSnackBar,
} from 'redux/slices/commonSlice/commonSlice';
import { isDate, isEqual } from 'date-fns';

const ActionPageTable = ({
  rows = [],
  columns = [],
  invisibleColumns = {},
  isMiniTable = false,
  formKey = '',
  setEditRow = () => {},
  tableActionItem = null,
  disableIdAction = false,
  loading = false,
  height = 'calc(100dvh - 160px)',
  preFillUpdateData = {},
  ...rest
}) => {
  const dispatch = useDispatch();
  const [clickedCellName, setClickedCellName] = useState(null);
  const [promiseArguments, setPromiseArguments] = useState(false);
  const [customColumns, setCustomColumns] = useState([]);

  useEffect(() => {
    //creating action columns and pushing to current columns.
    const actionChildrenLength = tableActionItem
      ? tableActionItem()?.props?.children?.length
      : 0;
    let actionColumnWidth =
      actionChildrenLength > 1 ? 58 * actionChildrenLength : 70;

    const columnProps = {
      field: 'actions',
      sortable: false,
      disableColumnMenu: true,
      headerName: '',
      editable: false,
      width: actionColumnWidth,
    };

    const actionColumn = {
      ...columnProps,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent={actionChildrenLength > 1 ? 'space-between' : 'center'}
          width="100%"
        >
          {tableActionItem?.(params?.row)}
        </Box>
      ),
    };

    if (disableIdAction) {
      setCustomColumns([
        ...(tableActionItem ? [actionColumn] : []),
        ...columns,
      ]);
      return;
    }

    //Making first column to be clickable and open detail sidebar on click
    const firstColumn = columns?.[0] || {};

    const modifiedFirstColumn = {
      ...firstColumn,
      headerAlign: 'center',
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            '&:hover': {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}
          onClick={() => setEditRow(params.row)}
        >
          {params.row[firstColumn?.field]}
        </Box>
      ),
    };

    setCustomColumns([
      ...(tableActionItem ? [actionColumn] : []),
      modifiedFirstColumn,
      ...columns.slice(1),
    ]);
  }, [columns]);

  const onCellEdit = (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      const newValue = newRow?.[clickedCellName];
      const oldValue = oldRow?.[clickedCellName];

      if (newValue !== oldValue && newValue !== '') {
        if (isDate(newValue)) {
          isEqual(new Date(newValue), new Date(oldValue))
            ? resolve(oldRow)
            : setPromiseArguments({ resolve, reject, newRow, oldRow });
          return;
        }
        // Save the arguments to resolve or reject the promise later
        setPromiseArguments({ resolve, reject, newRow, oldRow });
      } else {
        resolve(oldRow); // Nothing was changed
      }
    });

  const handleCancel = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const handleConfirm = async () => {
    const { newRow, resolve } = promiseArguments;

    const updateData = {
      ...preFillUpdateData,
      ...newRow,
    };

    const res = await dispatch(
      formComponentsEnum()?.[formKey]?.updateApi(updateData),
    );

    if (res?.error) {
      const errorMsg =
        res?.payload?.title || 'Server error occurred, please try again later.';
      dispatch(setErrorDialogText(errorMsg));
      handleCancel();
      return;
    }

    resolve(newRow);
    setPromiseArguments(null);
    dispatch(
      setSnackBar({
        open: true,
        message: `Sucessfully updated value of ${clickedCellName}`,
      }),
    );
  };

  const confirmDialogContent = () => {
    let newValue = promiseArguments?.newRow?.[clickedCellName];
    let oldValue = promiseArguments?.oldRow?.[clickedCellName];
    newValue = isDate(newValue) ? new Date(newValue) : newValue;
    oldValue = isDate(newValue) ? new Date(oldValue) : oldValue;

    return (
      <>
        Changing&nbsp;
        <b>{clickedCellName}</b>
        <br />
        <br />
        <b>FROM</b>
        <br />
        {'' + oldValue}
        <br />
        <br />
        <b>TO</b>
        <br />
        {'' + newValue}
      </>
    );
  };

  return (
    <>
      <DataTable
        columns={customColumns}
        rowData={rows}
        loading={loading}
        isFullTable={!isMiniTable}
        height={height}
        invisibleColumns={invisibleColumns}
        onCellEditStop={(cell) => setClickedCellName(cell?.field)}
        processRowUpdate={onCellEdit}
        onProcessRowUpdateError={(error) => console.log(error, ' -- error')}
        {...rest}
      />

      <ConfirmDialog
        open={!!promiseArguments}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Are you sure?"
      >
        {confirmDialogContent()}
      </ConfirmDialog>
    </>
  );
};

export default memo(ActionPageTable);
