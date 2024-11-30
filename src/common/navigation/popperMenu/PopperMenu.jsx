import React from 'react';

import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  Box,
} from '@mui/material';
import useScreenSize from '../../../hooks/useScreenSize';

const PopperMenu = ({
  children,
  open = false,
  anchorEl,
  onClickAway = () => {},
  isScrollAble = false,
  transformOrigin = null,
  isBox,
  sx,
  paperProps,
  popperSx = {},
  ...rest
}) => {
  const { isMobile } = useScreenSize();

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
      // disablePortal
      sx={{
        zIndex: 99999999,
        pt: '2px',
        ...popperSx,
      }}
      {...rest}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: transformOrigin || 'top center'}}
        >
          <Paper
            elevation={2}
            sx={{
              outline: `1px solid ${isBox ? '#E1E2E3' : '#A9ABB133'}`,
              mt: '4px',
              minWidth: '140px',

              '& .MuiList-root': {
                height: 'fit-content',
                maxHeight: (isMobile && isScrollAble) && 'calc(100dvh - 100px)',
                overflowY: 'auto',
              },
              ...(isBox ? {} :
                {'& .MuiButtonBase-root': {
                  p: 0,
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: "14px",
                  fontWeight: 500,
                  color: 'secondary.main',
                  borderTop: `1px solid ${isBox ? '#E1E2E3' : '#A9ABB133'}`,
                  '&:first-of-type': {
                    borderTop: 'unset',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  },
                  '&:last-of-type': {
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  '& .MuiBox-root': {
                    height: '48px',
                    width: '100%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '18px',
                  mr: '6px',
                },}
              ),

              ...sx,
            }}
            {...paperProps}
          >
            <ClickAwayListener onClickAway={onClickAway}>
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default PopperMenu;
