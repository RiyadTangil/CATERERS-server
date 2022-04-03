const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopPhone: {
    type: String,
  
  },
  shopName: {
    type: String,
 
  },
  shopImg: {
    type: String,
 
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  typeOfPerson: {
    type: String,
    enum: ["customer", "caterer", "admin"],
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    }
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Orders",
    }
  ]

});

module.exports = mongoose.model("User2", PostSchema);
