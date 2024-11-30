import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import actionBarEnum from 'enum/actionBarEnum';

import CreateDialog from 'components/createFormComponents/createForms/CreateDialog';

import PopperMenu from 'common/navigation/popperMenu/PopperMenu';
import useScreenSize from 'hooks/useScreenSize';
import TopNavButton from 'common/navigation/topNavButton/TopNavButton';

import { transitions } from 'core/animations';

const AddFormsButton = () => {
  const theme = useTheme();
  const { isMobile } = useScreenSize();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedFormKey, setClickedFormKey] = useState(null);
  const [clickedFormLabel, setClickedFormLabel] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const menuEl = useRef(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (el) => {
    setAnchorEl(el);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action, label) => {
    setClickedFormKey(action);
    setClickedFormLabel(label);
    setIsDialogOpen(true);
    handleMenuClose();
  };

  return (
    <Box ref={menuEl}>
      <IconButton
        onClick={() => handleMenuOpen(menuEl.current)}
        sx={{
          width: '28px',
          height: '28px',
          border: '2px solid #30344E33',
        }}
      >
        <AddIcon
          sx={{
            scale: '.8',
            transition: transitions().common,
            rotate: isMenuOpen ? '135deg' : '0deg',
            color: 'common.text'
          }}
        />
      </IconButton>

      <PopperMenu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClickAway={handleMenuClose}
        isScrollAble
        sx={{
          background: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        {actionBarEnum?.map((item, key) => (
          item?.action !== 'home' &&
            !item?.list ?
              <MenuItem
                key={key}
                onClick={() => handleItemClick(item?.action, item?.label)}
              >
                <Box sx={{height: '22px !important'}}>
                  <Typography color='primary.light' variant='description'>
                    + {item.label}
                  </Typography>
                </Box>
              </MenuItem>
            :
              item?.list?.map((listItem, key) => (
                <MenuItem
                  key={key}
                  onClick={() => handleItemClick(listItem?.action, listItem?.label)}
                  sx={{
                    border: '1px transparent',
                    borderStyle: 'solid none',
                    '&:hover': {
                      borderColor: `${theme.palette.primary.main}`,
                      backgroundColor: `${theme.palette.common.heavyGold}`,
                    }
                  }}
                >
                  <Box sx={{height: '22px !important'}}>
                    <Typography color='primary.light' variant='description'>
                      + {listItem.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
        ))}
      </PopperMenu>

      <CreateDialog
        isDialogOpen={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        formKey={clickedFormKey}
        title={`Create ${clickedFormLabel}`}
      />
      {/* {actionFormEnum?.[clickedFormKey]} */}
    </Box>
  );
}

export default AddFormsButton;
