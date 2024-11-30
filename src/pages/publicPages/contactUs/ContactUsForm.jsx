import PaperBox from 'common/ui/PaperBox';
import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputField from 'common/input/InputField';
import DividerLine from 'common/ui/DividerLine';
import { formRegex } from 'utils/textFormatUtils';
import useReactForm from 'hooks/useReactForm';
import SearchSelect from 'common/input/SearchSelect';
import SwitchToggle from 'common/input/SwitchToggle';

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const sxTagUpdate = {
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiInputBase-input': {
      height: { xs: 'auto', md: '39px' },
      fontSize: '16px',
    },
  };

  const { formData, handleSubmit } = useReactForm({}, { mode: 'onChange' });

  const onSubmit = (data) => {
    setIsLoading(true);
    // Handle form submission
    console.log(data);

    // Simulate API call and reset
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyDown = (e) => {
    if (!e?.repeat && e?.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <PaperBox white>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
        }}
        onKeyDown={handleKeyDown}
      >
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <Typography
            fontFamily={'"Poppins", sans-serif'}
            variant="h1"
            color={'#10182B'}
            mb={{ sx: 3, md: 5 }}
            sx={{
              fontSize: {
                xs: '20px',
                sm: '20px',
                md: '24px',
                lg: '28px',
                xl: '28px',
              },
              lineHeight: 'normal',
              fontWeight: 500,
            }}
          >
            Request a call
          </Typography>

          <Grid container rowGap={4} columnSpacing={4}>
            <Grid item sm={6} xs={12}>
              <InputField
                name='firstName'
                label='First Name'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='lastName'
                label='Last Name'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='jobTitle'
                label='Job Title'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='email'
                label='Work Email'
                variant='outlined'
                formData={formData}
                type='email'
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='phone'
                label='Phone'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <SearchSelect
            name='country'
            label="Country"
            formData={formData}
                required
                color={'pinkWhite'}
            searchSelectData={[
              {value: 'Australia', label: 'Australia'},
              {value: 'New Zealand', label: 'New Zealand'},
              {value: 'USA', label: 'USA'},
              {value: 'India', label: 'India'}
            ]}
          />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='emloyees'
                label='Employess'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
                
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputField
                name='product'
                label='Product'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                sx={sxTagUpdate}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <InputField
                label='Questions / Comments'
                variant='outlined'
                formData={formData}
                required
                color={'pinkWhite'}
                name="Questions / Comments"
                multiline
                minRows={3}
                maxRows={6}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <SwitchToggle
                name="marketemail"
                label="Yes, I would like to recieve marketing emails"
                isCheckBox
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
              Contact Me
            </LoadingButton>
          </Box>

          <DividerLine />
        </Box>
      </Box>
    </PaperBox>
  );
};

export default ContactUsForm;