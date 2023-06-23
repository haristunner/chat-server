const express = require("express");

//create instance of express
const app = express();

const cors = require("cors");

const db = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");

app.use(cors());

//creating httpserver
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//To save the incoming users
let users = [];

//Adding the incoming users in user array
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//To get whom to send the incoming message
const getUser = (userId) => {
  console.log(users, userId);
  const user = users.find((user) => user.userId === userId.userId);

  console.log(user);
  return user ? user : null;
};

io.on("connection", (socket) => {
  console.log(`user ${socket.id}`);

  //add all the users who joins
  socket.on("addUser", (userId) => {
    addUser(userId.username, socket.id);

    //emit the online users when any user is joined
    io.emit("getUsers", users);
  });

  //socket.broadcast -> send to all without the own user
  //io.broadcast -> send to all including own user
  socket.broadcast.emit("user", socket.id);

  socket.on("send", ({ sender, receiver, message }) => {
    //to find which user to send
    const user = getUser(receiver);

    if (user) {
      socket.to(user.socketId).emit("send", {
        sender,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
    console.log(`user ${socket.id} disconnected`);
  });
});

require("dotenv").config();

app.use(express.json());

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
server.listen(port, () => {
  console.log(`App listening on ${port}`);
});

//hari17
//z6kzCKIn4rHqRAWF
