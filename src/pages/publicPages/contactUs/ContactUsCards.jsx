import PaperBox from 'common/ui/PaperBox';
import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

const ContactUsCards = () => {
  return (
      <Grid 
        container 
        spacing={4} 
        direction="column" 
        alignItems="center"
        sx={{ padding: '20px', gap: '20px' , marginTop: '50px'  }}
      >
        <Paper sx={{ padding: '20px', width: '100%', maxWidth: '600px'}}>
          <Typography variant="h6" gutterBottom>
            Give us a call.
          </Typography>
          <Typography variant="body1">
            1800 667 638 (AU), 0800 450 064 (NZ)
          </Typography>
          <Typography variant="body2" color="primary" sx={{ marginTop: '10px' }}>
            Find your local office
          </Typography>
          <Typography variant="body2" color="primary" sx={{ marginTop: '5px' }}>
            Get billing and tech support
          </Typography>
          <Typography variant="body2" color="primary" sx={{ marginTop: '5px' }}>
            Manage billing, licenses, and renewals in Your Account
          </Typography>
        </Paper>

        <Paper sx={{ padding: '20px', width: '100%', maxWidth: '600px'}}>
          <Typography variant="h6" gutterBottom>
            Chat with us.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Get product info, login help, and live chat with an agent.
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
            LET'S CHAT
          </Button>
        </Paper>

        <Paper sx={{ padding: '20px', width: '100%', maxWidth: '600px' }}>
          <Typography variant="h6" gutterBottom>
            Leave us some feedback.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Good or bad, we love to hear it all.
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
            SEND FEEDBACK
          </Button>
        </Paper>
      </Grid>
  );
};

export default ContactUsCards;