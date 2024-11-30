import React from "react";
import { Box, Button, Container, Grid, Typography, Checkbox, Card } from "@mui/material";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PublicContainer from "common/Container";
import CheckIcon from '@mui/icons-material/Check';
import CheckedIcons from "common/icons/CheckedIcons";
// import "./homepage.css";

const features = ["Lead generation", "Marketing automation", "Analytics"];

const featuresList = [
    {
        title: 'Inventory and Warehouse Management',
        description: 'Effectively manage inventory levels, product details, and warehouse status to ensure smooth operations and availability.',
        popular_features:
            ['Add and manage stock levels and product information.',
                'Access real-time information on inventory levels and warehouse status.',
                'Associate inventory with products, orders, and track warehouse movements.']
    },
    {
        title: 'Scheduler and Task Management',
        description: 'Streamline your workflow with an interactive calendar and task management system to keep your team organized and efficient.',
        popular_features:
            ['Schedule meetings and tasks with reminders.',
                'View and manage activities through an interactive calendar.',
                'Assign tasks to team members and track progress.']
    },
    {
        title: 'Vendor and Order Management',
        description: 'Optimize your procurement and sales processes with robust vendor and order management capabilities.',
        popular_features:
            ['Generate and manage sales, purchases, and work orders.', 'Access detailed order information, including quantities, pricing, and status.', 'Modify order details based on changes or negotiations.']
    },
    {
        title: 'Account and Customer Management',
        description: 'Gain a 360-degree view of customer accounts with detailed profiles and transaction history to enhance relationship management.',
        popular_features: [
            'Add and manage customer accounts and organizations.',
            'Access detailed profiles including transaction history and preferences.',
            'Deactivate or remove obsolete accounts to maintain data accuracy.']
    },
    {
        title: 'Product and Catalog Management',
        description: 'Efficiently manage your product catalogue with detailed product information, pricing, and availability to meet market demands.',
        popular_features: ['Add new products or services to the catalogue.',
            'View and update detailed product information and specifications.',
            'Associate products with assets, quotes, orders, and invoices.']
    },
    {
        title: 'Quote Generation and Management',
        description: 'Simplify the process of creating and managing quotes for products and services, ensuring accuracy and efficiency in negotiations.',
        popular_features: [
            'Generate quotes for products or services quickly.',
            'View and compare multiple quotes to find the best options.',
            'Modify quote details based on customer negotiations.']
    },
]

const MarketingCard = ({ details }) => (
    <Box
        border={1}
        borderColor="#D0D3D6"
        borderRadius="20px"
        backgroundColor='#FAFAFA'
        // textAlign="center"
        className="gridItem"
        component={Card}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        p={{ xs: 2, sm: 4 }}
        pt={{ xs: 3, sm: 6 }}
    >
        <Typography
            variant="body2"
            component={'h2'}
            fontWeight="500"
            fontFamily={'"Poppins", sans-serif'}
            color={'secondary'}
            fontSize={{ xs: '24px', sm: '30px', md: '36px' }}
            pb={1}
        >
            {details?.title}
        </Typography>
        <Typography
            component={'p'}
            fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
            fontWeight={400}
            lineHeight={'32px'}
            fontFamily={'"Poppins", sans-serif'}
            mb={2}
        >
            {details?.description}
        </Typography>
        <Typography
            component={'p'}
            variant="h4"
            fontWeight={600}
            lineHeight={'32px'}
            fontFamily={'"Poppins", sans-serif'}
            color={'secondary'}
            fontSize={{ xs: '20px', sm: '22px', md: '24px', lg: '24px' }}
            mb={2}
        >
            Popular Features
        </Typography>
        {
            details.popular_features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", gap: "10px", paddingY: { xs: "5px", sm: "8px" }, alignItems: 'flex-start' }}>
                    <Box sx={{ width: { xs: '27px', md: '40px' }, height: { xs: '27px', md: '40px' } }}>
                        <CheckedIcons color={'#07CCD2'} />
                    </Box>
                    <Typography
                        color={'secondary'}
                        fontFamily={'"Poppins", sans-serif'}
                        fontWeight={'400'}
                        fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
                    >{feature}</Typography>
                </Box>
            ))
        }

        <Button sx={{ mt: 'auto', height: { lg: '56px' }, fontSize: { lg: '20px' } }} fullWidth variant="contained" size="large" color="pinkWhite">
            Learn More
        </Button>

    </Box >
);

const Features = () => {

    return (

        <PublicContainer>
            <Typography
                fontFamily={'"Poppins", sans-serif'}
                color={'secondary'}
                variant="h1"
                align="center"
                // gutterBottom
                sx={{ fontSize: { xs: '30px', sm: '36px', md: '42px', lg: '48px' }, lineHeight: 'auto', fontWeight: 700, textAlign: "center", pb: { xs: 3, sm: 6 } }}>
                Features of Master CRM
            </Typography>
            <Grid container spacing={3}>
                {featuresList.map((feature, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <MarketingCard details={feature} />
                    </Grid>
                ))}
            </Grid>
        </PublicContainer>

    )
};

export default Features;
