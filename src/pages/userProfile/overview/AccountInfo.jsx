import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider, Button, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import InputField from 'common/input/InputField';
import PaperBox from 'common/ui/PaperBox';
import useReactForm from 'hooks/useReactForm';
import { isEmpty } from 'lodash';

const UserInfo = () => {
    const theme = useTheme();
    const userDetail = useSelector(state => state.userDetails?.userAccount);
    const [openUserDialog, setOpenUserDialog] = useState(false);

    const [loading, setLoading] = useState(false);

    const userAccount = useSelector(state => state.userDetails);

    useEffect(() => {
        setLoading(isEmpty(userAccount));
    }, [userAccount]);

    const handleOpen = () => {
        setOpenUserDialog(true);
    };

    const handleClose = () => {
        setOpenUserDialog(false);
    };

    const {
        formData,
        formData: { setValue, watch },
        handleSubmit,
        reset,
    } = useReactForm({});

    useEffect(() => {
        if (userDetail && openUserDialog) {
            reset({
                accountOwner: userDetail.accountOwner,
                accountName: userDetail.accountName,
                accountNumber: userDetail.accountNumber,
                accountType: userDetail.accountType,
                email: userDetail.email,
                webSite: userDetail.webSite,
                industry: userDetail.industry,
                employees: userDetail.employees,
                tickerSymbol: userDetail.tickerSymbol,
                annualRevenue: userDetail.annualRevenue,
                description: userDetail.description,
                phone: userDetail.phone,
                street: userDetail.street,
                city: userDetail.city,
                state: userDetail.state,
                suburb: userDetail.suburb,
                postcode: userDetail.postcode,
                country: userDetail.country,
                numberOfEmployees: userDetail.numberOfEmployees,
                trialPeriodNoOfDays: userDetail.trialPeriodNoOfDays,
            });
        }
    }, [userDetail, openUserDialog, reset]);

    const onSubmit = (data) => {
        console.log('Form data submitted:', data);
        handleClose();
    };

    return <>
        <PaperBox white label="User Account Information" loading={loading} sx={{height: '100%'}}>
            {/* <Box mb={3} textAlign="center">
                <Typography variant="h4" color="primary" fontWeight={600}>
                    User Account Information
                </Typography>
            </Box> */}
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Grid container spacing={2}>
                {[
                    { label: 'Account Owner', value: userDetail?.accountOwner },
                    { label: 'Account Name', value: userDetail?.accountName },
                    { label: 'Account Number', value: userDetail?.accountNumber },
                    { label: 'Account Type', value: userDetail?.accountType },
                    { label: 'Email', value: userDetail?.email },
                    { label: 'Website', value: userDetail?.webSite },
                    { label: 'Industry', value: userDetail?.industry },
                    { label: 'Employees', value: userDetail?.employees },
                    { label: 'Ticker Symbol', value: userDetail?.tickerSymbol },
                    { label: 'Annual Revenue', value: userDetail?.annualRevenue },
                    { label: 'Description', value: userDetail?.description },
                    { label: 'Phone', value: userDetail?.phone },
                    { label: 'Street', value: userDetail?.street },
                    { label: 'City', value: userDetail?.city },
                    { label: 'State', value: userDetail?.state },
                    { label: 'Suburb', value: userDetail?.suburb },
                    { label: 'Postcode', value: userDetail?.postcode },
                    { label: 'Country', value: userDetail?.country },
                    { label: 'No of Employees', value: userDetail?.numberOfEmployees },
                    { label: 'Trial Period Days', value: userDetail?.trialPeriodNoOfDays },
                ].map((info, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        {/* <Typography variant="subtitle1" color="textSecondary">

                        </Typography>
                        <Typography variant="body1" color="textPrimary" fontWeight={500}>

                        </Typography> */}
                        <Typography variant='p2' fontWeight={600} mb={1}>{info.label}: <Typography variant='p2' component={'span'} fontWeight={400} ml={1}>{info.value || 'N/A'}</Typography></Typography>
                    </Grid>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center" gap={2}>
                <Button onClick={handleOpen} color="primary" size="large" variant="contained">
                    Edit
                </Button>
                {/* <Button color="error" size="large" variant="outlined">
                    Suspend
                </Button> */}
            </Box>
        </PaperBox>

        <DialogBox open={openUserDialog} handleFormSubmit={onSubmit} handleClose={handleClose} maxWidth="sm" title='Edit User Information'>
            <Box p={3}>
                {/* <Typography variant="h4" textAlign="center" mb={3} color="primary" fontWeight={600}>
                    Edit User Information
                </Typography> */}
                <Grid container spacing={2}>
                    <Grid item xs={4}><InputField required formData={formData} name="accountOwner" label="Account Owner" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="accountName" label="Account Name" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="accountNumber" label="Account Number" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="accountType" label="Account Type" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="email" label="Email" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="webSite" label="Website" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="industry" label="Industry" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="employees" label="Employees" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="tickerSymbol" label="Ticker Symbol" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="annualRevenue" label="Annual Revenue" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="description" label="Description" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="phone" label="Phone" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="street" label="Street" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="city" label="City" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="state" label="State" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="suburb" label="Suburb" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="postcode" label="Postcode" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="country" label="Country" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="numberOfEmployees" label="No of Employees" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name="trialPeriodNoOfDays" label="Trial Period Days" /></Grid>
                </Grid>
            </Box>
        </DialogBox>
    </>;
};

export default UserInfo;