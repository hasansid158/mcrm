import React from 'react'
import { Box, Button, CardActions, CardContent, CardHeader, Chip, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

const paymentMethodList = [
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/mastercard.png',
        name: 'Tom McBride',
        status: 'Primary',
        number: '**** **** **** 9865',
        expires: '12/24'
    },
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/visa.png',
        name: 'Mildred Wagner',
        status: 'none',
        number: '**** **** **** 5678',
        expires: '12/24'
    },
    {
        logo: 'https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/logos/american-express.png',
        name: 'Lester Jennings',
        status: 'Expired',
        number: '**** **** **** 0002',
        expires: '12/24'
    },
]

const Billing = () => {
    return (
        <Stack spacing={3}>
            <Stack>
                <Paper>
                    <CardHeader
                        titleTypographyProps={{ fontWeight: 400 }}
                        title='Invoice List'
                        sx={{ p: '18px' }}
                    />
                    <CardContent>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                            <Stack spacing={2} sx={{ width: { xs: '100%', md: '40%' } }}>
                                <Stack spacing={'4px'}>
                                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                                        Your Current Plan is {' '}
                                        <Typography component={'span'} variant='body1' fontWeight={600}>Basic</Typography>
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>A simple start for everyone</Typography>
                                </Stack>
                                <Stack spacing={'4px'}>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 600 }}>Active until Dec 09, 2021</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>We will send you a notification upon Subscription expiration</Typography>
                                </Stack>
                                <Stack spacing={'4px'}>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 600 }}>$99 Per Month <Chip label='Popular' size='small' sx={{ color: 'primary.main', bgcolor: '#FFCB5B1f', ml: 1 }} /></Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>Standard plan for small to medium businesses</Typography>
                                </Stack>
                            </Stack>
                            <Stack sx={{ width: { xs: '100%', md: '60%' } }}>
                                <Box sx={{ p: 2, mb: '16px', borderRadius: 1, backgroundColor: 'rgba(255, 180, 0, 0.12)' }}>
                                    <Typography sx={{ color: 'rgb(224, 158, 0)', fontWeight: '500', mb: '4px' }} variant='h6'>We need your attention!</Typography>
                                    <Typography sx={{ color: 'rgb(224, 158, 0)' }} variant='body2'>Your plan requires updates</Typography>
                                </Box>

                                <Stack spacing={1}>
                                    <Stack direction={'row'} justifyContent={'space-between'}>
                                        <Typography variant='subtitle2' marginBottom={'2px'} fontWeight={500}>Days</Typography>
                                        <Typography variant='subtitle2' marginBottom={'2px'} fontWeight={500}>26 / 30 days</Typography>
                                    </Stack >
                                    <BorderLinearProgress color={'primary'} variant="determinate" value={((26 / 30) * 100).toFixed()} />
                                    <Stack>
                                        <Typography variant='body2' sx={{ color: 'text.secondary' }} fontSize={'12px'} marginBottom={'2px'} fontWeight={350}>Your plan requires update</Typography>
                                    </Stack >
                                </Stack >
                            </Stack>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ p: '1.25rem' }}>
                        <Stack direction={'row'} spacing={2}>
                            <Button variant='contained' color='primary' size='large'>Upgrade Plan</Button>
                            <Button variant='outlined' color='error' size='large'>Cancel Subscription</Button>
                        </Stack>
                    </CardActions>
                </Paper>
            </Stack>
            <Stack>
                <Paper>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: '18px', pb: 0 }}>
                        <CardHeader
                            titleTypographyProps={{ fontWeight: 400 }}
                            title='Payment Methods'
                            sx={{ p: '0px' }}
                        />
                        <Stack>
                            <Button variant='contained' startIcon={<AddIcon />} size='large'>Add Card</Button>
                        </Stack>
                    </Stack>
                    <CardContent pt={0}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {paymentMethodList.map((item, index) =>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ width: '100%', border: '1px solid', borderColor: '#3a35411f', borderRadius: '6px', p: '1.25rem' }} justifyContent={'space-between'} >
                                    <Stack spacing={1} alignItems={'flex-start'}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <img alt={item.name} src={item.logo} height={25} />
                                        </Box>
                                        <Typography variant='body1' sx={{ color: 'text.secondary', fontWeight: 600 }}>{item.name}
                                            {item.status === 'Primary' ?
                                                <Chip label={item.status} size='small' sx={{ color: 'primary.main', bgcolor: '#FFCB5B1f', ml: 1 }} />
                                                : item.status === 'Expired' ?
                                                    <Chip label={item.status} size='small' sx={{ color: 'error.main', bgcolor: '#d32f2f1f', ml: 1 }} />
                                                    : ''}
                                        </Typography>
                                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>{item.number}</Typography>
                                    </Stack>
                                    <Stack spacing={2} justifyContent={'center'} alignItems={{ xs: 'flex-start', sm: 'flex-end' }}>
                                        <Stack direction={'row'} spacing={2}>
                                            <Button variant='outlined' color='primary' size='large'>Edit</Button>
                                            <Button variant='outlined' color='secondary' size='large'>Delete</Button>
                                        </Stack>
                                        <Typography variant='body2' sx={{ color: 'text.secondary' }} fontSize={'12px'} marginBottom={'2px'} fontWeight={350}>Card expires at {item.expires}</Typography>
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </Paper>
            </Stack>
            <Stack>
                <Paper>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: '18px', pb: 0 }}>
                        <CardHeader
                            titleTypographyProps={{ fontWeight: 400 }}
                            title='Billing Address'
                            sx={{ p: '0px' }}
                        />
                        <Stack>
                            <Button variant='contained' size='large'>Edit Address</Button>
                        </Stack>
                    </Stack>
                    <CardContent sx={{ p: '1.25rem', pt:4 }}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Stack spacing={2} width={{ xs: '100%', sm: '50%' }}>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Company Name:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>ThemeSelection</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Billing Email:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>gertrude@gmail.com</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Tax ID:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>TAX-875623</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>VAT Number:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>SDF754K77</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Billing Address:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>100 Water Plant Avenue, Building 1303 Wake Island</Typography>
                                </Stack>
                            </Stack>
                            <Stack spacing={2} width={{ xs: '100%', sm: '50%' }}>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Contact:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>+1(609) 933-44-22</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Country:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>Australia</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>State:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>Queensland</Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2}>
                                    <Typography variant='body2' sx={{ fontWeight: 600, width: { xs: '100%', sm: '50%' } }}>Zip Code:</Typography>
                                    <Typography variant='body2' sx={{ color: 'text.secondary', width: { xs: '100%', sm: '50%' } }}>403114</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Paper>
            </Stack>
        </Stack>
    )
}

export default Billing