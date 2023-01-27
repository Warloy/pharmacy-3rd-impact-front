import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from 'react-router-dom';
import CatalogCRUD from '../pages/CatalogCRUD';
import UserCRUD from '../pages/UserCRUD';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function CurrentRoute() {
  const location = useLocation();

  return (
    <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
      This is the landing page.
    </Typography>
  );
}

export default function PageNavigator() {
  return (
    <Router>
      <Box sx={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<CurrentRoute />} />
          <Route path="/Admin/Catalog" element={<CatalogCRUD />} />
          <Route path="/Admin/User" element={<UserCRUD />} />
        </Routes>
      </Box>
    </Router>
  );
}