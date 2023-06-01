const express = require("express");

const router = express.Router();

//importing model
const registerModel = require("../models/RegisterModel");

router.post("/register", async (req, res) => {
  //create instance of that model
  const data = new registerModel(req.body);

  //this exist returns the document of that matched email
  const exist = await registerModel.findOne({ email: req.body.email });

  //First,there will be no exist.email, it will be undefined
  //this one for the first user who registers
  if (!exist) {
    //save the incoming data to mongoDb
    data
      .save()
      .then(() => {
        res.json({ message: "Data saved successfully" });
        console.log("data saved");
      })
      .catch((err) => {
        res.json({ message: "Error occured" });
        console.log("Oh! no error in saving data", err);
      });
  }

  //In that exist, that email matches the incoming email,
  //it will respond as already a user
  else if (exist.email === req.body.email) {
    res.json({ message: "Already registered" });
    console.log("already a user!!");
  }

  //else block
  else {
    //save the incoming data to mongoDb
    data
      .save()
      .then(() => {
        res.json({ message: "Data saved successfully" });
        console.log("data saved");
      })
      .catch((err) => {
        res.json({ message: "Error occured" });
        console.log("Oh! no error in saving data", err);
      });
  }
  console.log(data);
});

router.post("/login", async (req, res) => {
  const exist = await registerModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!exist) {
    res.json({ message: "no" });
    console.log("nooo");
  } else {
    res.json({ message: "matched" });
    console.log("matched!!!");
  }
});

module.exports = router;
