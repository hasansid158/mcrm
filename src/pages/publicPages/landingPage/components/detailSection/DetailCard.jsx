import React from 'react';

import {
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import PaperBox from 'common/ui/PaperBox';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DetailCard = ({
  cardHeading = '',
  cardDetail,
  bullets = [],
}) => {
  return (
    <PaperBox
      square
      sx={{
        maxWidth: '205px',
        minWidth: '172px',
        width: '100%',
        height: '280px',
        pb: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        display='flex'
        alignItems='flex-start'
        pt={1}
        minWidth='173px'
      >
        <ElectricBoltIcon sx={{
            fontSize: '16px',
            mr: '2px',
            color: 'primary.main'
          }}
        />
        <Typography variant='p3' fontWeight='bold'>
          {cardHeading}
        </Typography>
      </Box>
      <Box 
        py={1} pb={!cardDetail ? 1 : 2}
        borderBottom={theme => `2px solid ${theme.palette.common.hoverGrey}`}
        lineHeight={1}
      >
        <Typography variant='textLink'>
          {cardDetail}
        </Typography>
      </Box>


      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        mt={1}
      >
        <Typography variant='textLink'>
          Popular Features
        </Typography>

        <Box my={1}>
          {bullets?.map((item, key) => (
            <Box
              key={key}
              display='flex'
              alignItems='flex-start'
              pt={.5}
            >
              <CheckCircleIcon sx={{
                  fontSize: '12px',
                  mr: '4px',
                  color: 'primary.main'
                }}
              />
              <Typography variant='textLink'>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button 
          variant='contained' 
          color='secondary'
          sx={{
            borderRadius: 0,
            mt: 'auto'
          }}
        >
          <Typography 
            variant='textLink' 
            fontWeight='bold'
          >
            Learn More
          </Typography>
        </Button>
      </Box>
    </PaperBox>
  );
}

export default DetailCard;
