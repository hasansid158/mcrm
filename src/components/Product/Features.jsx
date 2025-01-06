import React from 'react'
import Product1 from 'common/Images/ProductPage/product_1.jpeg'
import Product2 from 'common/Images/ProductPage/product_2.jpeg'
import Product3 from 'common/Images/ProductPage/product_3.jpeg'
import Product4 from 'common/Images/ProductPage/product_4.jpeg'
import Product5 from 'common/Images/ProductPage/product_5.jpeg'
import Product6 from 'common/Images/ProductPage/product_6.jpeg'
import Product7 from 'common/Images/ProductPage/product_7.jpeg'
import Product8 from 'common/Images/ProductPage/product_8.jpeg'
import CheckedIcons from 'common/icons/CheckedIcons'
import { Box, Grid, Typography } from '@mui/material'
import PublicContainer from 'common/Container'


const featuresList = [
    {
        title: `Lead Management`,
        features: [
            'Add new leads manually or import leads from external sources.',
            'View a lead details, including contact information and lead source.',
            'Modify lead information and status based on interactions.',
            'Remove irrelevant or duplicate leads.',
            'Associations quotes, deals.'
        ],
        img: Product1
    },
    {
        title: 'Contact Management',
        features: [
            'Add new contacts and associate them with relevant accounts.',
            'Access comprehensive contact profiles with communication history.',
            'Modify contact details and preferences.',
            'Remove obsolete contacts and Interactive filterable dashboard.',
            'Meeting scheduling, Task, Activities, Powered by Interactive Calendar.'
        ],
        img: Product2
    },
    {
        title: 'Deal Pipeline',
        features: [
            'Add new deals with relevant details, such as deal stage and expected revenue.',
            'Monitor the status and progress of each deal in the pipeline.',
            'Move deals through different stages and update deal information.',
            'Remove deals that are no longer relevant.',
            'Relationship to Leads, quotes, contact, meetings, Customers.'
        ],
        img: Product3
    },
    {
        title: 'Quotes',
        features: [
            'Generate quotes for products or services.',
            'View and compare multiple quotes.',
            'Modify quote details based on negotiations.',
            'Remove outdated or cancelled quotes.',
            'Associated to Products, Deals and Services.'
        ],
        img: Product4
    },
    {
        title: 'Project And Customer Management',
        features: [
            'Add new customer Projects and organizations',
            'Access detailed account profiles, including transaction history.',
            'Modify account information and preferences.',
            'Deactivate or remove obsolete project and Customers.',
            '360 Degree association all activities related to the account.',
        ],
        img: Product5
    },
    {
        title: 'Orders Management',
        features: [
            'Generate Sales, Work, Purchase orders for products or services.',
            'Access order details, including quantities, pricing, and status.',
            'Modify order details based on changes or negotiations.',
            'Cancel or remove unnecessary orders.',
            'Relationship to products, services, and invoices.',
        ],
        img: Product6
    },
    {
        title: 'Product Management',
        features: [
            'Add new products or services to the catalogues.',
            'View detailed product information and specifications.',
            'Modify product details, pricing, availability and Remove obsolete or discontinued products.',
            'Associate with Assets, quotes, orders, and invoice.',
            'Vendor Management.',
            'HR-(New resource Creation, allocating to Categories, Task Assignment)',
        ],
        img: Product7
    },
    {
        title: 'Inventory & Warehouse Management',
        features: [
            'Add new inventory items, brands and Products.',
            'Access real-time information on inventory, product stock levels.',
            'Modify stock quantities, update product information, and manage orders.',
            'Remove obsolete inventory items or discontinued products.',
            'Asset Processing (receiving, testing, Grading, and storing).',
            'Associates with products, Assets, Stock, Orders tracking, warehouses.',
        ],
        img: Product8
    }
]
const Features = () => {
    return (
        <Box>
            <Box>
                {featuresList.map((details, index) =>
                    <Box backgroundColor={index % 2 === 0 ? '#F7F8FC' : 'white'} py={{ xs: 4, md: 8 }}>
                        <PublicContainer>
                            <Grid container
                                justifyContent="center"
                                alignItems={'center'}
                                direction={{ md: index % 2 === 0 ? 'row-reverse' : 'row' }}
                                spacing={2}
                            >
                                <Grid item xs={12} md={6}>
                                    <Box width={'100%'} height={{ xs: '300px', md: '568px' }}>
                                        <img style={{ borderRadius: '20px', width: '100%', height: 'inherit', objectFit: 'cover' }} src={details.img} alt="dashboard" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Box
                                            p={{ xs: 1, md: 4 }}
                                            pt={{ xs: 2, md: 6 }}
                                        >
                                            <Typography
                                                variant="h1"
                                                component={'h2'}
                                                fontWeight="500"
                                                fontFamily={'"Poppins", sans-serif'}
                                                color={'secondary'}
                                                fontSize={{ xs: '38px', sm: '42px', md: '48px' }}
                                                lineHeight={{ xs: '42px', md: '62.4px' }}
                                                pb={4}
                                                sx={{ width: { xs: '100%', md: details?.title.length < 25 ? '50%' : '100%' } }}
                                            >
                                                {details?.title}
                                            </Typography>
                                            <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
                                                {details.features.map((feature, index) => (
                                                    <Box key={index} sx={{ display: "flex", gap: "10px", paddingY: { xs: "2px", sm: "8px" }, alignItems: 'flex-start' }}>
                                                        <Box sx={{ width: { xs: '27px', md: '40px' }, height: { xs: '27px', md: '40px' } }}>
                                                            <CheckedIcons color={'#FF5538'} />
                                                        </Box>
                                                        <Typography
                                                            color={'secondary'} fontFamily={'"Poppins", sans-serif'}
                                                            variant="h5"
                                                            sx={{ width: '100%' }}
                                                            fontSize={{ xs: '16px', sm: '18px', md: '20px', lg: '20px' }}
                                                            fontWeight={'400'}>{feature}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>

                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </PublicContainer>
                    </Box>
                )}
            </Box>
        </Box >
    )
}

export default Features