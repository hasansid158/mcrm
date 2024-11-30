import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import PaperBox from 'common/ui/PaperBox';
import { isEmpty } from 'lodash';


const SubscribedApps = () => {
    const [loading, setLoading] = useState(false);

    const userAccount = useSelector(state => state.userDetails);

    useEffect(() => {
        setLoading(isEmpty(userAccount));
    }, [userAccount]);

    const subscriptionApps = useSelector(
        (state) => state.userDetails?.userSubscriptionDto?.subscriptionAppsDtos
    );
    const subscriptionLevel = useSelector(
        (state) => state.userDetails?.userSubscriptionDto?.subcriptionLevelName
    );

    return (
        <PaperBox white label="Subscribed Application" loading={loading} sx={{height: '100%'}}>
            {/* <Box mb={3} textAlign="center">
                        <Typography variant="h4" color="primary" fontWeight={600}>
                            Subscribed Application
                        </Typography>
                    </Box> */}
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    <Box my={1}>
                                <Typography variant='p2' fontWeight={600} mb={1}>Subcription Level: <Typography variant='p2' component={'span'} fontWeight={400} ml={1}>{subscriptionLevel || 'N/A'}</Typography></Typography>
                            </Box>

                            <List>
                        {subscriptionApps && subscriptionApps.length > 0 ? (
                            subscriptionApps.map((app, index) => (
                                <ListItem key={index} sx={{py: 0}}>
                                    <ListItemText primary={`• ${app.appName}`} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary="No subscribed applications found."
                                    primaryTypographyProps={{ variant: 'body1', color: 'textSecondary', align: 'center' }}
                                />
                            </ListItem>
                        )}
                    </List>
        </PaperBox>
    );
};

export default SubscribedApps;


// subcriptionLevelName