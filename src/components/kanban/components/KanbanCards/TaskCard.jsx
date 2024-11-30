import React from 'react';
import { parseISO, format, isValid  } from 'date-fns';

import { Box,Typography} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import AvatarName from 'common/dataDisplay/AvatarName';

import { priortyColorMap } from 'enum/kanbanEnum';

import useScreenSize from 'hooks/useScreenSize';

import { transitions } from 'core/animations';

const TaskCard = ({
  cardData = {},
  onClick = () => {},
}) => {

  const {
    subject,
    dueDate,
    taskID,
    priority,
    assignee,
  } = cardData;

  const dateObject = parseISO(dueDate);
  const formattedDueDate = isValid(dateObject) ? format(dateObject, 'dd MMM yy') : '' ;

  const { isMobile } = useScreenSize();

  // const getPriorityColor = (priority) => {
  //   switch (priority?.toLowerCase()) {
  //     case 'high':
  //       return 'error.main';
  //     case 'medium':
  //       return 'warning.main';
  //     case 'low':
  //       return 'primary.main';
  //     default:
  //       return 'textPrimary';
  //   }
  // };

  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100%',
        minHeight: '100px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        my: .5,
        p: {md: 2, xs: 1.5},
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
        transition: transitions('box-shadow').short,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <ReceiptLongIcon sx={{ fontSize: 16, color: '#333' }} />
        <Typography
          sx={{
            ml: 0.5,
            typography: {
              xs: 'p3',
              md: 'p2',
            },
            fontWeight: 'bold !important',
          }}
        >
          {taskID}
        </Typography>
      </Box>

      <Typography
        sx={{
          typography: {
            xs: 'p2',
            md: 'pO',
          },
          fontWeight: '600 !important',
          mb: 2,
          overflow: 'hidden',
          width: '100%',
          display: '-webkit-box',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {subject}
      </Typography>

      {!!formattedDueDate &&
        <Typography
          sx={{
            mb: 3,
            typography: {
              xs: 'p3',
              md: 'p2',
            },
            fontFamily: '"Poppins", sans-serif !important',
            fontWeight: '500 !important',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          Due:&nbsp;
          <Box component='span'>
            {formattedDueDate}
          </Box>
        </Typography>
      }

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          pr={1}
          display='flex'
          alignItems='center'
          flexWrap='wrap'
          gap={.5}
        >
          <Typography variant='p3' fontWeight='500'>Priority:</Typography>
          <Typography
            variant="p3"
            sx={{
              color: priortyColorMap?.[priority?.toLowerCase()] || 'secondary.main',
              fontWeight: '600'
            }}
          >
            {priority}
          </Typography>
        </Box>
        <AvatarName
          name={assignee}
          scale={isMobile ? 1 : 1.25}
        />
      </Box>
    </Box>
  );
};

export default TaskCard;