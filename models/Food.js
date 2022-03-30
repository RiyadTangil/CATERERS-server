const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
  foodName:{
    type: String,
    required: true
  },
  foodPrice:{
    type: String,
    required: true
  },
  foodImg:{
    type: String,
    required: true
  },
  foodDescription:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  catererId:{
    type: String,
    required: true
  },
  publishStatus:{
    type: String,
    required: true
  },
  produceAvailable:{
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Foods", FoodSchema);
