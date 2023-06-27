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

router.get("/chat", (req, res) => {
  console.log(req.query);
});

module.exports = router;
