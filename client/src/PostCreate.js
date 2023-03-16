import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const createPost = async (event) => {
    event.preventDefault();
    await axios.post("http://posts.com/posts/create", { title });
    setTitle("");
  };

  return (
    <>
      <form onSubmit={(e) => createPost(e)}>
        <h2>Create Post</h2>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <button>Submit</button>
      </form>
    </>
  );
}
