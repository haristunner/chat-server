const express = require("express");

//create instance of express
const app = express();

const cors = require("cors");

const db = require("mongoose");

app.use(cors());
app.use(express.json());

require("dotenv").config();

const port = process.env.PORT || 8000;

db.connect(process.env.URI)
  .then((on) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.json({ mes: "hello bruhhh!!" });
});

//import that register model here to use
const regRoute = require("./routes/RegisterRoute");
app.use(regRoute);

//callback function make sure that server is running
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});

//hari17
//z6kzCKIn4rHqRAWF
