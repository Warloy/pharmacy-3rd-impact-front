import * as React from 'react';
import { Box,
    styled,
    ThemeProvider,
    createTheme,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    IconButton,
    Tooltip
} from '@mui/material';
/* Icons */
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MedicationIcon from '@mui/icons-material/Medication';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const categories = [
  {
      id: 'Administrar',
      secondary: 'Módulo de gestión administrativo',
      type: 0,
      children: [
      { id: 'Catálogo de medicina', icon: <MedicationIcon />, link:'/admin/catalog' },
      { id: 'Gestión de usuarios', icon: <ManageAccountsIcon />, link:'/admin/user' },
      { id: 'Gestión de sucursales', icon: <DomainAddIcon />, link:'/admin/office' },
      ],
  },
  {
      id: 'Reportes',
      secondary: 'Módulo de reportes y control',
      type: 0,
      children: [
      { id: 'Por Sucursal', icon: <SettingsIcon />, link:'/admin/reports' },
      { id: 'Global', icon: <PublicIcon />, link:'/admin/reports/global' },
      ],
  },
  {
      id: 'Acciones',
      secondary: 'Módulos de acción',
      type: 1,
      children: [
      { id: 'Inventario', icon: <MedicationIcon />, link:'/agent/inventory' },
      { id: 'Reportes', icon: <SettingsIcon />, link:'/agent/reports' },
      ],
  },
];

export default function CustomizedList({ userType = 0 }) {

  const [openCategories, setOpenCategories] = React.useState({
    Administrar: false,
    Reportes: false,
    Acciones: false
  })

  const handleChange = (prop) => () => {
    setOpenCategories({ ...openCategories, [prop]: !openCategories[prop] })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <LogoNav component="nav" disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemIcon sx={{ fontSize: 20 }}> {/*<DisciplineIcon size="32px"/>*/} </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="MITRA"
                primaryTypographyProps={{
                  align: 'center',
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <LogoutIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Cerrar Sesión"
                  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
              <Tooltip title="Este botón no hace nada">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            {categories
            .filter(item => item.type === userType)
            .map(({id, secondary, children}) => (
                <Box
                    key={id}
                    sx={{
                    bgcolor: openCategories[id] ? 'rgba(71, 98, 130, 0.2)' : null,
                    pb: openCategories[id] ? 2 : 0,
                    width: 256
                }}
                >    
                <ListItemButton
                    alignItems="flex-start"
                    onClick={handleChange(id)}
                    sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openCategories[id] ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openCategories[id] ? 1 : 0 } },
                    }}
                >
                    <ListItemText
                    primary={id}
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary={secondary}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openCategories[id] ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openCategories[id] ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                    />
                </ListItemButton>
                {openCategories[id] &&
                    children.map((item, link) => (
                    <ListItemButton
                        key={item.id}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                        href={item.link}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                        {item.icon}
                        </ListItemIcon>
                        <ListItemText
                        primary={item.id}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                    ))}
                </Box> 
            ))}
          </LogoNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}