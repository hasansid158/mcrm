import React from 'react'
import { Box, Grid } from '@mui/material'

import PaperBox from 'common/ui/PaperBox';

import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import UserSubscription from './UserSubscription';
import UserRole from './UserRole';

const AccountDetail = () => {
    return (
        <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
                <PaperBox>
                    <Box p={2} x={{ pt: 0, opacity: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={12}>
                            <UserInfo/>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <AccountInfo/>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <UserSubscription/>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <UserRole/>
                        </Grid>
                    </Grid>

                    </Box>
                    {/* <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={'2rem'} sx={{ padding: '1.25rem', pt: 0, opacity: 1, mb:2 }}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFCB5B1f', width: 'fit-content', p: 1, border: '5px', width: '44px', height: '44px' }}>
                                    <CheckIcon color='primary' sx={{ fontSize: '28px' }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant='h6' sx={{ lineHeight: '1.6' }}>1.23k</Typography>
                                <Typography variant='subtitle1'>Task Done</Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={2}>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFCB5B1f', width: 'fit-content', p: 1, border: '5px', width: '44px', height: '44px' }}>
                                    <StarOutlineIcon color='primary' sx={{ fontSize: '28px' }} />
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant='h6' sx={{ lineHeight: '1.6' }}>568</Typography>
                                <Typography variant='subtitle1'>Project Done</Typography>
                            </Box>
                        </Box>
                    </Box> */}
                </PaperBox>
            </Grid>
        </Grid>

    )
}

export default AccountDetail