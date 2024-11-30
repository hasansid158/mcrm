import React, { useEffect, useState } from 'react';

import { map, filter, isEmpty, cloneDeep, reduce, } from 'lodash';
import { Box, IconButton, Typography, Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import SearchSelect from 'common/input/SearchSelect';
import DatePicker from 'common/input/DatePicker';
import InputField from 'common/input/InputField';

import { isValid, isBefore, isEqual, parseISO } from 'date-fns';

import useReactForm from 'hooks/useReactForm';

const KanbanProgressiveFilters = ({
  handleFilterApply = () => {},
  filterData,
  filters = [],
  listKey,
}) => {
  const initialValues = reduce(filters, (result, filter) => {
    result[filter.name] = filter.init !== undefined ? filter.init : null;
    return result;
  }, {});

  const {
    formData,
    reset,
    useWatch,
  } = useReactForm({});

  const watchedData = useWatch({control: formData.control})

  useEffect(() => {
    const clonedData = cloneDeep(filterData);

    map(clonedData, (item) => {
      item[listKey] = filter(item[listKey], (subItem) => {
        return filters?.every(filter => {
          if (filter?.type === 'date') {
            return filter?.filterBy?.some(byValue => (
              (!isValid(watchedData?.[filter.name]) ||
                (
                  isBefore(parseISO(subItem?.[byValue]), watchedData?.[filter.name]) ||
                  isEqual(parseISO(subItem?.[byValue]), watchedData?.[filter.name])
                )
              )
            ));
          } else {
            return filter?.filterBy?.some(byValue => (
              (isEmpty(watchedData?.[filter.name]) ||
                (String(subItem?.[byValue])?.toLowerCase()?.includes(watchedData?.[filter.name]?.toLowerCase()))
              )
            ));
          }
        })
      });
      return item;
    });

    handleFilterApply(clonedData);
  }, [
    filterData,
    watchedData,
  ]);

  return <>
    <Typography variant='pb' component='div'>Filters: </Typography>

    {!isEmpty(formData.dirtyFields) &&
      <Box textAlign='end'>
        <IconButton
          size='small'
          onClick={() => reset(initialValues)}
        >
          <CancelIcon/>
        </IconButton>
      </Box>
    }

    <Grid
      container
      display='flex'
      alignItems='flex-start'
      justifyContent='flex-end'
      columnSpacing={2}
      rowSpacing={2}
      py={.5}
    >

      {filters?.map((filter, key) => (
          <Grid key={key} item md={2} sm={6} xs={12} minWidth="200px">
            {filter.type === 'searchSelect' && (
              <SearchSelect
                searchSelectData={filter?.data}
                name={filter?.name}
                formData={formData}
                returnLabel={true}
                size='large'
              />
            )}
            {filter.type === 'inputField' && (
              <InputField
                formData={formData}
                name={filter?.name}
                label={filter?.label}
                size='large'
              />
            )}
            {filter.type === 'date' && (
              <DatePicker
                formData={formData}
                name={filter?.name}
                label={filter?.label}
                size='large'
              />
            )}
          </Grid>
        ))}
    </Grid>
  </>;
}

export default KanbanProgressiveFilters;
