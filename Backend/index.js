const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const errorHandler = require("./middlewares/ErrorHandler");
const InventoryRoutes = require("./routes/InventoryRoutes");
const UserRoutes = require("./routes/UserRoutes");
const AddressRoutes = require("./routes/AddressRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const Auth = require("./middlewares/Auth");

// App Initialized
const app = express();

// Initial Middleware
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));

// Routes Calling
app.use("/inventory", InventoryRoutes);
app.use("/address", Auth, AddressRoutes);
app.use("/order", Auth, OrderRoutes);
app.use("/user", UserRoutes);

// Final Middleware

app.use(errorHandler); //Error Handling

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  mongoose
    .connect(
      "mongodb://127.0.0.1:27017/mongopractice"
    )
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log("Error ==>", e.message));
});
