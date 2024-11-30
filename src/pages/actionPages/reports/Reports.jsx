import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorDialogText } from 'redux/slices/commonSlice/commonSlice';

import {
  getGRAreport,
  getProcessedreport,
  getStockOnHandReport,
  getReceivedReport,
  getReadyforsaleReport,
  getDispatchReport,
  getAssetRecycleReport
} from 'api/masterApi';
import { getModels } from "api/listApis";
import { fetchLoads, addToList } from "redux/slices/listSlice/listSlice";

import useReactForm from 'hooks/useReactForm';

import TableFilters from 'pages/components/TableFilters';

import TabsMenu from 'common/dataDisplay/Tabs/TabsMenu';
import ActionPageMain from 'pages/components/ActionPageMain';
import PaperBox from 'common/ui/PaperBox';

import { Box } from '@mui/material';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import BuildCircleRoundedIcon from '@mui/icons-material/BuildCircleRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';

import { isEmpty, chain, keys } from 'lodash';

import ExportXlsx from 'pages/components/common/ExportXlsx';
import { camelCaseToSpace } from 'utils/textFormatUtils';

const Reports = () => {
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [modelList, setModelList] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [filterSelectorEnum, setFilterSelectorEnum] = useState([]);

  const [filteredRows, setFilteredRows] = useState([]);
  const [reportData, setReportData] = useState([
    {
      rows: [],
      columns: [],
      api: getReceivedReport,
      label: 'Receiving Report',
    },
    {
      rows: [],
      columns: [],
      api: getReceivedReport,
      label: 'Testing Report',
    },
    {
      rows: [],
      columns: [],
      api: getProcessedreport,
      label: 'Asset Processed Report',
    },
    {
      rows: [],
      columns: [],
      api: getStockOnHandReport,
      label: 'Stock on Hand Report',
    },
    {
      rows: [],
      columns: [],
      api: getGRAreport,
      label: 'GRA Report',
    },
    {
      rows: [],
      columns: [],
      api: getReadyforsaleReport,
      label: 'Ready For Sale Report',
    },
    {
      rows: [],
      columns: [],
      api: getDispatchReport,
      label: 'Dispatch Report',
    },
    {
      rows: [],
      columns: [],
      api: getAssetRecycleReport,
      label: 'Asset Recycle Report',
    },
  ]);

  useEffect(() => {
    const selectedTab = reportData?.[tabValue];

    if (!isEmpty(selectedTab?.rows)) return;

    setLoading(true);

    selectedTab?.api()
      .then(res => {
        const dynamicColumns = keys(res?.[0] || {})?.map(key => (
          {
            field: key,
            headerName: camelCaseToSpace(key),
            flex: 1,
            minWidth: 100,
            headerAlign: 'center',
            align: 'center',
          }
        ));

        setReportData((prevReportData) =>
          prevReportData.map((item, index) =>
            index === tabValue
              ? { ...item, rows: res, columns: dynamicColumns }
              : item
          )
        );

        setFilteredRows(res);
      })
      .catch(() => dispatch(setErrorDialogText('Error occurred while fetching data, please try again later.')))
      ?.finally(() => setLoading(false));
  }, [tabValue]);

  // Filter logic remains unchanged
  useEffect(() => {
    const updateFilterSelectors = async () => {
      if (filterValues?.hasOwnProperty('make')) {
        const makeIds = chain(makes)
          .filter(item => filterValues?.make.includes(item.value))
          .map('id')
          .value();

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
          dispatch(addToList({ loads: [] }));
        }
      }
    };
    updateFilterSelectors();
  }, [filterValues?.make, filterValues?.projectId]);

  const tabHeaders = [
    <><ReceiptLongRoundedIcon />Received Report</>,
    <><DeleteRoundedIcon />Erasure Report</>,
    <><BuildCircleRoundedIcon />Processed Report</>,
    <><Inventory2RoundedIcon />Stock on Hand Report</>,
    <><BarChartRoundedIcon />GRA Report</>,
    <><SellRoundedIcon />Ready For Sale Report</>,
    <><LocalShippingRoundedIcon />Dispatch Report</>,
    <><DeleteRoundedIcon />Asset Recycle Report</>,
  ];

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
        placeholder: 'Search everything..',
      },
      {
        name: "itemType",
        label: "Item Type",
        data: itemTypes,
        multiple: true,
      },
      {
        name: "assetStatus",
        label: "Asset Status",
        data: assetStatus,
        multiple: true,
      },
      {
        name: "make",
        label: "Make",
        data: makes,
        multiple: true,
      },
      {
        name: "model",
        label: "Model",
        data: modelList,
        multiple: true,
      },
      {
        name: "projectId",
        label: "Projects",
        data: userProjects,
        multiple: true,
      },
      {
        name: "load",
        label: "Loads",
        data: loads,
        multiple: true,
      },
      {
        name: "workOrder",
        label: "Work Orders",
        data: workOrderList,
        multiple: true,
      },
      {
        name: "warehouse",
        label: "Warehouse",
        data: warehouses,
        multiple: true,
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
        multiple: true,
      },
    ]);
  }, [
    assetStatus,
    makes,
    userProjects,
    warehouses,
    workOrderList,
    loads,
    itemTypes,
    modelList,
  ]);

  const { formData, reset } = useReactForm();

  return (
    <>
      <PaperBox white sx={{ mb: 1 }}>
        <TabsMenu
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabHeaders={tabHeaders}
        />
      </PaperBox>

      <ActionPageMain
        disableIdAction
        rows={filteredRows || []}
        columns={reportData?.[tabValue]?.columns || []}
        label={reportData?.[tabValue]?.label || ''}
        isLoading={loading}
        tableProps={{ defaultPageSize: 25 }}
      >
        <TableFilters
          filterSelectorEnum={filterSelectorEnum}
          data={reportData?.[tabValue]?.rows || []}
          formData={formData}
          resetFields={() => reset({})}
          handleChange={(filteredData, values) => {
            setFilteredRows(filteredData);
            setFilterValues(values);
          }}
        />

        <ExportXlsx
          isButton
          rows={filteredRows || []}
          columns={reportData?.[tabValue]?.columns || []}
          name={reportData?.[tabValue]?.label || ''}
          buttonProps={{
            disabled: loading,
            color: 'primary',
            variant: 'contained',
          }}
        />
      </ActionPageMain>
    </>
  );
};

export default Reports;