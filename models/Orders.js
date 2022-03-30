const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({

  price: {
    type: String,
   required: true,
  },
  status: {
    type: String,
   required: true,
  },
  ordersItems: {
    type: [],
   required: true,
  },
  paymentId: {
    type: String,
   required: true,
  },
  
  user: {
    type: mongoose.Types.ObjectId,
      ref: "User2",
  },
  
  orderTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
