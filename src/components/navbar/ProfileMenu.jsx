import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import {
  Box,
  Drawer,
  Typography,
  IconButton,
  MenuItem,
  Button,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';

import PopperMenu from 'common/navigation/popperMenu/PopperMenu';
import { otherRoutes } from 'enum/routesEnum';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import AvatarName from 'common/dataDisplay/AvatarName';
import { blobToImgSrc } from 'utils/fileHelperFunctions';

import { crmRoutes } from 'enum/routesEnum';
import { logout } from 'redux/slices/authSlice';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userFirstName = '',
    userLastName = '',
    emailAddress = '',
    userImage = '',
  } = useSelector(state => state.userDetails);


  const handleLogOut = () => {
    dispatch(logout());
    navigate(otherRoutes.LOGIN);
  }

  const listItems = [
    {
      text: 'My Profile',
      icon: <PersonOutlineOutlinedIcon />,
      link: crmRoutes.USER_PROFILE_PATH
    },
    // {
    //   text: 'Settings',
    //   icon: <SettingsOutlinedIcon />,
    //   link: '',
    // },
    // {
    //   text: 'Pricing',
    //   icon: <MonetizationOnOutlinedIcon />,
    //   link: '',
    // },
    // {
    //   text: 'FAQ',
    //   icon: <HelpOutlineOutlinedIcon />,
    //   link: '',
    // }
  ]

  return <>
    <PopperMenu
      open={!!anchorEl}
      onClickAway={() => setAnchorEl(null)}
      anchorEl={anchorEl}
      transformOrigin='top right'
      sx={{
        background: theme => theme.palette.secondary.main,
        color: theme => theme.palette.secondary.contrastText,
        maxWidth: '300px',
        minWidth: '240px',
      }}
      isBox
    >
      <Box
        py={1.5}
        px={1.5}
        display='flex'
        columnGap={1}
        overflow='hidden'
        alignItems='flex-start'
      >
        <IconButton
          sx={{p: 0, width: '36px', height: '36px'}}
          onClick={() => {
            navigate(crmRoutes.USER_PROFILE_PATH || '');
            setAnchorEl(null);
          }}
        >
          <AvatarName
            name={userFirstName ? `${userFirstName || ''} ${userLastName || ''}` : ''}
            src={blobToImgSrc(userImage || '')}
            sx={{
              width: '36px',
              height: '36px',
              fontSize: '18px'
            }}
          />
          {/* <AccountCircle sx={{
            fontSize: '45px',
            fill: 'white',
          }}/> */}
        </IconButton>
        <Box
          lineHeight='18px'
          mt='4px'
          onClick={() => {
            navigate(crmRoutes.USER_PROFILE_PATH || '');
            setAnchorEl(null);
          }}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <Typography
            variant='p2'
            fontWeight='bold'
            component='div'
            sx={{
              maxWidth: '200px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',

            }}
          >
            {userFirstName} {userLastName}
          </Typography>
          <Typography
            variant='description'
            component='div'
            sx={{
              maxWidth: '200px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: 'secondary.contrastText',
            }}
          >
            {emailAddress}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{
        bgcolor: 'common.borderGrey',
        opacity: .4,
        height: '2px',
      }}/>

      <Box py={1}>
        {listItems.map((item, idx) => (
          <MenuItem
            onClick={() => {
              navigate(item?.link || '');
              setAnchorEl(null);
            }}
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 1,
              color: 'secondary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.main'
              }
            }}
          >
            {item.icon}
            <Typography variant='p2'>
              {item.text}
            </Typography>
          </MenuItem>
        ))}
      </Box>

      <Box px={2} pb={1.5}>
        <Button
          variant='contained'
          fullWidth
          color='error'
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </Box>
    </PopperMenu>

    <Box>
      <IconButton
        onClick={(e) => setAnchorEl(e.target)}
        sx={{
          color: 'secondary.main',
          py: '3px',
          width: '34px',
          height: '34px',
        }}
      >
        {/*Profile image comes here*/}
        {/* <AccountCircle sx={{
          height: '34px',
          width: '34px',
        }} /> */}
        <AvatarName
          name={userFirstName ? `${userFirstName || ''} ${userLastName || ''}` : ''}
          src={blobToImgSrc(userImage || '')}
          sx={{width: '34px', height: '34px'}}
        />
      </IconButton>
    </Box>
  </>;
}

export default ProfileMenu;
