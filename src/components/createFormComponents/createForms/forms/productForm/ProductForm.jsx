import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InputField from 'common/input/InputField';

import { numberOnly } from 'utils/textFormatUtils';
import useScreenSize from 'hooks/useScreenSize';

import DatePicker from 'common/input/DatePicker';
import { addYears } from 'date-fns';

import { useSelector } from 'react-redux';

import RichNoteField from 'common/input/RichNoteField';

import CustomerProjectSelectors from 'components/createFormComponents/dynamicSelectorFields/CustomerProjectSelectors';

const ProductForm = ({
  formData,
  isEdit = false,
  reset = () => {},
  handleEditApply = () => {},
}) => {
  const { isMobile } = useScreenSize();

  const { products } = useSelector(state => state.actions)

  const commonInputProps = {
    formData: formData,
    isEditable: isEdit,
    onEditApply: handleEditApply,
  };


  return (
    <>
      <Box sx={{
        backgroundColor: theme => theme.palette.common.backgroundGrey,
        px: 2,
        py: 1,
      }}>
        <Typography>Product Information</Typography>
      </Box>

      {/* <DataTable
        density='compact'
        height={400}
        rowData={products?.length ? products : []}
        columns={tableHeader}
        fullBorder
        onRowClick={data => reset(data?.row)}
      /> */}

      <Grid
        px={!isMobile && 4}
        py={2}
        container
        rowSpacing={2}
        columnSpacing={4}
      >

        <Grid sm={4} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='productcode'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='productName'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='productowner'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            required
            {...commonInputProps}
            name='productCategory'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productManufacturer'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='vendorName'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='productSaleStartDate'
            maxDate={addYears(new Date(), -10)}
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='productSaleEndDate'
            maxDate={addYears(new Date(), 10)}
          />
        </Grid>
        {/* <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='productSupportStartDate'
            maxDate={addYears(new Date(), -10)}
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <DatePicker
            {...commonInputProps}
            name='productSupportEndDate'
            maxDate={addYears(new Date(), 10)}
          />
        </Grid> */}

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            required
            name='productUnitPrice'
            format={numberOnly}
            startAdornment="$"
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productCommissionRate'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='SKU' label='Product SKU'
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productTax'
            format={numberOnly}
          />
        </Grid>

        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productQuantity'
            format={numberOnly}
          />
        </Grid>

        {/* <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productCommissionRate' label='Project'
            format={numberOnly}
          />
        </Grid>
        <Grid sm={4} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productCommissionRate' label='Account'
            format={numberOnly}
          />
        </Grid> */}

        <CustomerProjectSelectors
          formData={formData}
          sm={4}
          md={4}
          xs={12}
        />

        <Grid sm={12} xs={12} item>
          <RichNoteField
            formData={formData}
            name='productDescription'
            label='Description'
            placeholder='Description...'
          />
        </Grid>

        {/* <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productQuantityOrdered'
            format={numberOnly}
          />
        </Grid> */}

        {/* <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productQuantityInStock'
            format={numberOnly}
          />
        </Grid> */}

        {/* <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productQuantityRecorderLevel'
            format={numberOnly}
          />
        </Grid> */}

        {/* <Grid sm={6} xs={12} item>
          <InputField
            {...commonInputProps}
            name='productQuantityInDemand'
            format={numberOnly}
          />
        </Grid> */}
{/*
        <Grid sm={4} xs={12} item>
          <SwitchToggle
            {...commonInputProps}
            name='isProductActive'
            label={<Typography>Is product active?</Typography>}
          />
        </Grid> */}
      </Grid>
    </>
  );
}

export default ProductForm;
