import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';



const TopNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button href='/login' color='inherit' >Login</Button>
          <Button href='/register' color='inherit' >Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavbar;