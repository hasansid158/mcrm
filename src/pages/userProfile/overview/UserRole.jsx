import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux';
import PaperBox from 'common/ui/PaperBox';
import { isEmpty } from 'lodash';

const UserRole = () => {
    const userRoles = useSelector((state) => state.userDetails?.userRolesDto);

    const [loading, setLoading] = useState(false);

    const userAccount = useSelector(state => state.userDetails);

    useEffect(() => {
        setLoading(isEmpty(userAccount));
    }, [userAccount]);

    return (
        <PaperBox white label="User Role and Permissions" loading={loading} sx={{height: '100%'}}>
            {/* <Box mb={3} textAlign="center">
                <Typography variant="h4" color="primary" fontWeight={600}>
                    User Role and Permissions
                </Typography>
            </Box> */}
            <Divider sx={{ my: 1 }} />

            {userRoles ? (
                <>
                    <Box mb={2}>
                        <Typography variant='p2' fontWeight={600} mb={1}>Role: <Typography variant='p2' component={'span'} fontWeight={400} ml={1}>{userRoles.roles || 'N/A'}</Typography></Typography>
                    </Box>

                    {/* <Divider sx={{ my: 1 }} /> */}

                    <Box mt={1}>
                        <Typography variant="p2" color="primary" fontWeight={600}>
                            Permissions:
                        </Typography>
                        <List sx={{ mt: 1 }}>
                            {userRoles.permissions && userRoles.permissions.length > 0 ? (
                                userRoles.permissions.map((permission, index) => (
                                    <ListItem key={index} disableGutters sx={{py: 0}}>
                                        <ListItemText
                                            primary={`• ${permission}`}
                                            primaryTypographyProps={{ variant: 'p2', color: 'textSecondary' }}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <ListItem disableGutters sx={{py: 0}}>
                                    <ListItemText
                                        primary="No permissions available."
                                        primaryTypographyProps={{ variant: 'p3', color: 'textSecondary' }}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </>
            ) : (
                <Typography variant="body1" color="textSecondary" textAlign="center">
                    No role and permissions data found.
                </Typography>
            )}
        </PaperBox>
    );
};

export default UserRole;