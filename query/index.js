const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  processEvent(type, data);
  res.status(200);
});

app.listen(4002, async () => {
  console.log("App started on port 4002");
  const res = await axios.get("http://localhost:5000/events");
  for (let event of res.data) {
    processEvent(event.type, event.data);
  }
});

function processEvent(type, data) {
  switch (type) {
    case "PostCreated": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "CommentCreated": {
      const { id, postId, status, content } = data;
      const post = posts[postId];
      post.comments.push({ id, status, content });
      break;
    }
    case "CommentUpdated": {
      const { id, postId, status, content } = data;
      const post = posts[postId];
      const comment = post.comments.find((comment) => comment.id === id);
      comment.status = status;
      comment.content = content;
    }
  }
}
