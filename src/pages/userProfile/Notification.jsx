import React from 'react'
import { Box, CardContent, CardHeader, Divider, Typography, Stack, Paper, CardActions, Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const Notification = () => {
    return (
        <Box>
            <CardHeader sx={{p: '18px'}} title='Notifications' titleTypographyProps={{ fontWeight: 500 }} />
            <Divider />
            <CardContent>
                <Typography variant='subtitle2' fontWeight={500}>
                    You will receive notification for the below selected items.
                </Typography>
            </CardContent>
            <Divider />
            <TableContainer>
                <Table sx={{ minWidth: 350, borderRadius: '0px' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#f9fafc' }}>
                        <TableRow>
                            <TableCell sx={{ fontSize: '12px' }}>TYPE</TableCell>
                            <TableCell sx={{ fontSize: '12px' }} align='center'>EMAIL</TableCell>
                            <TableCell sx={{ fontSize: '12px' }} align="center">BROWSER</TableCell>
                            <TableCell sx={{ fontSize: '12px' }} align="center">APP</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {['New for you', 'Account activity', 'A new browser used to sign in', 'A new device is linked'].map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ p: '8px 16px' }} component="th" scope="row">{item}</TableCell>
                                <TableCell sx={{ p: '8px 16px' }} align='center'>
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={{ p: '8px 16px' }} align="center">
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={{ p: '8px 16px' }} align="center">
                                    <Checkbox />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <CardActions sx={{ p: '1.25rem' }}>
                <Stack direction={'row'} spacing={2}>
                    <Button size='large' variant='contained'>Save Changes</Button>
                    <Button size='large' variant='outlined' color='secondary'>Discard</Button>
                </Stack>
            </CardActions>
        </Box>
    )
}

export default Notification