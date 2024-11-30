import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import useScreenSize from '../../hooks/useScreenSize';
import master_crm_logo from '../assets/master-crm-logo.png'
import drawerListEnum from '../../enum/drawerListEnum';
import { transitions } from '../../core/animations';

import theme from '../../core/theme';

import { last, includes } from 'lodash';


const Drawer = styled(MuiDrawer)(
  ({ open, closedwidth, drawerwidth }) => ({
    width: drawerwidth,
    whiteSpace: 'nowrap',
    position: 'absolute',
    '& .MuiDrawer-paper': {
      width: open ? drawerwidth : closedwidth,
      transition: transitions().common,
      overflowX: 'hidden',
      top: theme.spacing(6),
      height: '100dvh',
      zIndex: 100,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,

    },
  }),
);

export default function SideDrawer() {
  const theme = useTheme();
  const { isDesktop, isMobile } = useScreenSize();

  const { sideDrawerOpen } = useSelector(state => state.common);

  const drawerWidth = isDesktop ? 308 : 248;
  const drawerWidthClosed = isMobile ? 0 : 64;


  const url = window.location.pathname;
  const currentPage = url.split('/')[2] || '';

  return (
    <>
      <Drawer
        variant="permanent"
        open={sideDrawerOpen}
        closedwidth={drawerWidthClosed}
        drawerwidth={drawerWidth}
        // onMouseEnter={() => (!alwaysOpen && !isMobile) && setOpen(true)}
        // onMouseLeave={() => (!alwaysOpen && !isMobile) && setOpen(false)}
      >
        {/* <DrawerHeader>
          <Box
            component='img'
            src={master_crm_logo}
            width={isMobile ? '40px' : '50px'}
            ml={1}
          />
          <Typography
            variant='h6'
            fontWeight='bold'
            color='primary'
            sx={{
              ml: .6,
              width: 0,
              opacity: !open ? 0 : 1,
              transition: transitions().common,
            }}
          >
            MASTER CRM
          </Typography>
        </DrawerHeader>
        <Divider sx={{
            background: theme.palette.primary.main,
            opacity: .4,
            height: '2px',
          }}
        /> */}

        <List
          sx={{
            overflow: 'overlay',
            overflowX: 'hidden',
          }}
          dense
        >
          {drawerListEnum.map((item, key) => (
            <ListItem
              key={key}
              disableGutters={!sideDrawerOpen}
              sx={{
                display: 'block',
                px: sideDrawerOpen ? isDesktop ? 1 : 2 : 0,
              }}
            >
              <Link to={item?.path}>
                <ListItemButton
                  sx={{
                    minHeight: 56,
                    borderRadius: 1,
                    //logic here to find page url
                    backgroundColor: includes(item?.matchPaths, currentPage) ? 'primary.main' : '',
                    '&:hover': {
                      outline: !includes(item?.matchPaths, currentPage) && `2px solid ${theme.palette.primary.main}`,
                      backgroundColor: includes(item?.matchPaths, currentPage) ? 'primary.main' : '',
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      '& .MuiSvgIcon-root': {
                        scale: isDesktop ? '1.1' : '1',
                      },
                      ml: sideDrawerOpen ? 0 : .5,
                      color: theme.palette.secondary.light,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography
                      variant={isDesktop ? 'h6' : 'pO'}
                      color='white'
                    >
                      {item?.text}
                    </Typography>}
                    sx={{
                      ml: sideDrawerOpen ? 2 : 0,
                      opacity: sideDrawerOpen ? 1 : 0,
                      transition: transitions().common,
                    }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{
        width: (!sideDrawerOpen || isMobile) ? drawerWidthClosed : drawerWidth,
        transition: transitions().common,
        position: 'relative',
      }}>
        {/* <Box sx={{
          position: 'fixed',
          top: isMobile ? 203 : 218,
          left: open ?  drawerWidth - (toggleButtonSize / 2)
                      : drawerWidthClosed - (toggleButtonSize / 2),
          zIndex: 150,
          opacity: open && !alwaysOpen ? 0 : 1,
          visibility: open && !alwaysOpen ? 'hidden' : 'visible',
          transition: transitions().common,
        }}>
          <IconButton
            onClick={handleClickOpen}
            sx={{
              width: toggleButtonSize,
              height: toggleButtonSize,
              border: `2px ${theme.palette.primary.main} solid`,
              background: 'white',
              '&:hover': {
                background: theme.palette.secondary.light,
                '& .MuiSvgIcon-root': {
                  color: theme.palette.secondary.main,
                }
              }
            }}
          >
            <ChevronRightIcon
              sx={{
                rotate: open ? 'y 180deg' : '',
                transition: transitions().short,
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
        </Box> */}
      </Box>
    </>
  );
}