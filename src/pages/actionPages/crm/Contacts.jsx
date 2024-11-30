import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContacts , addBulkContacts } from 'redux/slices/actionSlice/contactsSlice';
import { removeContactById } from 'api/crmApis';

import { detailColumn } from 'enum/tableColumnEnum';
import { contactsColumns } from 'components/tableColumns/contactsColumns';
import ActionPageMain from 'pages/components/ActionPageMain';
import createFormEnum from 'enum/createFormEnum';

import ContactCard from 'pages/components/contacts/ContactCard';
import DetailsDrawer from 'components/detailsDrawer/DetailsDrawer';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';


import { Box, Button, Grid, Typography, ButtonGroup } from '@mui/material';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

import { filter, isEmpty } from 'lodash';

import InputField from 'common/input/InputField';
import ExportXlsx from 'pages/components/common/ExportXlsx';
import TableFilters from 'pages/components/TableFilters';
import useReactForm from 'hooks/useReactForm';
import BulkImportDialog from 'pages/components/BulkImportDialog';
import { addBulkAssets } from 'redux/slices/actionSlice/assetSlice';
import MenuButton from 'pages/components/common/MenuButton';

const Contacts = (isButton , buttonProps) => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.actions);
  // const [open, setOpen] = useState(false);
  const [selectedContact, setSelectContact] = useState(null);

  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [isTable, setIsTable] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [assetFileHeaders, setAssetFileHeaders] = useState([]);


  const { formData, reset } = useReactForm();

  const filterSelectorEnum = [
    {
      name: 'global',
      label: 'Global search',
      placeholder: 'Search contacts...',
    },
    {
      name: 'company',
      label: 'Company',
      isInput : true
    },
  ];

  useEffect(() => {
    const headers = [];
    columns?.map(data => headers.push(data?.['field']));
    headers.shift();
    setAssetFileHeaders(headers);
  }, []);

  // need to show spinLoader when loading
  const handleRefetchContacts = () => {
    dispatch(fetchAllContacts());
  };

  const uploadBulkData = (data) => {
    //add update api here
    dispatch(addBulkContacts(data));
  }

  const handleDelete = async (contactId) => {
    try {
      await removeContactById(contactId);
      const updatedContacts = filteredContacts.filter(contact => contact.contactId !== contactId);
      setFilteredContacts(updatedContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const Cards = () => (
    <Grid container columnSpacing={4} rowSpacing={3} my={1} justifyContent="center">
      {
        filteredContacts?.map((contact, key) => (
          <Grid key={key} item xs={10} sm={5.5} md={3.8} lg={2.6}>
            <ContactCard  contact={contact} onClick={() => setSelectContact(contact)} onDelete={() => handleDelete(contact.contactId)}/>
          </Grid>
        ))
      }
    </Grid>
  )

  const columns = contactsColumns();

  return (
    <>
      <ActionPageMain
        formKey={createFormEnum.contacts}
        rows={filteredContacts}
        columns={columns}
        label='Contacts'
        createFormProps={{
          maxWidth:"sm",
          callback: handleRefetchContacts,

        }}
        createLabel='Create Contact'
        fetchApi={fetchAllContacts}
        replaceContent={isTable ? '' : <Cards />}
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
        updateEditRowData={selectedContact}
        handleDrawerClose={() => setSelectContact(null)}
      >
        <TableFilters
          filterSelectorEnum={filterSelectorEnum}
          data={contacts}
          formData={formData}
          resetFields={() => reset({})}
          handleChange={(filteredData, values) => {
            setFilteredContacts(filteredData);
          }}
        />
        <ExportXlsx isButton rows={filteredContacts} columns={columns} />
        <MenuButton
          onClick={() => setBulkDialogOpen(true)}
          isButton={isButton}
          icon={<UploadFileRoundedIcon/>}
          label='Import contacts'
          outlined
          {...buttonProps}
        />
      </ActionPageMain>

      <BulkImportDialog
        open={bulkDialogOpen}
        handleClose={() => setBulkDialogOpen(false)}
        sampleFileHeaders={assetFileHeaders}
        onDataDownload={uploadBulkData}
      />
    </>
  );
}

export default Contacts;
