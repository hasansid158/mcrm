import React, { useState, useEffect } from 'react';
import theme from 'core/theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { crmRoutes, otherRoutes } from 'enum/routesEnum';
import { useNavigate } from 'react-router-dom';
import useReactForm from 'hooks/useReactForm';
import InputField from 'common/input/InputField';
import DividerLine from 'common/ui/DividerLine';
import { loginApi } from 'api/masterApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { isLogin } = useSelector((state) => state.auth);

  const sxTagUpdate = {
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputBase-input': {
      height: { xs: 'auto', md: '39px' },
      fontSize: '16px',
    },
  };

  useEffect(() => {
    if (isLogin) {
      navigate(crmRoutes.CRM_PATH);
    }
  }, [isLogin]);

  const { formData, handleSubmit } = useReactForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    loginApi({
      userName: data?.username,
      password: data?.password,
    })
      .then((res) => {
        const token = res?.data;
        dispatch(login(token));
      })
      .catch((err) => {
        if (err?.code === 'ERR_NETWORK') {
          setErrorMsg('Server error occurred');
        } else {
          setErrorMsg('Invalid Username or Password');
        }
        setIsLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (!e?.repeat && e?.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        mt: '-150px',
      }}
    >
      <Box
        onKeyDown={handleKeyDown}
        sx={{ width: '100%', maxWidth: '400px', padding: '16px' }}
      >
        <Box width="100%">
          <Box mb={1}>
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
              }}
            >
              Login
            </Typography>
          </Box>
        </Box>

        <InputField
          name="username"
          variant="outlined"
          helperText=""
          formData={formData}
          isLabelOutside={true}
          color="pinkWhite"
          onChange={() => setErrorMsg('')}
          sx={sxTagUpdate}
        />
        <Box mt={2}>
          <InputField
            name="password"
            variant="outlined"
            helperText=""
            formData={formData}
            isLabelOutside={true}
            type="password"
            onChange={() => setErrorMsg('')}
            color="pinkWhite"
            sx={sxTagUpdate}
          />
        </Box>

        <Box mt={1}>
          <Typography variant="p2" color="red">
            {errorMsg}
          </Typography>
        </Box>

        <Box
          my={2}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <FormControlLabel
            control={
              <Checkbox
                color="pinkWhite"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 24, borderRadius: 4 } }}
              />
            }
            label={
              <Typography
                color="#3E424B"
                variant="p2"
                fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
              >
                Remember me
              </Typography>
            }
          />

          <Typography
            color="#3E424B"
            variant="p2"
            fontSize={{ xs: '12px', sm: '14px', md: '16px' }}
            sx={{
              display: 'inline',
              cursor: 'pointer',
              fontWeight: '500',
              '&:hover': {
                color: theme.palette.pinkWhite.main,
                textDecoration: 'underline',
              },
            }}
          >
            Forgot Password
          </Typography>
        </Box>

        <Box mt={3}>
          <LoadingButton
            fullWidth
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            loading={isLoading}
            disabled={
              !(
                !!formData.getValues('password') &&
                !!formData.getValues('username')
              )
            }
            color="pinkWhite"
            sx={{
              height: { xs: 'auto', md: '56px' },
              fontSize: { xs: 'auto', md: '18px' },
            }}
          >
            Log In
          </LoadingButton>
        </Box>

        <DividerLine />

        <Box
          mt={3}
          textAlign="center"
          display={'flex'}
          flexDirection={'column'}
          gap={'12px'}
        >
          <Typography
            component={'div'}
            variant="p"
            fontSize={{ xs: '14px', sm: '16px', md: '18px' }}
            color="common.fontColor"
          >
            Don't have an account?&nbsp;
          </Typography>

          <Typography
            color="common.fontColor"
            variant="p"
            component={'div'}
            fontSize={{ xs: '14px', sm: '16px', md: '18px' }}
            sx={{
              display: 'inline',
              cursor: 'pointer',
              fontWeight: '500',
              color: theme.palette.pinkWhite.main,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => navigate(otherRoutes.SIGNUP)}
          >
            Sign up for free!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
