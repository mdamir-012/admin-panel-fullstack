const express = require("express");
const cors = require("cors");
const { userRouter, userController } = require("./Controller/user.routes");
const { authentication } = require("./Auth_Middleware/authentication");
const { connection } = require("./db");
const { userDataController } = require("./Controller/data.routes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Api is working fine" });
});

app.use("/user", userController);

app.use(authentication);

app.use("/users", userDataController);

app.listen(process.env.port || 8080, async () => {
  try {
    await connection;
    console.log("App is connected to mongo");
  } catch (err) {
    console.log(err);
  }
  console.log("App is running on port 8080");
});
