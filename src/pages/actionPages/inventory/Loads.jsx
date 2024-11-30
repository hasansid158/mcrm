import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { detailColumn } from "enum/tableColumnEnum";
import { loadsColumns } from "components/tableColumns/loadsColumns";
import ActionPageMain from "pages/components/ActionPageMain";
import createFormEnum from "enum/createFormEnum";

import { Typography, Box, Chip } from "@mui/material";

import { fetchAllLoads } from "redux/slices/actionSlice/LoadsSlice";

import Assets from "./Assets";

import { attachAssetToLoad } from "api/masterApi";
import { setSnackBar, setErrorDialogText } from "redux/slices/commonSlice/commonSlice";
import { useDispatch } from "react-redux";

import { fetchAllAssets } from "redux/slices/actionSlice/assetSlice";
import { getLoadById } from "api/masterApi";

import AssetToDialog from "pages/components/common/AssetToDialog";
import RemoveLoad from "pages/components/loads/RemoveLoad";
import TableFilters from "pages/components/TableFilters";
import AddAssetsToGra from "pages/components/gra/AddAssetsToGra";
import AssetTestDialog from "pages/components/assets/testComponents/AssetTestDialog";
import Gra from "./Gra";

import useReactForm from "hooks/useReactForm";
import useTableSelectData from "hooks/useTableSelectData";
import { isEmpty } from "lodash";

import { getGraByLoadId } from "api/masterApi";

const Loads = () => {
  const dispatch = useDispatch();
  const { loads } = useSelector((state) => state.actions);

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    warehouses,
    workOrderList,
    allStatusList = {},
  } = useSelector(state => state.lists)

  const { load = [] } = allStatusList;

  const [filteredloads, setFilteredLoads] = useState([]);

  const [tabValue, setTabValue] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [assetLoading, setAssetLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkTestOpen, setBulkTestOpen] = useState(false);

  const [assetsUnderLoad, setAssetsUnderLoad] = useState([]);
  const [preFilledUpdateData, setPreFilledUpdateData] = useState({});
  const [selectedLoadAssetIds, setSelectedLoadAssetIds] = useState([]);

  const [selectedLoadNumber, setSelectedLoadNumber] = useState('');
  const [selectedLoadId, setSelectedLoadId] = useState(null);
  const [addedLoadId, setAddedLoadId] = useState(null);

  const [loadGraList, setLoadGraList] = useState([]);

  const [drawerLoading, setDrawerLoading] = useState(null);

  const tableSelectorData = useTableSelectData();

  useEffect(() => {
    if (tabValue === 2) {
      setDrawerLoading(true);

      getGraByLoadId(selectedLoadId)
        ?.then(res => setLoadGraList(res))
        ?.catch(() => dispatch(setErrorDialogText('Server error occurred while loading GRAs, please try again later.')))
        ?.finally(() => setDrawerLoading(false));
    }
  }, [tabValue]);

  const performAssetFetchByLoad = async (rowData, forceFetch = false) => {
    //checks before calling fetch api again
    if (selectedLoadId === null) return;
    if (selectedLoadId === preFilledUpdateData?.loadId && !forceFetch) return;

    setDrawerLoading(true);
    setAssetsUnderLoad([]);
    setPreFilledUpdateData({});
    setLoadGraList([]);

    const res = await getLoadById(selectedLoadId)?.then(res => {
      setAssetsUnderLoad(res?.assets);
      setPreFilledUpdateData(res?.data);
      return true;

    }).catch(err => {
      return false;
    });

    setDrawerLoading(false);
    return res;
  }

  // useEffect(() => {
  //   performAssetFetchByLoad();
  // }, [selectedLoadId]);

  const handleAddToAsset = (selectedAssets, data, callBackFunc) => {
    const loadId = addedLoadId !== null ? addedLoadId : selectedLoadId;
    attachAssetToLoad({
      loadId,
      assetIds: selectedAssets,
    }).then(() => {
        dispatch(setSnackBar({
          open: true,
          message: `${selectedAssets?.length} assets added to load ${loadId}`,
        }));

        // setAssetLoading(true);
        performAssetFetchByLoad(null, true);
        // dispatch(fetchAllAssets()).finally(() => setAssetLoading(false))
      })
      .catch(() => dispatch(setErrorDialogText('Error attaching loads, please try again later.')))
      .finally(() => {
        callBackFunc(true);
      });
  }

  const { formData, reset } = useReactForm();

  const filterSelectorEnum = [
    {
      name: 'global',
      label: 'Global search',
      placeholder: 'Search loads...',
    },
    {
      name: "warehouse",
      label: "Warehouse",
      data: warehouses,
      multiple: true,
    },
    {
      name: "projectId",
      label: "Projects",
      data: userProjects,
      multiple: true,
    },
    {
      name: "workorder",
      label: "Work Orders",
      data: workOrderList,
      multiple: true,
    },
    {
      name: "status",
      label: "Status",
      data: load.map(val => ({ id:  val.statusId, value: val.status })),
      multiple: true,
    },
  ];

  const NoAssetsText = () => (
    !drawerLoading &&
    <Box textAlign='center'>
      <Typography variant='pb'>No assets in this load, please add new asset.</Typography>
    </Box>
  )

  const SubLabels = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: 2,
        rowGap: 1,
        mt: 1,
      }}
    >
      {
        [
          `ProjectId: ${preFilledUpdateData?.warehouseName || ''}`,
          `Warehouse: ${preFilledUpdateData?.projectName || ''}`,
          `Load: ${preFilledUpdateData?.loadNo || ''}`,
        ].map((label, key) => (
          <Chip
            key={key}
            label={
              <Typography
                variant='p2'
                color='common.fontColor'
                sx={{ textDecoration: 'none !important' }}
              >
                {label}
              </Typography>
            }
            sx={{background: 'white'}}
            variant='outlined'
            color='primary'
          />
        ))
      }
    </Box>
  );

  const handleCreateLoadCallback = (data) => {
    if (isEmpty(data)) return;

    data?.loadId && setAddedLoadId(data?.loadId);
    setDialogOpen(true);
  }

  const detailDrawerListContent =
    {
      'Load': '',
      'Assets': <Assets
        isMiniTable
        autoHeight
        label=''
        createLabel='Create Assets'
        createButtonLabel='Create Assets'
        tableLoading={assetLoading}
        assetsData={assetsUnderLoad || []}
        onRowSelection={assetIds => setSelectedLoadAssetIds(assetIds)}
        replaceContent={!assetsUnderLoad?.length ?  <NoAssetsText/> : null}
        createFormProps={{
          removeFields: [
            'warehouse',
            'projectId',
            'load',
            'palletNo',
          ],
          subLabel: <SubLabels/>,
          callback: () => performAssetFetchByLoad(null, true),
          defaultValues: {
            projectId: preFilledUpdateData?.projectId,
            load: preFilledUpdateData?.loadId,
            warehouse: preFilledUpdateData?.warehouseId,
          }
        }}
        extraButtons={[
          <Box
            onClick={() => setDialogOpen(true)}
          >
            Add assets to load
          </Box>,

          ...(isEmpty(assetsUnderLoad) ? [] : [
            <AddAssetsToGra
              assetList={selectedLoadAssetIds}
              selectedLoadId={selectedLoadId}
              disableAssetTable
            />,

            <Box
              onClick={() => {
                if (!selectedLoadAssetIds?.length) {
                  dispatch(setErrorDialogText('Please select at least one row from the table.'));
                  return;
                }
                setBulkTestOpen(true)
              }}
            >
              Bulk Test
            </Box>,

            <RemoveLoad
              loadId={selectedLoadId}
              loadNo={selectedLoadNumber}
              onLoadRemove={() => {
                setSelectedLoadId(null);
                //remove load locally later so that we dont have to fetch again !!
                dispatch(fetchAllLoads());
              }}
            />,

            <Box>
              Complete Load
            </Box>
          ])
        ]}
      />,

      'GRA': <Gra
        miniGra
        loadGraList={loadGraList}
        label=''
      />,
  };

  return <>
    <ActionPageMain
      formKey={createFormEnum.loads}
      rows={filteredloads}
      columns={loadsColumns({
        userProjects,
        warehouses,
        workOrderList,
      })}
      label='Loads'
      createLabel={'Create Load'}
      fetchApi={fetchAllLoads}
      // createFormProps={{ callback: handleCreateLoadCallback}}
      clickRowData={row => {
        setSelectedLoadId(row === null ? row : row?.loadId);
        setSelectedLoadNumber(row?.loadNo);
        setSelectedLoadAssetIds([]);
      }}
      preFillUpdateData={preFilledUpdateData}
      detailDrawerListContent={detailDrawerListContent}
      drawerProps={{
        drawerFetchApiTrigger: performAssetFetchByLoad,
        open: selectedLoadId !== null,
        drawerLabel: `LOAD: ${selectedLoadNumber}`,
        getCurrentTabValue: setTabValue,
      }}
    >
      <TableFilters
        filterSelectorEnum={filterSelectorEnum}
        data={loads}
        formData={formData}
        resetFields={() => reset({})}
        handleChange={(filteredData, values) => {
          setFilteredLoads(filteredData);
        }}
      />
    </ActionPageMain>

    <AssetToDialog
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      onSubmit={handleAddToAsset}
      title={`Add Assets To Load ${addedLoadId !== null ? addedLoadId : selectedLoadId}`}
    />

    <AssetTestDialog
      open={bulkTestOpen}
      handleClose={() => setBulkTestOpen(false)}
      isBulk
      assetData={{}}
      assetIds={selectedLoadAssetIds}
      submitCallback={() => performAssetFetchByLoad(null, true)}
    />
  </>;
};

export default Loads;
