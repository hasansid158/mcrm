import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useNavigate } from 'react-router-dom';
import { Divider, Box } from '@mui/material';

export default function MobileTopNavList({
  navItems = [],
  handleClose = () => {},
}) {
  const navigate = useNavigate();
  const [openKey, setOpenKey] = React.useState(null);

  const handleItemClick = (key, isExpendMenu, path) => {
    if (isExpendMenu) {
      openKey === key ? setOpenKey(null) : setOpenKey(key);
    } else {
      navigate(path);
      setOpenKey(null);
      handleClose();
    }
  }

  return (
    <List
      sx={{ width: '100vw' }}
      component="nav"
    >
      {navItems?.map((item, key) => (
        <Box key={key}>
          <ListItemButton
            onClick={() => handleItemClick(key, !!item?.list, item?.path)}
            sx={{
              backgroundColor: openKey === key ? 'primary.main' : '',
              '&:hover': {
                backgroundColor: 'primary.main',
              }
            }}
          >
            <ListItemText
              primary={item?.label}
              primaryTypographyProps={{
                variant: 'p',
                sx: {
                  display: 'unset',
                  textDecoration: 'underline',
                },
                onClick: () => handleItemClick('', false, item?.path)}
              }
            />
            {item?.list && (openKey === key ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {item?.list?.map((listItem, itemKey) => (
              <Collapse
                key={itemKey}
                in={openKey === key}
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                  sx={{ overflowY: 'unset !important' }}
                >
                  <ListItemButton
                    onClick={() => handleItemClick(null, false, listItem?.path)}
                    sx={{
                      pl: 4,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      }
                    }}
                  >
                    <ListItemText
                      primary={listItem?.label}
                      primaryTypographyProps={{variant: 'p2', color: 'white'}}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            )
          )}
          {key !== navItems?.length - 1 && <Divider sx={{bgcolor: 'common.borderGrey'}}/>}
        </Box>
      ))}

    </List>
  );
}