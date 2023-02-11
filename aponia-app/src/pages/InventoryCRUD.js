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
    IconButton
} from '@mui/material';
import Toaster from '../hooks/useToast';
/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { getInventory, createInventory, deleteInventory } from '../services/inventory/inventoryAPI';
import { getMedicine } from '../services/medicine/medicineAPI';

const invObject = [
  {
    SID:'',
    MID:'',
    quantity:'',
  },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function InventoryCRUD() {
  const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
  const [exists, setExists] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState('');
  const [medCode, setMedCode] = React.useState('');
  const [medicine, setMedicine] = React.useState([]);
  const [medQty, setMedQty] = React.useState('');
  const ActiveSID = JSON.parse(localStorage.getItem('@user'))?.SID
  
  const handleReload = () => {
    setSearchParams('')
  }

  const handleSearchParams = (event) => {
    let value = event.target.value
    value === null ? setSearchParams('') : 
    setSearchParams(value)
  }

  const handleMedCode = (event) => { 
    let value = event.target.value
    setMedCode(value)
  }

  const handleSearchButton = () => {
    if (searchParams === '') {
      showWarningToast(`Debe ingresar el código de la medicina a buscar`)
    } else {
      try{
        getMedicine(searchParams)
          .then((res)=>{
            setMedicine(res || [])
            setMedCode(res.code)
            showInfoToast(`Se encontró la medicina con código ${res.code} en la base de datos.`)
            getInventory(ActiveSID,res.MID)
            .then((resp)=>{
              setMedQty(resp.quantity)
            })
            .catch((er)=>{
              console.log(`Error al obtener existencias: ${er}`)
              showErrorToast(`Ocurrió un error fatal al obtener las existencias. Limpiando el formulario.`)
              handleCleanUp()
            })
            setSearched(true)
            setExists(true)
            console.log(res)
          })
          .catch((err)=>{
            console.log(`Error en la búsqueda: ${err}`)
            showErrorToast(`No se encontró la medicina con código ${searchParams} en la base de datos.`)
          })
      } catch(error){
        console.log(`Search error: ${error}`)
			  showErrorToast('Ocurrió un eror en la búsqueda.')
      }
    }
  }

  const handleMedQty = (event) => {
    let value = event.target.value
    value < 0 ? value = 0 : 
    value > 9999999999 ? value = medQty :
    setMedQty(value)
  }

  const handleSubmit = () => {
    if (medCode==='' || medQty===''){
      showWarningToast(`Faltan datos por llenar en el formulario.`)
    } else {
        try{
          createInventory({ SID: ActiveSID,
                          MID: medicine.MID,
                          quantity: medQty,})
            .then((res)=>{
              showSuccessToast(`Se registraron las existencias de la medicina con código ${medCode} exitosamente.`)
              console.log(`Submit successful: ${res}`)
              handleCleanUp()
            })
            .catch((err)=>{
              showWarningToast(`Ya existe un inventario con el código ${medCode}.`)
              console.log(`Submit error: ${err}`)
            })
        } catch(error){
          console.log(`Submit error: ${error}`)
          showErrorToast('Ocurrió un eror al guardar los datos.')
        }
    }
  }

  const handleDeletion = () => {
    try{
      deleteInventory(ActiveSID,medicine.MID)
        .then((res)=>{
          showSuccessToast(`Existencias de la medicina ${medCode} eliminadas del inventario con éxito.`)
          console.log(`Delete successful: ${res}`)
          handleCleanUp()
        })
        .catch((err)=>{
          showWarningToast(`Ocurrió un error al eliminar del inventario la medicina ${medCode}.`)
          console.log(`Delete error: ${err}`)
        })
    } catch(error){
      console.log(`Delete error: ${error}`)
      showErrorToast('Ocurrió un eror al eliminar el inventario.')
    }
  }


  const handleCleanUp = () => {
    setSearchParams('')
    setMedCode('')
    setMedQty('')
    setMedicine([])
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
                placeholder="Buscar por código de medicina"
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
              <Tooltip title="Reset">
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
        Inventario de Medicinas
      </Typography>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="space-evenly" columns="18">
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Código de Medicina</InputLabel>
                    <OutlinedInput
                        id="inventory-medicine-code"
                        value={medCode}
                        onChange={handleMedCode}
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
                    <InputLabel>Cantidad en inventario</InputLabel>
                    <OutlinedInput
                        id="inventory-qty"
                        type="number"
                        value={medQty}
                        onChange={handleMedQty}
                        endAdornment={
                        <InputAdornment position="end">
                            <WorkspacesIcon />
                        </InputAdornment>
                        }
                        label="Cantidad en inventario"
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