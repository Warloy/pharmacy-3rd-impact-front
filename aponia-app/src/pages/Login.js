import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import {ReactComponent as MitraLockup} from './icons/mitra-lockup.svg';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			{new Date().getFullYear()}
			{' Mitra C.A'}
		</Typography>
	);
}

const theme = createTheme();

export default function Login() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			username: data.get('username'),
			password: data.get('password'),
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/* <SvgIcon component={MitraLockup} viewBox="0 0 564.03 191.07" sx={{ width: '100%', height: '100%' }}/> */}
					<Typography component="h1" variant="h5">
						Iniciar sesión
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							fullWidth
							id="username"
							label="Usuario"
							name="username"
							autoComplete="off"
							autoFocus
						/>
						<TextField
							margin="normal"
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							autoComplete="off"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Entrar
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}