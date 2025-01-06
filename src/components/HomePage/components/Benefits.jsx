import React from "react";
import { Box, Button, Container, Grid, Typography, Checkbox, Card } from "@mui/material";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PublicContainer from "common/Container";
import CheckIcon from '@mui/icons-material/Check';
import CheckedIcons from "common/icons/CheckedIcons";
import CheckedRoundIcon from "common/icons/CheckedRoundIcon";
import { useTheme } from "@mui/material";

const featuresList = [
    {
        title: 'Seamless Lead and Contact Management',
        description: 'Efficiently manage leads and contacts with comprehensive profiles, interactive dashboards, and seamless updates to maintain accurate and up-to-date information.',
    },
    {
        title: 'Enhanced Deal Pipeline Visibility',
        description: 'Monitor and progress deals through various stages with real-time updates, ensuring that you can track and optimize your sales process effectively.',
    },
    {
        title: 'Powerful Al-Driven Analytics',
        description: 'Leverage Al for predictive lead scoring and customer behavior analysis to uncover future sales opportunities, optimize pricing strategies, and enhance user experience.',
    },
    {
        title: 'Comprehensive Customizable Reporting',
        description: 'Generate insightful, customizable reports across various metrics such as leads, sales, and product performance, providing you with the data needed to make informed business decisions.',
    },

]

const MarketingCard = ({ details }) => {

    const theme = useTheme();

    return (
        < Box
            border={1}
            borderColor="#D0D3D6"
            borderRadius="20px"
            backgroundColor='#FAFAFA'
            display={'flex'}
            alignItems={'flex-start'}
            flexDirection={'column'}
            component={Card}
            height={'100%'}
            gap={2}
            p={4}
        >
            <Box>
                <Box sx={{ bgcolor: theme.palette.common.backgroundBlue, p: 1.5, borderRadius: 2, width: {xs: '50px', sm: '60px', md: '80px'}, height: {xs: '50px', sm: '60px', md: '80px'}}}>
                    <CheckedRoundIcon />
                </Box>
            </Box>
            <Typography
                component={'p'}
                fontWeight={600}
                lineHeight={'32px'}
                fontSize={{ xs: '24px', sm: '28px', md: '32px' }}
                fontFamily={'"Poppins", sans-serif'}
                color={'secondary'}
            >
                {details?.title}
            </Typography>
            <Typography
                component={'p'}
                fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
                fontWeight={400}
                fontFamily={'"Poppins", sans-serif'}
            >
                {details?.description}
            </Typography>


        </Box >
    )

};

const Benefits = () => {
    return (
        <Box sx={{ bgcolor: '#F7F8FC', pb: 8 }}>
            <PublicContainer>
                <Typography
                    fontFamily={'"Poppins", sans-serif'}
                    color={'secondary'}
                    variant="h1"
                    align="center"
                    // gutterBottom
                    sx={{ fontSize: { xs: '30px', sm: '36px', md: '42px', lg: '48px' }, fontWeight: 700, textAlign: "center", pb: { xs: 3, sm: 6 } }}>
                    Benefits of Master CRM
                </Typography>
                <Grid container spacing={3}>
                    {featuresList.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <MarketingCard details={feature} />
                        </Grid>
                    ))}
                </Grid>
            </PublicContainer>
        </Box>

    )
};

export default Benefits;
