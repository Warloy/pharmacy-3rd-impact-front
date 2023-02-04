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
import { getLab, createLab, deleteLab, updateLab } from '../services/laboratory/laboratoryAPI'

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

export default function LaboratoryCRUD() {
  const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
  const [exists, setExists] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState('');
  const [laboratory, setLaboratory] = React.useState([]);
  const [labRIF, setLabRIF] = React.useState('');
  const [labName, setLabName] = React.useState('');
  const [labAddress, setLabAddress] = React.useState('');
  const [labPhone, setLabPhone] = React.useState('');

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
      showWarningToast(`Debe ingresar el RIF a buscar`)
    } else {
      try{
        getLab(searchParams)
          .then((res)=>{
            setLaboratory(res || [])
            setLabRIF(res.RIF)
            setLabName(res.name)
            setLabAddress(res.address)
            setLabPhone(res.phone)
            showSuccessToast(`Se encontró un laboratorio con RIF ${searchParams}.`)
            setSearched(true)
            setExists(true)
            console.log(res)
          })
          .catch((err)=>{
            console.log(`Error en la búsqueda: ${err}`)
            setLabRIF(searchParams)
            setSearched(true)
            showInfoToast(`No se encontró un laboratorio con RIF ${searchParams}. Creando un nuevo registro.`)
          })
      } catch(error){
        console.log(`Search error: ${error}`)
			  showErrorToast('Ocurrió un eror en la búsqueda.')
      }
    }
  }
  const handleLabRIF = (event) => { 
    let value = event.target.value
    setLabRIF(value)
  }
  const handleLabName = (event) => { 
    let value = event.target.value
    setLabName(value)
  }
  const handleLabAddress = (event) => {
    let value = event.target.value
    setLabAddress(value);
  }
  const handleLabPhone = (event) => {
    let value = event.target.value
    setLabPhone(value);
  }
  const handleSubmit = () => {
    if (labName==='' || labAddress==='' || labPhone===''){
      showWarningToast(`Faltan datos por llenar en el formulario.`)
    } else {
      if (!exists){
        try{
          createLab({RIF: labRIF,
                          name: labName,
                          address: labAddress,
                          phone: labPhone})
            .then((res)=>{
              showSuccessToast(`Laboratorio ${labRIF} registrado exitosamente.`)
              console.log(`Submit successful: ${res}`)
              handleCleanUp()
            })
            .catch((err)=>{
              showWarningToast(`Ya existe un laboratorio con el RIF ${labRIF}.`)
              console.log(`Submit error: ${err}`)
            })
        } catch(error){
          console.log(`Submit error: ${error}`)
          showErrorToast('Ocurrió un eror al guardar los datos.')
        }
      } else {
        try{
          updateLab(laboratory.LID, {RIF: labRIF,
                                            name: labName,
                                            address: labAddress,
                                            phone: labPhone})
            .then((res)=>{
              showSuccessToast(`Laboratorio ${labRIF} actualizado exitosamente.`)
              console.log(`Submit successful: ${res}`)
              handleCleanUp()
            })
            .catch((err)=>{
              showWarningToast(`Ocurrió un error al modificar el laboratorio ${labRIF}.`)
              console.log(`Submit error: ${err}`)
            })
        } catch(error){
          console.log(`Submit error: ${error}`)
          showErrorToast('Ocurrió un eror al guardar los datos.')
        }
      }
    }
  }
  const handleDeletion = () => {
    try{
      deleteLab(laboratory.LID)
        .then((res)=>{
          showSuccessToast(`Laboratorio ${labRIF} eliminado exitosamente.`)
          console.log(`Delete successful: ${res}`)
          handleCleanUp()
        })
        .catch((err)=>{
          showWarningToast(`Ocurrió un error al eliminar el laboratorio ${labRIF}.`)
          console.log(`Delete error: ${err}`)
        })
    } catch(error){
      console.log(`Delete error: ${error}`)
      showErrorToast('Ocurrió un eror al eliminar el laboratorio.')
    }
  }
  const handleCleanUp = () => {
    setSearchParams('')
    setLabRIF('')
    setLabName('')
    setLabAddress('')
    setLabPhone('')
    setLaboratory([])
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
                placeholder="Buscar por RIF"
                value={searchParams}
                onChange={handleSearchParams}
                autoFocus
                inputProps={{maxlength:15}}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Tooltip title="Reset">
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
                Gestión de laboratorios de medicina
      </Typography>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="space-evenly" columns="18">
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>RIF</InputLabel>
                    <OutlinedInput
                        id="lab-rif"
                        value={labRIF}
                        onChange={handleLabRIF}
                        disabled
                        inputProps={{maxlength:15}}
                        endAdornment={
                        <InputAdornment position="end">
                            <QrCode2Icon />
                        </InputAdornment>
                        }
                        label="Código"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Nombre</InputLabel>
                    <OutlinedInput
                        id="lab-name"
                        value={labName}
                        onChange={handleLabName}
                        inputProps={{maxlength:50}}
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
                    <InputLabel>Dirección</InputLabel>
                    <OutlinedInput
                        id="lab-address"
                        value={labAddress}
                        onChange={handleLabAddress}
                        inputProps={{maxlength:100}}
                        multiline
                        maxRows='1'
                        endAdornment={
                        <InputAdornment position="end">
                            <DirectionsBikeIcon />
                        </InputAdornment>
                        }
                        label="Dirección"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Teléfono</InputLabel>
                    <OutlinedInput
                        id="lab-phone"
                        value={labPhone}
                        onChange={handleLabPhone}
                        inputProps={{maxlength:15}}
                        endAdornment={
                        <InputAdornment position="end">
                            <PhoneAndroidIcon />
                        </InputAdornment>
                        }
                        label="Teléfono"
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