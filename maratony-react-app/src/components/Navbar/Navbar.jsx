import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavbarLinks from './NavbarLinks';
import DrawerLinks from './DrawerLinks';

const drawerWidth = 240;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        color="primary"
        variant="h6"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Marathons page
      </Typography>
      <Divider />
      <DrawerLinks />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ px: { xs: 0, sm: 0, md: 0, lg: '5%', xl: '10%' } }}
      >
        <Toolbar>
          <Link to="/" style={{ mr: 2 }}>
            <Typography
              color="primary"
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                minWidth: 170,
                flexGrow: 1,
                border: 3,
                borderRadius: 1,
                textAlign: 'center',
                m: 0.5,
                ml: -5,
                mr: 10,
              }}
            >
                Marathons Page
            </Typography>
           
          </Link>
          <NavbarLinks />  
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
