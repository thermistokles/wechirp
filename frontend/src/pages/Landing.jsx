import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TopNavbar from '../components/TopNavbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopNavbar />
      Welcome to WeChirp
    </Box>
  );
};

export default Landing;