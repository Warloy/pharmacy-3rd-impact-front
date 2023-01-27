import './App.css';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './components/Navigator';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './components/Theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNavigator from './components/PageSelector';
import UserCRUD from './pages/UserCRUD';
import CatalogCRUD from './pages/CatalogCRUD';
import OfficeCRUD from './pages/OfficeCRUD';
import InventoryCRUD from './pages/InventoryCRUD';

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 244;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: 0 }, flexShrink: { sm: 0 } }}
        >
        <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
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
                <Route exact path='/' element={PageNavigator}/>
                {/* Admin/Cruds*/}
                <Route path='/admin/catalog' element={<CatalogCRUD/>}/>
                <Route path='/admin/user' element={<UserCRUD/>}/>
                <Route path='/admin/office' element={<OfficeCRUD/>}/>
                {/* Admin/Reports*/}
                {/* Agent*/}
                <Route path='/agent/inventory' element={<InventoryCRUD/>}/>
            </Routes>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  </Router>
  );
}

export default App;
