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
  comments.push({ id: commentId, status: "pending", content });
  commentsByPostId[req.params.id] = comments;
  await axios.post("http://event-bus-srv:5000/events", {
    type: "CommentCreated",
    data: { id: commentId, postId: req.params.id, status: "pending", content },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "CommentModerated": {
      const comments = commentsByPostId[data.postId];
      const comment = comments.find((comment) => comment.id === data.id);
      comment.status = data.status;
      await axios.post("http://event-bus-srv:5000/events", {
        type: "CommentUpdated",
        data: {
          id: data.id,
          postId: data.postId,
          status: data.status,
          content: data.content,
        },
      });
      break;
    }
  }
  res.status(200);
});

app.listen(4001, () => {
  console.log("App started on port 4001");
});
