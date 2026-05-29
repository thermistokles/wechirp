import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';

import api from '../../utils/api';

const Post = ({ id, content, user, likes, created_at }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

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

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          {/* <Avatar src={avatarUrl} alt={user.name} /> */}
          <Typography variant="body1" component="div" ml={2}>
            {user.name}
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
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <Typography component="span">{/* Comment count */}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
};

export default Post;