import React from 'react'
import PublicContainer from 'common/Container'
import { Box, Button, Container, Grid, Typography, Checkbox, useTheme } from "@mui/material";
import background from 'common/icons/backgrounds/Group.svg'
import styles from './index.module.scss'

const HeroSection = () => {
    const theme = useTheme();
    return (
        <Box
            bgcolor={theme.palette.common.backgroundBlue}
            py={13}
            px={2}
            className={styles.background}
        >
            <Container maxWidth='lg'>
                <Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        gap={{ xs: 2, md: 4 }}
                    >
                        <Typography
                            fontFamily={'"Poppins", sans-serif'}
                            variant="h1"
                            align="center"
                            // gutterBottom
                            sx={{ color: 'white', fontSize: { xs: '40px', sm: '48px', md: '48px', lg: '56px', xl: '64px' }, lineHeight: 'normal', fontWeight: 700, textAlign: "center" }}>
                            Looking for more?
                        </Typography>
                        <Typography
                            component={'p'}
                            fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
                            fontWeight={400}
                            align="center"
                            color={'white'}
                            fontFamily={'"Poppins", sans-serif'}
                            lineHeight={{ xs: 'auto', md: '36px' }}
                        >
                            Visit our Help Center or reach out to our support team for personalized assistance.
                        </Typography>
                        {/* <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Button sx={{ height: { lg: '56px' }, fontSize: { lg: '20px' } }} align="center" variant="contained" size="large" color="pinkWhite">
                                Get a demo
                            </Button>
                        </Box> */}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default HeroSection