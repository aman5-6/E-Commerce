const express = require("express");
const AsyncWrapper = require("../middlewares/ErrorWrapper");
const inventoryModel = require("../models/InventoryModel");
const userModel = require("../models/UserModel");
const addressModel = require("../models/AddressModel");
const OrderModel = require("../models/OrderModel");

const router = express.Router();
router.get(
  "/get-user-orders",
  AsyncWrapper(async (req, res) => {
    const orders = await OrderModel.find({ user: req.userId })
      .populate("products.itemId", "title description")
      .populate("address");
    return res.send({
      status: true,
      data: orders,
    });
  })
);

router.get(
  "/get-user-orders-by-id/:id",
  AsyncWrapper(async (req, res) => {
    const orders = await OrderModel.findById(req.params.id)
      .populate("products.itemId", "title description")
      .populate("address");
    return res.send({
      status: true,
      data: orders,
    });
  })
);

router.post(
  "/create-new-order",
  AsyncWrapper(async (req, res) => {
    const newOrder = new OrderModel({
      ...req.body,
      user: req.userId,
    });

    await newOrder.save();

    return res.send({
      status: true,
      message: "Order Placed",
    });
  })
);

module.exports = router;
