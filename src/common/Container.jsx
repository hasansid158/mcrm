import React from 'react'
import Container from '@mui/material/Container'


const PublicContainer = ({ children }) => {
    return (
        <Container
            // maxWidth={{ lg: 'lg', xl: 'xl' }}
            maxWidth={'xl'}
            // sx={{ mt: '48px', bgcolor:'red' }}


        >
            {children}
        </Container>
    )
}

export default PublicContainer