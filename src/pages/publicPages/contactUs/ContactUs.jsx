import React from 'react'
import { Box, Grid } from '@mui/material'
import ContactUsForm from './ContactUsForm'
import ContactUsCards from './ContactUsCards'

const ContactUs = () => {

  return <>
  <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
    <ContactUsForm/>
    </Grid>
    <Grid item md={6} xs={12}>
      <ContactUsCards/>
    </Grid>
    </Grid>
  </>
}


export default ContactUs