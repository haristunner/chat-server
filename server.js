const express = require("express");

//this starts the app
const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.send("hello bruhh!!");
});

//callback function make sure that server is running
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
