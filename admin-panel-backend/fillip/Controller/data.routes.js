const express = require("express");
const { UserModel } = require("../Models/UserModel");

const userDataController = express.Router();
require("dotenv").config()

let accessBy = process.env.accessBy

userDataController.get("/", async (req, res) => {
  const { userId } = req.body;

  try {
    if (userId === accessBy) {
      const user = await UserModel.find({ userId: userId });
      return res.json({ user: user });
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ message: "You do not have access to userslist" });
});

userDataController.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    if (userId === accessBy) {
      const user = await UserModel.findOneAndDelete({
        _id: id,
        userId: userId,
      });
      return res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ message: "You do not have access to delete user" });
});


userDataController.patch("/block/:id", async (req, res) => {
  const id = req.params.id;
  const { userId, block } = req.body;
  console.log(userId);


  try {
    if (userId === accessBy) {
      const user = await UserModel.findOneAndUpdate(
        { _id: id, userId: userId },
        { block: block },
        { new: true }
      );
      if (block === "block") { 
        return res.json({ message: "User Blocked successfully" });
      } else {
        return res.json({ message: "User Unblocked successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  res.json({ message: "You do not have access to block user" });
});

module.exports = { userDataController };
