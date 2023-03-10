import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
/* Icons */
import MenuIcon from '@mui/icons-material/Menu';
import DisciplineIcon from '../data/DisciplineIcon.js';
import MitraIcon from '../data/MitraIcon.js';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header({ onDrawerToggle }) {

  const name = JSON.parse(localStorage.getItem('@user'))?.name || null
  const type = JSON.parse(localStorage.getItem('@user'))?.type || null
  const role = type === '0' ? `Admin` : `Agente` 
  const session = `${name} (${role})`
  const [isHover, setIsHover] = React.useState(false)

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid sx={{ display: { sm: 'block', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                {isHover ?
                  <DisciplineIcon size="64px" /> :
                  <MitraIcon size="64px" />
                }
              </div>
            </Grid>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {`  Mitra: Inventory Manager`}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Nombre de la sesión activa">
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  {name ? `${session}`: ` `}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;