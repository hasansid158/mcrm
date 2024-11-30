import React from "react";
import { Box, Button, Container, Grid, Stack, Typography, Checkbox } from "@mui/material";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PublicContainer from "common/Container";
import CheckIcon from '@mui/icons-material/Check';
import CheckedIcons from "common/icons/CheckedIcons";
import Features from "./components/Features";
import Benefits from "./components/Benefits";
import Information from "./components/Information";
import HeroSection from "./components/HeroSection";
// import "./homepage.css";

const HomePage = () => (
    <Box>
        <Stack mb={8}>
            <Stack>
                <HeroSection />
                <Benefits />
            </Stack>
            <Stack>
                <Information />
            </Stack>
            <Stack mt={8}>
                <Features />
            </Stack>
        </Stack>
    </Box>
);

export default HomePage;
