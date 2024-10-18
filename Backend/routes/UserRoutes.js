const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Running");
});

router.post(
  "/sign-up",
  AsyncWrapper(async (req, res) => {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.send({
        status: false,
        message: "User already exists.",
      });
    }

    let hashedPasword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPasword;
    let newUser = new userModel(req.body);
    await newUser.save();

    return res.send({
      status: true,
      message: "Signup successful",
    });
  })
);

router.post(
  "/sign-in",
  AsyncWrapper(async (req, res) => {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).send({
        status: false,
        message: "User doesn't exist.",
      });
    }

    const isValidPwd = bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );

    if (!isValidPwd) {
      return res.status(400).send({
        status: false,
        message: "Wrong Password",
      });
    } else {
      const access_token = jwt.sign(
        {
          id: existingUser._id,
        },
        "Hello_World"
      );

      existingUser.password = "";

      return res.send({
        status: true,
        message: "Signin successful",
        access_token,
        user: existingUser,
      });
    }
  })
);

module.exports = router;
