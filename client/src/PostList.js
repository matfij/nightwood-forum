import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div key={post.id} style={{ border: "1px solid black" }}>
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  const readPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPosts({ ...res.data });
  };

  useEffect(() => {
    readPosts();
  }, []);

  return (
    <>
      <h2>Post List</h2>
      {renderedPosts}
    </>
  );
}
