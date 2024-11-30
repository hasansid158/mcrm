import React from 'react'
import { Box, CardContent, CardHeader, Divider, Typography, Stack, Paper, CardActions, Button, Avatar, IconButton, Link } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { BorderColor, DeleteOutlineRounded, Edit } from '@mui/icons-material';


const deviceList = [
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/chrome.png',
        browser: 'Chrome on Windows',
        device: 'Dell XPS 15',
        location: 'United States',
        activity: '10, Jan 2020 20:07'
    },
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/chrome.png',
        browser: 'Chrome on Android',
        device: 'Google Pixel 3a',
        location: 'Ghana',
        activity: '10, Jan 2020 20:07'
    },
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/chrome.png',
        browser: 'Chrome on MacOS',
        device: 'Apple iMac',
        location: 'Mayotte',
        activity: '10, Jan 2020 20:07'
    },
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/chrome.png',
        browser: 'Chrome on iPhone',
        device: 'Apple iPhone XR',
        location: 'Mauritania',
        activity: '10, Jan 2020 20:07'
    },
]
const Security = () => {

    return (
        <Stack spacing={3}>
            <Stack>
                <Paper>
                    <Box>
                        <CardHeader sx={{ p: '18px' }} title='Change Password' titleTypographyProps={{ fontWeight: 500 }} />
                        <CardContent sx={{ p: '18px', pt: 0 }}>
                            <Box sx={{ p: 2, mb: '16px', borderRadius: 1, backgroundColor: 'rgba(255, 180, 0, 0.12)' }}>
                                <Typography sx={{ color: 'rgb(224, 158, 0)', fontWeight: '500', mb: '4px' }} variant='h6'>Ensure that these requirements are met</Typography>
                                <Typography sx={{ color: 'rgb(224, 158, 0)' }} variant='body2'>Minimum 8 characters long, uppercase & symbol</Typography>
                            </Box>
                            <Stack spacing={1} direction={'row'}>
                                <PasswordFiled placeholder='New Password' />
                                <PasswordFiled placeholder='Confirm Password' />
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ p: '18px', pt: 0 }}>
                            <Button variant='contained' size='large'>Update Password</Button>
                        </CardActions>
                    </Box>
                </Paper>
            </Stack>
            <Stack>
                <Paper>
                    <CardHeader sx={{ p: '18px', pb:'6px' }} title='Two-step verification' subheader='Keep your account secure with authentication step.' subheaderTypographyProps={{ variant: 'body2', sx: { mt: 1 } }} titleTypographyProps={{ fontWeight: 500 }} />
                    <CardContent>
                        <Typography variant='subtitle2' fontWeight={500} mb={2}>SMS</Typography>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ borderBottom: '1px solid', borderColor: 'text.secondary', pb: '2px' }}>
                            <Typography sx={{ color: 'text.secondary' }}>+1(968) 819-2547</Typography>
                            <Stack direction={'row'}>
                                <IconButton size='small'>
                                    <Edit fontSize='small' />
                                </IconButton>
                                <IconButton size='small'>
                                    <DeleteOutlineRounded fontSize='small' />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Typography variant='body2' sx={{ color: 'text.secondary', mt:1 }}>Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
                           {' '} <Link>Learn more</Link>
                        </Typography>

                    </CardContent>
                </Paper>
            </Stack>
            <Stack>
                <Paper>
                    <Box>
                        <CardHeader sx={{ p: '18px' }} title='Recent devices' titleTypographyProps={{ fontWeight: 500 }} />
                        <Divider />
                        <TableContainer>
                            <Table sx={{ minWidth: 350, borderRadius: '0px' }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#f9fafc' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '12px' }}>BROWSER</TableCell>
                                        <TableCell sx={{ fontSize: '12px' }} align='center'>DEVICE</TableCell>
                                        <TableCell sx={{ fontSize: '12px' }} align="center">LOCATION</TableCell>
                                        <TableCell sx={{ fontSize: '12px' }} align="center">RECENT ACTIVITY</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deviceList.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Stack direction={'row'} spacing={1}>
                                                    <Avatar alt={item.browser} size='small' src={item.logo} sx={{ width: '22px', height: '22px' }} />
                                                    <Typography>
                                                        {item.browser}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary' }} align='center'>
                                                {item.device}
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary' }} align="center">
                                                {item.location}
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary' }} align="center">
                                                {item.activity}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Stack>
        </Stack>
    )
}

export default Security


const PasswordFiled = ({ placeholder }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}