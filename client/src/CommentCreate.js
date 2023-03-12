import axios from "axios";
import React, { useState } from "react";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const createComment = async (event) => {
    event.preventDefault();
    axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
    setContent("");
  };

  return (
    <>
      <h4>Add comment</h4>
      <form onSubmit={(e) => createComment(e)}>
        <label>Content</label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Add</button>
      </form>
    </>
  );
}
