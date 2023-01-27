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
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function OfficeCRUD() {
  const [searchParams, setSearchParams] = React.useState('');
  const [officeCode, setOfficeCode] = React.useState('');

  const loadForm = (event) => {  
  }
  const handleReload = () => {
    setSearchParams('')
  }
  const handleSearchParams = (event) => {
    event.target.value === null ? setSearchParams('') : 
    setSearchParams(event.target.value)
  }
  const handleSearchButton = () => {
    searchParams === null ? setOfficeCode('') : 
    setOfficeCode(searchParams)
  }
  const handleCleanUp = () => {
    setSearchParams('')
    setOfficeCode('')
  }
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
                placeholder="Buscar por código de sucursal"
                value={searchParams}
                onChange={handleSearchParams}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Tooltip title="Reload">
                <IconButton onClick={handleReload}>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
              <Button variant="contained" onClick={handleSearchButton} sx={{ mr: 1 }}>
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        Gestión de Sucursales
      </Typography>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="space-evenly" columns="18">
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Código de Sucursal</InputLabel>
                    <OutlinedInput
                        id="office-code"
                        value={officeCode}
                        disabled
                        endAdornment={
                        <InputAdornment position="end">
                            <QrCode2Icon />
                        </InputAdornment>
                        }
                        label="Código de Sucursal"
                    />
                </FormControl>
            </Grid>
        </Grid>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="flex-end" columns="18" sx={{width:0.95}}>
            <Grid item xs={4} md={2} sx={{ my: 5, mx: 2, width:1 }}>
                <Button variant="contained" onClick={handleCleanUp} startIcon={<CancelIcon />}>  Cancelar </Button>
            </Grid>
            <Grid item xs={4} md={2} sx={{ my: 5, mx: 2, width:1 }}>
                <Button variant="contained" startIcon={<SaveIcon />}>  Guardar </Button>
            </Grid>
        </Grid>
    </Paper>
  );
}