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

//this will send the users whom we chat
router.get("/users", async (req, res) => {
  console.log(req.query);

  const { sender } = req.query;

  //to get whole data of user
  const data = await chatModel.find({
    $or: [
      { sender },
      {
        receiver: sender,
      },
    ],
  });

  const users = [];

  //In that data, we have all documents of that user
  //but we need only sender and receiver whom we send and we receive
  //except ourselves
  data.map((d) => {
    if (d.sender === sender) {
      users.push(d.receiver);
    } else if (d.receiver === sender) users.push(d.sender);
  });

  //In that users, there will repetation of users because we are taking from the messages document
  //so removing duplicates
  const finalUsers = [...new Set(users)];

  res.json(finalUsers);
});

router.get("/chat", async (req, res) => {
  console.log(req.query, "query");

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
