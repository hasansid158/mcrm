import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useReactForm from 'hooks/useReactForm';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';

import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { fetchGraList } from 'redux/slices/detailSlice/graListSlice';
import { fetchLoads } from 'redux/slices/listSlice/listSlice';

import { graColumns } from 'pages/components/gra/graColumnEnum';
import ViewPdfDialog from 'pages/components/gra/ViewPdfDialog';
import TableFilters from 'pages/components/TableFilters';
import AddAssetsToGra from 'pages/components/gra/AddAssetsToGra';
import ActionPageMain from 'pages/components/ActionPageMain';

import GraPdf from 'components/pdfTemplates/GraPdf';

import { chain, isEmpty, isNil } from 'lodash';

import createFormEnum from 'enum/createFormEnum';

import Assets from './Assets';

const Gra = ({
  isDialog = false,
  miniGra = false,
  label='GRA',
  loadGraList = null,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [assetsInGra, setAssetsInGra] = useState([]);
  const [selectedGraId, setSelectedGraId] = useState('');

  const [filteredTableData, setFilteredTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [loading, setLoading] = useState(false);

  const { reset, formData } = useReactForm({});

  const { userProjects = [] } = useSelector(state => state?.userDetails);
  const {
    workOrderList,
    loads,
  } = useSelector(state => state.lists);
  const { graList } = useSelector(state => state?.actions);

  useEffect(() => {
    // console.log(tableData)
    setFilteredTableData(tableData);
  }, [tableData]);

  const filterSelectorEnum = [
    {
      name: 'global',
      label: 'Global search',
      placeholder: 'Search GRAs...',
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
      name: "workorder",
      label: "Work Orders",
      data: workOrderList,
      multiple: true,
    },
  ];

  useEffect(() => {
    const updateFilterSelectors = async () => {
      if (filterValues?.hasOwnProperty('projectId')) {

        const projectIds = chain(userProjects)
          .filter(item => filterValues?.projectId?.includes(item.value))
          .map('id')
          .value();

        dispatch(fetchLoads(projectIds));
      }
    };
    updateFilterSelectors();
  }, [filterValues]);


  useEffect(() => {
    const isSpecificGra = !isNil(loadGraList);

    const graData = isSpecificGra ? loadGraList : graList;

    if (!isSpecificGra && isEmpty(graData)) {
      setLoading(true);
      dispatch(fetchGraList()).finally(() => setLoading(false));
      return;
    };

    //creatingColumns
    const actionColumnProps = {
      field: 'actions',
      sortable: false,
      disableColumnMenu: true,
      headerName: '',
      width: 80,
      align: 'center',
      renderCell: cell => (
        <Button
          onClick={() => setPdfData(graData?.[cell.row?.id])}
          variant='contained'
          sx={{
            minWidth: "10px",
            height: "30px",
          }}
          endIcon={<VisibilityIcon sx={{fontSize: '18px'}}/>}
        >
          PDF
        </Button>
      )
    };
    const updatedColumns = new Array(...graColumns);
    updatedColumns.splice(1, 0, actionColumnProps);
    setTableColumns(updatedColumns);

    //filtering data
    const structuredData = graData?.map(item => (
      {
        ...item,
        graid: item?.graid,
        projectId: item?.projectId,
        load: item?.load,
        graDate: item?.graDate,
        workorder: item?.workOrder,
        warehouseInformation: item?.warehouseInformation,
        qualityInspection: item?.qualityInspection,
        grAdassets: item?.grAdassets?.length,
        graAssets: item?.grAdassets,
      }
    ));

    setTableData(structuredData);
  }, [graList, loadGraList]);

  const detailDrawerListContent =
  {
    'GRA Info': '',
    'Assets': <Assets
      isMiniTable
      autoHeight
      label=''
      createLabel='Create Assets'
      createButtonLabel='Create Assets'
      assetsData={assetsInGra || []}
      disableActions
      removeCreateButton
      disableFetchData
      // replaceContent={!assetsUnderLoad?.length ?  <NoAssetsText/> : null}
    />,
  };

  return (
    <>
      {!isDialog
        ?
          <ActionPageMain
            rows={filteredTableData}
            columns={tableColumns}
            formKey={createFormEnum.gras}
            label={label}
            clickRowData={row => {
              setAssetsInGra(row?.graAssets);
              setSelectedGraId(row?.graid);
            }}
            detailDrawerListContent={detailDrawerListContent}
            drawerProps={{
              drawerLabel: `GRA ID: ${selectedGraId}`,
            }}
            isMiniTable={miniGra}
            autoHeight={miniGra}
            isLoading={loading}
            removeCreateButton
            extraButtons={
            <>
              <TableFilters
                filterSelectorEnum={filterSelectorEnum}
                data={tableData}
                formData={formData}
                resetFields={() => reset({})}
                handleChange={(filteredData, values) => {
                  setFilteredTableData(filteredData);
                  setFilterValues(values);
                }}
              />
              {!miniGra &&
                <AddAssetsToGra
                  title='Complete Assets GRA'
                  buttonLabel='Complete GRA'
                  isButton
                />
              }
            </>}
          />
        :
          <>
            <Button
              variant='contained'
              onClick={() => setOpen(true)}
            >
              View GRAs
            </Button>

            <DialogBox
              open={open}
              handleClose={() => setOpen(false)}
              title='All GRAs'
              disableFormFooter
              maxWidth='lg'
              py={2}
            >
              <ActionPageMain
                rows={filteredTableData}
                columns={tableColumns}
                label=''
                disableIdAction
                isMiniTable
                height='640px'
              >
                <TableFilters
                  filterSelectorEnum={filterSelectorEnum}
                  data={tableData}
                  formData={formData}
                  resetFields={() => reset({})}
                  handleChange={(filteredData, values) => {
                    setFilteredTableData(filteredData);
                    setFilterValues(values);
                  }}
                />
              </ActionPageMain>
            </DialogBox>
          </>
      }

      <ViewPdfDialog
        open={!!pdfData}
        handleClose={() => setPdfData(null)}
        pdfData={pdfData}
        pdfTemplate={<GraPdf data={pdfData} />}
        pdfTitle='GRA-Invoice'
      />
    </>
  );
}

export default Gra;
