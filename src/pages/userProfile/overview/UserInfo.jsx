import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider, Button, useTheme, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import DialogBox from 'common/dataDisplay/dialogBox/DialogBox';
import InputField from 'common/input/InputField';
import PaperBox from 'common/ui/PaperBox';
import useReactForm from 'hooks/useReactForm';
import AvatarName from 'common/dataDisplay/AvatarName';

import AvatarImport from 'common/input/fileImport/AvatarImport';

import { uploadUserAvatar } from 'redux/slices/userSlice/userDetailsSlice';
import { getFileFormData } from 'utils/fileHelperFunctions';

import { setErrorDialogText, setSnackBar } from 'redux/slices/commonSlice/commonSlice';

import { isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

const UserInfo = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);

  const userAccount = useSelector(state => state.userDetails);

  const handleOpen = () => {
      setOpenUserDialog(true)
  }

  const handleClose = () => {
      setOpenUserDialog(false)
  }

  useEffect(() => {
    setLoading(isEmpty(userAccount));
  }, [userAccount]);

  const handleAvatarUpload = (fileObject) => {
    if (!fileObject) return;
    setAvatarLoading(true);

    dispatch(uploadUserAvatar(fileObject))
      ?.then(() => setSnackBar({
        open: true,
        message: 'Image uploaded successfully!'
      }))
      ?.catch(() => setErrorDialogText('Error uploading the image, please try again later'))
      ?.finally(() => {
        setAvatarLoading(false);
      })
  }

  const {
      formData,
      formData: { setValue, watch },
      handleSubmit,
      reset,
  } = useReactForm({});

    useEffect(() => {
        if (userAccount && openUserDialog) {
            reset({
                userName: userAccount.userName,
                title: userAccount.title,
                emailAddress: userAccount.emailAddress,
                mobile: userAccount.mobile,
                unitNo: userAccount.unitNo,
                streetNo: userAccount.streetNo,
                streetName: userAccount.streetName,
                suburb: userAccount.suburb,
                postcode: userAccount.postcode,
                state: userAccount.state,
                isAdmin: userAccount.isAdmin,
                isUserAgreedToTnC: userAccount.isUserAgreedToTnC,
                isTrialUser: userAccount.isTrialUser,
                trialPeriodNoOfDays: userAccount.trialPeriodNoOfDays
            });
        }
    }, [userAccount, openUserDialog, reset]);

    const onSubmit = (data) => {
        // Handle form submission
        console.log("Form data submitted:", data);
        handleClose();
    };
        return <>
                <PaperBox white sx={{position: 'relative'}} loading={loading}>
                  <Box display='flex' justifyContent='center'>
                      <Box display='flex' alignItems='center' flexDirection='column' p={2}>
                          <Box m={2}>
                            <AvatarImport
                              dialogTitle='Upload Avatar'
                              labelComponent={
                                <AvatarName
                                  name={userAccount?.userFirstName ? `${userAccount?.userFirstName || ''} ${userAccount?.userLastName || ''}` : ''}
                                  sx={{
                                    width: '200px',
                                    height: '200px',
                                    fontSize: '90px',
                                  }}
                                />
                              }
                              name='profileIcon'
                              size='200px'
                              noCancel
                              handleFileUpload={handleAvatarUpload}
                              loading={avatarLoading}
                              file={userAccount?.userImage || ''}
                            />
                          </Box>
                          <Typography variant='h4' sx={{ mt: 1 }}>{userAccount?.userFirstName}  {userAccount?.userLastName}  </Typography>
                          <Box mt={1}>
                              <Chip sx={{ color: 'rgb(255, 76, 81)', backgroundColor: 'rgba(255, 76, 81, 0.12)', border: 0, opacity: 1 }} label="Admin" size="small" variant="outlined" />
                          </Box>
                      </Box>
                  </Box>
                  <Divider sx={{ mt: 1, mb: 2 }} />
                  <Grid container spacing={2}>
                    {[
                        { label: 'Username', value: userAccount?.userName },
                        { label: 'Title', value: userAccount?.title },
                        { label: 'Email Address', value: userAccount?.emailAddress },
                        { label: 'Mobile', value: userAccount?.mobile },
                        { label: 'Unit No', value: userAccount?.unitNo },
                        { label: 'Street No', value: userAccount?.streetNo },
                        { label: 'Street Name', value: userAccount?.streetName },
                        { label: 'Suburb', value: userAccount?.suburb },
                        { label: 'Postcode', value: userAccount?.postcode },
                        { label: 'State', value: userAccount?.state },
                        { label: 'Role', value: userAccount?.isAdmin ? 'Admin' : 'User' },
                        { label: 'Agreed to Terms', value: userAccount?.isUserAgreedToTnC ? 'Yes' : 'No' },
                        { label: 'Trial User', value: userAccount?.isTrialUser ? 'Yes' : 'No' },
                        { label: 'Trial Period Days', value: userAccount?.trialPeriodNoOfDays }
                    ].map((info, index) => (
                        <Grid item xs={12} md={6} key={index}>
                        {/* <Typography variant="subtitle1" color="textSecondary">
                            {info.label}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" fontWeight={500}>
                            {info.value || 'N/A'}
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

            <DialogBox open={openUserDialog} handleFormSubmit={() => handleSubmit(onSubmit)} handleClose={handleClose} maxWidth='sm' title='Edit User Information'>
            {/* <Typography variant="h4" textAlign="center" mb={3} color="primary" fontWeight={600}>
                    Edit User Information
                </Typography> */}
                <Box p={3}>
                <Grid container spacing={2}>
                    <Grid item xs={4}><InputField required formData={formData} name='userName' label="Username" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='title' label="Title" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='emailAddress' label="Email Address" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='mobile' label="Mobile" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='unitNo' label="Unit No" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='streetNo' label="Street No" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='streetName' label="Street Name" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='suburb' label="Suburb" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='postcode' label="Postcode" /></Grid>
                    <Grid item xs={4}><InputField required formData={formData} name='state' label="State" /></Grid>
                </Grid></Box>
            </DialogBox>
        </>;
    };

    export default UserInfo;
