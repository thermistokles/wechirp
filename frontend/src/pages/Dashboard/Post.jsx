import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';

const Post = ({ content, user, likes, created_at }) => (
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
        <IconButton aria-label="like">
          {likes.length}<ThumbUpAltIcon />
        </IconButton>
        <Typography component="span" mr={1}>{/* Like count */}</Typography>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <Typography component="span">{/* Comment count */}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Post;