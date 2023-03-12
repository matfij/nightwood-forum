import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  const readComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    readComments();
  }, []);

  return <ul>{renderedComments}</ul>;
}
