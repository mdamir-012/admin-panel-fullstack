const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  block:{type:String},
  userId: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { userSchema, UserModel };
