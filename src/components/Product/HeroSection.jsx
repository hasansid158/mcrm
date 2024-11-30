import React from 'react'
import { Container, Typography, useTheme, Box } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import PublicContainer from "common/Container";
import Carousal1 from 'common/Images/HomeCarousal/CarousalImage1.jpeg'
import { mt } from 'date-fns/locale';

const HeroSection = () => {

    const theme = useTheme()
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ backgroundColor: theme.palette.common.backgroundDarkBlue, position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        height: { xs: '70%', sm: '60%', md: '50%' },
                        backgroundColor: '#F7F8FC'
                    }}>
                </Box>

                <PublicContainer>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        sx={{ zIndex: 2, position: 'relative', py: { xs: 6, md: 10 } }}
                    >
                        <Typography
                            sx={{ textAlign: 'center', fontWeight: 600, color: '#11100F', lineHeight: { xs: 'normal', md: '78px' }, fontSize: { xs: '38px', sm: '42px', md: '48px', lg: '54px', xl: '60px' }, mb: { xs: 6, md: 10 } }}>
                            Build Excellent Customer Relationships
                        </Typography>

                        <Box
                            width={'100%'}
                        >
                            <img style={{ borderRadius: '30px', width: '100%' }} src={Carousal1} alt="dashboard" />
                        </Box>
                    </Box>
                </PublicContainer>
            </Box>
        </Box>
    )
}

export default HeroSection