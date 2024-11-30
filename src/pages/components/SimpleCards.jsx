import React from 'react';
import { Card, Typography, Box, Grid } from '@mui/material';

import { camelCaseToSpace } from 'utils/textFormatUtils';

import { isEmpty, map } from 'lodash';

const SimpleCards = ({
  data = [],
  nameKey = '',
  onClick = () => {},
  showKeys = [],
}) => {

  return (
    <Grid container columnSpacing={2} rowSpacing={3}>
      {map(data, item => (
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Card
            sx={{
              width: "100%",
              height: '100%',
              p: 2,
              pb: 2.5,
              boxShadow: "none",
              border: theme => `1px solid ${theme.palette.secondary.main}`,
              '&:hover': { cursor: 'pointer' },
              ":hover": {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)'
              }
            }}
            onClick={() => onClick(item)}
          >
            <Typography
              component='div'
              mb={2}
              variant='h6'
              fontWeight='600'
              color='black'
              sx={{
                minWidth: '75px',
                height: '22px',
                ":hover": {
                    background: 'transparent',
                    textDecoration: "underline",
                    cursor: 'pointer'
                }
              }}
            >
              {item?.[nameKey] || ''}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: .5,
              }}
            >
              {!isEmpty(showKeys) && map(showKeys, key => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: {sm: 'column', md: 'row'},
                    alignItems: {sm: 'flex-start', md: 'center'},
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography variant="p3" fontWeight='600' whiteSpace='nowrap'>{camelCaseToSpace(key || '')}:&nbsp;&nbsp;</Typography>
                  <Typography variant="p">{item?.[key] || ''}</Typography>
                </Box>
              ))}
              {isEmpty(showKeys) && map(item || [], (value, key) => (
                <Box>
                  <Typography variant="p3" fontWeight='600'>{camelCaseToSpace(key || '')}:&nbsp;&nbsp;</Typography>
                  <Typography variant="p">{value || ''}</Typography>
                </Box>
              ))}

              {/* <Typography  fontSize="13px" variant="body2" color="GrayText">Country: {item.country || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Suburb: {item.suburb || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">State: {item.state || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Postcode: {item.postcode || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Abn: {item.abn || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Bank Name: {item.bankName || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Account Number: {item.bankAccountNumber || 'Null'}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Payment Terms: {item.paymentTerms}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Last Purchase: {item.lastPurchaseDate}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Last Payment: {item.lastPaymentDate}</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">Preferred Vendor: {item.preferredVendor ? '✔' : '✘' }</Typography>
              <Typography fontSize="13px" variant="body2" color="GrayText">is Active: { item.isActive ? '✔' : '✘' }</Typography> */}

            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SimpleCards;
