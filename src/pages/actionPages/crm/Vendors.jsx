import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { vendorsColumns } from 'components/tableColumns/vendorsColumns';
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';
import { fetchAllVendorList } from "redux/slices/actionSlice/vendorsSlice";
import { Button, ButtonGroup, Box } from '@mui/material';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

import SimpleCards from 'pages/components/SimpleCards';

import ExportXlsx from 'pages/components/common/ExportXlsx';
import useReactForm from 'hooks/useReactForm';
import TableFilters from 'pages/components/TableFilters';

const Vendors = () => {
  const { vendors } = useSelector(state => state.actions);
  const [isTable, setIsTable] = useState(false);
  const [selectedVendor, setSelectVendor] = useState(null);
  const [filteredVendors, setFilteredVendors] = useState([]);

  const {
    formData,
    reset
  } = useReactForm();

  const columns = vendorsColumns();

  return (
    <>
      <ActionPageMain
        formKey={createFormEnum.vendors}
        rows={filteredVendors}
        columns={columns}
        label='Vendors'
        drawerLabelKey='vendorName'
        createLabel='Create Vendors'
        fetchApi={fetchAllVendorList}
        replaceContent={
          isTable ?
          '' :
          <Box mt={4} px={2}>
            <SimpleCards
              data={filteredVendors}
              onClick={setSelectVendor}
              nameKey='vendorName'
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
        updateEditRowData={selectedVendor}
        handleDrawerClose={() => setSelectVendor(null)}
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
          data={vendors}
          formData={formData}
          resetFields={() => reset({})}
          handleChange={(filteredData, values) => {
            setFilteredVendors(filteredData);
          }}
        />
        <ExportXlsx isButton rows={filteredVendors} columns={columns} />
      </ActionPageMain>
    </>

  );
}

export default Vendors;
