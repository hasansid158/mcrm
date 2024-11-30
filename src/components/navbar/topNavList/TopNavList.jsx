import React, { useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  MenuItem,
} from '@mui/material';

import actionBarEnum from 'enum/actionBarEnum';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { transitions } from 'core/animations';

import PopperMenu from '../../../common/navigation/popperMenu/PopperMenu';
import useScreenSize from '../../../hooks/useScreenSize';
import TopNavButton from '../../../common/navigation/topNavButton/TopNavButton';
import { useNavigate, Link } from 'react-router-dom';

import MobileTopNavList from './MobileTopNavList';

const TopNavList = () => {
  const theme = useTheme();
  const { isMobile, isLaptop, isDesktop } = useScreenSize();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoverKey, setHoverKey] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState('auto');

  const [anchorAllEl, setAnchorAllEl] = React.useState(null);
  const [openAllMenu, setOpenAllMenu] = React.useState(false);

  const [selectedMenuItems, setSelectedMenuItems] = useState(null);

  const handleMenuClick = (event, items, currPlacement, key) => {
    setPlacement(currPlacement)
    setAnchorEl(event.currentTarget);
    setOpen(!!items);
    setSelectedMenuItems(items);
    setHoverKey(key);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedMenuItems(null);
    setHoverKey(null);
  };

  const handleAllMenuClick = (event, items) => {
    setAnchorAllEl(event.currentTarget);
    setOpenAllMenu(true);
    setSelectedMenuItems(items);
  };
  const handleAllMenuClose = () => {
    setAnchorAllEl(null);
    setOpenAllMenu(false);
    setSelectedMenuItems(null);
  };

  const navigate = useNavigate();


  return (
    <>
      <Box
        sx={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}
        onMouseLeave={handleMenuClose}
      >
        {!isLaptop && actionBarEnum.map((item, key) => {
          return (
            <Box
              key={key}
              // ref={isList && listEl}
              onMouseEnter={(e) => handleMenuClick(e, item?.list, 'auto', key)}
              onClick={() => {navigate(item?.path)}}
            >
              <TopNavButton hovered={hoverKey === key}>
                <Typography variant={isDesktop ? 'pb' : 'p2'} fontWeight='500'>
                  {item?.label}
                </Typography>
                {!!item?.list?.length &&
                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      width: isDesktop ? '30px' : '18px',
                      rotate: hoverKey === key ? 'x 180deg' : '',
                      transition: transitions().common,
                    }}
                  />
                }
              </TopNavButton>
            </Box>
        )})}
        <PopperMenu
          open={open}
          anchorEl={anchorEl}
          // anchorEl={anchorListEl}
          // onClickAway={() => setListEl(null)}
          isScrollAble
          placement={placement}
          transformOrigin={isLaptop ? 'right center' : null}
          sx={{
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
        >
          {selectedMenuItems?.map((item, key) => (
            <MenuItem
              key={key}
              onMouseEnter={() => isMobile && navigate(item?.path)}
              sx={{
                border: '1px transparent',
                borderStyle: 'solid none',
                '&:hover': {
                  // borderColor: `${theme.palette.primary.main}`,
                  backgroundColor: 'primary.main',
                }
              }}
            >
              <Box
                variant='p2'
                color='primary.light'
                component={Link}
                to={item?.path}
              >
                {item?.label}
              </Box>
            </MenuItem>
          ))}
        </PopperMenu>
      </Box>

      <Box
        sx={{
          width: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {isLaptop &&
        <>
          <TopNavButton
            onClick={(e) => handleAllMenuClick(e)}
            hovered={openAllMenu}
            sx={{ mr: 1 }}
          >
            <Typography
              variant='p2'
              fontWeight='500'
              display='flex'
              alignItems='center'
            >
              All Tabs
              <KeyboardArrowDownRoundedIcon
                sx={{
                  fontSize: '20px',
                  rotate: openAllMenu && 'x 180deg',
                  transition: transitions().short,
                }}
              />
            </Typography>
          </TopNavButton>
          <PopperMenu
            open={openAllMenu}
            anchorEl={anchorAllEl}
            onClickAway={handleAllMenuClose}
            isScrollAble
            sx={{
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              borderRadius: 0,
              zIndex: 10
            }}
            isBox
          >
            <MobileTopNavList
              navItems={actionBarEnum}
              handleClose={handleAllMenuClose}
            />
          </PopperMenu>
        </>}
      </Box>
    </>
  );
}

export default TopNavList;
