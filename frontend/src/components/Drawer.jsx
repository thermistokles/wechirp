import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";

import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

import PostForm from "./PostForm";
import Post from '../pages/Dashboard/Post'
import api from "../utils/api";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  // Fetch posts on page load
  useEffect(() => {
    fetchPosts()
  }, []);

  console.log("posts: ", posts)

  // Fetch posts function
  const fetchPosts = async () => {
    try {
      const response = await api.get('/post');

      setPosts(response.data);
    } catch (error) { 
      console.error("Posts fetch failed:", error.response?.data || error.message);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Go to home
  const goToHome = () => {
    navigate('/dashboard')
  }
  // Go to profile
  const goToProfile = () => {
    navigate('/dashboard')
  }
  // Go to settings
  const goToSettings = () => {
    navigate('/dashboard')
  }
  // Logout
  const handleLogout = () => {
    // 1. Clear both tokens from LocalStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/')
  }

  // Object for sidenav menu items
  const sidenavMenuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      action: goToHome
    },
    {
      text: "Profile",
      icon: <AccountBoxIcon />,
      action: goToProfile,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      action: goToSettings,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: handleLogout,
    },
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 5
        }}
        >
        <Avatar
        sx={{ width: 80, height: 80 }}
        src='../../assets/user-profiles/avatar1.jpg'
        alt='JohnDoe' />
    </Box>
      
      <Divider />

      <List>
        {sidenavMenuItems.map(({text, icon, action}) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={action}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FlutterDashIcon />WeChirp
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        Welcome {loggedInUser.username}

        <PostForm />

        <Box sx={{ flexGrow: 1, p: 2 }}>
        {posts.map((post, index) => (
            <Post key={index} {...post} />
        ))}
        </Box>
      </Box>
    </Box>
  );
}