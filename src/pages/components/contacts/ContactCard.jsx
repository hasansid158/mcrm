import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Box, IconButton } from '@mui/material';
import { fontSize, height, styled, width } from '@mui/system';
// import { useSelector } from 'react-redux';
// import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';

import { capitalize } from 'lodash';
import ConfirmDialog from 'common/dataDisplay/dialogBox/ConfirmDialog';

import AvatarName from 'common/dataDisplay/AvatarName';

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
//   marginTop: "20px",
  boxShadow: "none",
  border: "1px solid",
  position: "relative",
  borderColor: "secondary.main",
  '&:hover': { cursor: 'pointer' },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const ContactCard = ({
  contact,
  onClick = () => {},
  onDelete = () => {}
}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <>
    <StyledCard
			sx={{
				":hover": {
						boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)'
				}
			}}
			onClick={onClick}
    >
      <IconButton
        onClick={handleDeleteClick} // Trigger delete action on click
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          color: 'gray',
          ':hover': {
            color: 'red',
          },

        }}
      >
        <DeleteIcon />
      </IconButton>
      <Box display="flex" alignItems="center" justifyContent="start" padding='20px 12px 12px 12px' gap={1} flexWrap='wrap'>
        <AvatarName
          name={`${contact.firstName} ${contact.lastName}`}
          sx={{
            width: '40px',
            height: '40px',
            fontSize: '18px',
          }}
        />
        <Box>
          <Box>
            <Typography
              variant='p2'
              color='black'
              fontWeight='500'
              sx={{
                height: '22px',
                ":hover": {
                    background: 'transparent',
                    textDecoration: "underline",
                    cursor: 'pointer'
                }
              }}
            >
            {capitalize(contact.salutation || '')}. {contact.firstName} {contact.lastName}
            </Typography>
          </Box>
          <Typography sx={{
              textTransform: 'capitalize',
              fontSize: '12px',
              textDecoration: 'underline',
            }}
            variant='caption'
            color='primary.main'
          >
              {contact.title}
          </Typography>
        </Box>

      </Box>
      <CardContent sx={{ textAlign: 'left' }}>
        <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{
                fontSize: '2px',
                marginRight: '7px'
            }} color="textSecondary">
                <PhoneRoundedIcon sx={{
                    fontSize: '20px',
                    color: 'secondary.main'
                }}/>
            </Typography>
            <Typography fontSize="13px" variant="body2" color="GrayText">{contact.mobile}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{
                fontSize: '2px',
                marginRight: '7px'
            }} color="textSecondary">
                <LocationCityRoundedIcon sx={{
                    fontSize: '20px',
                    color: 'secondary.main'
                }}/>
            </Typography>
            <Typography  fontSize="13px" variant="body2" color="GrayText">{contact.company}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{
                fontSize: '2px',
                marginRight: '7px'
            }} color="textSecondary">
                <AlternateEmailRoundedIcon sx={{
                    fontSize: '20px',
                    color: 'secondary.main'
                }}/>
            </Typography>
            <Typography fontSize="13px" textTransform='lowercase'  variant="body2" color="GrayText">{contact.email}</Typography>
        </Box>

      </CardContent>
    </StyledCard>
    <ConfirmDialog
    open={isDialogOpen}
    onCancel={() => setIsDialogOpen(false)}
    onConfirm={handleConfirmDelete}
    loading={loading}
  >
    <Typography variant="p">
      Are you sure you want to delete this Contact?
    </Typography>
  </ConfirmDialog>
  </>
  );
};

export default ContactCard;
