import * as React from 'react';
import { AppBar, 
    Toolbar,
    Typography,
    Paper,
    Grid,
    TextField,
    Tooltip,
    FormControl,
    IconButton,
    InputLabel,
    NativeSelect,
    InputAdornment,
    Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import Toaster from '../hooks/useToast';
import { getAllOffices } from '../services/office/officeAPI'

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const columns = [
    { field: 'SCode',
     headerName: 'Sucursal', 
     width: 227,
    },
    {
      field: 'MCode',
      headerName: 'Código',
      width: 227,
    },
    {
      field: 'LName',
      headerName: 'Laboratorio',
      width: 227,
    },
    {
      field: 'MName',
      headerName: 'Nombre',
      width: 227,
    },
    {
      field: 'MPres',
      headerName: 'Presentación',
      width: 227,
    },
    {
      field: 'MQty',
      headerName: 'Cantidad en inventario',
      width: 227,
    },
  ];

export default function Reports() {
  const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
  const [exists, setExists] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState('');
  const [officeList, setOfficeList] = React.useState([])
  const [collection, setCollection] = React.useState([]);
  const location = useLocation();

  React.useEffect(()=>{
    getAllOffices()
    .then((res)=>{
        setOfficeList(res)
    })
    .catch((err)=>{
        console.log(`Ocurrió un error al cargar las oficinas: ${err}`)
    })
  },[])
  const handleSearchParams = (event) => {
    let value = event.target.value
    value === null ? setSearchParams('') : 
    setSearchParams(value)
  }
  const handleSearchFilter = (event) => {
    let value = event.target.value
    value === null ? setSearchParams('') : 
    setSearchFilter(value)
  }
  const handleSearchButton = () => {
    if (searchParams === '') {
      showWarningToast(`Debe ingresar el código a buscar`)
    } else {
      try{
        getAllOffices(searchParams)
          .then((res)=>{
            showSuccessToast(`Se encontró la sucursal con código ${searchParams}.`)
            setSearched(true)
            setExists(true)
            console.log(res)
          })
          .catch((err)=>{
            console.log(`Error en la búsqueda: ${err}`)
            setSearched(true)
            showInfoToast(`No se encontró la sucursal con código ${searchParams}. Creando un nuevo registro.`)
          })
      } catch(error){
        console.log(`Search error: ${error}`)
			  showErrorToast('Ocurrió un eror en la búsqueda.')
      }
    }
  }
  const handleCleanUp = () => {
    setSearchParams('')
    setSearchFilter('')
    setCollection([])
    setSearched(false)
    setExists(false)
  }
    return (
    <Paper elevation='0' sx={{ maxWidth: 1366, margin: 'auto', overflow: 'hidden' }}>
      <Typography sx={{ mt: 5, mb:0, mx: 2 }} color="text.secondary" align="center">
        Reportes
      </Typography>
      <AppBar
        position="static"
        color='transparent'
        elevation={0}
        sx={{ maxWidth: 1366, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        { location.pathname==='/admin/reports/global' ?
        <>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
                <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="standard">
                    <InputLabel>Lista de Sucursales</InputLabel>
                    <NativeSelect
                        labelId="demo-simple-select-label"
                        id="reports-office-list"
                        value={searchParams}
                        label="Lista de Sucursales"
                        onChange={handleSearchParams}
                        endAdornment={
                            <InputAdornment position="start">
                                <QrCode2Icon />
                            </InputAdornment>
                        }
                    >
                        <option value=""></option>
                        {officeList.map(({SID, code}) => (
                            <option key={SID} value={code}>{code}</option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
                <TextField
                    fullWidth
                    placeholder="Buscar por código de medicina"
                    value={searchFilter}
                    onChange={handleSearchFilter}
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
                    <IconButton onClick={handleCleanUp}>
                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                    </IconButton>
                </Tooltip>
            </Grid>
          </Grid>
         </Toolbar>
        </>
        :<>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SearchIcon color="inherit" sx={{ display: 'block' }} />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="Buscar por código de medicina"
                            value={searchFilter}
                            onChange={handleSearchFilter}
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
                            <IconButton onClick={handleCleanUp}>
                                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        </>}
      </AppBar>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={collection}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </Paper>
  );
}