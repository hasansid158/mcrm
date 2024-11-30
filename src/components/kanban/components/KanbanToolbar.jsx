import React, { useState } from 'react';

import PaperBox from 'common/ui/PaperBox';
import { Typography, ButtonGroup, Button, IconButton, Box } from '@mui/material';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import useScreenSize from 'hooks/useScreenSize';

const KanbanToolbar = ({
  openCreateDialog = () => {},
  label,
  filterComponent,
  toolbarItems = [],
}) => {
  const [isTable, setIsTable] = useState(false);

  const {isMobile, isTablet} = useScreenSize();

  return <>
    <Box
      display='flex'
      columnGap={1}
      rowGap={1}
      flexWrap='wrap'
      flexDirection={isTablet ? 'column' : 'row'}
    >
      <PaperBox
        sx={{
          border: 'unset',
          minHeight: 'unset',
          // mb: 1,
          display: 'flex',
          alignItems: 'center',
          columnGap: 1.5,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5">{label}s</Typography>

        <ButtonGroup disableElevation size='small'>
          <Button
            variant={isTable ? 'outlined' : 'contained'}
            color='secondary'
            onClick={() => setIsTable(false)}
          >
            <ViewKanbanIcon/>
          </Button>
          <Button
            variant={isTable ? 'contained' : 'outlined'}
            color='secondary'
            onClick={() => setIsTable(true)}
          >
            <ViewListIcon/>
          </Button>
        </ButtonGroup>

          <IconButton
            variant='outlined'
            color='secondary'
            size='small'
            onClick={() => openCreateDialog(true)}
          >
            <AddCircleIcon/>
          </IconButton>
      </PaperBox>

      <PaperBox
        sx={{
          flex: 1,
          border: 'unset',
          minHeight: 'unset',
          // mb: 1,
          display: 'flex',
          alignItems: 'center',
          columnGap: 1.5,
          backgroundColor: 'white',
        }}
      >
        {filterComponent}
        {toolbarItems}
      </PaperBox>
    </Box>
  </>;
}

export default KanbanToolbar;
