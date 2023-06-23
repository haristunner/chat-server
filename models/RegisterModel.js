const db = require("mongoose");

const schema = db.Schema;

//creating model for register info
const registerSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const register = db.model("register", registerSchema);

module.exports = register;
