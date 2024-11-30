import React, { useState, useEffect } from 'react';
import { isEmpty, camelCase, filter, omitBy, isNil, includes, every, isArray, difference, some, find } from 'lodash';

import { isValid, parseISO, isBefore, isSameDay, isAfter } from 'date-fns';

import SearchSelect from 'common/input/SearchSelect';
import InputField from "common/input/InputField";
import DatePicker from 'common/input/DatePicker';
import PopperMenu from 'common/navigation/popperMenu/PopperMenu';
import PaperBox from 'common/ui/PaperBox';

import { Box, Button, Grid, Typography, IconButton } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const TableFilters = ({
  filterSelectorEnum,
  filterSelectorEnumNoBox,
  data,
  handleChange,
  formData,
  resetFields = () => {},
  enableClearFilter = false,
  clearFilterCallback = () => {},
  onlyGlobal,
  isSmall,
  flexReverse,
  returnValue,
  isCalendarData,
  hasFilteredData = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [filtersFields, setFiltersFields] = useState(filterSelectorEnum);
  const [filterNoBoxFields, setFilterNoBoxFields] = useState(filterSelectorEnumNoBox);
  const [filterValues, setFilterValues] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [currentFilterValue, setCurrentFilterValue] = useState({});

  const [clearFilters, setClearFilters] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  useEffect(() => {
    setClearFilters(enableClearFilter)
  }, [enableClearFilter]);

  useEffect(() => {
    setFiltersFields(filterSelectorEnum);
    setFilterNoBoxFields(filterSelectorEnumNoBox);
  }, [filterSelectorEnum, filterSelectorEnumNoBox]);

  useEffect(() => {
    const filteredRows = isEmpty(filterValues)
      ? data
      : filter(data, obj =>
          every(filterValues, (value, key) => {
            const propValue = isCalendarData ? obj?.extendedProps[key] : obj[key];

            const fieldObj = find(filtersFields, field => field?.name === key);

            const {
              name = '',
              multiple = false,
              startDate = false,
              endDate = false
            } = fieldObj;

            if (value === null || !value.length ) return true; // Include the whole object if any value is null

            //if its a date
            if (startDate || endDate) {
              const parsedDataDate = parseISO(propValue);
              const parsedValue = parseISO(value);
              if (isNil(propValue)) return

              if (startDate) {
                setSelectedStartDate(parsedValue);
                return isBefore(parsedValue, parsedDataDate) || isSameDay(parsedValue, parsedDataDate);
              } else {
                setSelectedEndDate(parsedValue);
                return isAfter(parsedValue, parsedDataDate) || isSameDay(parsedValue, parsedDataDate);
              }
            }

            //if its multi select or single
            if (multiple) {
              if (isArray(propValue)) {
                if (isEmpty(propValue)) return false;

                return difference(propValue, value)?.length === 0;
              }
              return value?.includes(propValue);
            }

            //if its global
            if (name === 'global') {
              const haveFound = some(isCalendarData ? obj?.extendedProps : obj, item => {
                return includes(String(item)?.toLowerCase(), value?.toLowerCase());
              });
              return haveFound;
            }

            //if its single input select
            return includes(
              String(propValue)?.toLowerCase(),
              String(value)?.toLowerCase()
            );
          })
        );

    setFilteredData(filteredRows, omitBy(filterValues, isNil));
  }, [filterValues, data]);

  useEffect(() => {
    handleChange(filteredData, currentFilterValue);
    const hasFiltered = filteredData?.length < data?.length;
    setClearFilters(enableClearFilter || hasFiltered);
  }, [filteredData]);

  // useEffect(() => {
  //   const updatedFilterFields = filter(filterSelectorEnum, filterItem => (
  //     includes(filterItem?.name?.toLowerCase(), searchFilterValue?.toLowerCase())
  //   ))
  //   setFiltersFields(updatedFilterFields);
  // }, [searchFilterValue, data]);

  const handleClearFilters = () => {
    setFilteredData(data);
    resetFields();
    clearFilterCallback();
    setSelectedStartDate('');
    setSelectedEndDate('');
    setClearFilters(false);
    hasFilteredData(false);
  }

  useEffect(() => {
    setFilteredData(data);
    resetFields();
  }, [data]);

  return (
    <>
      <Box
        display='flex'
        columnGap={2}
        rowGap={1}
        sx={{
          '& .MuiInputBase-root, .MuiButtonBase-root': {
            minHeight: isSmall ? '35px !important' : '48px',
            height: isSmall ? '35px !important' : '48px',
          },
          flexDirection: flexReverse ? 'row-reverse' : 'row',
        }}
      >
        {clearFilters &&
          <Button
            size='small'
            onClick={handleClearFilters}
          >
            <Typography variant='p3'>Clear filters</Typography>
          </Button>
        }

        {!!filterNoBoxFields?.length && filterNoBoxFields?.map((field, key) => (
            field?.name === 'global' && field?.isInput ?
              <InputField
                key={key}
                size="large"
                name={field?.name}
                label={field?.label}
                placeholder={field?.placeholder}
                formData={formData}
                onChange={(name, value) => {
                  hasFilteredData(true);
                  setFilterValues({
                    ...filterValues,
                    // [camelCase(name)]: value,
                    [name]: value,
                  });
                }}
                sx={{ width: '160px' }}
              />
            :
              <SearchSelect
                key={key}
                variant="outlined"
                name={field?.name}
                size='large'
                searchSelectData={field?.data}
                disabled={!!!field?.data?.length}
                label={field?.label}
                formData={formData}
                required={field?.required}
                returnLabel={!returnValue}
                onChange={(name, value) => {
                  hasFilteredData(true);
                  setFilterValues({
                    ...filterValues,
                    // [camelCase(name)]: value,
                    [name]: value,
                  });
                  // setCurrentFilterValue({[camelCase(name)]: value});
                  setCurrentFilterValue({[name]: value});
                }}
                multiple={field?.multiple}
                disableCloseOnSelect={!!field?.multiple}
                sx={{ width: '160px' }}
              />
          ))
        }

        {!!data?.length &&
          <>
            {filtersFields?.map((field, key) => (
              field?.name === 'global' &&
                <InputField
                  key={key}
                  size='large'
                  name={field?.name}
                  label={field?.label}
                  placeholder={field?.placeholder}
                  formData={formData}
                  onChange={(name, value) => {
                    hasFilteredData(true);
                    setFilterValues({
                      ...filterValues,
                      // [camelCase(name)]: value,
                      [name]: value,
                    });
                  }}
                />
            ))}

            {!onlyGlobal &&
              <Button
                size='small'
                variant='outlined'
                color='secondary'
                onClick={(e) => setAnchorEl(e.currentTarget)}
                startIcon={<TuneRoundedIcon sx={{ width: '24px', height: '24px' }}/>}
                sx={{ minWidth: '115px' }}
              >
                Filters
              </Button>
            }
          </>
        }
      </Box>

      <PopperMenu
        open={!!anchorEl}
        onClickAway={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        sx={{
          width: '100%',
          maxWidth: '670px',
        }}
        isBox
        placement='bottom-start'
        // keepMounted
      >
        <PaperBox sx={{pt: 2, px: '20px', pb: 3,}}>
          <Grid
            container
            rowSpacing={2.5}
            columnSpacing={2}
            minWidth='400px'
            maxWidth='550px'
          >
            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='h5' fontWeight='600'>Filters</Typography>
              <IconButton
                size='small'
                onClick={() => setAnchorEl(null)}
                color='secondary'
              >
                <CloseRoundedIcon sx={{ width: '24px', height: '24px' }}/>
              </IconButton>
            </Grid>
            {!!filtersFields?.length && filtersFields?.map((field, key) => {
              if (field?.name === 'global') return '';
              return (
                <Grid item xs={field?.fullWidth ? 12 : 6} key={key}>
                  {field?.isInput ?
                    <InputField
                      size="small"
                      name={field?.name}
                      label={field?.label}
                      formData={formData}
                      onChange={(name, value) => {
                        hasFilteredData(true);
                        setFilterValues({
                          ...filterValues,
                          // [camelCase(name)]: value,
                          [name]: value,
                        });
                      }}
                    />
                  : field?.startDate || field?.endDate ?
                      <DatePicker
                        name={field?.name}
                        label={field?.label}
                        maxDate={field?.startDate && selectedEndDate ? selectedEndDate : null}
                        minDate={field?.endDate && selectedStartDate ? selectedStartDate : null}
                        formData={formData}
                        onChange={value => {
                          hasFilteredData(true);
                          setFilterValues({
                            ...filterValues,
                            [field?.name]: value,
                          });
                        }}
                      />
                  :
                    <SearchSelect
                      variant="outlined"
                      name={field?.name}
                      searchSelectData={field?.data}
                      disabled={!!!field?.data?.length}
                      label={field?.label}
                      formData={formData}
                      required={field?.required}
                      returnLabel={!returnValue}
                      onChange={(name, value) => {
                        hasFilteredData(true);
                        setFilterValues({
                          ...filterValues,
                          // [camelCase(name)]: value,
                          [name]: value,
                        });
                        // setCurrentFilterValue({[camelCase(name)]: value});
                        setCurrentFilterValue({[name]: value});
                      }}
                      multiple={field?.multiple}
                      disableCloseOnSelect={!!field?.multiple}
                    />
                  }
                </Grid>
              )
            })}
          </Grid>
          {!!!filtersFields?.length &&
            <Box mt={1} textAlign='center'>
              <Typography variant='p' fontWeight='600'>No filters found...</Typography>
            </Box>
          }
        </PaperBox>
      </PopperMenu>
    </>
  );
}

export default TableFilters;
