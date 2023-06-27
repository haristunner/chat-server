const db = require("mongoose");

const schema = db.Schema;

const ChatSchema = new schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chat = db.model("chat", ChatSchema);

module.exports = chat;
