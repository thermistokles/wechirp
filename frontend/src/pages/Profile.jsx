import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import ResponsiveDrawer from "../components/Drawer";
import UserCard from "../components/UserCard";
import api from "../utils/api";

const Profile = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on page load
    useEffect(() => {
      fetchUsers()
    }, []);

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');

      setUsers(response.data);
    } catch (error) { 
      console.error("Users fetch failed:", error.response?.data || error.message);
    }
  }

  return (
    <ResponsiveDrawer>
        {users.map((user, index) => (
            <UserCard key={user.id} user={user} />
        ))}
    </ResponsiveDrawer>
  );
};

export default Profile;