import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Settings from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MedicationIcon from '@mui/icons-material/Medication';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import DisciplineIcon from '../data/DisciplineIcon.js'
import LogoutIcon from '@mui/icons-material/Logout';

const categories = [
    {
        id: 'Administrar',
        secondary: 'Módulo de gestión administrativo',
        type: 0,
        children: [
        { id: 'Catálogo de medicina', icon: <MedicationIcon /> },
        { id: 'Gestión de usuarios', icon: <ManageAccountsIcon /> },
        { id: 'Gestión de sucursales', icon: <DomainAddIcon /> },
        ],
    },
    {
        id: 'Reportes',
        secondary: 'Módulo de reportes y control',
        type: 1,
        children: [
        { id: 'Por Sucursal', icon: <SettingsIcon /> },
        { id: 'Global', icon: <PublicIcon /> },
        ],
    },
    {
        id: 'Acciones',
        secondary: 'Módulos de acción',
        type: 1,
        children: [
        { id: 'Registro de Medicina', icon: <MedicationIcon /> },
        { id: 'Reportes', icon: <SettingsIcon /> },
        ],
    },
];

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

export default function CustomizedList(userType) {
  const [open, setOpen] = React.useState(true);
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
            <ListItemButton component="a" href="#">
              <ListItemIcon sx={{ fontSize: 20 }}> <DisciplineIcon/> </ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Mitra"
                primaryTypographyProps={{
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
            {categories.map(({id,secondary,type,children}) => (
                <Box
                    key={id}
                    sx={{
                    bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                    pb: open ? 2 : 0,
                }}
                >
                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setOpen(!open)}
                    sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
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
                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                    />
                </ListItemButton>
                {open &&
                    children.map((item) => (
                    <ListItemButton
                        key={item.id}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
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