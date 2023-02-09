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
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
import Toaster from '../hooks/useToast';
import { getMedicine, createMedicine, deleteMedicine, updateMedicine } from '../services/medicine/medicineAPI'

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = [
    {
        value:"Jarabe"
    },
    {
        value:"Comprimidos"
    },
    {
        value:"Grageas"
    },
    {
        value:"Cápsulas"
    },
    {
        value:"Polvos"
    },
    {
        value:"Píldoras"
    },
    {
        value:"Ampollas/viales"
    },
    {
        value:"Insulina"
    },
]

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CatalogCRUD() {
  const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
  const [exists, setExists] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState('');
  const [medicine, setMedicine] = React.useState([]);
  const [medCode, setMedCode] = React.useState('');
  const [medDesc, setMedDesc] = React.useState('');
  const [presentation, setPresentation] = React.useState('');

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
        getMedicine(searchParams)
          .then((res)=>{
            setMedicine(res || [])
            setMedCode(res.code)
            setMedDesc(res.desc)
            setPresentation(res.presentation)
            showSuccessToast(`Se encontró medicina con código ${searchParams}.`)
            setSearched(true)
            setExists(true)
            console.log(res)
          })
          .catch((err)=>{
            console.log(`Error en la búsqueda: ${err}`)
            setMedCode(searchParams)
            setSearched(true)
            showInfoToast(`No se encontró medicina con código ${searchParams}. Creando un nuevo registro.`)
          })
      } catch(error){
        console.log(`Search error: ${error}`)
			  showErrorToast('Ocurrió un eror en la búsqueda.')
      }
    }
  }
  const handleMedCode = (event) => { 
    let value = event.target.value
    setMedCode(value)
  }
  const handleMedDesc = (event) => { 
    let value = event.target.value
      setMedDesc(value)
  }
  const handlePresentationList = (event) => {
    let value = event.target.value
      setPresentation(value);
  }
  const handleSubmit = () => {
    if (medDesc==='' || presentation===''){
      showWarningToast(`Faltan datos por llenar en el formulario.`)
    } else {
      if (!exists){
        try{
          createMedicine({code: medCode,
                          desc: medDesc,
                          presentation: presentation})
            .then((res)=>{
              showSuccessToast(`Medicina ${medCode} registrada exitosamente.`)
              console.log(`Submit successful: ${res}`)
              handleCleanUp()
            })
            .catch((err)=>{
              showWarningToast(`Ya existe una medicina con el código ${medCode}.`)
              console.log(`Submit error: ${err}`)
            })
        } catch(error){
          console.log(`Submit error: ${error}`)
          showErrorToast('Ocurrió un eror al guardar los datos.')
        }
      } else {
        try{
          updateMedicine(medicine.MID, {code: medCode,
                          desc: medDesc,
                          presentation: presentation})
            .then((res)=>{
              showSuccessToast(`Medicina ${medCode} actualizada exitosamente.`)
              console.log(`Submit successful: ${res}`)
              handleCleanUp()
            })
            .catch((err)=>{
              showWarningToast(`Ocurrió un error al modificar la medicina ${medCode}.`)
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
      deleteMedicine(medicine.MID)
        .then((res)=>{
          showSuccessToast(`Medicina ${medCode} eliminada exitosamente.`)
          console.log(`Delete successful: ${res}`)
          handleCleanUp()
        })
        .catch((err)=>{
          showWarningToast(`Ocurrió un error al eliminar la medicina ${medCode}.`)
          console.log(`Delete error: ${err}`)
        })
    } catch(error){
      console.log(`Delete error: ${error}`)
      showErrorToast('Ocurrió un eror al eliminar la medicina.')
    }
  }
  const handleCleanUp = () => {
    setSearchParams('')
    setMedCode('')
    setMedDesc('')
    setPresentation('')
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
                placeholder="Buscar por código"
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
        Catálogo de Medicinas
      </Typography>
        <Grid container direction="row" rowSpacing={2} columnSpacing={2} alignItems="center" justifyContent="space-evenly" columns="18">
            <Grid item xs={10} md={8}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Código</InputLabel>
                    <OutlinedInput
                        id="catalog-code"
                        value={medCode}
                        onChange={handleMedCode}
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
                    <InputLabel>Descripción</InputLabel>
                    <OutlinedInput
                        id="catalog-desc"
                        value={medDesc}
                        onChange={handleMedDesc}
                        inputProps={{maxlength:100}}
                        multiline
                        maxRows='1'
                        endAdornment={
                        <InputAdornment position="end">
                            <DescriptionIcon />
                        </InputAdornment>
                        }
                        label="Descripción"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={10} md={8}>
               <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Presentación</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="catalog-presentation"
                        value={presentation}
                        label="Presentación"
                        onChange={handlePresentationList}
                        endAdornment={
                            <InputAdornment position="start">
                                <MedicationIcon />
                            </InputAdornment>
                        }
                    >
                        <MenuItem disabled value="">
                            <em>Seleccione la presentación</em>
                        </MenuItem>
                        {categories.map(({value}) => (
                            <MenuItem key={value} value={value}>{value}</MenuItem>
                        ))}
                    </Select>
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