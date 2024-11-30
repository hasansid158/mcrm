import React, { useState, useRef, useEffect } from 'react';
import PopperMenu from 'common/navigation/popperMenu/PopperMenu';
import { MenuItem, Box, Button, Typography } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import { statusEnum } from 'enum/kanbanEnum';

import { keys } from 'lodash';
import { objectValueToArray } from 'utils/helperFunctions';

const StatusButton = ({
  formData = {},
  name = '',
  handleChange = () => {},
  currentValue,
  allData = [],
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonTarget = useRef(null);
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    formData?.setValue(name, currentValue || keys(statusEnum)?.[0]);
    setValue(currentValue || keys(statusEnum)?.[0]);
  }, [currentValue]);

  const handleItemClick = (value) => {
    setValue(value);
    formData?.setValue(name, value);
    handleChange(value);
    setAnchorEl(null);
  }

  return <>
    <Button
      onClick={() => setAnchorEl(buttonTarget.current)}
      ref={buttonTarget}
      variant='contained'
      size='small'
      disableElevation
      fullWidth
      sx={{ backgroundColor: statusEnum?.[value]?.color }}
      endIcon={!!anchorEl ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/>}
    >
      {value}
    </Button>

    <PopperMenu
      open={!!anchorEl}
      onClickAway={() => setAnchorEl(null)}
      anchorEl={anchorEl}
      // sx={{
      //   background: theme => theme.palette.common.transparentBg,
      //   color: 'white',
      //   maxWidth: '300px',
      //   minWidth: '240px',
      // }}
      placement='bottom-start'
      popperSx={{ zIndex: '999999999999' }}
    >
      {objectValueToArray(allData, 'status').map((item, key) => (
        <MenuItem
          key={key}
          onClick={() => handleItemClick(item)}
          sx={{
            py: 1,
            '&:hover': {backgroundColor: `${statusEnum?.[item].color} !important`},
          }}
        >
          <Box>
            {item}
          </Box>
        </MenuItem>
      ))}
    </PopperMenu>
  </>;
}

export default StatusButton;
