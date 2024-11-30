import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import SearchSelect from 'common/input/SearchSelect';

import { useSelector } from 'react-redux';

const CustomerProjectSelectors = ({
  formData = {},
  customerName = 'customerId',
  customerLabel = 'Customer',
  projectName = 'projectId',
  projectLabel = 'Project',
  sm = 4,
  md = 3,
  xs = 6,
  noGrid = false,
  onCustomerChange = () => {},
  onProjectChange = () => {},
  noCustomer = false,
  noProject = false,
  loading = false,
  returnLabel = false,
}) => {
  const { userProjects = [], userCustomers = [] } = useSelector(state => state?.userDetails);

  useEffect(() => {
    if (userCustomers?.length <= 1 && !noCustomer && !formData?.getValues(customerName)) {
      formData?.setValue(customerName, userCustomers?.[0]?.id || null);
    }
    if (userProjects?.length <= 1 && !noProject && !formData?.getValues(projectName)) {
      formData?.setValue(projectName, userProjects?.[0]?.id || null);
    }
  }, [userProjects, userCustomers, formData]);

  const renderSelect = (name, label, data, onChange = () => {}) => (
    <SearchSelect
      formData={formData}
      name={name}
      searchSelectData={data}
      required
      label={label}
      onChange={onChange}
      loading={loading}
      returnLabel={returnLabel}
    />
  );

  return (
    <>
      {(!noCustomer && userCustomers?.length > 1) &&
        (noGrid ? (
          renderSelect(customerName, customerLabel, userCustomers)
        ) : (
          <Grid item sm={sm} md={md} xs={xs}>
            {renderSelect(customerName, customerLabel, userCustomers, onCustomerChange)}
          </Grid>
        ))
      }
      {(!noProject && userProjects?.length > 1) &&
        (noGrid ? (
          renderSelect(projectName, projectLabel, userProjects)
        ) : (
          <Grid item sm={sm} md={md} xs={xs}>
            {renderSelect(projectName, projectLabel, userProjects, onProjectChange)}
          </Grid>
        ))
      }
    </>
  );
};


export default CustomerProjectSelectors;
