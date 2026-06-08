import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from '@mui/material';
import Editor from "./Editor";
import api from "../utils/api";

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchComments(postId)
    }, []);

    // Fetch posts function
    const fetchComments = async (postId) => {
        try {
        const response = await api.get('/comment?post_id=12');

        setComments(response.data);
        } catch (error) { 
        console.error("Posts fetch failed:", error.response?.data || error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            content: content,
            post_id: postId
        }
        try {
            await api.post('/comment', data);
        } catch (error) { 
            console.error("Posts fetch failed:", error.response?.data || error.message);
        }
        e.preventDefault();

        setContent("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Editor value={content} onChange={setContent} />

                <button style={{ marginTop: 10 }} type="submit">
                Comment
                </button>
            </form>
            {comments.map((comment, index) => (
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                        {/* <Avatar src={avatarUrl} alt={user.name} /> */}
                        <Typography 
                            variant="subtitle2" 
                            component="span" 
                            fontWeight="600" 
                            color="text.primary"
                        >
                            {comment.user.username}
                        </Typography>
                        
                        <Typography 
                            variant="caption" 
                            color="text.secondary"
                        >
                            {new Date(comment.created_at).toLocaleDateString()} 
                        </Typography>
                        </Box>
                        <Typography variant="body2" color="text.primary" mt={2}>
                        {comment.content}
                        </Typography>
                    </CardContent>
                    </Card>
            ))}
        </>
    )
}
export default Comments;