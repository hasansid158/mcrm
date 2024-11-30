import React, { useState, useEffect } from 'react';

import theme from 'core/theme';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';

import {
  crmRoutes,
  otherRoutes,
} from 'enum/routesEnum';
import { useNavigate } from 'react-router-dom';

import useReactForm from 'hooks/useReactForm';

import InputField from 'common/input/InputField';
import DividerLine from 'common/ui/DividerLine';

import { signUpApi } from 'api/masterApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/slices/authSlice';

import { lettersOnly, formRegex, numberOnly } from 'utils/textFormatUtils';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const sxTagUpdate = {
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent'
    },
    '& .MuiInputBase-input': {
      height: { xs: 'auto', md: '39px' },
      fontSize: '16px'
    }
  }

  const { isLogin } = useSelector(state => state.auth);

  useEffect(() => {
    !!isLogin && navigate(crmRoutes.CRM_PATH);
  }, [isLogin]);

  const {
    formData,
    handleSubmit,
  } = useReactForm({}, { mode: 'onChange' });

  const onSubmit = (data) => {
    setIsLoading(true);

    delete data.confirmPassword;

    signUpApi(data).then((res) => {
      const token = res?.data?.access_token;
      dispatch(login(token));

    }).catch((err) => {
      setErrorMsg('Server error occured, please try again later');
      setIsLoading(false);
    });
  }

  const handleKeyDown = (e) => {
    if (!e?.repeat && e?.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  }

  const validatePasswordMatch = (confirmPass, password) => password === confirmPass || "Passwords do not match";

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        // mt:{sm:"-50px",xs:"100px",md:"-150px"}
      }}
    >
    <Box onKeyDown={handleKeyDown}  sx={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
      <Box>
        <Typography
          fontFamily={'"Poppins", sans-serif'}
          variant="h1"
          color={'#10182B'}
          mb={{ sx: 2, md: 3 }}
          sx={{
            fontSize: {
              xs: '28px',
              sm: '28px',
              md: '32px',
              lg: '38px',
              xl: '44px',
            },
            lineHeight: 'normal',
            fontWeight: 500,
          }}          >
          Sign up
        </Typography>
      </Box>

      <Grid container rowGap={2} columnSpacing={1}>
        <Grid item sm={6} xs={12}>
          <InputField
            name='firstName'
            label='First name'
            variant='outlined'
            formData={formData}
            format={lettersOnly}
            isLabelOutside={true}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InputField
            name='lastName'
            label='Last name'
            variant='outlined'
            formData={formData}
            format={lettersOnly}
            isLabelOutside={true}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InputField
            name='email'
            label='Email'
            variant='outlined'
            formData={formData}
            isLabelOutside={true}
            type='email'
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InputField
            name='mobile'
            label='Mobile'
            variant='outlined'
            formData={formData}
            isLabelOutside={true}
            required
            onChange={() => setErrorMsg('')}
            rules={{
              pattern: {
                value: formRegex.mobile,
                message: 'Invalid mobile number',
              },
            }}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InputField
            name='companyName'
            label='Company name'
            variant='outlined'
            formData={formData}
            isLabelOutside={true}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        {/* <Grid item sm={6} xs={12}>
          <InputField
            name='jobTitle'
            label='Job title'
            variant='outlined'
            formData={formData}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={{
               '& .MuiInputBase-root' : {
              backgroundColor: 'transparent'
            },
              '& .MuiInputBase-input': {
                height: { xs: 'auto', md: '39px' },
                fontSize: '16px'
              }
            }}
          />
        </Grid> */}
        <Grid item sm={6} xs={12}>
          <InputField
            name='employees'
            label='Employees'
            variant='outlined'
            formData={formData}
            isLabelOutside={true}
            required
            onChange={() => setErrorMsg('')}
            type='number'
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            formData={formData}
            isLabelOutside={true}
            rules={{
              pattern: {
                value: formRegex.password,
                message: 'Password must contain at least one capital letter, a number and 8 characters long',
              },
            }}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name='confirmPassword'
            label='Confirm password'
            type='password'
            variant='outlined'
            formData={formData}
            isLabelOutside={true}
            rules={{
              validate: (value) => validatePasswordMatch(value, formData.getValues('password')),
            }}
            required
            onChange={() => setErrorMsg('')}
            color={'pinkWhite'}
            sx={sxTagUpdate}
          />
        </Grid>
      </Grid>

      <Box mt={1}>
        <Typography variant='p2' color='red'>
          {errorMsg}
        </Typography>
      </Box>

      <Box my={3}>
        <LoadingButton
          fullWidth
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          loading={isLoading}
          disabled={!formData?.isValid}
          color="pinkWhite"
          sx={{ height: { xs: 'auto', md: '56px' }, fontSize: { xs: 'auto', md: '18px' } }}
        >
          Get started
        </LoadingButton>
      </Box>

      <DividerLine />

      <Box mt={3} textAlign='center' display={'flex'} flexDirection={'column'} gap={'12px'}>
        <Typography component={'div'} variant='p' fontSize={{ xs: "14px", sm: "16px", md: "18px" }} color='common.fontColor'>
          Already have an account??&nbsp;
        </Typography>

        <Typography
          color='common.fontColor'
          variant='p'
          component={'div'}
          fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
          sx={{
            display: 'inline',
            cursor: 'pointer',
            fontWeight: '500',
            color: theme.palette.pinkWhite.main,
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
          onClick={() => navigate(otherRoutes.LOGIN)}
        >
          Login here
        </Typography>
      </Box>
    </Box ></Box>

  );
}

export default Signup;
