import React, { useEffect , useState} from 'react';
import {
  Container,
  useTheme,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import TopNavList from './topNavList/TopNavList';
import AddFormsButton from './AddFormsButton';
import { base64ToImgSrc } from 'utils/fileHelperFunctions';
import InputField from 'common/input/InputField';
import DividerLine from 'common/ui/DividerLine';
import ProfileMenu from 'components/navbar/ProfileMenu';

import useScreenSize from 'hooks/useScreenSize';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideDrawer } from 'redux/slices/commonSlice/commonSlice';
import SearchDialog from 'pages/components/SearchDialog';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLaptop, isDesktop, isMobile } = useScreenSize();
  const [searchOpen, setSearchOpen] = useState(false);
  const { sideDrawerOpen } = useSelector(state => state.common);
  const userDetail = useSelector(state => state.userDetails?.userAccount);


  useEffect(() => {
    if (!isMobile) return;

    dispatch(toggleSideDrawer(false));
    localStorage.setItem('sideDrawerOpen', false);

  }, [isMobile]);

  useEffect(() => {
    const storageDrawerState = localStorage.getItem('sideDrawerOpen');
    if (storageDrawerState === null) return;

    dispatch(toggleSideDrawer(JSON.parse(storageDrawerState || '')));
  }, []);

  const handleDrawerToggle = () => {
    dispatch(toggleSideDrawer());
    localStorage.setItem('sideDrawerOpen', !sideDrawerOpen);
  }
  return <>
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        pr: 3,
        pl: 2,
        background: 'white',
        zIndex: 999,
      }}
    >
      <Box>
        <Box
          sx={{
            width: isLaptop ? 'auto' : isDesktop ? '284px' : '228px',
            display: 'flex',
            alignItems: 'center',
            columnGap: isMobile ? 1 : 3,
          }}
        >
        <IconButton
          size='small'
          onClick={handleDrawerToggle}
        >
          <MenuIcon sx={{color: 'common.text', scale: '1.2'}}/>
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
            {userDetail?.logo && (
              <Box
                component="img"
                src={base64ToImgSrc(userDetail.logo)}
                alt="Account Logo"
                sx={{
                  width: 28,
                  height: 28,
                }}
              />
            )}
            <Typography
              variant={isDesktop ? 'h5' : 'pb'}
              fontFamily='"Lora", sans-serif'
              sx={{
                maxWidth: isDesktop ? '190px' : '140px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {!isMobile ? userDetail?.accountName || 'MasterCRM' : !userDetail?.logo ? 'MCRM' : ''}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TopNavList />

      <AddFormsButton />

      <Box ml={isLaptop ? 1 : 2}>
          {isLaptop ? (
            <IconButton size='small' onClick={() => setSearchOpen(true)}>
              <SearchIcon sx={{ color: 'common.text' }} />
            </IconButton>
          ) : (
            <InputField
              placeholder="Search here"
              sx={{
                width: '180px',
                '& .MuiInputBase-root': {
                  height: 34,
                  '& fieldset': {
                    border: '1px solid #E2E8F0',
                  },
                }
              }}
              startAdornment={
                <SearchIcon
                  sx={{
                    fontSize: 20,
                    scale: 1.2,
                    color: 'common.text'
                  }}
                />
              }
              onClick={() => setSearchOpen(true)}
              value=''
            />
          )}
        </Box>


      <DividerLine
        orientation='vertical'
        sx={{
          height: '34px',
          mx: isLaptop ? 1 : 2,
          borderColor: '#E2E8F0',
        }}
      />

      <ProfileMenu />
    </Box>
    <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>;
};

export default Navbar;
