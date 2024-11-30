import { Avatar, Box, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const UserActivityTimeLine = () => {
  return (
    <Box>
      <CardHeader sx={{p: '18px'}} titleTypographyProps={{ fontWeight: 500 }} title='User Activity Timeline'></CardHeader>
      <CardContent sx={{ py: 0 }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
            p: 0,
            m: 0
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' sx={{ boxShadow: 'rgba(255, 76, 81, 0.12) 0px 0px 0px 3px' }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Stack spacing={1} width={'100%'}>
                <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
                  <Typography variant='subtitle2' fontWeight={500}>User login</Typography>
                  <Typography variant='body2' sx={{ fontSize: '12px', color: '#3a354199', fontWeight: 400 }}>12 min ago</Typography>
                </Stack>
                <Typography variant='subtitle2' sx={{ color: '#3a354199' }}>User login at 2:12pm</Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' sx={{ boxShadow: 'rgba(255, 76, 81, 0.12) 0px 0px 0px 3px' }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Stack spacing={1} width={'100%'}>
                <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
                  <Typography variant='subtitle2' fontWeight={500}>Meeting with John</Typography>
                  <Typography variant='body2' sx={{ fontSize: '12px', color: '#3a354199', fontWeight: 400 }}>45 min ago</Typography>
                </Stack>
                <Typography variant='subtitle2' sx={{ color: '#3a354199' }}>React Project meeting with John @10:15am</Typography>
                <Stack>
                  <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'flex-start'}>
                    <Stack>
                      <Avatar alt={'Leona Watkins'} size='small' src={'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/avatars/2.png'} sx={{ width: '40px', height: '40px' }} />
                    </Stack>
                    <Stack>
                      <Typography variant='subtitle2' fontWeight={500}>Leona Watkins (Client)</Typography>
                      <Typography variant='subtitle2' sx={{ color: '#3a354199' }}>CEO of Watkins Group</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='secondary' sx={{ boxShadow: 'rgba(255, 76, 81, 0.12) 0px 0px 0px 3px' }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Stack spacing={1} width={'100%'}>
                <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
                  <Typography variant='subtitle2' fontWeight={500}>Create a new react project for client</Typography>
                  <Typography variant='body2' sx={{ fontSize: '12px', color: '#3a354199', fontWeight: 400 }}>2 day ago</Typography>
                </Stack>
                <Typography variant='subtitle2' sx={{ color: '#3a354199' }}>Add files to new design folder</Typography>
              </Stack>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' sx={{ boxShadow: 'rgba(255, 76, 81, 0.12) 0px 0px 0px 3px' }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Stack spacing={1} width={'100%'}>
                <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
                  <Typography variant='subtitle2' fontWeight={500}>Create invoices for client</Typography>
                  <Typography variant='body2' sx={{ fontSize: '12px', color: '#3a354199', fontWeight: 400 }}>12 min ago</Typography>
                </Stack>
                <Typography variant='subtitle2' sx={{ color: '#3a354199' }}>Create new invoices and send to Leona Watkins</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <Avatar alt={'Leona Watkins'} size='small' src={'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/icons/file-icons/pdf.png'} sx={{ width: '40px', height: '40px', borderRadius: 0 }} />
                  <Typography variant='subtitle1' sx={{ color: '#3a354199', fontWeight: 600 }}>invoice.pdf</Typography>
                </Stack>
              </Stack>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Box>
  )
}

export default UserActivityTimeLine