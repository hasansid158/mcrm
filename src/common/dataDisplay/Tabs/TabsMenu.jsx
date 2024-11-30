import React from 'react';
import { camelCaseToSpace } from 'utils/textFormatUtils';

import {
  Tabs,
  Tab,
  Typography,
  Button,
} from '@mui/material';
import { isString } from 'lodash';

const TabsMenu = ({
  setTabValue = () => {},
  tabHeaders = [],
  tabValue,
  isSmall = false,
  backgroundColor = 'primary.main',
  rest,
  ...sx
}) => {

  return (
    <Tabs
      textColor="primary"
      indicatorColor="primary"
      variant='scrollable'
      scrollButtons="auto"
      allowScrollButtonsMobile
      value={tabValue}
      onChange={(e, val) => setTabValue(val)}
      TabIndicatorProps={{ sx: { display: 'none' } }}
      sx={{
        minHeight: isSmall ? '32px' : '48px',
        '& .MuiTabs-flexContainer': {
          columnGap: isSmall ? '8px ' : '12px',
        },

        '& .MuiTab-root': {
          border: '1px solid #A9ABB1',
          backgroundColor: 'white',
          borderRadius: '10px',
          px: isSmall ? 2 : 3,

          '&.Mui-selected': {
            backgroundColor: backgroundColor,
            color: 'white',
            border: 'unset',
          },

          '& .MuiTypography-root': { fontWeight: '500' }
        },
        '& .MuiButtonBase-root': {
          minHeight: isSmall ? '32px' : '48px',
          py: isSmall ? .5 : 1,
          px: isSmall ? 1 : 2,
          maxHeight: '50px',
          '& svg': {
            fontSize: isSmall ? '20px' : '24px',
          }
        },
        ...sx,
      }}
      {...rest}
    >
      {tabHeaders?.map((item, idx) => (
        <Tab
          key={idx}
          value={idx}
          label={
            <Typography
              variant={isSmall ? 'p3' : 'p2'}
              fontWeight='bold'
              component='div'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 1,
              }}
            >
              {isString(item) ? camelCaseToSpace(item)?.toUpperCase() : item}
            </Typography>
          }
        />
      ))}
    </Tabs>
  );
}

export default TabsMenu;
