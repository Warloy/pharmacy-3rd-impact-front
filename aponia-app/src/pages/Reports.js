import * as React from 'react';
import {
  AppBar,
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
  Box,
  Button
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Toaster from '../hooks/useToast';
import { getAllOffices, getOffice } from '../services/office/officeAPI'
import { getInventoryList, getInventoryQty } from '../services/inventory/inventoryAPI'
import useLoading from '../hooks/useLoading';
import BasicTable from '../components/NotADataGrid'

/* Icons */
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const columns = ["Código de sucursal", "Nombre de sucursal", "Código de Medicina", "Nombre de laboratorio", "Nombre de medicina", "Presentación", "Cantidad en inventario"];

export default function Reports() {
  const { showErrorToast } = Toaster();
  const [searchParams, setSearchParams] = React.useState('');
  const [searchFilter, setSearchFilter] = React.useState('');
  const [officeList, setOfficeList] = React.useState([])
  const [collection, setCollection] = React.useState([]);
  const location = useLocation();
  const { startLoading, stopLoading, isLoading } = useLoading()
  const [currentPage, setCurrentPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)

  const [totalRows, setTotalRows] = React.useState(0)
  const [currentRows, setCurrentRows] = React.useState(0)
  const [currentRowEnd, setCurrentRowEnd] = React.useState(0)

  const [isLoadingOffices, setIsLoadingOffices] = React.useState(false)

  const type = JSON.parse(localStorage.getItem('@user'))?.type


  const getOfficeList = async () => {
    if (officeList?.length === 0) {
      setIsLoadingOffices(true)
      try {

        const response = await getAllOffices()
        setOfficeList(response)
        setIsLoadingOffices(false)

      } catch (error) {
        showErrorToast(`Ocurrió un error al obtener la lista de las sucursales.`)
        console.log(`Get Offices error: ${error}`)
        setIsLoadingOffices(false)
      }
    }
  }

  const size = 10

  const searchData = async () => {
    startLoading()
    try {

      const ActiveSID = JSON.parse(localStorage.getItem('@user'))?.SID
      const ActiveOffice = await getOffice(ActiveSID)

      const body = {
        pag: currentPage || 0,
        size: size || 10,
        oc: type === '0' ? searchParams : ActiveOffice?.code,
        mc: searchFilter || '',
      }

      const registerCount = await getInventoryQty({ oc: body.oc, mc: body.mc, }) //Amount of registers after applying the filter
      const pageCount = Math.round(Number(registerCount / size)) //Amount of pages after applying the filter
      const currentRowStart = ((currentPage * size) + 1)
      const cre = Math.min(((currentPage + 1) * size), registerCount)
      setCurrentRows(currentRowStart)
      setCurrentRowEnd(cre)
      setTotalRows(registerCount)
      setTotalPages(pageCount)

      const resp = await getInventoryList(body)

      let aux = []

      resp?.map(item => {
        aux?.push({
          ocode: item?.ocode,
          oname: item?.oname,
          mcode: item?.mcode,
          lname: item?.lname,
          mname: item?.mname,
          presentation: item?.presentation,
          quantity: item?.quantity
        })
      })

      setCollection(aux)

      stopLoading()
    } catch (error) {
      showErrorToast(`Ocurrió un error al buscar los datos de la tabla.`)
      console.log(`Search data error: ${error}`)
      stopLoading()
    }
  }

  React.useEffect(() => {
    if (officeList?.length === 0) {
      getOfficeList()
    }
    searchData()
  }, [officeList, currentPage, searchParams, searchFilter])


  const handleSearchParams = (event) => {
    setCollection([])
    setCurrentPage(0)
    setCurrentRows(0)
    setCurrentRowEnd(0)
    setTotalRows(0)
    let value = event.target.value
    value === null ? setSearchParams('') :
      setSearchParams(value)
  }

  const handleSearchFilter = (event) => {
    setCollection([])
    setCurrentPage(0)
    setCurrentRows(0)
    setCurrentRowEnd(0)
    setTotalRows(0)
    let value = event.target.value
    value === null ? setSearchParams('') :
      setSearchFilter(value)
  }

  const handleCleanUp = () => {
    setSearchParams('')
    setSearchFilter('')
  }

  return (
    <Paper elevation='0' sx={{ maxWidth: 1366, margin: 'auto', overflow: 'hidden' }}>
      <Typography sx={{ mt: 5, mb: 0, mx: 2 }} color="text.secondary" align="center">
        Reportes
      </Typography>
      <AppBar
        position="static"
        color='transparent'
        elevation={0}
        sx={{ maxWidth: 1366, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        {location.pathname === '/admin/reports' ?
          <>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <FormControl sx={{ m: 1, width: 1, margin: 'none' }} variant="standard">
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
                      {officeList.map(({ SID, code }) => (
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
                    inputProps={{ maxlength: 50 }}
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
          : <>
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
                    inputProps={{ maxlength: 50 }}
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
      <Box sx={{ width: '100%', alignItems: 'space-between' }}>
        <div
          style={{
          }}
        >
          <BasicTable
            loading={isLoading}
            rows={collection}
            columns={columns}
          />
        </div>


        {totalRows > 0 &&
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="caption" sx={{ ml: 3, mb: 2 }}>
              Mostrando resultados {currentRows}-{currentRowEnd} de {totalRows}
            </Typography>

            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                padding: 2,
              }}
            >
              <IconButton
                sx={{ mx: 2, mb: 2 }}
                color="primary"
                disabled={currentPage === 0}
                onClick={() => {
                  if (currentPage > 0) {
                    setCurrentPage(currentPage - 1)
                  }
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <Typography sx={{ mb: 2 }} >
                Página {currentPage + 1}/{totalPages + 1}
              </Typography>
              <IconButton
                color="primary"
                sx={{ mx: 2, mb: 2 }}
                disabled={currentPage === totalPages}
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1)
                  }
                }}
              >
                <NavigateNextIcon />
              </IconButton>
            </div>
          </div>
        }

      </Box>
    </Paper>
  );
}