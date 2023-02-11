import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { 
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
import { getUser, createUser, deleteUser, updateUser } from '../services/user/userAPI'
import { getOffice } from '../services/office/officeAPI'

/* Icons */
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
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function UserCRUD() {
    const {showInfoToast, showWarningToast, showSuccessToast, showErrorToast} = Toaster();
    const [exists, setExists] = React.useState(false);
    const [searched, setSearched] = React.useState(false);
    const [searchParams, setSearchParams] = React.useState('');
    const [user, setUser] = React.useState([]);
    const [userMail, setUserMail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userIdentification, setUserIdentification] = React.useState('');
    const [officeCode, setOfficeCode] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userLastName, setUserLastName] = React.useState('');
    const [userPhone, setUserPhone] = React.useState('');
    const [userType, setUserType] = React.useState(''); 

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
            showWarningToast(`Debe ingresar la cédula a buscar`)
          } else {
            try{
              getUser(searchParams)
                .then((res)=>{
                  setUser(res || [])
                  setUserIdentification(res.identification)
                  getOffice(res.SID)
                  .then((r)=>{
                    setOfficeCode(r.code)
                  })
                  .catch((e)=>{
                    console.log(`Error al buscar la sucursal: ${e}`)
                  })
                  setUserName(res.name)
                  setUserLastName(res.lastName)
                  setUserMail(res.mail)
                  setUserPhone(res.phone)
                  if (res.type===0){
                    setUserType('Administrador')
                  } else {
                    setUserType('Agente')
                  }
                  showSuccessToast(`Se encontró el usuario con cédula ${searchParams}.`)
                  setSearched(true)
                  setExists(true)
                  console.log(res)
                })
                .catch((err)=>{
                  console.log(`Error en la búsqueda: ${err}`)
                  setUserIdentification(searchParams)
                  setSearched(true)
                  showInfoToast(`No se encontró el usuario con cédula ${searchParams}. Creando un nuevo registro.`)
                })
            } catch(error){
              console.log(`Search error: ${error}`)
                    showErrorToast('Ocurrió un eror en la búsqueda.')
            }
          }
    }
    const handleUserMail = (event) => { 
        let value = event.target.value
        setUserMail(value)
    }
    const handleUserPassword = (event) => { 
        let value = event.target.value
        setUserPassword(value)
    }
    const handleUserIdentification = (event) => { 
        let value = event.target.value
        setUserIdentification(value)
    }
    const handleOfficeCode = (event) => { 
        let value = event.target.value
        setOfficeCode(value)
    }
    const handleUserName = (event) => { 
        let value = event.target.value
        setUserName(value)
    }
    const handleUserLastName = (event) => { 
        let value = event.target.value
        setUserLastName(value)
    }
    const handleUserPhone = (event) => { 
        let value = event.target.value
        setUserPhone(value)
    }
    const handleTypeList = (event) => {
        let value = event.target.value
        setUserType(value)
    }
    const handleSubmit = () => {
        if (userMail==='' || userPassword==='' || userIdentification==='' || officeCode==='' || userName==='' || userLastName==='' || userPhone==='' || userType===''){
            showWarningToast(`Faltan datos por llenar en el formulario.`)
          } else {
            try{
                getOffice(officeCode)
                .then((r)=>{
                    const sid = r.SID
                    const ut = userType === 'Administrador' ? 0 : 1
                if (!exists){
                try{
                    createUser({    SID: sid,
                                    identification: userIdentification,
                                    name: userName,
                                    lastName: userLastName,
                                    mail: userMail,
                                    phone: userPhone,
                                    type: ut,
                                    password: userPassword})
                    .then((res)=>{
                        showSuccessToast(`Usuario ${userIdentification} registrado exitosamente.`)
                        console.log(`Submit successful: ${res}`)
                        handleCleanUp()
                    })
                    .catch((err)=>{
                        showWarningToast(`Ya existe un usuario con cédula ${userIdentification}.`)
                        console.log(`Submit error: ${err}`)
                    })
                } catch(error){
                    console.log(`Submit error: ${error}`)
                    showErrorToast('Ocurrió un eror al guardar los datos.')
                }
                } else {
                try{
                    updateUser(user.UID, {SID: sid,
                        identification: userIdentification,
                        name: userName,
                        lastName: userLastName,
                        mail: userMail,
                        phone: userPhone,
                        type: ut,
                        password: userPassword})
                    .then((res)=>{
                        showSuccessToast(`Usuario ${userIdentification} actualizado exitosamente.`)
                        console.log(`Submit successful: ${res}`)
                        handleCleanUp()
                    })
                    .catch((err)=>{
                        showWarningToast(`Ocurrió un error al modificar el usuario ${userIdentification}.`)
                        console.log(`Submit error: ${err}`)
                    })
                } catch(error){
                    console.log(`Submit error: ${error}`)
                    showErrorToast('Ocurrió un eror al guardar los datos.')
                }
                }
            }).catch((x)=>{
                showWarningToast(`No se encontró la sucursal con código ${officeCode}. No se puede guardar el usuario.`)
                console.log(`Submit error: ${x}`)
            })
          }catch(e){
            console.log(`Submit error: ${e}`)
            showErrorToast('Ocurrió un eror al guardar los datos.')
          }
        }
    }
    const handleDeletion = () => {
        try{
            deleteUser(user.UID)
                .then((res)=>{
                    showSuccessToast(`Usuario ${userIdentification} eliminado exitosamente.`)
                    console.log(`Delete successful: ${res}`)
                    handleCleanUp()
                })
                .catch((err)=>{
                    showWarningToast(`Ocurrió un error al eliminar el usuario ${userIdentification}.`)
                    console.log(`Delete error: ${err}`)
                })
        } catch(error){
            console.log(`Delete error: ${error}`)
            showErrorToast('Ocurrió un eror al eliminar el usuario.')
        }
    }
    const handleCleanUp = () => {
      setSearchParams('')
      setUserMail('')
      setUserPassword('')
      setUserIdentification('')
      setOfficeCode('')
      setUserName('')
      setUserLastName('')
      setUserPhone('')
      setUserType('')
      setUser([])
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
                placeholder="Buscar por cédula"
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
              <Button variant="contained" onClick={handleSearchButton} disabled={searched} sx={{ mr: 1 }}>
                Buscar
              </Button>
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
                        value={userMail}
                        onChange={handleUserMail}
                        inputProps={{maxlength:100}}
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
                        type="Password"
                        value={userPassword}
                        onChange={handleUserPassword}
                        inputProps={{maxlength:16}}
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
                        value={userIdentification}
                        onChange={handleUserIdentification}
                        disabled
                        inputProps={{maxlength:20}}
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
                        value={officeCode}
                        onChange={handleOfficeCode}
                        inputProps={{maxlength:10}}
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
                        value={userName}
                        onChange={handleUserName}
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
                    <InputLabel>Apellido</InputLabel>
                    <OutlinedInput
                        id="user-last-name"
                        value={userLastName}
                        onChange={handleUserLastName}
                        inputProps={{maxlength:50}}
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
                        value={userPhone}
                        onChange={handleUserPhone}
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
            <Grid item xs={10} md={8}>
               <FormControl sx={{ m: 1, width:1, margin:'none' }}  variant="outlined">
                    <InputLabel>Tipo de usuario</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="user-type"
                        value={userType}
                        label="Tipo de usuario"
                        onChange={handleTypeList}
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