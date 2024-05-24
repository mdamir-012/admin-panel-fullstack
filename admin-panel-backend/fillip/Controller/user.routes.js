const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");

require("dotenv").config();
const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    return res.json({message:"Please enter your name , email and password"})
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status("200").json({ status: "User Already Exist " });
  }

  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      // Store hash in your password DB.
      const user = await UserModel.create({
        name,
        email,
        password: hash,
        userId: process.env.accessBy,
      });
      console.log(user);
      res.json({message:`User ${name} registered successfully`});
    });
  } catch (err) {
    console.log(err);
  }

  // res.send("User signup page")
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.json({ status: "User Not Found" });
  }

  console.log(user.block);

  if (user.block === "block") {
    return res.json({
      ststus: "You are blocked",
      message: "You can not login to the account",
    });
  }

  const hashed_Pass = user.password;

  try {
    bcrypt.compare(password, hashed_Pass, function (err, result) {
      // result == true
      if (err || !result) {
        return res.status("404").json({ status: "Invalid credential" });
      }
      const token = jwt.sign({ userId: user.email }, process.env.secrettoken);
      res.status(200).json({ status: "Login SuccessFul", token: token });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { userController };
