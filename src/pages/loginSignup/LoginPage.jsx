import React, { useState, useEffect } from 'react';
import theme from 'core/theme';
import { otherRoutes } from '../../enum/routesEnum';

import Login from './Login';
import Signup from './Signup';
import SideHero from './SideHero';

import { Grid, Box } from '@mui/material';

import master_crm_logo from 'components/assets/master-crm-logo.png';

import useScreenSize from 'hooks/useScreenSize';
import { transitions } from 'core/animations'

import PaperBox from 'common/ui/PaperBox';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const nav = useNavigate();
	const { isMobile } = useScreenSize();

	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		setActiveLink(window && window.location ? window.location.pathname : "");
	}, []);

	return (
		<>
			<Grid container direction={{ xs: 'column-reverse', md: 'row' }}>

				<Grid item md={6} xs={12}>
					<SideHero />
				</Grid>

				<Grid item md={6} xs={12}>
					<Box sx={{
						background: theme.palette.common.background,
						// pt: isMobile ? 4 : 15,
						pb: 4,
						px: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: { xs: '600px', md: '100vh' },
						height: '100%',
						transition: transitions().short,

					}}>
						{/* <Box
							component='img'
							src={master_crm_logo}
							width='120px'
							mb={2.5}
							onClick={() => nav('/')}
							sx={{
								cursor: 'pointer'
							}}

						/> */}
						<Box
							sx={{
								py: 3,
								px: isMobile ? 2 : 3,
								// width: isMobile ? '100%' : '380px',
								transition: transitions().short,
								// boxShadow: `0px 0px 6px ${theme.palette.secondary.light}`
								width: '100%'
							}}
						>
							<Login />
						</Box>
					</Box>
				</Grid>


			</Grid>
		</>
	);
};

export default LoginPage;
