const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const addressModel = require("../models/AddressModel");
const userModel = require("../models/UserModel");
const AddressModel = require("../models/AddressModel");

const router = express.Router();

router.get(
  "/get-user-address",
  AsyncWrapper(async (req, res) => {
    let address = await AddressModel.find({ user: req.userId });
    return res.send({
      status: true,
      data: address,
    });
  })
);

router.post(
  "/create-user-address",
  AsyncWrapper(async (req, res) => {
    const address = new AddressModel({
      ...req.body,
      user: req.userId,
    });
    await address.save();
    return res.send({
      status: true,
      message: "Address created",
    });
  })
);

module.exports = router;
