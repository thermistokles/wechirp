import { useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';

import Comments from "../pages/Dashboard/Comments";

import api from '../utils/api';

const Post = ({ id, content, user, likes, comment_count, created_at }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const [showComments, setShowComments] = useState(false);

  const isLiked = likes.includes(loggedInUser.id);

  // If the post is already liked, send a dislike request, otherwise send a like request
  const handleLike = async () => {
    const data = {
      'post_id' : id,
      'user_id' : loggedInUser.id
    }
    try {
      var response = null
      if (isLiked) {
        response = await api.patch('/post?action=unlike', data);
      } else {
        response = await api.patch('/post?action=like', data);
      }
      console.log("response: ", response)
    } catch (error) { 
        console.error("Posts like/unlike failed:", error.response?.data || error.message);
    }
  }

  // If the user Clicks on comments button, the comments are shown/hidden
  const handleShowContent = async () => {
    setShowComments(!showComments)
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          {/* <Avatar src={avatarUrl} alt={user.name} /> */}
          <Typography variant="body1" component="div" ml={2}>
            {user.username}
            <Typography variant="caption" color="text.secondary" display="block">
              {created_at}
            </Typography>
          </Typography>
        </Box>
        <Typography variant="body2" color="text.primary" mt={2}>
          {content}
        </Typography>
        <Box mt={2} display="flex" alignItems="center">
          <Typography component="span" mr={1}>{likes.length}</Typography>
          <IconButton aria-label="like" color={isLiked ? 'primary' : 'default'} onClick={handleLike}>
            <ThumbUpAltIcon />
          </IconButton>
          <Typography component="span">{comment_count}</Typography>
          <IconButton aria-label="comment" onClick={handleShowContent}>
            <CommentIcon />
          </IconButton>
        </Box>
        {showComments && <Comments postId={id} />}
      </CardContent>
    </Card>
  )
};

export default Post;