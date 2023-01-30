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
/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [searchParams, setSearchParams] = React.useState('');
  const [medCode, setMedCode] = React.useState('');
  const [medDesc, setMedDesc] = React.useState('');
  const [presentation, setPresentation] = React.useState('');
  
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
    searchParams === null ? setMedCode('') : 
    setMedCode(searchParams)
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
  const handleCleanUp = () => {
    setSearchParams('')
    setMedCode('')
    setMedDesc('')
    setPresentation('')
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
              <Button variant="contained" onClick={handleSearchButton} sx={{ mr: 1 }}>
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
                <Button variant="contained" startIcon={<SaveIcon />}>  Guardar </Button>
            </Grid>
        </Grid>
    </Paper>
  );
}