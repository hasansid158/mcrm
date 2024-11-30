import React from 'react'
import { Button } from '@mui/material'

import useScreenSize from 'hooks/useScreenSize';

export default function TopNavButton({
  children,
  onClick,
  sx,
  hovered = false,
  ...rest
}) {
  const { isDesktop } = useScreenSize();

  return (
    <Button
      onClick={onClick}
      sx={{
        px: isDesktop ? 1.4 : .8,
        py: '4px',
        color: 'common.text',
        minWidth: 40,
        height: '20px',
        borderRadius: 0,
        textDecoration: hovered ? 'underline' : 'none',
        '&:hover': {
          textDecoration: hovered ? 'underline' : 'none',
        },
        // outline: theme => hovered ? `1px solid ${theme.palette.primary.main}` : '',
        // backgroundColor: theme => hovered ? `${theme.palette.common.heavyRed} !important` : '',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
