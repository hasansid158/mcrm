import React, { useRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Paper,
} from '@mui/material/';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FormFooter from 'common/dataDisplay/dialogBox/FormFooter';

import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';

import SpinLoader from '../spinLoader/SpinLoader';
import useScreenSize from 'hooks/useScreenSize';
import Draggable from 'react-draggable';

const Transition = React.forwardRef(function Transition(props, ref) {
  const { isMobile } = useScreenSize();

  return isMobile
    ? <Slide direction='up' ref={ref} {...props} />
    : <Grow ref={ref} {...props} />;

  // return <Grow ref={ref} {...props} />;
  // return <Slide direction='up' ref={ref} {...props} />;
});

const PaperComponent = (props) => {
  const nodeRef = useRef(null);

  return (
    <Draggable
      handle={`#draggable-dialog-title`}
      cancel={'[class*="MuiDialogContent-root"], .no-drag'}
      nodeRef={nodeRef}
    >
      <Paper ref={nodeRef} {...props} />
    </Draggable>
  );
};

const DialogBox = ({
  open = false,
  handleClose = () => {},
  closeClick = () => {},
  handleFormSubmit = () => {},
  disableFormFooter = false,
  title = '',
  maxWidth = 'md',
  submitText = null,
  submitNewText = null,
  loading = false,
  disableSubmitNew = false,
  children,
  footerItems = null,
  actionDisabled = false,
  disableDrag,
  isGrey,
  disableBackDrop = false,
  py = 0,
  sx,
  ...rest
}) => {
  const { isMobile } = useScreenSize();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth={true}
      slotProps={{
        backdrop: { style: { backgroundColor: disableBackDrop ? 'transparent' : 'rgba(0, 0, 0, 0.25)' } },
      }}
      sx={{
        '.MuiDialogContent-root': { py: py },
        ...sx,
      }}
      {
        ...(!disableDrag ? {
          PaperComponent: PaperComponent,
          'aria-labelledby': `draggable-dialog-title`,
        } : {})
      }

      {...rest}
    >
      <SpinLoader
        loading={loading}
      />

      <Box
        id={!disableDrag ? `draggable-dialog-title` : ''}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        backgroundColor={theme => isGrey ? theme.palette.common.backgroundGrey : 'white'}
        sx={{
          py: 1, px: 3,
          cursor: !disableDrag ? 'move' : 'unset',
        }}
      >
      {/* <DialogTitle
        id="draggable-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          cursor: 'move',
          py: 1, px: 3,
        }}
      > */}
        <Typography
          variant='h5'
          color='common.text'
        >
          {title}
        </Typography>

        <IconButton
          className="no-drag"
          size='small'
          onClick={() => {handleClose(); closeClick();}}
          color='secondary'
        >
          <CloseRoundedIcon sx={{width: '28px', height: '28px'}}/>
        </IconButton>
      {/* </DialogTitle> */}
      </Box>

      <DialogContent sx={{
        backgroundColor: theme => isGrey ? theme.palette.common.backgroundGrey : 'white',
        px: isMobile ? 2 : 3,
      }}>
        {children}
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: theme => isGrey ? theme.palette.common.backgroundGrey : 'white',
          pb: 1.5,
          px: 2,
        }}
      >
        {!disableFormFooter &&
          (footerItems ||
            <FormFooter
              closeFormDialog={handleClose}
              handleSubmitClick={() => handleFormSubmit(false)}
              handleResetClick={() => handleFormSubmit(true)}
              submitText={submitText}
              submitNewText={submitNewText}
              loading={loading}
              disableSubmitNew={disableSubmitNew}
              actionDisabled={actionDisabled}
            />
          )
        }
      </DialogActions>
    </Dialog>
  );
}

export default DialogBox;