import React, { useState, useEffect } from 'react'
import { CardContent, CardHeader, Stack, Typography, Box, Switch, Avatar, Link, Button, Paper } from '@mui/material'
import { useSelector } from 'react-redux';

const Services = () => {

    const userAccount = useSelector(state => state.userDetails);
    const [userServicesList, setUserServicesList] = useState([]);

    useEffect(() => {
        const list = userAccount?.userSubscriptionDto?.subscriptionAppsDtos?.map(item => ({
            name: item.appName,
            status: false,
        }))
        setUserServicesList(list)
    }, [userAccount])


    return (
        <Box>
            <Stack spacing={2}>
                <Paper>
                    <CardHeader sx={{ p: '18px', pb: 0 }} title='Services' subheader='Key Functional Areas for Management' titleTypographyProps={{ variant: 'h5', fontWeight: 500 }} />
                    <CardContent>
                        <Stack my={2} mt={3} spacing={1}>
                            {userServicesList.map((item, index) =>
                                <Stack key={index} direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                    <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2}>
                                        <Stack>
                                            <Typography variant='h6' lineHeight={'1'}>{item.name}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Switch defaultChecked={item.status} />
                                </Stack>
                            )}
                        </Stack>
                    </CardContent>
                </Paper>
            </Stack>
        </Box>
    )
}

export default Services