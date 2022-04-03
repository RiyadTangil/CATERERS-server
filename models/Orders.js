const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({

  price: {
    type: String,
   required: false,
  },
  status: {
    type: String,
   required: false,
  },
  ordersItems: {
    type: [],
   required: false,
  },
  paymentId: {
    type: String,
   required: false,
  },
  catererId: {
    type: String,
   required: true,
  },
  customer: {
    type: mongoose.Types.ObjectId,
      ref: "User2",
  },
  
  orderTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
