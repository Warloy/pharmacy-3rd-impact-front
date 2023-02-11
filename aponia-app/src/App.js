import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  Box
} from '@mui/material';
/* Components */
import Navigator from './components/Navigator';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './components/Theme';
/* Pages */
import UserCRUD from './pages/UserCRUD';
import CatalogCRUD from './pages/CatalogCRUD';
import OfficeCRUD from './pages/OfficeCRUD';
import InventoryCRUD from './pages/InventoryCRUD';
import LaboratoryCRUD from './pages/LaboratoryCRUD';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Reports from './pages/Reports';

/* AuthProvider */
import { AuthProvider } from './context/AuthContext';
//import useAuthContext from './hooks/useAuthContext';

function App() {
  /*
    const {
      state: { user },
    } = useAuthContext()
    */


  const type = JSON.parse(localStorage.getItem('@user'))?.type || null
  const token = localStorage.getItem('@token') || null

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Box
              component="nav"
              sx={{ width: { sm: 0 }, flexShrink: { sm: 0 } }}
            >
              <Navigator
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Header
                onDrawerToggle={handleDrawerToggle}
              />
              <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <Routes>
                  {/* Landing*/}
                  <Route exact path='/' element={<Landing />} />
                  {!token ?
                    <>
                        {/* Login */}
                        <Route exact path='/login' element={<Login />} />
                    </>
                    : type === '0' ?
                      <>
                        {/* Admin/Cruds*/}
                        <Route path='/admin/laboratory' element={<LaboratoryCRUD />} />
                        <Route path='/admin/catalog' element={<CatalogCRUD />} />
                        <Route path='/admin/user' element={<UserCRUD />} />
                        <Route path='/admin/office' element={<OfficeCRUD />} />
                        {/* Admin/Reports*/}
                        <Route path='/admin/reports' element={<Reports />} />
                      </>
                      :
                      <>
                        {/* Agent*/}
                        <Route path='/agent/inventory' element={<InventoryCRUD />} />
                        <Route path='/agent/reports' element={<Reports />} />
                      </>
                  }

                </Routes>
              </Box>
              <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                <Footer />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
