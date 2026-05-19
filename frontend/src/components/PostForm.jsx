import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import { useState } from "react";
import Editor from './Editor';

const PostForm = () =>  {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/api/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: content,
            user: 4
        }),
        });

        setContent("");
    };
    return (
        <div style={{ maxWidth: 600, margin: "auto" }}>
        <h2>Create Post</h2>

        <form onSubmit={handleSubmit}>
            <Editor value={content} onChange={setContent} />

            <button style={{ marginTop: 10 }} type="submit">
            Post
            </button>
        </form>
        </div>
    )
}

export default PostForm