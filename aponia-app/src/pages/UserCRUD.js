import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ClassIcon from '@mui/icons-material/Class';

const categories = [
    {
        value:0,
        label:"Administrador"
    },
    {
        value:1,
        label:"Agente"
    },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function UserCRUD() {
    const [userType, setUserType] = React.useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
    };
    return (
    <Paper elevation='0' sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Buscar por cédula"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Buscar
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Gestión de Usuarios
      </Typography>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="space-evenly" columns="18">
          <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Correo</InputLabel>
                    <OutlinedInput
                        id="user-mail"
                        endAdornment={
                        <InputAdornment position="end">
                            <AlternateEmailIcon />
                        </InputAdornment>
                        }
                        label="Correo"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Contraseña</InputLabel>
                    <OutlinedInput
                        id="user-password"
                        endAdornment={
                        <InputAdornment position="end">
                            <KeyIcon />
                        </InputAdornment>
                        }
                        label="Contraseña"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Cédula</InputLabel>
                    <OutlinedInput
                        id="user-identification"
                        endAdornment={
                        <InputAdornment position="end">
                            <BadgeIcon />
                        </InputAdornment>
                        }
                        label="Cédula"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Código de Sucursal</InputLabel>
                    <OutlinedInput
                        id="user-office-code"
                        endAdornment={
                        <InputAdornment position="end">
                            <QrCode2Icon />
                        </InputAdornment>
                        }
                        label="Código de Sucursal"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Nombre</InputLabel>
                    <OutlinedInput
                        id="user-name"
                        endAdornment={
                        <InputAdornment position="end">
                            <DriveFileRenameOutlineIcon />
                        </InputAdornment>
                        }
                        label="Nombre"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Apellido</InputLabel>
                    <OutlinedInput
                        id="user-last-name"
                        endAdornment={
                        <InputAdornment position="end">
                            <DriveFileRenameOutlineIcon />
                        </InputAdornment>
                        }
                        label="Apellido"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Teléfono</InputLabel>
                    <OutlinedInput
                        id="user-phone"
                        endAdornment={
                        <InputAdornment position="end">
                            <PhoneAndroidIcon />
                        </InputAdornment>
                        }
                        label="Teléfono"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
               <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Tipo de usuario</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="user-type"
                        value={userType}
                        label="Tipo de usuario"
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="start">
                                <ClassIcon />
                            </InputAdornment>
                        }
                    >
                        <MenuItem disabled value="">
                            <em>Seleccione el tipo de usuario</em>
                        </MenuItem>
                        {categories.map(({value,label}) => (
                            <MenuItem key={value} value={label}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="flex-end" columns="18" sx={{width:0.95}}>
            <Grid item xs={4} md={2} sx={{ my: 5, mx: 2, width:1 }}>
                <Button variant="contained" startIcon={<CancelIcon />}>  Cancelar </Button>
            </Grid>
            <Grid item xs={4} md={2} sx={{ my: 5, mx: 2, width:1 }}>
                <Button variant="contained" startIcon={<SaveIcon />}>  Guardar </Button>
            </Grid>
        </Grid>
    </Paper>
  );
}