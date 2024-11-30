import Groups2Icon from '@mui/icons-material/Groups2';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded';

export const schedulerEnum = {
  meeting: {
    name: 'Meeting',
    bgColor: '#cefff0',
    color: '#46C79E',
    icon: <Groups2Icon />,
  },
  timeSheet: {
    name: 'Time Sheet',
    bgColor: '#F2FCFC',
    color: '#07CCD2',
    icon: <CallRoundedIcon />,
  },
  // call: {
  //   name: 'Call',
  //   bgColor: '#F2FCFC',
  //   color: '#07CCD2',
  //   icon: <CallRoundedIcon />,
  // },
  task: {
    name: 'Task',
    bgColor: '#FFFCF7',
    color: '#FFCB5B',
    icon: <TaskRoundedIcon />,
  },
  workOrder: {
    name: 'Work',
    bgColor: '#FFF6F5',
    color: '#FF5538',
    icon: <AssignmentLateRoundedIcon />,
  },
}

export const eventTypes = {
  meeting: 'meeting',
  timeSheet: 'timeSheet',
  call: 'call',
  task: 'task',
  workOrder: 'workOrder',
}