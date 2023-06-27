const express = require("express");

const router = express.Router();

const chatModel = require("../models/ChatModel");

router.post("/chat", (req, res) => {
  console.log(req.body);
  const data = new chatModel(req.body);

  data
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/chat", async (req, res) => {
  console.log(req.query);

  const { sender, receiver } = req.query;

  const data = await chatModel
    .find({
      $or: [
        {
          sender,
          receiver,
        },
        {
          sender: receiver,
          receiver: sender,
        },
      ],
    })
    .sort("createdAt");

    console.log(data)
});

module.exports = router;
