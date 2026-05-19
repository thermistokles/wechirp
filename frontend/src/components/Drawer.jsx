import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";

import { Link } from 'react-router-dom';
import Post from '../pages/Dashboard/Post'
import TopNavbar from "./TopNavbar";

import Button from '@mui/material/Button';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import PostForm from "./PostForm";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  // const posts = [
  //   { username: 'JohnDoe', avatarUrl: '../../assets/user-profiles/avatar1.jpg', date: '2023-10-01', content: 'Just had the best cup of coffee!' },
  //   { username: 'JaneSmith', avatarUrl: '../../assets/user-profiles/avatar2.jpg', date: '2023-10-02', content: 'Check out this cool new tech gadget!' },
  //   { username: 'AliceJohnson', avatarUrl: '../../assets/user-profiles/avatar3.jpg', date: '2023-10-03', content: 'Enjoying a beautiful sunset!' },
  // ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/post")
      .then((response) => {
        if (!response.ok) {
          console.log("response: ", response)
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("posts: ", posts)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
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