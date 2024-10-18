const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

function Auth(req, res, next) {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.send({
      status: false,
      message: "Token Missing",
    });
  }

  let token = authHeader.split(" ")[1];

  jwt.verify(token, "Hello_World", async (err, payload) => {
    if (err) {
      return res.send({
        status: false,
        message: "Invalid Token",
      });
    }
    const existingUser = await UserModel.findById(payload.id);
    if (!existingUser) {
      return res.send({
        status: false,
        message: "User Not Found",
      });
    }
    console.log("User Data", existingUser);
    req.userId = payload.id;
    next();
  });
}

module.exports = Auth;
