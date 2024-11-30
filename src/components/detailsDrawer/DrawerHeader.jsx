import React, { useState } from 'react';

import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';

const DrawerHeader = ({
  primaryName = 'Name',
  subName = 'Sub Name',
  createLabel = '',
  onClose = () => {},
  preFillData = {},
  formKey = '',
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <Box pb={2}>
        <Box
          display='flex'
          alignItems='center'
        >
          <Box
            display='flex'
            flex={1}
            pr={.5}
            alignItems='center'
            columnGap={.5}
          >
            <AccountCircle sx={{fontSize:'60px'}}/>
            <Box
              display='flex'
              alignItems='center'
              flexWrap='wrap'
            >
              <Typography variant='h5'>
                {primaryName}&nbsp;-
              </Typography>
              &nbsp;
              <Typography variant='p' fontWeight='500'>
                {subName}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size='small'
            onClick={onClose}
          >
            <ArrowForwardIcon/>
          </IconButton>
        </Box>

        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          flexWrap='wrap'
          gap={1}
          mt={2}
        >
          <Button variant='contained'>
            <Typography variant='p2' color='white'>Send Email</Typography>
          </Button>
          <Button
            variant='contained'
            onClick={() => setIsCreateOpen(true)}
          >
            <Typography variant='p2' color='white'>Clone</Typography>
          </Button>
          <Button variant='contained' color='secondary'>
            <Typography variant='p2'>Delete</Typography>
          </Button>
        </Box>
      </Box>

      <CreateDialog
        isDialogOpen={isCreateOpen}
        handleClose={() => setIsCreateOpen(false)}
        preFillData={preFillData}
        formKey={formKey}
        title={createLabel}
      />
    </>
  );
}

export default DrawerHeader;
