const express = require("express");
const inventoryModel = require("../models/InventoryModel");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const Auth = require("../middlewares/Auth");

const router = express.Router();

router.get(
  "/",
  AsyncWrapper(async (req, res) => {
    const products = await inventoryModel.find();
    return res.status(200).send({
      message: "Inventory List",
      data: products,
    });
  })
);

router.post(
  "/create-inventory",
  Auth,
  AsyncWrapper(async (req, res) => {
    let data = req.body.data;
    let resp = await inventoryModel.insertMany(data);
    console.log("Resp", resp);
    return res.send({
      message: "Data Inserted",
      status: true,
      resp,
    });
  })
);

module.exports = router;
