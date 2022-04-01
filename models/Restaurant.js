const mongoose = require("mongoose");
const RestaurantSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
      ref: "User2",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Restaurants", RestaurantSchema);
