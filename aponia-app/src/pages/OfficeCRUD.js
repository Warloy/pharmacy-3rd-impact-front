import * as React from 'react';
import { AppBar, 
    styled,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    Tooltip,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
/* Icons */
import Toaster from '../hooks/useToast';

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
  const {showInfoToast, showWarningToast} = Toaster()
  const [searchParams, setSearchParams] = React.useState('');
  const [officeCode, setOfficeCode] = React.useState('');

  const loadForm = (event) => {  
  }
  const handleReload = () => {
    setSearchParams('')
  }
  const handleSearchParams = (event) => {
    let value = event.target.value
    value === null ? setSearchParams('') : 
    setSearchParams(value)
  }
  const handleSearchButton = () => {
    if (searchParams === '') {
      showWarningToast(`Debe ingresar el código a buscar`)
    } else {
      
    }
    
    searchParams === null ? setOfficeCode('') : 
    setOfficeCode(searchParams)
  }
  const handleOfficeCode = (event) => {
    let value = event.target.value
    setOfficeCode(value)
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
                autoFocus
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
                        onChange={handleOfficeCode}
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