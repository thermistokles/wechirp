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
  Button
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import PostForm from "./PostForm";

import Post from '../pages/Dashboard/Post'
import api from "../utils/api";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
  }, []);

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

  const handleLogout = () => {
    navi
  }

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
        {["Home", "Profile", "Settings", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
          <Button color="inherit" onClick={handleLogout()}>
            Logout
          </Button>
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
        {/* <Toolbar /> */}

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