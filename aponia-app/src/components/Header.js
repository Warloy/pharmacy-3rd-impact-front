import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar,
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

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header({onDrawerToggle}) {

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
                <DisciplineIcon size="64px"/>
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
                  {`Viega (Admin)`}
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