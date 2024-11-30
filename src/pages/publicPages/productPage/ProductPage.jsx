import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
import HeroSection from "components/Product/HeroSection";
import Features from "components/Product/Features";
const ProductPage = () => {

    const theme = useTheme();

    return (
        <Box>
            <HeroSection />
            <Features />
        </Box>
    );
};

export default ProductPage;
