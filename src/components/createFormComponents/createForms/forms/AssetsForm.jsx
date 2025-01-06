import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import InputField from 'common/input/InputField';
import SearchSelect from 'common/input/SearchSelect';

import { numberOnly } from 'utils/textFormatUtils';

import { getModels, getLoadsList } from 'api/listApis';
import { isEmpty, find, isString } from 'lodash';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const AssetsForm = ({
  formData,
  isUpdate = false,
  returnLabel = false,
  handleEditApply = () => {},
  gridContainerProps = {},
  onChange = () => {},
  disableStar,
  placeholder,
  removeFields = [],
  gridItemSize = {
    md: 3,
    sm: 4,
    xs: 6,
  },
  defaultValues = {},
}) => {
  const [modelList, setModelList] = useState(null);
  const [loadList, setLoadList] = useState(null);

  const { userProjects = [] } = useSelector((state) => state?.userDetails);
  const { makes, itemTypes, warehouses, assetStatus } = useSelector(
    (state) => state.lists,
  );

  const commonInputProps = {
    formData: formData,
    onEditApply: handleEditApply,
    onChange: onChange,
    disableStar: disableStar,
    placeholder: placeholder,
  };

  const handleValueChange = async (name, value) => {
    if (value === null || value === undefined || value === '') {
      name === 'make' ? setModelList(null) : setLoadList(null);
      return;
    }

    onChange(name, value);

    let updatedValue = value;

    if (name === 'make') {
      updatedValue = returnLabel
        ? makes?.find((item) => item?.value === value)?.id
        : value;
      const data = await getModels([updatedValue]);
      setModelList(data);
    } else if (name === 'projectId') {
      updatedValue = returnLabel
        ? userProjects?.find((item) => item?.value === value)?.id
        : value;
      getLoadsList([updatedValue])
        ?.then((res) => setLoadList(res))
        ?.catch(() => setLoadList([]));
      // const data = await getLoadsList([updatedValue]);
    }
  };

  const { make, projectId } = formData.watch();

  useEffect(() => {
    const makeId = isString(make) ? find(makes, { value: make })?.id : make;
    !!make && handleValueChange('make', makeId);
  }, [make]);

  useEffect(() => {
    !!make && handleValueChange('projectId', projectId);
  }, [projectId]);

  useEffect(() => {
    !isEmpty(defaultValues) && formData?.reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <Grid
        pt={2}
        pb={isUpdate ? 0 : 2}
        container
        rowSpacing={2}
        columnSpacing={2}
        {...gridContainerProps}
      >
        {!removeFields?.includes('ssn') && !isUpdate && (
          <Grid {...gridItemSize} item>
            <InputField required {...commonInputProps} name="ssn" label="SSN" />
          </Grid>
        )}

        <Grid {...gridItemSize} item>
          <SearchSelect
            // required
            name="make"
            searchSelectData={makes}
            {...commonInputProps}
            onChange={handleValueChange}
            returnLabel={returnLabel}
          />
        </Grid>

        <Grid {...gridItemSize} item>
          <SearchSelect
            // required
            name="model"
            searchSelectData={modelList}
            disabled={!modelList?.length}
            {...commonInputProps}
            returnLabel={returnLabel}
          />
        </Grid>

        {isUpdate && (
          <Grid {...gridItemSize} item>
            <SearchSelect
              // required
              name="product"
              searchSelectData={makes}
              {...commonInputProps}
              returnLabel={returnLabel}
            />
          </Grid>
        )}

        <Grid {...gridItemSize} item>
          <InputField
            // required
            {...commonInputProps}
            name="serialNo"
          />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <InputField
            {...commonInputProps}
            name='barcode'
          />
        </Grid> */}

        <Grid {...gridItemSize} item>
          <InputField {...commonInputProps} name="clientRef" />
        </Grid>

        {/* <Grid {...gridItemSize} item>
          <InputField
            {...commonInputProps}
            name='clientPO'
          />
        </Grid> */}

        <Grid {...gridItemSize} item>
          <InputField {...commonInputProps} name="clientAssetTag" />
        </Grid>

        {isUpdate && (
          <Grid {...gridItemSize} item>
            <InputField
              format={numberOnly}
              {...commonInputProps}
              name="buyPrice"
              startAdornment="$"
            />
          </Grid>
        )}

        {/* <Grid {...gridItemSize} item>
          <InputField
            format={numberOnly}
            {...commonInputProps}
            name='sellPrice'
            startAdornment='$'
            required
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SearchSelect
            name='grade'
            searchSelectData={[
              {id: 'A', value: 'A'},
              {id: 'B', value: 'B'},
              {id: 'C', value: 'C'},
            ]}
            {...commonInputProps}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='subGrade'
            selectorData={[
              {value: 'a', label: 'A'},
              {value: 'b', label: 'B'},
              {value: 'c', label: 'C'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <DatePicker
            {...commonInputProps}
            name='dateReceived'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <InputField
            format={numberOnly}
            {...commonInputProps}
            name='reservationCode'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <DatePicker
            {...commonInputProps}
            name='reservationDate'
            required
          />
        </Grid> */}

        {/* <Grid sm={8} xs={12} item>
          <InputField
            {...commonInputProps}
            name='reservationComment'
          />
        </Grid> */}
        {/*
        <Grid
          {...gridItemSize}
          item
          display='flex'
          justifyContent='center'
        >
          <SwitchToggle
            {...commonInputProps}
            name='recycle'
            label={<Typography variant='p'>Recycle</Typography>}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <DatePicker
            {...commonInputProps}
            name='releaseDate'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='completeness'
            selectorData={[
              {value: 'all', label: 'All'},
              {value: 'half', label: 'Half'},
              {value: 'few', label: 'Few'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='appearance'
            selectorData={[
              {value: 'all', label: 'All'},
              {value: 'half', label: 'Half'},
              {value: 'few', label: 'Few'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='services'
            selectorData={[
              {value: 'all', label: 'All'},
              {value: 'half', label: 'Half'},
              {value: 'few', label: 'Few'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='operability'
            selectorData={[
              {value: 'all', label: 'All'},
              {value: 'half', label: 'Half'},
              {value: 'few', label: 'Few'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <InputField
            format={numberOnly}
            {...commonInputProps}
            name='qtyOnHand'
            required
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SwitchToggle
            {...commonInputProps}
            name='isSerialised'
            label={<Typography>Is Serialised</Typography>}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <DatePicker
            {...commonInputProps}
            name='physicalInspectionDate'
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='physicalInspectionUser'
            selectorData={[
              {value: 'test 1', label: 'test 1'},
              {value: 'test 2', label: 'test 2'},
              {value: 'test 3', label: 'test 3'},
            ]}
          />
        </Grid> */}

        {isUpdate && (
          <Grid {...gridItemSize} item>
            <SearchSelect
              // required
              name="assetStatus"
              label="Status"
              searchSelectData={assetStatus}
              {...commonInputProps}
              returnLabel={returnLabel}
            />
          </Grid>
        )}

        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name="itemType"
            label="Type"
            searchSelectData={itemTypes}
            {...commonInputProps}
            returnLabel={returnLabel}
          />
        </Grid>

        {!removeFields?.includes('warehouse') && (
          <Grid {...gridItemSize} item>
            <SearchSelect
              required
              name="warehouse"
              searchSelectData={warehouses}
              {...commonInputProps}
              returnLabel={returnLabel}
            />
          </Grid>
        )}
        {/*
        <Grid {...gridItemSize} item>
          <SearchSelect
            required
            name={'location'}
            searchSelectData={locations}
            {...commonInputProps}
          />
        </Grid> */}

        {/* <Grid sm={12} xs={12} item>
          <InputField
            {...commonInputProps}
            name='assetComment'
          />
        </Grid> */}

        {!removeFields?.includes('palletNo') && (
          <Grid {...gridItemSize} item>
            <InputField {...commonInputProps} name="palletNo" />
          </Grid>
        )}

        <CustomerProjectSelectors
          formData={formData}
          noCustomer={removeFields?.includes('customerId')}
          noProject={removeFields?.includes('projectID')}
          {...gridItemSize}
          onCustomerChange={handleValueChange}
          onProjectChange={handleValueChange}
          returnLabel={returnLabel}
        />

        {!removeFields?.includes('load') && (
          <Grid {...gridItemSize} item>
            <SearchSelect
              required
              name="load"
              searchSelectData={loadList}
              disabled={!loadList?.length}
              {...commonInputProps}
              returnLabel={returnLabel}
            />
          </Grid>
        )}

        {/* <Grid {...gridItemSize} item>
          <Selector
            {...commonInputProps}
            name='r2Grade'
            selectorData={[
              {value: 'best', label: 'Best'},
              {value: 'best', label: 'Best'},
              {value: 'best', label: 'Best'},
            ]}
          />
        </Grid> */}

        {/* <Grid {...gridItemSize} item>
          <SwitchToggle
            {...commonInputProps}
            name='modified'
            label={<Typography>is Modified</Typography>}
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default AssetsForm;
