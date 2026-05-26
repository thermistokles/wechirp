import { useState } from "react";
import Editor from './Editor';
import api from '../utils/api';

const PostForm = () =>  {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            content: content
        }
        try {
        const response = await api.post('/post', data);

        // setPosts(response.data);
        } catch (error) { 
            console.error("Posts fetch failed:", error.response?.data || error.message);
        }
        e.preventDefault();

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