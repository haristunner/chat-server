const express = require("express");

const router = express.Router();

const CryptoJS = require("crypto-js");

//importing model
const registerModel = require("../models/RegisterModel");

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const encrypted = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();
  console.log(encrypted, process.env.SECRET_KEY);

  //create instance of that model
  const data = new registerModel({ email, username, password: encrypted });

  // console.log(email, username, password);

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
  });

  console.log(exist);

  //if new user
  if (exist === null) {
    res.json({ message: "new user" });
  }
  //checks the password if email is matched
  else if (exist.password) {
    //decrypt the password from db
    const decrypt = CryptoJS.AES.decrypt(
      exist.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    //check decrypted password and req password
    decrypt === req.body.password
      ? res.json({ message: "matched", username: exist.username })
      : res.json({ message: "no" });
  } else {
    res.json({ message: "no" });
  }

  // if (!exist) {
  //   res.json({ message: "no" });
  //   console.log("nooo");
  // } else {
  //   res.json({ message: "matched", username: exist.username });
  //   console.log("matched!!!");
  // }
});

module.exports = router;
