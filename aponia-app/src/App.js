import './App.css';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './components/Navigator';
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './components/Theme';

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const drawerWidth = 244;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (<ThemeProvider theme={theme}>
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
          <Content />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
  );
}

export default App;
