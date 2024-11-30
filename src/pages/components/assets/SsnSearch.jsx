import React, { useState, useEffect } from 'react';

import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import InputField from 'common/input/InputField';
import PaperBox from 'common/ui/PaperBox';

import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Chip, Box, Button, Typography } from '@mui/material';

import { filter, includes } from 'lodash';

const SsnSearch = ({
  assetsData,
  handleAssetSearch = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const [ssnValue, setSsnValue] = useState('');
  const [error, setError] = useState(false);
  const [emptyError, setEmptyError] = useState('');
  const [ssnList, setSsnList] = useState([]);

  const handleDelete = (idx) => {
    const filteredSsns = [...ssnList];
    filteredSsns?.splice(idx, 1);
    setSsnList(filteredSsns)
  }


  //reset values on close
  useEffect(() => {
    if (open) return;

    setSsnValue('');
    setSsnList([]);
    setError(false);

  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        setError(false);

        if (!ssnValue) {
          setError(true);
          return;
        }

        setSsnList([ssnValue, ...ssnList]);
        setSsnValue('');
        setEmptyError(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, ssnValue]);

  const handleSearch = () => {
    if (!ssnList?.length) {
      setEmptyError(true)
      return;
    }

    const searchedAssets = filter(assetsData, asset => includes(ssnList, asset.ssn));

    if (searchedAssets?.length >= assetsData?.length) return;

    handleAssetSearch(searchedAssets);
    setOpen(false);
  }

  return <>
    <Box
      onClick={() => setOpen(true)}
      display='flex' alignItems='center'
    >
      <FindInPageIcon/>
      SSN search
    </Box>

    <DialogBox
      open={open}
      closeClick={() => setOpen(false)}
      maxWidth='xs'
      title='SSN Search'
      disableFormFooter
    >
      <Box mt={2} mb={3} px={2}>
        <InputField
          // id='ssnField'
          inputRef={input => input && input.focus()}
          name='SSN'
          placeholder='Enter SSN and press enter..'
          error={error}
          value={ssnValue}
          onChange={(name, value) => {
            setSsnValue(value);
            setError(false);
          }}
        />
        <PaperBox
          enableBorder
          sx={{
            mt: 2,
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: 1,
            columnGap: 2,
            backgroundColor: 'common.backgroundGrey',
          }}
        >
          {ssnList?.map((ssn, key) => (
            <Chip
              key={key}
              label={ssn}
              color='secondary'
              variant='outlined'
              onDelete={() => handleDelete(key)}
            />
          ))}
        </PaperBox>

        <Box textAlign='center' mt={2}>
          {emptyError &&
            <Box mb={1}>
              <Typography variant='p3' color='error'>
                Please add at least one SSN to search!
              </Typography>
            </Box>
          }
          <Button
            variant='contained'
            size='small'
            sx={{minWidth: 100}}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
    </DialogBox>
  </>;
}

export default SsnSearch;
