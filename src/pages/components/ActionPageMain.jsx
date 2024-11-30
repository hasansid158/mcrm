import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isArray, isNil, trimEnd } from 'lodash';

import {
  Typography,
  Button,
  Box,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import ActionPageTable from './ActionPageTable';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';
import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';
import CreateMultiDialog from 'components/createFormComponents/createForms/CreateMultiDialog';
import PaperBox from 'common/ui/PaperBox';
import PopperMenu from 'common/navigation/popperMenu/PopperMenu';

import { transitions } from 'core/animations';

import { useNavigate, useParams } from 'react-router-dom';

import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

//too many props, needs a cleanup
const ActionPageMain = ({
  fetchedData = [],
  rows = [],
  columns = [],
  formKey = null,
  invisibleColumns = {},
  label = '',
  labelContent,
  createLabel = '',
  createButtonLabel,
  isMiniTable = true,
  children = null,
  extraButtons,
  tableActionItem,
  detailDrawerChildren = null,
  detailDrawerListContent = null,
  clickRowData = () => {},
  fetchApi,
  isLoading = false,
  tableDisabed = false,
  onCellDoubleClick = () => {},
  checkboxSelection = false,
  onRowSelectionModelChange = () => {},
  rowSelectionModel,
  autoHeight = false,
  height,
  replaceContent,
  contentAboveTable,
  formsOnly,
  drawerProps,
  isMultiAdd,
  preFillData,
  preFillUpdateData,
  createFormProps,
  disableIdAction,
  disableAddUpdate,
  removeCreateButton,
  setUpdatedData = () => {},
  customCreateDialog = null,
  fetchByIdApi = null,
  detailDataFetchIdKey = null,
  pagePath = null,
  onDetailDataFetch = () => {},
  disableFetchData = false,
  drawerLabelKey = '',
  handleDrawerClose = () => {},
  updateEditRowData,
  tableProps = {},
}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [drawerData, setDrawerData] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [extraButtonAnchor, setExtraButtonAnchor] = useState(null);
  const [drawerLoading, setDrawerLoading] = useState(false);

  const [isDetailsFetchByApi, setIsDetailsFetchByApi] = useState(false);

  useEffect(() => {
    if (!updateEditRowData) return;
    setEditRow(updateEditRowData);
  }, [updateEditRowData]);

  useEffect(() => {
    setIsDetailsFetchByApi((!!detailDataFetchIdKey && !!pagePath && !!fetchByIdApi));
  }, [
    detailDataFetchIdKey,
    pagePath,
    fetchByIdApi,
  ]);

  const url = window.location.pathname;
  const currentPage = url.split('/')[2] || '';
  const isNotPagePathUrl = currentPage !== pagePath;

  const { id } = useParams();
  useEffect(() => {
    if (!editRow?.[detailDataFetchIdKey]) {
      if (!isDetailsFetchByApi || !id || isNotPagePathUrl) {
        setDrawerLoading(false);
        return
      };
    }

    setDrawerLoading(true);

    fetchByIdApi(isNotPagePathUrl ? editRow?.[detailDataFetchIdKey] : id)
      ?.then(res => {
        clickRowData(res);
        setDrawerData(res);
        onDetailDataFetch(res);
      })
      ?.catch(() => dispatch(setErrorDialogText('Error while fetching data, please try again')))
      ?.finally(() => setDrawerLoading(false));
  }, [id, isDetailsFetchByApi, editRow]);

  useEffect(() => {
    if (!fetchApi || disableFetchData) return;
    setLoading(true);

    const callFetch = async () => {
      (!fetchedData?.length && !rows?.length) && await dispatch(fetchApi());
      setLoading(false);
    }
    callFetch();
  }, []);

  return (
    <>
      {!formsOnly &&
        <Box sx={{height: '100%'}}>
          <PaperBox
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              rowGap: 2,
              columnGap: 1,
              py: 1,
              mb: .5,
              minHeight: 0,
              backgroundColor: 'white',
            }}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
              flexWrap='wrap'
              columnGap={1}
              rowGap={2}
            >
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexWrap='wrap'
                gap={2}
              >
                <Typography
                  component='span'
                  variant='h5'
                  sx={{alignSelf: 'center'}}
                >
                  {label}
                </Typography>
                {labelContent}
              </Box>

              <Box
                display='flex'
                flexWrap='wrap'
                columnGap={2}
                rowGap={1}
                justifyContent='center'
              >
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  rowGap={2}
                  columnGap={2}
                  alignItems='flex-start'
                >
                  {children}
                </Box>

                {isArray(extraButtons) && extraButtons?.length
                  ?
                    <Button
                      size='small'
                      variant='contained'
                      onClick={e => setExtraButtonAnchor(e.currentTarget)}
                      endIcon={
                        <KeyboardArrowDownRoundedIcon
                          sx={{
                            scale: '1.2',
                            rotate: extraButtonAnchor ? 'x 180deg' : '',
                            transition: transitions().common,
                          }}
                        />
                      }
                      color='secondary'
                      sx={{minWidth: '140px'}}
                    >
                      Actions
                    </Button>
                  :
                    extraButtons
                }
                {isArray(extraButtons) &&
                  <PopperMenu
                    open={!!extraButtonAnchor}
                    anchorEl={extraButtonAnchor}
                    onClickAway={() => setExtraButtonAnchor(null)}
                    placement='bottom'
                    popperSx={{ zIndex: 1220 }}
                  >
                    {extraButtons?.map((buttonComponent, key) => (
                      <MenuItem key={key}>
                        {buttonComponent}
                      </MenuItem>
                    ))}
                  </PopperMenu>
                }

                {!!formKey && (!disableAddUpdate && !removeCreateButton) &&
                  <Button
                    variant='contained'
                    size='small'
                    // variant='outlined'
                    color='primary'
                    // size='small'
                    onClick={() => setIsCreateOpen(true)}
                    startIcon={<AddIcon/>}
                    sx={{minWidth: '140px'}}
                  >
                    {createButtonLabel || 'Add'}
                  </Button>
                }
              </Box>
            </Box>


          </PaperBox>

          <PaperBox
            sx={{
              py: 0, px: 0, pb: 2,
              backgroundColor: 'white',
            }}
          >
            {contentAboveTable && contentAboveTable}
            {!replaceContent ?
              <ActionPageTable
                columns={columns}
                rows={rows}
                onCellDoubleClick={onCellDoubleClick}
                invisibleColumns={invisibleColumns}
                isMiniTable={isMiniTable}
                label={label}
                formKey={formKey}
                setIsCreateOpen={setIsCreateOpen}
                setEditRow={row => {
                  setDrawerLoading(true);
                  const {
                    id,
                    ...rowData
                  } = row;
                  clickRowData(rowData);
                  setEditRow(rowData);
                  (!isNotPagePathUrl && isDetailsFetchByApi) && nav(`/crm/${pagePath}/${row?.[detailDataFetchIdKey]}`);
                }}
                preFillUpdateData={preFillUpdateData}
                tableActionItem={tableActionItem}
                loading={loading || isLoading}
                disabled={tableDisabed}
                onRowSelectionModelChange={onRowSelectionModelChange}
                rowSelectionModel={rowSelectionModel}
                checkboxSelection={checkboxSelection}
                autoHeight={autoHeight}
                height={height}
                disableIdAction={disableIdAction}
                {...tableProps}
              />
              : <>{replaceContent}</>
            }
          </PaperBox>
        </Box>
      }

      {customCreateDialog ? customCreateDialog : isMultiAdd
        ? <CreateMultiDialog
            isDialogOpen={isCreateOpen}
            handleClose={() => {
              setIsCreateOpen(false);
              createFormProps?.handleClose && createFormProps?.handleClose();
            }}
            formKey={formKey}
            title={createLabel}
            label={label}
            preFillData={preFillData}
            createFormProps={createFormProps}
          />
        : <CreateDialog
            isDialogOpen={isCreateOpen}
            handleClose={() => {
              setIsCreateOpen(false);
              createFormProps?.handleClose && createFormProps?.handleClose();
            }}
            formKey={formKey}
            title={createLabel}
            label={label}
            preFillData={preFillData}
            createFormProps={createFormProps}
          />
      }

      <DetailsDrawer
        open={!isNil(editRow) || !isNil(drawerData)}
        onClose={() => {
          setEditRow(null);
          clickRowData(null);
          setDrawerData(null);
          handleDrawerClose();
          (!isNotPagePathUrl && isDetailsFetchByApi) && nav(`/crm/${pagePath}`);
        }}
        data={drawerData || preFillUpdateData || editRow}
        formKey={formKey}
        listChildren={detailDrawerListContent}
        handleUpdate={setUpdatedData}
        drawerLoading={drawerLoading}
        drawerLabel={`${trimEnd(label, 's')} ${editRow?.[drawerLabelKey] || id || ''}`}
        {...drawerProps}
      >
        {detailDrawerChildren}
      </DetailsDrawer>
    </>
  );
}

export default ActionPageMain;
