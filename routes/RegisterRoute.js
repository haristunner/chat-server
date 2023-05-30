const express = require("express");

const router = express.Router();

//importing model
const registerModel = require("../models/RegisterModel");

router.post("/register", (req, res) => {
  const data = new registerModel(req.body);

  console.log(data);
});

module.exports = router;
