import React from 'react';

import { Box, Typography } from '@mui/material';

import { statusEnum } from '../../../enum/kanbanEnum';

import { capitalize } from 'lodash';
import { ReactComponent as BannerArrow } from 'components/assets/bannerArrow.svg';

const KanbanColumn = ({
  columnData = {},
  statusKey = '',
  listKey = '',
  children,
  isProgressive,
  sx,
  columnMinWidth,
}) => {

  const { [statusKey]: status, [listKey]: items } = columnData;

  return (
    <Box
      sx={{
        minHeight: '135px',
        // maxWidth: '300px',
        width: '100%',
        minWidth: columnMinWidth || '140px',
        borderRadius: 1,
        // backgroundColor: statusEnum?.[status]?.color || 'white',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: '0',
          zIndex: 1,
          backgroundColor: theme => theme.palette.common.backgroundGrey,
          borderBottom: theme => `6px solid ${theme.palette.common.backgroundGrey}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            columnGap: .5,
            pt: isProgressive ? 2 : '6px',
            pb: isProgressive ? 2 : '8px',
            px: 2.5,
            border:  !isProgressive ? '1px solid #e0e0e0' : 'unset',
            borderRadius: isProgressive ? '' : '8px 8px 0px 0px',
            borderTop: !isProgressive ? `6px solid ${statusEnum?.[status]?.color || 'white'}` : '',
            backgroundColor: theme => isProgressive ? theme.palette.common.backgroundGrey : 'white',
            maxHeight: isProgressive ? '60px' : 'none',
            minHeight: '50px',
            // boxShadow: '0px 9px 12px -12px grey',
            // height:'50px'
          }}
        >
          {isProgressive &&
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                '& svg': {
                  fill: statusEnum?.[status]?.color || 'white',
                  stroke: statusEnum?.[status]?.color || 'white',
                  width: '100%',
                  height: '100%',
                }
              }}
            >
              <BannerArrow />
            </Box>
          }

          <Typography
            sx={{
              typography: {
                xs: 'p2O',
                md: isProgressive ? 'p2O' : 'pO',
              },
              fontWeight: '500 !important',
            }}
            position='relative'
          >
            {statusEnum?.[status]?.label || status?.toUpperCase()}
          </Typography>

          {!!items?.length &&
            <Typography variant='description' fontWeight='500' sx={{zIndex: 1}}>
              ({items?.length})
            </Typography>
          }
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 40px)',
          // pb: 1,
          // borderTop: theme => `5px solid ${theme.palette.common.backgroundGrey}`,

          '& > div': {
            height: '100%',
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default KanbanColumn;
