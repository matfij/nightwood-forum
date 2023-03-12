const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const FORBIDDEN_WORD = "computer";

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case "CommentCreated": {
      const status = data.content.includes(FORBIDDEN_WORD)
        ? "rejected"
        : "approved";
      await axios.post("http://localhost:5000/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status: status,
          content: data.content,
        },
      });
      break;
    }
  }
  return res.status(200);
});

app.listen(4003, () => {
  console.log("App started on port 4003");
});
