import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { detailColumn } from "enum/tableColumnEnum";
import { assetsColumns } from "components/tableColumns/assetsColumns";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { Box, Button, Typography } from "@mui/material";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';

import { fetchAllAssets, addBulkAssets } from "redux/slices/actionSlice/assetSlice";

import BulkImportDialog from "pages/components/BulkImportDialog";
import AssetTestDialog from 'pages/components/assets/testComponents/AssetTestDialog';
import assetDetailContent from "pages/components/detailDrawerComponents/inventoryDetails/assetDetailContent";
import TableFilters from "pages/components/TableFilters";
import AssetTransfer from "pages/components/assets/AssetTransfer";

import AddToLoad from "pages/components/assets/AddToLoad";
import BulkEdit from "pages/components/assets/BulkEdit";
import ExportXlsx from "pages/components/common/ExportXlsx";
import SsnSearch from "pages/components/assets/SsnSearch";

import useTableSelectData from "hooks/useTableSelectData";
import useReactForm from "hooks/useReactForm";

import { getModels } from "api/listApis";
import { fetchLoads, addToList } from "redux/slices/listSlice/listSlice";

import { crmRoutes } from "enum/routesEnum";

import { setErrorDialogText, setSnackBar } from "redux/slices/commonSlice/commonSlice";
import { blancooSync, updateAssets } from "api/masterApi";
import _, { map, chain, isEmpty } from "lodash";

import AssetsForm from 'components/createFormComponents/createForms/forms/AssetsForm';

const Assets = ({
  disableAddUpdate = false,
  disableActions = false,
  disableAdd = false,
  onRowSelection = () => {},
  onSelectReturnFullAsset = false,
  defaultSelectedAssetIndexes = [],
  children = null,
  label,
  onFilterSubmit = () => {},
  triggerFilterSubmit,
  filtersEnum = [],
  filtersEnumNoBox,
  assetsData = null,
  // overrideAssetData = false,
  tableLoading,
  preFillData,
  isMultiSelectFilters = true,
  drawerProps = {},
  isSmall = false,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { assets } = useSelector((state) => state.actions);

  const [fetchedAssets, setFetchedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState(fetchedAssets);
  const [filterValues, setFilterValues] = useState({});
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [bulkTestOpen, setBulkTestOpen] = useState(false);
  const [assetRowData, setAssetRowData] = useState({});
  const [assetFileHeaders, setAssetFileHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAssetIds, setSelectedAssetIds] = useState([]);
  const [defaultSelectedIndex, setDefaultSelectedIndex] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [editedValues, setEditedValues] = useState(null);
  const [filterSelectorEnum, setFilterSelectorEnum] = useState([]);
  const [assetDetailListContent, setAssetDetailListContent] = useState([]);

  const [enableClearFilterButton, setEnableClearFilterButton] = useState(false);

  const tableSelectorData = useTableSelectData();
  const columns = assetsColumns();

  const reloadFetchedAssets = () => {
    const data = assetsData !== null ? assetsData : assets;
    setFetchedAssets(data);
  }

  useEffect(() => {
    reloadFetchedAssets();
  }, [assets, assetsData]);

  useEffect(() => {
    if (isEmpty(defaultSelectedAssetIndexes)) return;

    setDefaultSelectedIndex(defaultSelectedAssetIndexes);
    setSelectedIndexes(defaultSelectedAssetIndexes)
  }, []);

  useEffect(() => {
    setFilteredAssets(fetchedAssets);
  }, [fetchedAssets]);

  const {
    formData,
    handleSubmit,
    reset,
  } = useReactForm();

  useEffect(() => {
    if (triggerFilterSubmit) {
      handleSubmit(onFilterSubmit)();
    };
  }, [triggerFilterSubmit]);

  const [modelList, setModelList] = useState(null);

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    assetStatus,
    makes,
    warehouses,
    workOrderList,
    loads,
    itemTypes,
  } = useSelector(state => state.lists);

  useEffect(() => {
    setFilterSelectorEnum([
      {
        name: 'global',
        label: 'Global search',
        placeholder: 'Search SSN or Load# here..',
      },
      {
        name: "itemType",
        label: "Item Type",
        data: itemTypes,
        multiple: isMultiSelectFilters,
      },
      {
        name: "assetStatus",
        label: "Asset Status",
        data: assetStatus,
        multiple: isMultiSelectFilters,
      },
      {
        name: "make",
        label: "Make",
        data: makes,
        multiple: isMultiSelectFilters,
      },
      {
        name: "model",
        label: "Model",
        data: modelList,
        multiple: isMultiSelectFilters,
      },
      {
        name: "projectId",
        label: "Projects",
        data: userProjects,
        multiple: isMultiSelectFilters,
      },
      {
        name: "load",
        label: "Loads",
        data: loads,
        multiple: isMultiSelectFilters,
      },
      {
        name: "workOrder",
        label: "Work Orders",
        data: workOrderList,
        multiple: isMultiSelectFilters,
      },
      {
        name: "warehouse",
        label: "Warehouse",
        data: warehouses,
        multiple: isMultiSelectFilters,
      },
      {
        name: "grade",
        label: "Grade",
        data: [
          { value: "A", label: "A" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
          { value: "D", label: "D" },
          { value: "E", label: "E" },
          { value: "F", label: "F" },
        ],
        multiple: isMultiSelectFilters,
      },
    ]);
  }, [
    isMultiSelectFilters,
    assetStatus,
    makes,
    userProjects,
    warehouses,
    workOrderList,
    loads,
    itemTypes,
    modelList,
  ]);

  //creating headers for sample file
  useEffect(() => {
    const headers = [];
    columns?.map(data => headers.push(data?.['field']));
    headers.shift();
    setAssetFileHeaders(headers);
  }, []);

  // Fetch and update model and load data
  useEffect(() => {
    const updateFilterSelectors = async () => {
      if (filterValues?.hasOwnProperty('make')) {

        const makeIds = chain(makes)
          .filter(item => filterValues?.make.includes(item.value))
          .map('id')
          .value();

        // const makeId = makes?.filter(value => value?.value === filterValues?.make)?.id;
        const res = await getModels(makeIds);
        setModelList(res);
      }
      if (filterValues?.hasOwnProperty('projectId')) {

        const projectIds = chain(userProjects)
          .filter(item => filterValues?.projectId?.includes(item.value))
          .map('id')
          .value();

        const res = await dispatch(fetchLoads(projectIds));
        if (res?.error) {
          dispatch(addToList({loads: []}));
        }
      }
    };
    updateFilterSelectors();
  }, [filterValues?.make, filterValues?.projectId]);


  const uploadBulkData = (data) => {
    //add update api here
    dispatch(addBulkAssets(data));
  }

  const handleCellDoubleClick = async (clickedCell) => {
    if (clickedCell?.field !== 'model' && clickedCell?.field !== 'load') return;
    setLoading(true);
    const isModel = clickedCell?.field === 'model';

    if (isModel) {
      const cellId = !!makes && makes?.find(value => value?.value === clickedCell?.row?.make)?.id;
      const resData =  await getModels(cellId);
      dispatch(addToList({models: resData}));
    } else {
      const cellId = !!userProjects && userProjects?.find(value => value?.value === clickedCell?.row?.projectId)?.id;
      await dispatch(fetchLoads(cellId));
    }

    setLoading(false);
  }


  const handleBlancooClick = () => {
    if (!selectedAssetIds?.length) {
      dispatch(setErrorDialogText('Please select at least one asset!'));
      return ;
    }

    setLoading(true);

    const assetId = map(selectedAssetIds, item => fetchedAssets[item]?.assetID);
    blancooSync({assetId}).then(() => {
      dispatch(setSnackBar({
        open: true,
        message: `Blancoo data successfully synced!`,
      }));

      dispatch(fetchAllAssets()).finally(() => setLoading(false));
    })
  }
  const acceptableStatuses = [
    "Pending Blanco Test",
    "Pending Condition Test",
    "Received",
    "New",
    "Collected",
    "Allocated",
    "Available",
    "In Repair",
  ];


  return (
    <>
      <BulkImportDialog
        open={bulkDialogOpen}
        handleClose={() => setBulkDialogOpen(false)}
        sampleFileHeaders={assetFileHeaders}
        onDataDownload={uploadBulkData}
      />

      <AssetTestDialog
        open={testOpen || bulkTestOpen}
        assetData={assetRowData}
        assetIds={selectedAssetIds}
        handleClose={() => {
          setTestOpen(false);
          setBulkTestOpen(false);
        }}
        isBulk={bulkTestOpen}
      />

      <ActionPageMain
        formKey={createFormEnum.assets}
        preFillData={preFillData}
        rows={filteredAssets}
        fetchedData={assets}
        columns={columns}
        label={`${label || 'Assets'} (${filteredAssets.length})`}
        createLabel="Create Assets"
        createButtonLabel='Add Assets'
        fetchByIdApi={async id => await assetDetailContent(id)}
        detailDataFetchIdKey='ssn'
        pagePath={crmRoutes.ASSETS_PATH}
        onDetailDataFetch={setAssetDetailListContent}
        preFillUpdateData={assetRowData}
        clickRowData={row => {
          if (!row) return;
          setAssetRowData(row?.['Asset Info']);
        }}
        detailDrawerListContent={assetDetailListContent}
        drawerProps={{
          drawerLabel: `SSN: ${assetRowData?.ssn || ''}`,
          drawerZIndex: 99999,
          ...drawerProps,
        }}
        isLoading={loading || tableLoading}
        fetchApi={fetchAllAssets}
        isMultiAdd
        onCellDoubleClick={handleCellDoubleClick}
        checkboxSelection
        rowSelectionModel={selectedIndexes}
        onRowSelectionModelChange={value => {
          if (!isEmpty(defaultSelectedIndex)) {
            setDefaultSelectedIndex([]);
            return;
          };
          setSelectedIndexes(value);

          const asset = map(value, item => fetchedAssets[item]);
          const assetId = map(value, item => fetchedAssets[item]?.assetID);
          onRowSelection(onSelectReturnFullAsset ? asset : assetId, value);
          setSelectedAssetIds(assetId);
        }}
        disableAddUpdate={disableAddUpdate}
        {...(disableAddUpdate ? {} : {
          tableActionItem: row => {
            const showTestButton = acceptableStatuses.includes(row?.assetStatus);
            return (
              <>
                {showTestButton && (
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      minWidth: "10px",
                      height: "30px",
                    }}
                    onClick={() => {
                      setAssetRowData(row);
                      setTestOpen(true);
                    }}
                  >
                    <Typography variant="description">
                      {row?.grade ? "Re-test" : "Test"}
                    </Typography>
                  </Button>
                )}
              </>
            );
          },
          extraButtons: disableActions ? [] : [
            <SsnSearch
              assetsData={assets}
              handleAssetSearch={searchedAssets => {
                setFetchedAssets(searchedAssets);
                setEnableClearFilterButton(true);
              }}
            />,

            <Box
              onClick={() => setBulkDialogOpen(true)}
              display='flex' alignItems='center'
            >
              <UploadFileRoundedIcon/>
              Import assets
            </Box>,

            <AddToLoad
              selectedAssets={selectedAssetIds}
              setTableLoading={setLoading}
            />,

            <Box
              onClick={handleBlancooClick}
              display='flex' alignItems='center'
            >
              <SyncRoundedIcon/>
              Blancoo-sync
            </Box>,

            <BulkEdit
              bulkItems={selectedAssetIds}
              editedValues={editedValues}
              formKey={createFormEnum.assets}
              updateApi={updateAssets}
              apiPayloadObj={({ ids, updateData }) => ({
                  assetIds: ids,
                  updateFields: updateData,
              })}
              setEditedValues={setEditedValues}
            />,

            <AssetTransfer assetIDs={selectedAssetIds}/>,

            <Box
              onClick={() => {
                if (!selectedAssetIds?.length) {
                  dispatch(setErrorDialogText('Please select at least one condition from all the categories.'));
                  return;
                }
                setBulkTestOpen(true)
              }}
              display='flex' alignItems='center'
            >
              <HandymanRoundedIcon/>
              Bulk Test
            </Box>,

            <ExportXlsx
              rows={filteredAssets}
              columns={columns}
            />
          ]
        })}
        {...rest}
      >

          <TableFilters
            filterSelectorEnum={!!filtersEnum?.length ? filtersEnum : filterSelectorEnum}
            filterSelectorEnumNoBox={filtersEnumNoBox}
            data={fetchedAssets}
            formData={formData}
            resetFields={() => reset({})}
            handleChange={(filteredData, values) => {
              setFilteredAssets(filteredData);
              setFilterValues(values);
            }}
            enableClearFilter={enableClearFilterButton}
            clearFilterCallback={() => {
              reloadFetchedAssets();
              setEnableClearFilterButton(false);
            }}
            isSmall={isSmall}
          />

          {children}

      </ActionPageMain>
    </>
  );
};

export default Assets;
