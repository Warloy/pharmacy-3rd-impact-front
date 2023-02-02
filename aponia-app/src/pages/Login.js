import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import {ReactComponent as MitraLockup} from './icons/mitra-lockup.svg';

import { login } from '../services/auth/authService'
import { setSession } from '../services/jwt';
import useAuthContext from '../hooks/useAuthContext';
import useLoading from '../hooks/useLoading';

const theme = createTheme();

export default function Login() {

	const { dispatch } = useAuthContext()
	const { startLoading, stopLoading, isLoading } = useLoading()

	const handleSubmit = async (event) => {
		startLoading()
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);

			const email = data.get('email')
			const password = data.get('password')

			const { Data } = await login({
				mail: email,
				password: password
			})

			if (Data?.token) {

				const userData = {
					name: Data?.name,
					email: email,
					type: Data?.type?.toString()
				}

				setSession(Data?.id, Data?.token, userData)

				localStorage.setItem('@id', Data?.id)
				localStorage.setItem('@token', Data?.token)
				localStorage.setItem('@user', JSON.stringify(userData))

				dispatch({
					type: 'LOGIN',
					payload: {
						user: {
							id: Data?.id,
							token: Data?.token,
							...userData
						}
					}
				})

				console.log(`${Data?.name} logged in`)



			}

		} catch (error) {
			console.log(`Login error: ${error}`)
		}

		stopLoading()

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
							id="correo"
							label="Correo Electrónico"
							name="email"
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
							disabled={isLoading}
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Entrar
						</Button>
					</Box>
				</Box>

			</Container>
		</ThemeProvider>
	);
}