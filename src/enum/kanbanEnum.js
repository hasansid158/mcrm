
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';

import { Box, Typography } from '@mui/material';

export const statusEnum = {
  'Open': {
    color: '#13cfd4',
    label: 'Open',
  },
  'In Progress': {
    color: '#ffcb5f',
    label: 'In Progress',
  },
  'Review': {
    color: '#8833ff',
    label: 'Review',
  },
  'Resolved': {
    color: '#46c79e',
    label: 'Resolved',
  },
  'Cancelled': {
    color: '#f76a63',
    label: 'Cancelled',
  },
  'CLOSED LOST': {
    color: '#ffdfdf',
    label: 'CLOSED LOST',
  },
  'CLOSED WON': {
    color: '#c6f7c6',
    label: 'CLOSED WON',
  },
  'Approved': {
    color: '#c6f7c6',
    label: 'APPROVED',
  },
  'Rejected': {
    color: '#ffdfdf',
    label: 'REJECTED',
  },
}

export const priorityIconEnum = {
  'high': <ExpandLessRoundedIcon sx={{fill: '#ff3d3d', height: '20px', scale: '1.4', minWidth: '28px'}}/>,
  'medium': <DragHandleRoundedIcon sx={{fill: '#ff9400', height: '20px', scale: '1.3', minWidth: '28px'}}/>,
  'low': <ExpandMoreRoundedIcon sx={{color: '#328bed', height: '20px', scale: '1.4', minWidth: '28px'}}/>,
}

export const priortyColorMap = {
  'high': '#ff3d3d',
  'medium': '#ff9400',
  'low': '#328bed',
}

export const PriorityLabel = ({ priority }) => (
  <Box display='flex' alignItems='center'>
    {priorityIconEnum?.[priority.toLowerCase()]}
    <Typography ml={.5} variant='p2'>{priority}</Typography>
  </Box>
)

export const stageOrder = {
  Deal: [
    'PROPOSAL',
    'NEGOTIATION',
    'CONTRACT SENT',
    'VERBAL AGREEMENT',
    'CLOSED WON',
    'CLOSED LOST',
  ]
};
