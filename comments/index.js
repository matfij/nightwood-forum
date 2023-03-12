const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(8).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  await axios.post("http://localhost:5000/events", {
    type: "CommentCreated",
    data: { id: commentId, postId: req.params.id, content },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Recived event:", req.body);
  res.status(200);
});

app.listen(4001, () => {
  console.log("App started on port 4001");
});
