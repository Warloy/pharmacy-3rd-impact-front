import * as React from 'react';
import { AppBar, 
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
import Toaster from '../hooks/useToast';
import { getOffice, createOffice, deleteOffice } from '../services/office/officeAPI'

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OfficeCRUD() {
  const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
  const [exists, setExists] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState('');
  const [office, setOffice] = React.useState([]);
  const [officeCode, setOfficeCode] = React.useState('');

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
      try{
        getOffice(searchParams)
          .then((res)=>{
            setOffice(res || [])
            setOfficeCode(res.code)
            showSuccessToast(`Se encontró la sucursal con código ${searchParams}.`)
            setSearched(true)
            setExists(true)
            console.log(res)
          })
          .catch((err)=>{
            console.log(`Error en la búsqueda: ${err}`)
            setOfficeCode(searchParams)
            setSearched(true)
            showInfoToast(`No se encontró la sucursal con código ${searchParams}. Creando un nuevo registro.`)
          })
      } catch(error){
        console.log(`Search error: ${error}`)
			  showErrorToast('Ocurrió un eror en la búsqueda.')
      }
    }
  }
  const handleOfficeCode = (event) => {
    let value = event.target.value
    setOfficeCode(value)
  }
  const handleSubmit = () => {
    try{
      createOffice({code: officeCode,})
        .then((res)=>{
          showSuccessToast(`Sucursal ${officeCode} registrada exitosamente.`)
          console.log(`Submit successful: ${res}`)
          handleCleanUp()
        })
        .catch((err)=>{
          showWarningToast(`Ya existe una sucursal con el código ${officeCode}.`)
          console.log(`Submit error: ${err}`)
        })
    } catch(error){
      console.log(`Submit error: ${error}`)
      showErrorToast('Ocurrió un eror al guardar los datos.')
    }
  }
  const handleDeletion = () => {
    try{
      deleteOffice(office.SID)
        .then((res)=>{
          showSuccessToast(`Sucursal ${officeCode} eliminada exitosamente.`)
          console.log(`Delete successful: ${res}`)
          handleCleanUp()
        })
        .catch((err)=>{
          showWarningToast(`Ocurrió un error al eliminar la sucursal ${officeCode}.`)
          console.log(`Delete error: ${err}`)
        })
    } catch(error){
      console.log(`Delete error: ${error}`)
      showErrorToast('Ocurrió un eror al eliminar la sucursal.')
    }
  }
  const handleCleanUp = () => {
    setSearchParams('')
    setOfficeCode('')
    setOffice([])
    setSearched(false)
    setExists(false)
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
                inputProps={{maxlength:50}}
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
              <Button variant="contained" onClick={handleSearchButton} disabled={searched} sx={{ mr: 1 }}>
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
                        inputProps={{maxlength:50}}
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
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Código de Sucursal</InputLabel>
                    <OutlinedInput
                        id="office-code"
                        value={officeCode}
                        onChange={handleOfficeCode}
                        inputProps={{maxlength:50}}
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
                <Button variant="contained" onClick={handleDeletion} startIcon={<DeleteIcon />} disabled={!exists}>  Eliminar </Button>
            </Grid>
            <Grid item xs={4} md={2} sx={{ my: 5, mx: 2, width:1 }}>
                <Button variant="contained" onClick={handleSubmit} startIcon={<SaveIcon />} disabled={!searched}>  Guardar </Button>
            </Grid>
        </Grid>
    </Paper>
  );
}