import React, { useEffect, useState } from 'react';

import { isEmpty, isNil } from 'lodash';
import { useDispatch } from 'react-redux';

import { Box, Typography, Button, IconButton, Switch } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

import PaperBox from 'common/ui/PaperBox';
import DataTable from 'common/dataDisplay/table/DataTable';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import useReactForm from 'hooks/useReactForm';

import TableFilters from 'pages/components/TableFilters';
import ExportXlsx from 'pages/components/common/ExportXlsx';

import { replaceObjectsInArray } from 'utils/helperFunctions';

import useScreenSize from 'hooks/useScreenSize';

const ProfileTable = ({
  title = 'ProfileTable',
  buttonLabel = 'Create',

  fetchedData = null,

  columns = [],

  getApi,
  createApi = () => {},
  updateApi = () => {},
  deleteApi,

  updateReplaceObjectKey = '',
  labelObjectKey = '',

  fetchOnUpdate,

  CreateForm = () => {},
  UpdateForm,
  formProps = {},

  // extraCreateProperties = () => ({}),
  // extraUpdateProperties = () => ({}),
  replaceCreateProperties = () => ({}),
  replaceUpdateProperties = () => ({}),

  defaultCreateValues = {},

  filterSelectorEnum,
  filterSelectorEnumNoBox,
  onlyGlobalFilter,

  dialogSize = 'md',

  actionComponents,
  replaceCreateButton,
  noEditCol,
  isloading,

  disableCheckboxSelection = false,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState({});

  const [modifiedColumns, setModifiedColumns] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [rowFilteredData, setRowFilteredData] = useState([]);

  const [dialogTitle, setDialogTitle] = useState('');

  const {isMobile} = useScreenSize();

  const {
    formData: formFilterData,
    reset: filterReset,
  } = useReactForm({});

  const {
    formData,
    reset,
    handleSubmit,
  } = useReactForm({});

  const fetchData = () => {
    setLoading(true);

    getApi()
      .then(res => setRowsData(res))
      .catch(err => dispatch(setErrorDialogText('Error occurred while loading data, please try again.')))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (fetchedData) {
      setRowsData(fetchedData);
      return;
    }

    if (!getApi) return;

    if (!isEmpty(rowsData)) return;
    fetchData();

  }, [fetchedData]);

  const handleDelete = () => {
    if (isNil(selectedRow) || isNil(deleteApi)) return;

    setLoading(true);

    deleteApi(selectedRow)
      .then(() => {
        !isNil(getApi) && fetchData();
        !isNil(fetchOnUpdate) && fetchOnUpdate();

        dispatch(setSnackBar({
          open: true,
          message: `${buttonLabel} has been deleted sucessfully`,
        }));
        setSelectedRow({});
      })
      .catch(err => dispatch(setErrorDialogText('Error occurred while deleting, please try again later.')))
      .finally(() => setLoading(false));
  }


  const onUpdateSubmit = (data) => {
    if (!updateApi) return;

    setLoading(true);

    const replaceData = replaceUpdateProperties(data);
    const payload = isEmpty(replaceData) ? data : replaceData;

    !isNil(payload?.id) && delete payload?.id;

    updateApi && updateApi(payload)
      ?.then(async (res) => {
        if (!fetchOnUpdate) {
          setRowsData(replaceObjectsInArray(rowsData, updateReplaceObjectKey, data));
        } else {
          setLoading(true);
          await fetchOnUpdate();
          setLoading(false);
        }

        dispatch(setSnackBar({
          open: true,
          message: `${buttonLabel} has been updated sucessfully`,
        }));
        setUpdateOpen(false);
      })
      .catch(err => dispatch(setErrorDialogText('Server error occurred, please try again.')))
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    const updatedColumns = columns?.map((column, key) => {
      let newColumn = column;

      if (key === 0 && !noEditCol) {
        newColumn = {
          ...column,
          renderCell: (params) => (
            <Box
              onClick={() => {
                reset(params?.row);
                setDialogTitle(`Update ${buttonLabel}`);
                setCreateOpen(false);
                setUpdateOpen(true);
              }}
              sx={{
                cursor: "pointer",
                color: 'primary.main',
                width: '100%',
                height: '100%',
                '&:hover': { textDecoration: "underline" },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="description"
                color="primary.main"
              >
                {params?.value}
              </Typography>
            </Box>
          )
        }
      }

      if (column?.isToggle) {
        newColumn = {
          ...column,
          renderCell: (params) => (
            <Switch
              checked={!!params?.value}
              onChange={(name, value) => onUpdateSubmit({...params?.row, [params.field]: value})}
            />
          )
        }
      }

      return newColumn
    })

    if (!isNil(deleteApi)) {
      updatedColumns?.push({
        field: 'deleteAction',
        headerName: '',
        flex: 1,
        maxWidth: 60,
        headerAlign: 'center',
        sortable: false,
        disableColumnMenu: true,
        editable: false,
        renderCell: params => (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <IconButton
              color="error"
              size="small"
              onClick={() => setSelectedRow(params?.row)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      })
    }

    setModifiedColumns(updatedColumns);
  }, [rowsData]);


  const onCreateSubmit = (data) => {
    if (!createApi) return;

    setLoading(true);

    const replaceData = replaceCreateProperties(data, rowsData);
    const payload = isEmpty(replaceData) ? data : replaceData;

    createApi && createApi(payload)
      ?.then(async (res = {}) => {
        if (!fetchOnUpdate) {
          setRowsData([...rowsData, {...data, ...res}]);
        } else {
          setLoading(true);
          await fetchOnUpdate();
          setLoading(false);
        }

        dispatch(setSnackBar({
          open: true,
          message: `New ${buttonLabel} has been created sucessfully`,
        }));
        setCreateOpen(false);
      })
      .catch(err => dispatch(setErrorDialogText('Server error occurred, please try again.')))
      .finally(() => setLoading(false));
  };

  return <>
    <PaperBox white>
      <Box
        mb={2}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
        gap={2}
      >
        <Box>
          <Typography variant='h5'>{title}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: 2,
            flex: 1,
          }}
        >
          {actionComponents}

          <Box>
            <TableFilters
              filterSelectorEnumNoBox={filterSelectorEnumNoBox}
              filterSelectorEnum={filterSelectorEnum}
              onlyGlobal={onlyGlobalFilter}
              data={rowsData}
              formData={formFilterData}
              resetFields={() => filterReset({})}
              handleChange={(filteredData, values) => {
                setRowFilteredData(filteredData);
              }}
            />
          </Box>

          <ExportXlsx isButton columns={modifiedColumns} rows={rowFilteredData}/>

          {!replaceCreateButton ?
            <Button
              variant='contained'
              onClick={() => {
                reset(defaultCreateValues);
                setDialogTitle(`Create ${buttonLabel}`);
                setUpdateOpen(false);
                setCreateOpen(true);
              }}
              startIcon={<AddIcon/>}
              sx={{ minWidth: 140 }}
            >
              Create
            </Button>
          :
            replaceCreateButton
          }
        </Box>

      </Box>

      <DataTable
        rowData={rowFilteredData}
        columns={modifiedColumns}
        loading={loading || isloading}
        autoHeight
        checkboxSelection={!disableCheckboxSelection}
      />
    </PaperBox>

    <DialogBox
      open={createOpen || updateOpen}
      handleClose={() => {
        setUpdateOpen(false);
        setCreateOpen(false);
      }}
      title={dialogTitle}
      disableSubmitNew
      handleFormSubmit={() => handleSubmit(createOpen ? onCreateSubmit : onUpdateSubmit)()}
      loading={loading || isloading}
      submitText={updateOpen ? 'Update' : 'Submit'}
      maxWidth={dialogSize}
    >
      <PaperBox sx={{px: 0}}>
        {updateOpen ?
          UpdateForm ? <UpdateForm {...formProps} formData={formData} isUpdate={updateOpen} /> :
          <CreateForm {...formProps} formData={formData} isUpdate={updateOpen} /> : <CreateForm {...formProps} formData={formData} isUpdate={updateOpen} />}
      </PaperBox>
    </DialogBox>

    <ConfirmDialog
      open={!isEmpty(selectedRow)}
      onCancel={() => setSelectedRow({})}
      onConfirm={handleDelete}
      loading={loading}
    >
      <Typography variant="p">
        Are you sure you want to delete {buttonLabel} <b>{selectedRow?.[labelObjectKey]}</b>?
      </Typography>
    </ConfirmDialog>
  </>;
}

export default ProfileTable;
