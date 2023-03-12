const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "PostCreated": {
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "CommentCreated": {
      const { id, postId, content } = data;
      const post = posts[postId];
      post.comments.push({ id, content });
      break;
    }
  }
  res.status(200);
});

app.listen(4002, () => {
  console.log("App started on port 4002");
});
