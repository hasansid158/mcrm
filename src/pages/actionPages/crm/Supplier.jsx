import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { supplierColumns } from 'components/tableColumns/supplierColumns';
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';

import { fetchAllSuppliers } from 'redux/slices/actionSlice/supplierSlice';

import { Button, ButtonGroup, Box } from '@mui/material';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

import SimpleCards from 'pages/components/SimpleCards';

import ExportXlsx from 'pages/components/common/ExportXlsx';
import useReactForm from 'hooks/useReactForm';
import TableFilters from 'pages/components/TableFilters';

const Supplier = () => {
  const { supplier } = useSelector(state => state.actions);
  const [isTable, setIsTable] = useState(false);
  const [selectedItem, setSelectItem] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const {
    formData,
    reset
  } = useReactForm();

  return (
    <>
      <ActionPageMain
        formKey={createFormEnum.supplier}
        rows={filteredData}
        columns={supplierColumns}
        label='Suppliers'
        drawerLabelKey='supplierName'
        createLabel='Create Supplier'
        fetchApi={fetchAllSuppliers}
        createFormProps={{maxWidth: 'lg'}}
        replaceContent={
          isTable ?
          '' :
          <Box mt={4} px={2}>
            <SimpleCards
              data={filteredData}
              onClick={setSelectItem}
              nameKey='supplierName'
              showKeys={[
                'country',
                'email',
                'contactNumber',
                'productOrServiceOffered',
                'bankAccountNumber',
                'paymentTerms'
              ]}
            />
          </Box>
        }
        labelContent={
          <>
            <ButtonGroup disableElevation size='small'>
              <Button
                variant={isTable ? 'outlined' : 'contained'}
                color='secondary'
                onClick={() => setIsTable(false)}
              >
                <ViewModuleRoundedIcon/>
              </Button>
              <Button
                variant={isTable ? 'contained' : 'outlined'}
                color='secondary'
                onClick={() => setIsTable(true)}
                >
                <ViewListRoundedIcon/>
              </Button>
            </ButtonGroup>
          </>
        }
        updateEditRowData={selectedItem}
        handleDrawerClose={() => setSelectItem(null)}
      >
        <TableFilters
          filterSelectorEnum={[
            {
              name: 'global',
              label: 'Global search',
              placeholder: 'Search Vendor...',
            }
          ]}
          onlyGlobal
          data={supplier}
          formData={formData}
          resetFields={() => reset({})}
          handleChange={(filteredData, values) => {
            setFilteredData(filteredData);
          }}
        />
        <ExportXlsx isButton rows={filteredData} columns={supplierColumns} />
      </ActionPageMain>
    </>

  );
}

export default Supplier;
