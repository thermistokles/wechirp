import { useEffect, useState } from "react";
import ResponsiveDrawer from '../../components/Drawer';

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

import PostForm from '../../components/PostForm';
import Post from '../../components/Post';
import api from "../../utils/api";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  

  // Fetch posts on page load
  useEffect(() => {
    fetchPosts()
  }, []);

  // Fetch posts function
  const fetchPosts = async () => {
    try {
      const response = await api.get('/post');

      setPosts(response.data);
    } catch (error) { 
      console.error("Posts fetch failed:", error.response?.data || error.message);
    }
  }

  const loggedInUser = JSON.parse(localStorage.getItem('user'));  

  return (
    <ResponsiveDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
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
    </ResponsiveDrawer>
  );
};

export default Dashboard;