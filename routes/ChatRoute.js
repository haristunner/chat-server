const express = require("express");

const router = express.Router();

const chatModel = require("../models/ChatModel");

router.post("/chat", (req, res) => {
  console.log(req.body);

  //setting the given data in model
  const data = new chatModel(req.body);

  //save in db
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

  //find the messages for the corresponding user and
  //sort by timestamp
  //it will search in that chatmodel
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

  res.json(data);

  console.log(data);
});

module.exports = router;
