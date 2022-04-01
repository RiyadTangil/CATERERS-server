const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User2",
  },
  foods: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Foods",
    }
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categories", CategorySchema);
