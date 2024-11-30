import React from 'react';
import {
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import useScreenSize from 'hooks/useScreenSize';

// import { toggelEditClick } from 'redux/slices/commonSlice/commonSlice';

const FormFooter = ({
  handleResetClick = () => {},
  handleSubmitClick = () => {},
  isFooterEdit = false,
  submitNewText,
  submitText,
  loading = false,
  disableSubmitNew = false,
  actionDisabled = false,
}) => {
  const { isMobile } = useScreenSize();
  const buttonWidth = isMobile ? 70 : 140;

  // const { formEditToggle } = useSelector(state => state.common);

  // const handleEditClick = () => {
  //   dispatch(toggelEditClick(!formEditToggle));
  // }

  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='flex-end'
      alignItems='stretch'
      sx={{ columnGap: isMobile ? 1 : 2 }}
    >
      {/* <Box minWidth={buttonWidth}>
        <Button
          fullWidth
          variant='outlined'
          onClick={closeFormDialog}
          sx={{ height: '100%' }}
        >
          Close
        </Button>
      </Box> */}

      {!disableSubmitNew &&
        <Box minWidth={buttonWidth}>
          <LoadingButton
            fullWidth
            // onClick={isFooterEdit ? handleEditClick : handleResetClick}
            onClick={handleResetClick}
            variant='outlined'
            loading={loading}
            disableElevation
            size='small'
            disabled={actionDisabled}
            color='secondary'
            // sx={{py: 0, px: 3}}
          >
            {/* {!isFooterEdit ? 'Submit & New'
              : !formEditToggle ? 'Cancel' : 'Edit'
            } */}
            {submitNewText || 'Submit & New'}
          </LoadingButton>
        </Box>
      }

      {/* {(!isFooterEdit || !formEditToggle) && */}
        <Box minWidth={buttonWidth}>
          <LoadingButton
            fullWidth
            onClick={handleSubmitClick}
            disableElevation
            variant='contained'
            loading={loading}
            size='small'
            disabled={actionDisabled}
            // sx={{py: 0, px: 3}}
          >
            {submitText || 'Submit'}
          </LoadingButton>
        </Box>
      {/* } */}
    </Box>
  );
}

export default FormFooter;
